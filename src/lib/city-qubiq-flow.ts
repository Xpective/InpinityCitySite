import {
  BrowserProvider,
  Contract,
  type ContractTransactionReceipt,
  type ContractTransactionResponse,
} from "ethers";

import { CONFIG } from "./config";
import { canFillQubiq, canReservePersonalPlot } from "./city-validation";
import {
  chooseFaction,
  readPersonalPlot,
  readRegistryState,
  reserveNextPersonalPlot,
  resolvePersonalPlotSlot,
  setCityKeyToken,
  type CityFactionUi,
  type RegistryReadState,
} from "./city-registry";
import {
  contributeQubiq,
  getPlotCompletionState,
  type PlotCompletionState,
} from "./city-land";
import type { ResourceEligibility } from "./resource-check";
import {
  getInjectedEthereum,
  normalizeAddress,
  switchToConfiguredChain,
} from "./evm-wallet";

// ============================================================
// TYPES
// ============================================================
export type QubiqFlowStep =
  | "idle"
  | "validate"
  | "prepare"
  | "reserve"
  | "approve"
  | "contribute"
  | "refresh"
  | "done"
  | "error";

export type QubiqFlowCode =
  | "ok"
  | "needs_wallet"
  | "wrong_chain"
  | "insufficient_gas"
  | "needs_city_key"
  | "needs_faction"
  | "faction_mismatch"
  | "needs_personal_plot"
  | "plot_not_ready"
  | "qubiq_not_fillable"
  | "needs_resource_approval"
  | "insufficient_resources"
  | "missing_resource_requirements"
  | "reservation_sent"
  | "approval_sent"
  | "contribution_sent"
  | "tx_timeout"
  | "user_rejected"
  | "config_missing"
  | "flow_busy"
  | "aborted"
  | "unexpected_error";

export type QubiqFlowResult = {
  ok: boolean;
  code: QubiqFlowCode;
  step: QubiqFlowStep;
  message: string;
  /** Additional context for debugging / UI */
  context?: {
    contract?: string;
    txHash?: string;
    plotId?: bigint | null;
    slotIndex?: number;
    faction?: CityFactionUi;
    reason?: string;
    /** 💎 IDEE 3: Mutation-Recovery — welche Schritte sind durch */
    completedMutations?: FlowMutation[];
  };
  txHash?: string;
  plotId?: bigint | null;
  slotIndex?: number;
  faction?: CityFactionUi;
  completion?: PlotCompletionState | null;
  /** 💎 IDEE 3: Mutation-Recovery — bei Fehler hilfreich für Retry */
  mutations?: FlowMutation[];
};

export type RunQubiqFlowArgs = {
  walletAddress: string;
  slotIndex?: number | null;
  plotId?: bigint | number | null;
  cityKeyTokenId?: bigint | number | null;
  desiredFaction?: "inpinity" | "inphinity" | null;
  qubiqX: number;
  qubiqY: number;
  resourceEligibility?: ResourceEligibility | null;
  onStepChange?: (step: QubiqFlowStep) => void;
  onTxHash?: (txHash: string | null) => void;
  /** 💎 IDEE 4: Progress-Callback */
  onProgress?: (percent: number, step: QubiqFlowStep, mutation?: FlowMutation) => void;
  /** Optional abort signal for canceling long-running flows */
  signal?: AbortSignal;
};

export type QubiqFlowReadiness = {
  registry: RegistryReadState;
  slot: Awaited<ReturnType<typeof readPersonalPlot>>;
  approved: boolean;
  canContribute: boolean;
  completedSteps: Array<
    "wallet" | "city_key" | "faction" | "plot" | "approval" | "qubiq"
  >;
  remainingSteps: Array<
    "wallet" | "city_key" | "faction" | "plot" | "approval" | "qubiq"
  >;
  nextCode:
    | "needs_city_key"
    | "needs_faction"
    | "faction_mismatch"
    | "reserve_plot"
    | "needs_resource_approval"
    | "contribute_qubiq";
  nextLabel:
    | "Set City Key"
    | "Choose Faction"
    | "Reserve Plot"
    | "Approve Resources"
    | "Contribute Qubiq";
  nextMessage: string;
  /** 💎 IDEE 5: Pre-flight — erwartete TX-Anzahl bis zum Ziel */
  estimatedTxCount?: number;
};

