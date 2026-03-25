import {
  BrowserProvider,
  Contract,
  type ContractTransactionReceipt,
  type ContractTransactionResponse,
  type Eip1193Provider,
} from "ethers";
import { BASE_CHAIN_PARAMETERS, CONFIG } from "./config";
import {
  chooseFaction,
  findPersonalPlotSlotByPlotId,
  getNextPersonalSlotIndex,
  readPersonalPlot,
  readRegistryState,
  reserveNextPersonalPlot,
  setCityKeyToken,
  type CityFactionUi,
  type PersonalPlotSlotState,
  type RegistryReadState,
} from "./city-registry";
import {
  contributeQubiq,
  getPlotCompletionState,
  type PlotCompletionState,
} from "./city-land";
import { canFillQubiq, canReservePersonalPlot } from "./city-validation";
import type { ResourceEligibility } from "./resource-check";

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
  | "needs_city_key"
  | "needs_faction"
  | "faction_mismatch"
  | "needs_personal_plot"
  | "plot_not_ready"
  | "needs_resource_approval"
  | "insufficient_resources"
  | "missing_resource_requirements"
  | "reservation_sent"
  | "approval_sent"
  | "contribution_sent"
  | "validation_failed"
  | "user_rejected"
  | "unexpected_error";

export type QubiqFlowResult = {
  ok: boolean;
  code: QubiqFlowCode;
  step: QubiqFlowStep;
  message: string;
  txHash?: string;
  plotId?: bigint | null;
  slotIndex?: number;
  faction?: CityFactionUi;
  completion?: PlotCompletionState | null;
};

export type RunQubiqFlowArgs = {
  walletAddress: string;
  slotIndex?: number | null;
  targetPlotId?: bigint | number | string | null;
  cityKeyTokenId?: bigint | number | null;
  desiredFaction?: "inpinity" | "inphinity" | null;
  qubiqX: number;
  qubiqY: number;
  resourceEligibility?: ResourceEligibility | null;
  autoSwitchChain?: boolean;
};

export type QubiqFlowReadiness = {
  registry: RegistryReadState;
  slot: PersonalPlotSlotState;
  approved: boolean;
  canContribute: boolean;
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
};

type WalletRuntime = {
  provider: BrowserProvider;
  signer: Awaited<ReturnType<BrowserProvider["getSigner"]>>;
  walletAddress: string;
  chainId: number;
};

type ResolvedSlotTarget = {
  registry: RegistryReadState;
  slotIndex: number;
  slotState: PersonalPlotSlotState;
  targetPlotId: bigint | null;
};

function isFlowFailure(
  value: ResolvedSlotTarget | QubiqFlowResult
): value is QubiqFlowResult {
  return "ok" in value;
}

const BASE_CHAIN_ID = Number((CONFIG.chainId || 8453).toString().trim());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const RESOURCE_TOKEN_ABI = [
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)",
] as const;

const CITY_CONFIG_ABI = [
  "function KEY_RESOURCE_TOKEN() view returns (bytes32)",
  "function getAddressConfig(bytes32 key) view returns (address)",
] as const;

function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

function getEthereum(): Eip1193Provider & {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
} {
  const ethereum = (window as Window & {
    ethereum?: Eip1193Provider & {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
    };
  }).ethereum;

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return ethereum;
}

function getProvider(): BrowserProvider {
  return new BrowserProvider(getEthereum());
}

function getCityLandAddress(): string {
  const address = (CONFIG.cityLandAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_LAND_ADDRESS.");
  }
  return address;
}

async function getWalletRuntime(): Promise<WalletRuntime> {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const walletAddress = normalizeAddress(await signer.getAddress());
  const network = await provider.getNetwork();
  const chainId = Number(network.chainId);

  return {
    provider,
    signer,
    walletAddress,
    chainId,
  };
}

function isUserRejectedError(error: unknown): boolean {
  return !!(
    error &&
    typeof error === "object" &&
    "code" in error &&
    Number((error as { code?: unknown }).code) === 4001
  );
}

async function switchToConfiguredChain(): Promise<void> {
  const ethereum = getEthereum();

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: CONFIG.chainHex }],
    });
    return;
  } catch (error) {
    if (
      error &&
      typeof error === "object" &&
      "code" in error &&
      Number((error as { code?: unknown }).code) === 4902
    ) {
      if (!BASE_CHAIN_PARAMETERS.rpcUrls.length) {
        throw new Error(
          `Base is not configured in the wallet and no RPC URL is configured for automatic network add.`
        );
      }

      await ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: BASE_CHAIN_PARAMETERS.chainId,
            chainName: BASE_CHAIN_PARAMETERS.chainName,
            nativeCurrency: BASE_CHAIN_PARAMETERS.nativeCurrency,
            rpcUrls: [...BASE_CHAIN_PARAMETERS.rpcUrls],
            blockExplorerUrls: [...BASE_CHAIN_PARAMETERS.blockExplorerUrls],
          },
        ],
      });
      return;
    }

    throw error;
  }
}

