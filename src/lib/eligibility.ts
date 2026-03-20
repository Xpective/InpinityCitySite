import type { InfinityPlot } from "../types/infinity";
import type { ResourceEligibility } from "./resource-check";

export type WalletState = {
  isConnected: boolean;
  address?: string | null;
  chainId?: number | null;
};

export type PlotEligibility = {
  purchasable: boolean;
  reservable: boolean;
  requiresWallet: boolean;
  requiresResources: boolean;
  requiresCorrectChain: boolean;
  plotKindAllowed: boolean;
  statusAllowed: boolean;
  factionAllowed: boolean;
  reasons: string[];
  checks: Array<{
    key: string;
    label: string;
    passed: boolean;
  }>;
};

const BASE_CHAIN_ID = 8453;

export function getPlotEligibility(
  plot: InfinityPlot | null,
  wallet: WalletState,
  resourceEligibility?: ResourceEligibility | null
): PlotEligibility {
  if (!plot) {
    return {
      purchasable: false,
      reservable: false,
      requiresWallet: true,
      requiresResources: true,
      requiresCorrectChain: true,
      plotKindAllowed: false,
      statusAllowed: false,
      factionAllowed: false,
      reasons: ["No plot selected."],
      checks: [
        { key: "plot-selected", label: "Plot selected", passed: false },
        { key: "wallet", label: "Wallet connected", passed: wallet.isConnected },
        { key: "chain", label: "Correct chain (Base)", passed: wallet.chainId === BASE_CHAIN_ID },
        { key: "qubiq-resources", label: "Enough resources for next Qubiq", passed: false },
      ],
    };
  }

  const isPersonal = plot.policy.isPersonal;
  const isCommunity = plot.policy.isCommunity;
  const isBorderline = plot.policy.isBorderline;
  const isNexus = plot.policy.isNexus;

  const walletConnected = wallet.isConnected;
  const correctChain = wallet.chainId === BASE_CHAIN_ID;

  const plotKindAllowed = isPersonal && !isCommunity && !isBorderline && !isNexus;
  const statusAllowed = plot.status === "free";
  const factionAllowed = !plot.policy.sharedUse;
  const resourcesReady = resourceEligibility ? resourceEligibility.ready : false;

  const reasons: string[] = [];

  if (!walletConnected) {
    reasons.push("Wallet not connected.");
  }

  if (walletConnected && !correctChain) {
    reasons.push("Wallet is not connected to Base.");
  }

  if (isCommunity) {
    reasons.push("Community plots are reserved for shared infrastructure and cannot be privately completed.");
  }

  if (isBorderline) {
    reasons.push("Borderline plots are cooperative zones and cannot be privately completed.");
  }

  if (isNexus) {
    reasons.push("Nexus plots are central reserved plots and cannot be privately completed.");
  }

  if (!statusAllowed) {
    reasons.push(`This plot is not free. Current status: ${plot.status}.`);
  }

  if (!factionAllowed) {
    reasons.push("This plot belongs to a shared-use zone and is not available for personal contribution.");
  }

  if (!resourceEligibility) {
    reasons.push("Qubiq cost check not loaded yet.");
  } else if (!resourcesReady) {
    reasons.push("Not enough farming resources for the next Qubiq contribution.");
  }

  reasons.push("This panel currently checks the next Qubiq contribution, not the fully completed 5x5 plot.");
  reasons.push("Qubiq completion is visible for preview only and remains disabled in this phase.");

  const reservable =
    walletConnected &&
    correctChain &&
    plotKindAllowed &&
    statusAllowed &&
    factionAllowed &&
    resourcesReady;

  const purchasable = false;

  return {
    purchasable,
    reservable,
    requiresWallet: true,
    requiresResources: true,
    requiresCorrectChain: true,
    plotKindAllowed,
    statusAllowed,
    factionAllowed,
    reasons,
    checks: [
      { key: "plot-selected", label: "Plot selected", passed: true },
      { key: "wallet", label: "Wallet connected", passed: walletConnected },
      { key: "chain", label: "Correct chain (Base)", passed: correctChain },
      { key: "personal", label: "Personal 5x5 plot", passed: plotKindAllowed },
      { key: "free", label: "Plot is free", passed: statusAllowed },
      { key: "not-shared", label: "Not a shared-use zone", passed: factionAllowed },
      { key: "qubiq-resources", label: "Enough resources for next Qubiq", passed: resourcesReady },
      { key: "qubiq-live", label: "Qubiq completion live", passed: false },
    ],
  };
}