export type FlowMutation =
  | "linked_city_key"
  | "chose_faction"
  | "reserved_plot"
  | "approved_resources"
  | "contributed_qubiq";

// 💎 IDEE 5: Pre-flight Preview
export type QubiqFlowPreview = {
  estimatedTxCount: number;
  mutations: FlowMutation[];
  blockers: string[];
  canProceed: boolean;
};

// ============================================================
// CONSTANTS
// ============================================================
const BASE_CHAIN_ID = Number((CONFIG.chainId || 8453).toString().trim());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const TX_TIMEOUT_MS = 90_000;
const RPC_RETRIES = 3;
const RPC_RETRY_DELAY_MS = 1_200;
/** 💎 IDEE 1: Flow-Mutex Timeout (nach 5min wird er automatisch freigegeben) */
const FLOW_MUTEX_TIMEOUT_MS = 5 * 60 * 1000;

const RESOURCE_TOKEN_ABI = [
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)",
] as const;

const CITY_CONFIG_ABI = [
  "function KEY_RESOURCE_TOKEN() view returns (bytes32)",
  "function getAddressConfig(bytes32 key) view returns (address)",
] as const;

// ============================================================
// 💎 IDEE 1: Flow-Mutex mit Timestamp + Wallet-Ownership
// ============================================================
type FlowMutex = {
  walletAddress: string;
  startedAt: number;
};

let activeFlow: FlowMutex | null = null;

function acquireFlowLock(walletAddress: string): { ok: true } | { ok: false; reason: string } {
  const now = Date.now();

  // Stale-Lock-Cleanup
  if (activeFlow && now - activeFlow.startedAt > FLOW_MUTEX_TIMEOUT_MS) {
    logDebug("Releasing stale flow lock (timeout)", activeFlow);
    activeFlow = null;
  }

  if (activeFlow) {
    const shortAddr = activeFlow.walletAddress.slice(0, 6);
    const ageSec = Math.round((now - activeFlow.startedAt) / 1000);
    return {
      ok: false,
      reason: `Another Qubiq flow is already running from ${shortAddr}… (${ageSec}s ago). Please wait.`,
    };
  }

  activeFlow = { walletAddress: normalizeAddress(walletAddress), startedAt: now };
  return { ok: true };
}

function releaseFlowLock(): void {
  activeFlow = null;
}

/** 💎 IDEE 1: Für UI — ist gerade ein Flow aktiv? */
export function isQubiqFlowActive(): boolean {
  if (!activeFlow) return false;
  if (Date.now() - activeFlow.startedAt > FLOW_MUTEX_TIMEOUT_MS) {
    activeFlow = null;
    return false;
  }
  return true;
}

// ============================================================
// DEBUG LOGGER
// ============================================================
function isDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).has("debug");
  } catch {
    return false;
  }
}

function logDebug(...args: unknown[]): void {
  if (isDebugEnabled()) {
    // eslint-disable-next-line no-console
    console.debug("%c[qubiq-flow]", "color:#00e5ff", ...args);
  }
}

// ============================================================
// HELPERS
// ============================================================
function getProvider(): BrowserProvider {
  const ethereum = getInjectedEthereum();
  if (!ethereum) {
    throw new Error("No injected wallet found. Please install MetaMask or another EVM wallet.");
  }
  return new BrowserProvider(ethereum);
}

function getCityLandAddress(): string {
  const address = (CONFIG.cityLandAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_LAND_ADDRESS. Please check your environment config.");
  }
  return address;
}

function getCityConfigAddress(): string {
  const address = (CONFIG.cityConfigAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_CONFIG_ADDRESS. Please check your environment config.");
  }
  return address;
}

async function getWalletRuntime() {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const walletAddress = normalizeAddress(await signer.getAddress());
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);

  return { provider, signer, walletAddress, chainId };
}

async function withRetry<T>(fn: () => Promise<T>, retries = RPC_RETRIES): Promise<T> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, RPC_RETRY_DELAY_MS * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

async function waitForReceiptWithTimeout(
  tx: ContractTransactionResponse,
  label = "Transaction"
): Promise<ContractTransactionReceipt | null> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(
      () => reject(new Error(`${label} timed out after ${TX_TIMEOUT_MS / 1000}s`)),
      TX_TIMEOUT_MS
    )
  );
  return Promise.race([tx.wait(), timeout]);
}