async function readResourceTokenAddress(): Promise<string> {
  const configuredAddress = (CONFIG.resourceTokenAddress || "").trim();
  if (configuredAddress) {
    return configuredAddress;
  }

  const cityConfigAddress = (CONFIG.cityConfigAddress || "").trim();
  if (!cityConfigAddress) {
    throw new Error("Missing VITE_CITY_CONFIG_ADDRESS.");
  }

  const provider = getProvider();
  const contract = new Contract(cityConfigAddress, CITY_CONFIG_ABI, provider);

  const key = (await contract.KEY_RESOURCE_TOKEN()) as string;
  const tokenAddress = (await contract.getAddressConfig(key)) as string;

  if (!tokenAddress || tokenAddress === ZERO_ADDRESS) {
    throw new Error("Resource token is not configured in CityConfig.");
  }

  return tokenAddress;
}

async function isResourceApprovedForCityLand(walletAddress: string): Promise<boolean> {
  const provider = getProvider();
  const resourceTokenAddress = await readResourceTokenAddress();
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

async function waitForReceipt(
  tx: ContractTransactionResponse
): Promise<ContractTransactionReceipt | null> {
  return tx.wait();
}

function getRequiredResourcesFromEligibility(
  resourceEligibility?: ResourceEligibility | null
) {
  if (!resourceEligibility) {
    throw new Error("Resource requirement check is not loaded yet.");
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

  return `This wallet is already bound to faction ${chosenFaction} and cannot build on ${desiredFaction}.`;
}

function getInsufficientResourcesMessage(
  resourceEligibility?: ResourceEligibility | null
): string {
  if (!resourceEligibility) {
    return "Not enough resources for the next Qubiq contribution.";
  }

  const missingParts = [
    resourceEligibility.missing.oil > 0n
      ? `Oil ${resourceEligibility.missing.oil.toString()}`
      : null,
    resourceEligibility.missing.lemons > 0n
      ? `Lemons ${resourceEligibility.missing.lemons.toString()}`
      : null,
    resourceEligibility.missing.iron > 0n
      ? `Iron ${resourceEligibility.missing.iron.toString()}`
      : null,
  ].filter(Boolean);

  if (!missingParts.length) {
    return "Not enough resources for the next Qubiq contribution.";
  }

  return `Missing resources for the selected Qubiq: ${missingParts.join(", ")}.`;
}

async function ensureWalletAndChain(
  expectedWalletAddress: string,
  autoSwitchChain = false
): Promise<QubiqFlowResult | null> {
  let runtime = await getWalletRuntime();

  if (!runtime.walletAddress) {
    return {
      ok: false,
      code: "needs_wallet",
      step: "validate",
      message: "Wallet not connected.",
    };
  }

  if (normalizeAddress(runtime.walletAddress) !== normalizeAddress(expectedWalletAddress)) {
    return {
      ok: false,
      code: "needs_wallet",
      step: "validate",
      message: "Connected wallet does not match the expected wallet address.",
    };
  }

  if (runtime.chainId !== BASE_CHAIN_ID) {
    if (!autoSwitchChain) {
      return {
        ok: false,
        code: "wrong_chain",
        step: "validate",
        message: `Wallet is connected to chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).`,
      };
    }

    try {
      await switchToConfiguredChain();
      runtime = await getWalletRuntime();
    } catch (error) {
      return {
        ok: false,
        code: isUserRejectedError(error) ? "user_rejected" : "wrong_chain",
        step: "validate",
        message:
          error instanceof Error
            ? error.message
            : `Failed to switch to Base (${BASE_CHAIN_ID}).`,
      };
    }

    if (runtime.chainId !== BASE_CHAIN_ID) {
      return {
        ok: false,
        code: "wrong_chain",
        step: "validate",
        message: `Wallet is connected to chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).`,
      };
    }
  }

  return null;
}

async function resolveSlotTarget(args: {
  walletAddress: string;
  slotIndex?: number | null;
  targetPlotId?: bigint | number | string | null;
}): Promise<ResolvedSlotTarget | QubiqFlowResult> {
  const registry = await readRegistryState(args.walletAddress);

  if (args.targetPlotId != null) {
    const slotIndex = await findPersonalPlotSlotByPlotId(
      args.walletAddress,
      args.targetPlotId
    );

    if (slotIndex == null) {
      return {
        ok: false,
        code: "needs_personal_plot",
        step: "reserve",
        message:
          "The selected build plot is not registered to the connected wallet. Refresh the active build plot list and choose one of your own plots.",
      };
    }

    const slotState = await readPersonalPlot(args.walletAddress, slotIndex);
    return {
      registry,
      slotIndex,
      slotState,
      targetPlotId: BigInt(args.targetPlotId),
    };
  }

  const resolvedSlotIndex =
    typeof args.slotIndex === "number" && args.slotIndex >= 0
      ? args.slotIndex
      : getNextPersonalSlotIndex(registry);

  const slotState = await readPersonalPlot(args.walletAddress, resolvedSlotIndex);

  return {
    registry,
    slotIndex: resolvedSlotIndex,
    slotState,
    targetPlotId: null,
  };
}

export async function inspectQubiqFlowReadiness(args: {
  walletAddress: string;
  slotIndex?: number | null;
  targetPlotId?: bigint | number | string | null;
  desiredFaction?: "inpinity" | "inphinity" | null;
}): Promise<QubiqFlowReadiness> {
  const resolved = await resolveSlotTarget(args);
  if (isFlowFailure(resolved)) {
    throw new Error(resolved.message);
  }

  const { registry, slotState, slotIndex } = resolved;
  const approved = await isResourceApprovedForCityLand(args.walletAddress);

  if (!registry.hasCityKey) {
    return {
      registry,
      slot: slotState,
      approved,
      canContribute: false,
      nextCode: "needs_city_key",
      nextLabel: "Set City Key",
      nextMessage: "No City Key is linked yet.",
    };
  }

  if (registry.chosenFaction === "none") {
    return {
      registry,
      slot: slotState,
      approved,
      canContribute: false,
      nextCode: "needs_faction",
      nextLabel: "Choose Faction",
      nextMessage: "This wallet must choose a faction first.",
    };
  }

  if (!matchesChosenFaction(registry.chosenFaction, args.desiredFaction)) {
    return {
      registry,
      slot: slotState,
      approved,
      canContribute: false,
      nextCode: "faction_mismatch",
      nextLabel: "Choose Faction",
      nextMessage: getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction),
    };
  }

  if (!slotState.occupied || !slotState.plotId) {
    return {
      registry,
      slot: slotState,
      approved,
      canContribute: false,
      nextCode: "reserve_plot",
      nextLabel: "Reserve Plot",
      nextMessage:
        slotIndex === registry.personalPlotCount
          ? "Reserve the next personal plot for this wallet."
          : "This slot is not occupied yet.",
    };
  }

  if (!approved) {
    return {
      registry,
      slot: slotState,
      approved,
      canContribute: false,
      nextCode: "needs_resource_approval",
      nextLabel: "Approve Resources",
      nextMessage: "CityLand needs ERC1155 approval before the first Qubiq contribution.",
    };
  }

  return {
    registry,
    slot: slotState,
    approved,
    canContribute: true,
    nextCode: "contribute_qubiq",
    nextLabel: "Contribute Qubiq",
    nextMessage: "The wallet is ready to contribute to the selected Qubiq cell.",
  };
}

export async function runQubiqContributionFlow(
  args: RunQubiqFlowArgs
): Promise<QubiqFlowResult> {
  try {
    const walletCheck = await ensureWalletAndChain(
      args.walletAddress,
      args.autoSwitchChain === true
    );
    if (walletCheck) return walletCheck;

    let registry = await readRegistryState(args.walletAddress);

    if (!registry.hasCityKey) {
      if (args.cityKeyTokenId == null) {
        return {
          ok: false,
          code: "needs_city_key",
          step: "prepare",
          message: "No City Key is linked yet. Set a city key token first.",
        };
      }

      const tx = await setCityKeyToken(args.cityKeyTokenId);
      await waitForReceipt(tx);

      registry = await readRegistryState(args.walletAddress);

      return {
        ok: true,
        code: "ok",
        step: "prepare",
        txHash: tx.hash,
        message: "City Key token has been linked. Run the flow again to continue.",
      };
    }

    if (registry.chosenFaction === "none") {
      if (!args.desiredFaction) {
        return {
          ok: false,
          code: "needs_faction",
          step: "prepare",
          message: "No faction chosen yet. Choose Inpinity or Inphinity first.",
        };
      }

      const tx = await chooseFaction(args.desiredFaction);
      await waitForReceipt(tx);

      registry = await readRegistryState(args.walletAddress);

      return {
        ok: true,
        code: "ok",
        step: "prepare",
        txHash: tx.hash,
        faction: registry.chosenFaction,
        message: `Faction ${args.desiredFaction} has been chosen. Run the flow again to continue.`,
      };
    }

    if (!matchesChosenFaction(registry.chosenFaction, args.desiredFaction)) {
      return {
        ok: false,
        code: "faction_mismatch",
        step: "validate",
        faction: registry.chosenFaction,
        message: getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction),
      };
    }

    const resolved = await resolveSlotTarget({
      walletAddress: args.walletAddress,
      slotIndex: args.slotIndex,
      targetPlotId: args.targetPlotId,
    });

    if (isFlowFailure(resolved)) {
      return resolved;
    }

    let { slotIndex, slotState } = resolved;

    if (!slotState.occupied) {
      if (!slotState.isExpectedNextSlot) {
        return {
          ok: false,
          code: "plot_not_ready",
          step: "reserve",
          slotIndex,
          faction: registry.chosenFaction,
          message: "This slot is not the next expected personal slot.",
        };
      }

      const reserveAllowed = await canReservePersonalPlot(args.walletAddress, slotIndex);
      if (!reserveAllowed) {
        return {
          ok: false,
          code: "validation_failed",
          step: "reserve",
          slotIndex,
          faction: registry.chosenFaction,
          message:
            "CityValidation rejected the personal plot reservation. Check City Key, faction, wallet ownership, or slot readiness.",
        };
      }

      const reserveTx = await reserveNextPersonalPlot(slotIndex);
      await waitForReceipt(reserveTx);

      slotState = await readPersonalPlot(args.walletAddress, slotIndex);

      return {
        ok: true,
        code: "reservation_sent",
        step: "reserve",
        txHash: reserveTx.hash,
        slotIndex,
        plotId: slotState.plotId,
        faction: registry.chosenFaction,
        message:
          "Personal plot reserved successfully. Run the flow again to approve resources or contribute to the selected Qubiq.",
      };
    }

    if (!slotState.plotId) {
      return {
        ok: false,
        code: "needs_personal_plot",
        step: "reserve",
        slotIndex,
        faction: registry.chosenFaction,
        message: "No personal plot found for this slot.",
      };
    }

    const approved = await isResourceApprovedForCityLand(args.walletAddress);
    if (!approved) {
      const approvalTx = await approveResourcesForCityLand();
      await waitForReceipt(approvalTx);

      return {
        ok: true,
        code: "approval_sent",
        step: "approve",
        txHash: approvalTx.hash,
        plotId: slotState.plotId,
        slotIndex,
        faction: registry.chosenFaction,
        message:
          "Resource approval granted for CityLand. Run the flow again to contribute the selected Qubiq.",
      };
    }

    const canContribute = await canFillQubiq(
      args.walletAddress,
      slotState.plotId,
      args.qubiqX,
      args.qubiqY
    );

    if (!canContribute) {
      return {
        ok: false,
        code: "plot_not_ready",
        step: "contribute",
        plotId: slotState.plotId,
        slotIndex,
        faction: registry.chosenFaction,
        message:
          "CityValidation rejected the selected Qubiq cell. The cell may already be complete, invalid, or not owned by the connected wallet.",
      };
    }

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
      };
    }

    if (args.resourceEligibility && !args.resourceEligibility.ready) {
      return {
        ok: false,
        code: "insufficient_resources",
        step: "validate",
        plotId: slotState.plotId,
        slotIndex,
        faction: registry.chosenFaction,
        message: getInsufficientResourcesMessage(args.resourceEligibility),
      };
    }

    const contributeTx = await contributeQubiq({
      plotId: slotState.plotId,
      x: args.qubiqX,
      y: args.qubiqY,
      oilAmount: required.oil,
      lemonsAmount: required.lemons,
      ironAmount: required.iron,
    });

    await waitForReceipt(contributeTx);

    const completion = await getPlotCompletionState(slotState.plotId);

    return {
      ok: true,
      code: "contribution_sent",
      step: "refresh",
      txHash: contributeTx.hash,
      plotId: slotState.plotId,
      slotIndex,
      faction: registry.chosenFaction,
      completion,
      message: "Qubiq contribution successful.",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unexpected Qubiq flow error.";

    return {
      ok: false,
      code: isUserRejectedError(error) ? "user_rejected" : "unexpected_error",
      step: "error",
      message,
    };
  }
}

export async function getDefaultQubiqCoordinates(): Promise<{ x: number; y: number }> {
  return { x: 0, y: 0 };
}
