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
  | "qubiq_not_fillable"
  | "needs_resource_approval"
  | "insufficient_resources"
  | "missing_resource_requirements"
  | "reservation_sent"
  | "approval_sent"
  | "contribution_sent"
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
  plotId?: bigint | number | null;
  cityKeyTokenId?: bigint | number | null;
  desiredFaction?: "inpinity" | "inphinity" | null;
  qubiqX: number;
  qubiqY: number;
  resourceEligibility?: ResourceEligibility | null;
  onStepChange?: (step: QubiqFlowStep) => void;
  onTxHash?: (txHash: string | null) => void;
};

export type QubiqFlowReadiness = {
  registry: RegistryReadState;
  slot: Awaited<ReturnType<typeof readPersonalPlot>>;
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

type FlowMutation =
  | "linked_city_key"
  | "chose_faction"
  | "reserved_plot"
  | "approved_resources"
  | "contributed_qubiq";

const BASE_CHAIN_ID = Number((CONFIG.chainId || 8453).toString().trim());
const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

const RESOURCE_TOKEN_ABI = [
  "function isApprovedForAll(address account, address operator) view returns (bool)",
  "function setApprovalForAll(address operator, bool approved)",
] as const;

function getProvider(): BrowserProvider {
  const ethereum = getInjectedEthereum();

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return new BrowserProvider(ethereum);
}

function getCityLandAddress(): string {
  const address = (CONFIG.cityLandAddress || "").trim();

  if (!address) {
    throw new Error("Missing VITE_CITY_LAND_ADDRESS.");
  }

  return address;
}

async function getWalletRuntime() {
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

async function readResourceTokenAddress(): Promise<string> {
  const cityConfigAddress = (CONFIG.cityConfigAddress || "").trim();

  if (!cityConfigAddress) {
    throw new Error("Missing VITE_CITY_CONFIG_ADDRESS.");
  }

  const CITY_CONFIG_ABI = [
    "function KEY_RESOURCE_TOKEN() view returns (bytes32)",
    "function getAddressConfig(bytes32 key) view returns (address)",
  ] as const;

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

function getRequiredResourcesFromEligibility(resourceEligibility?: ResourceEligibility | null) {
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

function describeMutations(mutations: FlowMutation[]): string {
  const labels = mutations.map((mutation) => {
    switch (mutation) {
      case "linked_city_key":
        return "linked City Key";
      case "chose_faction":
        return "chose faction";
      case "reserved_plot":
        return "reserved personal plot";
      case "approved_resources":
        return "approved resources";
      case "contributed_qubiq":
        return "contributed Qubiq";
      default:
        return mutation;
    }
  });

  if (!labels.length) {
    return "Qubiq contribution successful.";
  }

  if (labels.length === 1) {
    return `${labels[0]} successfully.`;
  }

  return `${labels.slice(0, -1).join(", ")} and ${labels.at(-1)} successfully.`;
}

async function ensureWalletAndChain(
  expectedWalletAddress: string
): Promise<QubiqFlowResult | null> {
  const runtime = await getWalletRuntime();

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
    try {
      const switched = await switchToConfiguredChain();

      if (!switched) {
        return {
          ok: false,
          code: "wrong_chain",
          step: "validate",
          message: `Wallet is connected to chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).`,
        };
      }
    } catch (error) {
      const detail =
        error instanceof Error ? ` ${error.message}` : "";

      return {
        ok: false,
        code: "wrong_chain",
        step: "validate",
        message: `Wallet is connected to chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).${detail}`,
      };
    }
  }

  return null;
}

export async function inspectQubiqFlowReadiness(args: {
  walletAddress: string;
  slotIndex: number;
  desiredFaction?: "inpinity" | "inphinity" | null;
}): Promise<QubiqFlowReadiness> {
  const [registry, slot, approved] = await Promise.all([
    readRegistryState(args.walletAddress),
    readPersonalPlot(args.walletAddress, args.slotIndex),
    isResourceApprovedForCityLand(args.walletAddress),
  ]);

  if (!registry.hasCityKey) {
    return {
      registry,
      slot,
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
      slot,
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
      slot,
      approved,
      canContribute: false,
      nextCode: "faction_mismatch",
      nextLabel: "Choose Faction",
      nextMessage: getFactionMismatchMessage(registry.chosenFaction, args.desiredFaction),
    };
  }

  if (!slot.occupied || !slot.plotId) {
    return {
      registry,
      slot,
      approved,
      canContribute: false,
      nextCode: "reserve_plot",
      nextLabel: "Reserve Plot",
      nextMessage: "Reserve the next personal plot for this wallet.",
    };
  }

  if (!approved) {
    return {
      registry,
      slot,
      approved,
      canContribute: false,
      nextCode: "needs_resource_approval",
      nextLabel: "Approve Resources",
      nextMessage:
        "CityLand needs ERC1155 approval before the first Qubiq contribution.",
    };
  }

  return {
    registry,
    slot,
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
  const notifyStep = (step: QubiqFlowStep) => args.onStepChange?.(step);
  const notifyHash = (hash: string | null) => args.onTxHash?.(hash);

  try {
    notifyStep("validate");

    const walletCheck = await ensureWalletAndChain(args.walletAddress);
    if (walletCheck) return walletCheck;

    if (args.resourceEligibility && !args.resourceEligibility.ready) {
      return {
        ok: false,
        code: "insufficient_resources",
        step: "validate",
        message: "Not enough resources for the selected Qubiq contribution.",
      };
    }

    const mutations: FlowMutation[] = [];
    let latestTxHash: string | undefined;

    notifyStep("prepare");

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
      latestTxHash = tx.hash;
      notifyHash(tx.hash);
      await waitForReceipt(tx);
      mutations.push("linked_city_key");

      registry = await readRegistryState(args.walletAddress);
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
      latestTxHash = tx.hash;
      notifyHash(tx.hash);
      await waitForReceipt(tx);
      mutations.push("chose_faction");

      registry = await readRegistryState(args.walletAddress);
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

    notifyStep("reserve");

    const resolvedSlot = await resolvePersonalPlotSlot(args.walletAddress, {
      targetPlotId: args.plotId ?? null,
      preferredSlotIndex: args.slotIndex ?? null,
    });

    if (args.plotId != null && resolvedSlot.resolution !== "target") {
      return {
        ok: false,
        code: "plot_not_ready",
        step: "reserve",
        slotIndex: resolvedSlot.slotIndex,
        faction: registry.chosenFaction,
        message:
          "The selected build plot is not reserved by the connected wallet yet.",
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
          message: "This slot is not the next expected personal slot.",
        };
      }

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
        };
      }

      const reserveTx = await reserveNextPersonalPlot(slotState.slotIndex);
      latestTxHash = reserveTx.hash;
      notifyHash(reserveTx.hash);
      await waitForReceipt(reserveTx);
      mutations.push("reserved_plot");

      slotState = {
        ...(await readPersonalPlot(args.walletAddress, slotState.slotIndex)),
        resolution: "preferred",
      };
    }

    if (!slotState.plotId) {
      return {
        ok: false,
        code: "needs_personal_plot",
        step: "reserve",
        slotIndex: slotState.slotIndex,
        faction: registry.chosenFaction,
        message: "No personal plot found for this slot.",
      };
    }

    notifyStep("approve");

    const approved = await isResourceApprovedForCityLand(args.walletAddress);

    if (!approved) {
      const approvalTx = await approveResourcesForCityLand();
      latestTxHash = approvalTx.hash;
      notifyHash(approvalTx.hash);
      await waitForReceipt(approvalTx);
      mutations.push("approved_resources");
    }

    const fillable = await canFillQubiq(
      args.walletAddress,
      slotState.plotId,
      args.qubiqX,
      args.qubiqY
    ).catch(() => true);

    if (!fillable) {
      return {
        ok: false,
        code: "qubiq_not_fillable",
        step: "validate",
        plotId: slotState.plotId,
        slotIndex: slotState.slotIndex,
        faction: registry.chosenFaction,
        message:
          "The selected Qubiq cell cannot be filled by this wallet right now. It may already be completed or invalid.",
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
        message:
          error instanceof Error ? error.message : "Missing resource requirements.",
      };
    }

    notifyStep("contribute");

    const contributeTx = await contributeQubiq({
      plotId: slotState.plotId,
      x: args.qubiqX,
      y: args.qubiqY,
      oilAmount: required.oil,
      lemonsAmount: required.lemons,
      ironAmount: required.iron,
    });

    latestTxHash = contributeTx.hash;
    notifyHash(contributeTx.hash);
    await waitForReceipt(contributeTx);
    mutations.push("contributed_qubiq");

    notifyStep("refresh");

    const completion = await getPlotCompletionState(slotState.plotId);

    notifyStep("done");

    return {
      ok: true,
      code: "contribution_sent",
      step: "done",
      txHash: latestTxHash,
      plotId: slotState.plotId,
      slotIndex: slotState.slotIndex,
      faction: registry.chosenFaction,
      completion,
      message: describeMutations(mutations),
    };
  } catch (error) {
    notifyStep("error");

    const message =
      error instanceof Error ? error.message : "Unexpected Qubiq flow error.";

    return {
      ok: false,
      code: "unexpected_error",
      step: "error",
      message,
    };
  }
}

export async function getDefaultQubiqCoordinates(): Promise<{ x: number; y: number }> {
  return { x: 0, y: 0 };
}