function decodeRevertReason(err: unknown): { code: QubiqFlowCode; message: string } {
  const errObj = err as { code?: string | number; reason?: string; shortMessage?: string; message?: string } | null;

  if (
    errObj?.code === 4001 ||
    errObj?.code === "ACTION_REJECTED" ||
    /user rejected|user denied/i.test(errObj?.message || "")
  ) {
    return { code: "user_rejected", message: "Transaction was rejected by the user." };
  }

  const reason = (errObj?.reason || errObj?.shortMessage || errObj?.message || "").toLowerCase();

  if (/already.?bound|already.?chosen|faction.?locked/i.test(reason))
    return { code: "faction_mismatch", message: "Your wallet is already locked to a different faction." };
  if (/city.?key|not.?linked|key.?not.?set/i.test(reason))
    return { code: "needs_city_key", message: "No City Key is linked yet." };
  if (/already.?reserved|plot.?exists/i.test(reason))
    return { code: "plot_not_ready", message: "This plot is already reserved." };
  if (/not.?next.?slot|invalid.?slot/i.test(reason))
    return { code: "plot_not_ready", message: "This slot is not the next expected slot for your wallet." };
  if (/insufficient.?allowance|not.?approved/i.test(reason))
    return { code: "needs_resource_approval", message: "Resource approval is missing." };
  if (/insufficient.?balance|not.?enough/i.test(reason))
    return { code: "insufficient_resources", message: "Insufficient resources to complete this action." };
  if (/already.?completed|already.?filled/i.test(reason))
    return { code: "qubiq_not_fillable", message: "This Qubiq cell is already complete." };
  if (/max.?personal|plot.?limit|limit.?reached/i.test(reason))
    return { code: "plot_not_ready", message: "Maximum personal plot limit reached for this wallet." };
  if (/paused|halted/i.test(reason))
    return { code: "unexpected_error", message: "The contract is paused. Try again later." };
  if (/gas.?limit|out.?of.?gas/i.test(reason))
    return { code: "insufficient_gas", message: "Gas limit exceeded. Please retry." };

  return {
    code: "unexpected_error",
    message: (errObj?.shortMessage || errObj?.message || "Transaction failed.").slice(0, 140),
  };
}

async function readResourceTokenAddress(): Promise<string> {
  const provider = getProvider();
  const contract = new Contract(getCityConfigAddress(), CITY_CONFIG_ABI, provider);
  const key = (await contract.KEY_RESOURCE_TOKEN()) as string;
  const tokenAddress = (await contract.getAddressConfig(key)) as string;
  if (!tokenAddress || tokenAddress === ZERO_ADDRESS) {
    throw new Error("Resource token is not configured in CityConfig.");
  }
  return tokenAddress;
}

async function isResourceApprovedForCityLand(walletAddress: string): Promise<boolean> {
  const provider = getProvider();
  const resourceTokenAddress = await withRetry(() => readResourceTokenAddress());
  const resourceToken = new Contract(resourceTokenAddress, RESOURCE_TOKEN_ABI, provider);
  return (await resourceToken.isApprovedForAll(
    normalizeAddress(walletAddress),
    getCityLandAddress()
  )) as boolean;
}

export async function approveResourcesForCityLand(): Promise<ContractTransactionResponse> {
  const { signer } = await getWalletRuntime();
  const resourceTokenAddress = await readResourceTokenAddress();
  const resourceToken = new Contract(resourceTokenAddress, RESOURCE_TOKEN_ABI, signer);
  return resourceToken.setApprovalForAll(
    getCityLandAddress(),
    true
  ) as Promise<ContractTransactionResponse>;
}

function getRequiredResourcesFromEligibility(resourceEligibility?: ResourceEligibility | null) {
  if (!resourceEligibility) {
    throw new Error(
      "Resource requirements are not loaded yet. Please wait a moment and try again."
    );
  }
  return {
    oil: resourceEligibility.required.oil,
    lemons: resourceEligibility.required.lemons,
    iron: resourceEligibility.required.iron,
  };
}

function matchesChosenFaction(
  chosenFaction: CityFactionUi,
  desiredFaction?: "inpinity" | "inphinity" | null
): boolean {
  if (!desiredFaction) return true;
  if (chosenFaction === "none") return true;
  return chosenFaction === desiredFaction;
}

function getFactionMismatchMessage(
  chosenFaction: CityFactionUi,
  desiredFaction?: "inpinity" | "inphinity" | null
): string {
  if (!desiredFaction) {
    return `This wallet is already bound to faction ${chosenFaction}.`;
  }
  return `This wallet is bound to faction ${chosenFaction} and cannot build on the ${desiredFaction} side.`;
}

function describeMutations(mutations: FlowMutation[]): string {
  const labels = mutations.map((mutation) => {
    switch (mutation) {
      case "linked_city_key": return "linked City Key";
      case "chose_faction": return "chose faction";
      case "reserved_plot": return "reserved personal plot";
      case "approved_resources": return "approved resources";
      case "contributed_qubiq": return "contributed Qubiq";
      default: return mutation;
    }
  });

  if (!labels.length) return "Qubiq contribution successful.";
  if (labels.length === 1) return `${labels[0]} successfully.`;
  return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)} successfully.`;
}

// ============================================================
// PREFLIGHT VALIDATION
// ============================================================
export function preflightCheckConfig(): QubiqFlowResult | null {
  const missing: string[] = [];

  if (!(CONFIG.cityLandAddress || "").trim()) missing.push("VITE_CITY_LAND_ADDRESS");
  if (!(CONFIG.cityConfigAddress || "").trim()) missing.push("VITE_CITY_CONFIG_ADDRESS");
  if (!(CONFIG.cityRegistryAddress || "").trim()) missing.push("VITE_CITY_REGISTRY_ADDRESS");

  if (missing.length > 0) {
    return {
      ok: false,
      code: "config_missing",
      step: "validate",
      message: `Missing required config: ${missing.join(", ")}`,
    };
  }

  return null;
}

// ============================================================
// WALLET + CHAIN CHECK
// ============================================================
async function ensureWalletAndChain(
  expectedWalletAddress: string
): Promise<QubiqFlowResult | null> {
  const runtime = await getWalletRuntime();

  if (!runtime.walletAddress) {
    return {
      ok: false,
      code: "needs_wallet",
      step: "validate",
      message: "Wallet is not connected.",
    };
  }

  if (normalizeAddress(runtime.walletAddress) !== normalizeAddress(expectedWalletAddress)) {
    return {
      ok: false,
      code: "needs_wallet",
      step: "validate",
      message: "The connected wallet does not match the expected wallet address. Please reconnect.",
    };
  }

  if (runtime.chainId !== BASE_CHAIN_ID) {
    logDebug("Wrong chain detected", runtime.chainId, "expected", BASE_CHAIN_ID);
    try {
      const switched = await switchToConfiguredChain();
      if (!switched) {
        return {
          ok: false,
          code: "wrong_chain",
          step: "validate",
          message: `Your wallet is on chain ${runtime.chainId}, but Base (${BASE_CHAIN_ID}) is required. Please switch networks.`,
        };
      }
    } catch (error) {
      const detail = error instanceof Error ? ` ${error.message}` : "";
      return {
        ok: false,
        code: "wrong_chain",
        step: "validate",
        message: `Wallet is on chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).${detail}`,
      };
    }
  }

  return null;
}

// ============================================================
// READINESS INSPECTION
// ============================================================
export async function inspectQubiqFlowReadiness(args: {
  walletAddress: string;
  slotIndex: number;
  desiredFaction?: "inpinity" | "inphinity" | null;
}): Promise<QubiqFlowReadiness> {
  const [registry, slot, approved] = await Promise.all([
    withRetry(() => readRegistryState(args.walletAddress)),
    withRetry(() => readPersonalPlot(args.walletAddress, args.slotIndex)),
    withRetry(() => isResourceApprovedForCityLand(args.walletAddress)),
  ]);

  const completedSteps: QubiqFlowReadiness["completedSteps"] = ["wallet"];
  const remainingSteps: QubiqFlowReadiness["remainingSteps"] = [];

  const baseResult = {
    registry,
    slot,
    approved,
  };

  // 💎 IDEE 5: Pre-flight — TX-Anzahl berechnen
  const computeTxCount = (): number => {
    let count = 0;
    if (!registry.hasCityKey) count++;
    if (registry.chosenFaction === "none") count++;
    if (!slot.occupied) count++;
    if (!approved) count++;
    count++; // Contribution
    return count;
  };

  if (!registry.hasCityKey) {
    remainingSteps.push("city_key", "faction", "plot", "approval", "qubiq");
    return {
      ...baseResult,
      canContribute: false,
      completedSteps,
      remainingSteps,
      nextCode: "needs_city_key",
      nextLabel: "Set City Key",
      nextMessage: "Link one of your InpinityNFTs as your City Key.",
      estimatedTxCount: computeTxCount(),
    };
  }
  completedSteps.push("city_key");

  if (registry.chosenFaction === "none") {
    remainingSteps.push("faction", "plot", "approval", "qubiq");
    return {
      ...baseResult,
      canContribute: false,
      completedSteps,
      remainingSteps,
      nextCode: "needs_faction",
      nextLabel: "Choose Faction",
      nextMessage: "This wallet must choose a faction before building.",
      estimatedTxCount: computeTxCount(),
    };
  }
  completedSteps.push("faction");

  if (!matchesChosenFaction(registry.chosenFaction, args.desiredFaction)) {
    remainingSteps.push("plot", "approval", "qubiq");
    return {
      ...baseResult,
      canContribute: false,
      completedSteps,
      remainingSteps,
      nextCode: "faction_mismatch",
      nextLabel: "Choose Faction",
      nextMessage: getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction),
      estimatedTxCount: computeTxCount(),
    };
  }

  if (!slot.occupied || !slot.plotId) {
    remainingSteps.push("plot", "approval", "qubiq");
    return {
      ...baseResult,
      canContribute: false,
      completedSteps,
      remainingSteps,
      nextCode: "reserve_plot",
      nextLabel: "Reserve Plot",
      nextMessage: "Reserve the next personal plot for this wallet.",
      estimatedTxCount: computeTxCount(),
    };
  }
  completedSteps.push("plot");

  if (!approved) {
    remainingSteps.push("approval", "qubiq");
    return {
      ...baseResult,
      canContribute: false,
      completedSteps,
      remainingSteps,
      nextCode: "needs_resource_approval",
      nextLabel: "Approve Resources",
      nextMessage: "CityLand needs ERC1155 approval before the first Qubiq contribution.",
      estimatedTxCount: computeTxCount(),
    };
  }
  completedSteps.push("approval");

  return {
    ...baseResult,
    canContribute: true,
    completedSteps,
    remainingSteps: ["qubiq"],
    nextCode: "contribute_qubiq",
    nextLabel: "Contribute Qubiq",
    nextMessage: "The wallet is ready to contribute to the selected Qubiq cell.",
    estimatedTxCount: computeTxCount(),
  };
}

// ============================================================
// 💎 IDEE 5: PRE-FLIGHT PREVIEW (kein TX, reine Simulation)
// ============================================================
export async function previewQubiqFlow(args: {
  walletAddress: string;
  plotId?: bigint | number | null;
  slotIndex?: number | null;
  cityKeyTokenId?: bigint | number | null;
  desiredFaction?: "inpinity" | "inphinity" | null;
  resourceEligibility?: ResourceEligibility | null;
}): Promise<QubiqFlowPreview> {
  const blockers: string[] = [];
  const mutations: FlowMutation[] = [];

  try {
    const configError = preflightCheckConfig();
    if (configError) {
      return {
        estimatedTxCount: 0,
        mutations: [],
        blockers: [configError.message],
        canProceed: false,
      };
    }

    const walletCheck = await ensureWalletAndChain(args.walletAddress);
    if (walletCheck) {
      return {
        estimatedTxCount: 0,
        mutations: [],
        blockers: [walletCheck.message],
        canProceed: false,
      };
    }

    if (args.resourceEligibility && !args.resourceEligibility.ready) {
      blockers.push("Insufficient resources for the selected Qubiq cell.");
    }

    const registry = await withRetry(() => readRegistryState(args.walletAddress));

    if (!registry.hasCityKey) {
      if (args.cityKeyTokenId == null) {
        blockers.push("No City Key selected yet.");
      } else {
        mutations.push("linked_city_key");
      }
    }

    if (registry.chosenFaction === "none") {
      if (!args.desiredFaction) {
        blockers.push("No faction chosen yet.");
      } else {
        mutations.push("chose_faction");
      }
    } else if (!matchesChosenFaction(registry.chosenFaction, args.desiredFaction)) {
      blockers.push(getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction));
    }

    const resolvedSlot = await withRetry(() =>
      resolvePersonalPlotSlot(args.walletAddress, {
        targetPlotId: args.plotId ?? null,
        preferredSlotIndex: args.slotIndex ?? null,
      })
    );

    if (!resolvedSlot.occupied) {
      mutations.push("reserved_plot");
    }

    const approved = await withRetry(() => isResourceApprovedForCityLand(args.walletAddress));
    if (!approved) mutations.push("approved_resources");

    mutations.push("contributed_qubiq");

    return {
      estimatedTxCount: mutations.length,
      mutations,
      blockers,
      canProceed: blockers.length === 0,
    };
  } catch (err) {
    return {
      estimatedTxCount: 0,
      mutations,
      blockers: [
        ...blockers,
        err instanceof Error ? err.message : "Preview failed.",
      ],
      canProceed: false,
    };
  }
}

// ============================================================
// MAIN FLOW
// ============================================================
export async function runQubiqContributionFlow(
  args: RunQubiqFlowArgs
): Promise<QubiqFlowResult> {
  // 💎 IDEE 1: Mutex mit Timestamp + Wallet
  const lock = acquireFlowLock(args.walletAddress);
  if (!lock.ok) {
    return {
      ok: false,
      code: "flow_busy",
      step: "validate",
      message: lock.reason,
    };
  }

  const notifyStep = (step: QubiqFlowStep) => args.onStepChange?.(step);
  const notifyHash = (hash: string | null) => args.onTxHash?.(hash);
  // 💎 IDEE 4: Progress-Callback
  const notifyProgress = (
    percent: number,
    step: QubiqFlowStep,
    mutation?: FlowMutation
  ) => args.onProgress?.(percent, step, mutation);

  // 💎 IDEE 2: Abort-Check vor jedem Schritt
  const checkAborted = (): QubiqFlowResult | null => {
    if (args.signal?.aborted) {
      return {
        ok: false,
        code: "aborted",
        step: "error",
        message: "Flow was canceled by the user.",
      };
    }
    return null;
  };

  // 💎 IDEE 3: Mutation-Tracking
  const mutations: FlowMutation[] = [];
  let latestTxHash: string | undefined;

  try {
    const configError = preflightCheckConfig();
    if (configError) return configError;

    const aborted0 = checkAborted();
    if (aborted0) return aborted0;

    notifyStep("validate");
    notifyProgress(5, "validate");
    logDebug("Flow starting", { walletAddress: args.walletAddress, faction: args.desiredFaction });

    const walletCheck = await ensureWalletAndChain(args.walletAddress);
    if (walletCheck) return walletCheck;

    if (args.resourceEligibility && !args.resourceEligibility.ready) {
      return {
        ok: false,
        code: "insufficient_resources",
        step: "validate",
        message: "Not enough resources for this Qubiq contribution. Please acquire more Oil, Lemons and Iron.",
      };
    }

    const aborted1 = checkAborted();
    if (aborted1) return { ...aborted1, mutations };

    notifyStep("prepare");
    notifyProgress(15, "prepare");

    // ===== City Key =====
    let registry = await withRetry(() => readRegistryState(args.walletAddress));

    if (!registry.hasCityKey) {
      if (args.cityKeyTokenId == null) {
        return {
          ok: false,
          code: "needs_city_key",
          step: "prepare",
          message: "No City Key is linked yet. Please select an InpinityNFT to use as your City Key.",
          mutations,
        };
      }

      const aborted2 = checkAborted();
      if (aborted2) return { ...aborted2, mutations };

      logDebug("Linking City Key", args.cityKeyTokenId.toString());
      const tx = await setCityKeyToken(args.cityKeyTokenId);
      latestTxHash = tx.hash;
      notifyHash(tx.hash);
      await waitForReceiptWithTimeout(tx, "Link City Key");
      mutations.push("linked_city_key");
      notifyProgress(25, "prepare", "linked_city_key");

      registry = await withRetry(() => readRegistryState(args.walletAddress));
    }

    // ===== Faction =====
    if (registry.chosenFaction === "none") {
      if (!args.desiredFaction) {
        return {
          ok: false,
          code: "needs_faction",
          step: "prepare",
          message: "No faction chosen yet. Please pick Inpinity or Inphinity.",
          mutations,
        };
      }

      const aborted3 = checkAborted();
      if (aborted3) return { ...aborted3, mutations };

      logDebug("Choosing faction", args.desiredFaction);
      const tx = await chooseFaction(args.desiredFaction);
      latestTxHash = tx.hash;
      notifyHash(tx.hash);
      await waitForReceiptWithTimeout(tx, "Choose Faction");
      mutations.push("chose_faction");
      notifyProgress(35, "prepare", "chose_faction");

      registry = await withRetry(() => readRegistryState(args.walletAddress));
    }

    if (!matchesChosenFaction(registry.chosenFaction, args.desiredFaction)) {
      return {
        ok: false,
        code: "faction_mismatch",
        step: "validate",
        faction: registry.chosenFaction,
        message: getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction),
        mutations,
      };
    }

    // ===== Reserve Plot =====
    const aborted4 = checkAborted();
    if (aborted4) return { ...aborted4, mutations };

    notifyStep("reserve");
    notifyProgress(45, "reserve");

    const resolvedSlot = await withRetry(() =>
      resolvePersonalPlotSlot(args.walletAddress, {
        targetPlotId: args.plotId ?? null,
        preferredSlotIndex: args.slotIndex ?? null,
      })
    );

    if (args.plotId != null && resolvedSlot.resolution !== "target") {
      return {
        ok: false,
        code: "plot_not_ready",
        step: "reserve",
        slotIndex: resolvedSlot.slotIndex,
        faction: registry.chosenFaction,
        message: "The selected build plot is not reserved by this wallet yet.",
        mutations,
      };
    }

    let slotState = resolvedSlot;

    if (!slotState.occupied) {
      if (!slotState.isExpectedNextSlot) {
        return {
          ok: false,
          code: "plot_not_ready",
          step: "reserve",
          slotIndex: slotState.slotIndex,
          faction: registry.chosenFaction,
          message: "This slot is not the next expected personal slot for your wallet.",
          mutations,
        };
      }

      const aborted5 = checkAborted();
      if (aborted5) return { ...aborted5, mutations };

      const reserveAllowed = await canReservePersonalPlot(
        args.walletAddress,
        slotState.slotIndex
      ).catch(() => slotState.isExpectedNextSlot);

      if (!reserveAllowed) {
        return {
          ok: false,
          code: "plot_not_ready",
          step: "reserve",
          slotIndex: slotState.slotIndex,
          faction: registry.chosenFaction,
          message: "CityValidation rejected this personal plot reservation.",
          mutations,
        };
      }

      logDebug("Reserving plot slot", slotState.slotIndex);
      const reserveTx = await reserveNextPersonalPlot(slotState.slotIndex);
      latestTxHash = reserveTx.hash;
      notifyHash(reserveTx.hash);
      await waitForReceiptWithTimeout(reserveTx, "Reserve Plot");
      mutations.push("reserved_plot");
      notifyProgress(60, "reserve", "reserved_plot");

      slotState = {
        ...(await withRetry(() => readPersonalPlot(args.walletAddress, slotState.slotIndex))),
        resolution: "preferred",
      };
    }

    // ✅ FIX: TypeScript-Narrowing nach await erhalten → finalPlotId
    const finalPlotId = slotState.plotId;
    if (finalPlotId == null) {
      return {
        ok: false,
        code: "needs_personal_plot",
        step: "reserve",
        slotIndex: slotState.slotIndex,
        faction: registry.chosenFaction,
        message: "No personal plot found for this slot. Please try again.",
        mutations,
      };
    }

    // ===== Approve Resources =====
    const aborted6 = checkAborted();
    if (aborted6) return { ...aborted6, mutations };

    notifyStep("approve");
    notifyProgress(70, "approve");

    const approved = await withRetry(() => isResourceApprovedForCityLand(args.walletAddress));

    if (!approved) {
      const aborted7 = checkAborted();
      if (aborted7) return { ...aborted7, mutations };

      logDebug("Approving resources for CityLand");
      const approvalTx = await approveResourcesForCityLand();
      latestTxHash = approvalTx.hash;
      notifyHash(approvalTx.hash);
      await waitForReceiptWithTimeout(approvalTx, "Approve Resources");
      mutations.push("approved_resources");
      notifyProgress(80, "approve", "approved_resources");
    }

    // ===== Qubiq Fillability =====
    const aborted8 = checkAborted();
    if (aborted8) return { ...aborted8, mutations };

    const fillable = await canFillQubiq(
      args.walletAddress,
      finalPlotId,
      args.qubiqX,
      args.qubiqY
    ).catch(() => true);

    if (!fillable) {
      return {
        ok: false,
        code: "qubiq_not_fillable",
        step: "validate",
        plotId: finalPlotId,
        slotIndex: slotState.slotIndex,
        faction: registry.chosenFaction,
        message:
          "The selected Qubiq cell cannot be filled by this wallet. It may already be complete, or the coordinates may be invalid.",
        mutations,
      };
    }

    // ===== Required Resources =====
    let required: { oil: bigint; lemons: bigint; iron: bigint };

    try {
      required = getRequiredResourcesFromEligibility(args.resourceEligibility);
    } catch (error) {
      return {
        ok: false,
        code: "missing_resource_requirements",
        step: "validate",
        faction: registry.chosenFaction,
        message: error instanceof Error ? error.message : "Missing resource requirements.",
        mutations,
      };
    }

    // ===== Contribute =====
    const aborted9 = checkAborted();
    if (aborted9) return { ...aborted9, mutations };

    notifyStep("contribute");
    notifyProgress(90, "contribute");

    logDebug("Contributing Qubiq", {
      plotId: finalPlotId.toString(),
      x: args.qubiqX,
      y: args.qubiqY,
      required,
    });

    const contributeTx = await contributeQubiq({
      plotId: finalPlotId,
      x: args.qubiqX,
      y: args.qubiqY,
      oilAmount: required.oil,
      lemonsAmount: required.lemons,
      ironAmount: required.iron,
    });

    latestTxHash = contributeTx.hash;
    notifyHash(contributeTx.hash);
    await waitForReceiptWithTimeout(contributeTx, "Contribute Qubiq");
    mutations.push("contributed_qubiq");
    notifyProgress(95, "contribute", "contributed_qubiq");

    // ===== Refresh Completion =====
    notifyStep("refresh");
    notifyProgress(98, "refresh");

    const completion = await withRetry(() => getPlotCompletionState(finalPlotId));

    notifyStep("done");
    notifyProgress(100, "done");
    logDebug("Flow complete", { mutations, latestTxHash });

    return {
      ok: true,
      code: "contribution_sent",
      step: "done",
      txHash: latestTxHash,
      plotId: finalPlotId,
      slotIndex: slotState.slotIndex,
      faction: registry.chosenFaction,
      completion,
      mutations,
      message: describeMutations(mutations),
      context: {
        txHash: latestTxHash,
        plotId: finalPlotId,
        slotIndex: slotState.slotIndex,
        faction: registry.chosenFaction,
        completedMutations: mutations,
      },
    };
  } catch (error) {
    notifyStep("error");
    notifyProgress(0, "error");
    logDebug("Flow error", error);

    const decoded = decodeRevertReason(error);

    return {
      ok: false,
      code: decoded.code,
      step: "error",
      message: decoded.message,
      mutations,
      context: {
        reason: error instanceof Error ? error.message.slice(0, 200) : String(error).slice(0, 200),
        completedMutations: mutations,
      },
    };
  } finally {
    // 💎 IDEE 1: Mutex freigeben
    releaseFlowLock();
  }
}

// ============================================================
// UTILITIES
// ============================================================
export async function getDefaultQubiqCoordinates(): Promise<{ x: number; y: number }> {
  return { x: 0, y: 0 };
}

export function getFlowStepLabel(step: QubiqFlowStep): string {
  switch (step) {
    case "idle": return "Idle";
    case "validate": return "Validating";
    case "prepare": return "Preparing";
    case "reserve": return "Reserving";
    case "approve": return "Approving";
    case "contribute": return "Contributing";
    case "refresh": return "Refreshing";
    case "done": return "Done";
    case "error": return "Error";
    default: return step;
  }
}

export function isRetryableCode(code: QubiqFlowCode): boolean {
  return (
    code === "unexpected_error" ||
    code === "tx_timeout" ||
    code === "insufficient_gas" ||
    code === "flow_busy"
  );
}

export function isActionRequiredCode(code: QubiqFlowCode): boolean {
  return (
    code === "needs_wallet" ||
    code === "wrong_chain" ||
    code === "needs_city_key" ||
    code === "needs_faction" ||
    code === "needs_resource_approval" ||
    code === "insufficient_resources"
  );
}

/** 💎 IDEE 3: Nach Fehler — welche Mutationen sind durch? Nützlich für Recovery */
export function getCompletedMutations(result: QubiqFlowResult | null): FlowMutation[] {
  return result?.mutations ?? result?.context?.completedMutations ?? [];
}