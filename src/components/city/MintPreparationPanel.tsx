import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { InfinityPlot } from "../../types/infinity";
import type { PlotEligibility, WalletState } from "../../lib/eligibility";
import type { ResourceEligibility } from "../../lib/resource-check";
import type {
  QubiqFlowResult,
  QubiqFlowStep,
} from "../../lib/city-qubiq-flow";
import type {
  PlotCompletionState,
  PlotQubiqMap,
  QubiqReadState,
} from "../../lib/city-land";
import type { CityKeyOption } from "../../lib/city-key";

type BuildPlotOption = { plotId: string; label: string };
type PlannedFaction = "inpinity" | "inphinity";

type Props = {
  plot: InfinityPlot | null;
  viewedPlot?: InfinityPlot | null;
  wallet: WalletState;
  eligibility: PlotEligibility;
  resourceEligibility?: ResourceEligibility | null;
  onConnectWallet: () => void;
  onPrepareContribution: () => void;
  flowBusy: boolean;
  flowStep: QubiqFlowStep;
  flowResult: QubiqFlowResult | null;
  selectedQubiqCell: { x: number; y: number };
  onSelectQubiqCell: (cell: { x: number; y: number }) => void;
  reservedPlotId?: string | null;
  txHash?: string | null;
  liveCompletion?: PlotCompletionState | null;
  liveQubiq?: QubiqReadState | null;
  liveAllQubiqs?: PlotQubiqMap;
  liveLoading?: boolean;
  liveError?: string | null;
  ownedCityKeys: CityKeyOption[];
  selectedCityKeyTokenId: string;
  onSelectCityKeyTokenId: (tokenId: string) => void;
  buildPlotOptions: BuildPlotOption[];
  activeBuildPlotId: string;
  onSelectActiveBuildPlotId: (plotId: string) => void;
  buildMode?: "next" | "existing";
  preferredFaction?: PlannedFaction | null;
  onSelectPreferredFaction: (faction: PlannedFaction) => void;
  showAdvanced?: boolean;
};

// ============================================================
// HELPERS
// ============================================================
function pretty(value: string): string {
  return value.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function shortAddress(address?: string | null): string {
  if (!address) return "—";
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function normalizeAddress(value?: string | null): string {
  return (value || "").trim().toLowerCase();
}

async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    document.body.removeChild(ta);
    return true;
  } catch {
    return false;
  }
}

// ============================================================
// STYLE HELPERS
// ============================================================
function cardStyle(): CSSProperties {
  return {
    display: "grid",
    gap: 10,
    padding: 14,
    borderRadius: 6,
    background: "rgba(8, 8, 16, 0.85)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-border, #333333)",
    fontFamily: "'Courier New', monospace",
  };
}

function cardHighlightStyle(): CSSProperties {
  return {
    ...cardStyle(),
    borderColor: "var(--color-primary, #ffcc00)",
    background: "rgba(255, 204, 0, 0.05)",
  };
}

function cardSuccessStyle(): CSSProperties {
  return {
    ...cardStyle(),
    borderColor: "var(--color-success, #00ff88)",
    background: "rgba(0, 255, 136, 0.05)",
  };
}

function cardDangerStyle(): CSSProperties {
  return {
    ...cardStyle(),
    borderColor: "var(--color-danger, #ff3333)",
    background: "rgba(255, 51, 51, 0.05)",
  };
}

function selectStyle(): CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: 4,
    background: "rgba(0, 0, 0, 0.6)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-border, #333333)",
    color: "var(--color-text, #e0e0e0)",
    width: "100%",
    fontFamily: "'Courier New', monospace",
    fontSize: "12px",
  };
}

function badgeStyle(kind: "ok" | "bad" | "neutral" | "gold"): CSSProperties {
  const map = {
    ok: {
      background: "rgba(0, 255, 136, 0.12)",
      border: "1px solid var(--color-success, #00ff88)",
      color: "var(--color-success, #00ff88)",
    },
    bad: {
      background: "rgba(255, 51, 51, 0.12)",
      border: "1px solid var(--color-danger, #ff3333)",
      color: "var(--color-danger, #ff3333)",
    },
    gold: {
      background: "rgba(255, 204, 0, 0.12)",
      border: "1px solid var(--color-primary, #ffcc00)",
      color: "var(--color-primary, #ffcc00)",
    },
    neutral: {
      background: "rgba(255, 255, 255, 0.06)",
      border: "1px solid var(--color-border, #333333)",
      color: "var(--color-text-dim, #888888)",
    },
  };
  return {
    ...map[kind],
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.5px",
  };
}

function factionButtonStyle(faction: PlannedFaction, active: boolean): CSSProperties {
  const isInpinity = faction === "inpinity";
  return {
    padding: "14px 16px",
    borderRadius: 6,
    border: isInpinity
      ? active
        ? "2px solid #4a7bff"
        : "1px solid rgba(82,136,255,0.5)"
      : active
      ? "2px solid #ff5858"
      : "1px solid rgba(255,95,95,0.5)",
    background: isInpinity
      ? active
        ? "linear-gradient(180deg, rgba(74,123,255,0.34), rgba(46,78,180,0.34))"
        : "rgba(74,123,255,0.14)"
      : active
      ? "linear-gradient(180deg, rgba(255,88,88,0.34), rgba(170,46,46,0.34))"
      : "rgba(255,88,88,0.14)",
    color: "#eef2ff",
    fontFamily: "'Courier New', monospace",
    fontWeight: 800,
    fontSize: "14px",
    letterSpacing: "2px",
    textAlign: "center",
    cursor: "pointer",
    minHeight: 52,
    boxShadow: active
      ? isInpinity
        ? "0 0 20px rgba(74,123,255,0.35)"
        : "0 0 20px rgba(255,88,88,0.35)"
      : "none",
    transition: "all 0.2s ease",
  };
}

// ============================================================
// FLOW HELPERS
// ============================================================
function getFlowLabel(step: QubiqFlowStep): string {
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

function getQubiqStateLabel(qubiq?: QubiqReadState | null): string {
  if (!qubiq) return "—";
  if (qubiq.visualState === "aether-complete") return "Aether Complete";
  if (qubiq.visualState === "complete") return "Complete";
  if (qubiq.visualState === "in-progress") return "In Progress";
  return "Empty";
}

function hasReservedPlotIdentity(flowResult: QubiqFlowResult | null, reservedPlotId?: string | null): boolean {
  return !!reservedPlotId || !!flowResult?.plotId;
}

function isStartedBuildPlot(plot: InfinityPlot | null, reservedPlotId?: string | null, walletAddress?: string | null): boolean {
  if (!plot) return false;
  if (reservedPlotId && plot.plotId === reservedPlotId) return true;
  if (plot.status !== "reserved" && plot.status !== "owned") return false;
  return !!walletAddress && !!plot.owner && normalizeAddress(plot.owner) === normalizeAddress(walletAddress);
}

function isForeignStartedPlot(plot: InfinityPlot | null, reservedPlotId?: string | null, walletAddress?: string | null): boolean {
  if (!plot) return false;
  if (plot.status !== "reserved" && plot.status !== "owned") return false;
  return !isStartedBuildPlot(plot, reservedPlotId, walletAddress);
}

function getPrimaryAction(props: {
  plot: InfinityPlot | null;
  wallet: WalletState;
  eligibility: PlotEligibility;
  flowBusy: boolean;
  flowResult: QubiqFlowResult | null;
  reservedPlotId?: string | null;
  selectedCityKeyTokenId: string;
  ownedCityKeys: CityKeyOption[];
  buildMode: "next" | "existing";
  preferredFaction?: PlannedFaction | null;
}): { label: string; helper: string; disabled: boolean; action: "connect" | "flow" | "none" } {
  const { plot, wallet, eligibility, flowBusy, flowResult, reservedPlotId, selectedCityKeyTokenId, ownedCityKeys, buildMode, preferredFaction } = props;
  const startedBuild = isStartedBuildPlot(plot, reservedPlotId, wallet.address);
  const foreignStarted = isForeignStartedPlot(plot, reservedPlotId, wallet.address);

  if (flowBusy) return { label: "Processing…", helper: "Transaction in progress. Please wait.", disabled: true, action: "none" };
  if (!plot) return { label: "Select a Plot", helper: "Choose a plot on the map to begin.", disabled: true, action: "none" };
  if (!wallet.isConnected) return { label: "Connect Wallet", helper: "Connect your wallet to start building.", disabled: false, action: "connect" };

  if (plot.policy.isCommunity) return { label: "Community Plot", helper: "Community plots are shared infrastructure and cannot be privately built yet.", disabled: true, action: "none" };
  if (plot.policy.isBorderline) return { label: "Borderline Plot", helper: "Borderline zones are cooperative and not privately buildable yet.", disabled: true, action: "none" };
  if (plot.policy.isNexus) return { label: "Nexus Plot", helper: "The Nexus is core infrastructure and cannot be privately built.", disabled: true, action: "none" };
  if (foreignStarted) return { label: "View Only", helper: "This plot is already being built by another wallet.", disabled: true, action: "none" };

  if (!eligibility.plotKindAllowed) return { label: "Not Allowed", helper: "Only personal 5×5 plots can enter the private Qubiq flow.", disabled: true, action: "none" };

  if (flowResult?.code === "faction_mismatch") return { label: "Faction Mismatch", helper: flowResult.message || "Your wallet is bound to another faction.", disabled: true, action: "none" };
  if (!eligibility.factionAllowed && wallet.chosenFaction && wallet.chosenFaction !== "none") return { label: "Faction Mismatch", helper: "Your wallet is already bound to the other faction.", disabled: true, action: "none" };

  if (flowResult?.code === "needs_city_key") {
    return {
      label: "Set City Key",
      helper: ownedCityKeys.length > 0 && selectedCityKeyTokenId
        ? `Use InpinityNFT #${selectedCityKeyTokenId} as your City Key.`
        : "Select an InpinityNFT as your City Key first.",
      disabled: ownedCityKeys.length === 0 || !selectedCityKeyTokenId,
      action: "flow",
    };
  }

  if (wallet.hasCityKey && (!wallet.chosenFaction || wallet.chosenFaction === "none")) {
    return {
      label: preferredFaction ? `Confirm ${pretty(preferredFaction)}` : "Choose Faction",
      helper: preferredFaction
        ? `Lock this wallet to ${pretty(preferredFaction)}. This is a one-time choice.`
        : "Pick a faction above. Blue = Inpinity · Red = Inphinity.",
      disabled: !preferredFaction,
      action: "flow",
    };
  }

  if (flowResult?.code === "needs_faction") {
    return {
      label: preferredFaction ? `Confirm ${pretty(preferredFaction)}` : "Choose Faction",
      helper: preferredFaction ? `Lock this wallet to ${pretty(preferredFaction)}.` : "Pick a faction above.",
      disabled: !preferredFaction,
      action: "flow",
    };
  }

  if (flowResult?.code === "needs_resource_approval") return { label: "Approve Resources", helper: "CityLand needs ERC1155 approval before Qubiq can be contributed.", disabled: false, action: "flow" };
  if (flowResult?.code === "approval_sent") return { label: "Contribute Qubiq", helper: "Approval done. Proceed with your first Qubiq contribution.", disabled: false, action: "flow" };
  if (flowResult?.code === "reservation_sent") return { label: "Contribute Qubiq", helper: "Plot reserved. Continue with your first Qubiq contribution.", disabled: false, action: "flow" };
  if (flowResult?.code === "contribution_sent") return { label: "Contribute Next Qubiq", helper: "Previous contribution succeeded. Build the next cell.", disabled: false, action: "flow" };

  if (startedBuild) return { label: "Continue Building", helper: "Your plot is already reserved. Continue contributing Qubiq cells.", disabled: false, action: "flow" };
  if (hasReservedPlotIdentity(flowResult, reservedPlotId)) return { label: "Contribute Qubiq", helper: "Contribute resources into the selected Qubiq cell.", disabled: false, action: "flow" };

  if (wallet.chosenFaction && wallet.chosenFaction !== "none") {
    return {
      label: buildMode === "next" ? "Reserve Next Plot" : "Reserve Plot",
      helper: "Reserve the next personal plot for this wallet.",
      disabled: false,
      action: "flow",
    };
  }

  if (!wallet.hasCityKey && ownedCityKeys.length > 0 && selectedCityKeyTokenId) {
    return { label: "Set City Key", helper: `Use InpinityNFT #${selectedCityKeyTokenId} as your City Key.`, disabled: false, action: "flow" };
  }

  return { label: "Set City Key", helper: "Select an InpinityNFT as your City Key first.", disabled: true, action: "none" };
}

// ============================================================
// CELL STYLE (mit Optimistic-State-Unterstützung)
// ============================================================
function getCellStyle(args: {
  selected: boolean;
  qubiq: QubiqReadState | null;
  optimistic?: boolean;
}): CSSProperties {
  const base: CSSProperties = {
    padding: "10px 0",
    borderRadius: 4,
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 700,
    fontFamily: "'Courier New', monospace",
    transition: "all 0.15s ease",
    outline: "none",
  };

  if (args.optimistic) {
    return {
      ...base,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "var(--color-info, #00e5ff)",
      background: "rgba(0, 229, 255, 0.18)",
      color: "#e0faff",
      animation: "ip-pulse 1.2s ease-in-out infinite",
      cursor: "wait",
    };
  }

  if (args.selected) {
    return {
      ...base,
      borderWidth: 2,
      borderStyle: "solid",
      borderColor: "var(--color-primary, #ffcc00)",
      background: "rgba(255, 204, 0, 0.28)",
      color: "#fff",
      boxShadow: "0 0 12px rgba(255,204,0,0.4)",
    };
  }

  if (args.qubiq?.visualState === "aether-complete") {
    return {
      ...base,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgba(255, 215, 0, 0.7)",
      background: "rgba(255, 215, 0, 0.22)",
      color: "#ffeeb0",
    };
  }

  if (args.qubiq?.usedAether || args.qubiq?.completed || args.qubiq?.visualState === "complete") {
    return {
      ...base,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "var(--color-success, #00ff88)",
      background: "rgba(0, 255, 136, 0.18)",
      color: "#cfffbe",
    };
  }

  if (args.qubiq?.visualState === "in-progress") {
    return {
      ...base,
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgba(120, 160, 255, 0.6)",
      background: "rgba(120, 160, 255, 0.14)",
      color: "#d8e3ff",
    };
  }

  return {
    ...base,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-border, #333333)",
    background: "rgba(255, 255, 255, 0.04)",
    color: "var(--color-text, #e0e0e0)",
  };
}

function getCellText(qubiq: QubiqReadState | null, x: number, y: number): string {
  if (qubiq?.visualState === "aether-complete") return "✦";
  if (qubiq?.usedAether || qubiq?.completed || qubiq?.visualState === "complete") return "✓";
  if (qubiq?.visualState === "in-progress") return "•";
  return `${x},${y}`;
}

// ============================================================
// COLLAPSIBLE
// ============================================================
function CollapsibleSection({ title, defaultOpen = false, children }: { title: string; defaultOpen?: boolean; children: ReactNode }) {
  return (
    <details className="detailSection" open={defaultOpen}>
      <summary className="detailSectionSummary">{title}</summary>
      <div style={{ marginTop: 12 }}>{children}</div>
    </details>
  );
}

// ============================================================
// PROGRESS STEPS BAR
// ============================================================
function ProgressStepsBar(props: {
  hasWallet: boolean;
  hasCityKey: boolean | null;
  hasFaction: boolean;
  hasPlot: boolean;
  hasApproval: boolean;
  hasQubiq: boolean;
}) {
  const { hasWallet, hasCityKey, hasFaction, hasPlot, hasApproval, hasQubiq } = props;
  const steps = [
    { label: "Wallet", done: hasWallet },
    { label: "Key", done: hasCityKey === true },
    { label: "Faction", done: hasFaction },
    { label: "Plot", done: hasPlot },
    { label: "Approve", done: hasApproval },
    { label: "Qubiq", done: hasQubiq },
  ];
  return (
    <div style={{ display: "flex", gap: 4, marginBottom: 14, flexWrap: "wrap" }}>
      {steps.map((step, i) => (
        <div
          key={step.label}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "4px 8px",
            borderRadius: 999,
            fontSize: "9px",
            letterSpacing: "1px",
            fontWeight: "bold",
            fontFamily: "'Courier New', monospace",
            background: step.done ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.04)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: step.done ? "var(--color-success, #00ff88)" : "var(--color-border, #333)",
            color: step.done ? "var(--color-success, #00ff88)" : "var(--color-text-dim, #888)",
          }}
        >
          {step.done ? "✓" : i + 1} {step.label}
        </div>
      ))}
    </div>
  );
}

// ============================================================
// 💎 IDEE 3: LIVE COST PREVIEW
// ============================================================
function CostPreview(props: {
  selectedCell: { x: number; y: number };
  liveQubiq: QubiqReadState | null;
  resourceEligibility?: ResourceEligibility | null;
}) {
  const { selectedCell, liveQubiq, resourceEligibility } = props;

  if (liveQubiq?.visualState === "complete" || liveQubiq?.visualState === "aether-complete") {
    return (
      <div
        style={{
          padding: 8,
          background: "rgba(0,255,136,0.08)",
          borderLeftWidth: 3,
          borderLeftStyle: "solid",
          borderLeftColor: "var(--color-success, #00ff88)",
          borderRadius: 4,
          fontSize: 11,
          color: "var(--color-success, #00ff88)",
          fontFamily: "'Courier New', monospace",
        }}
      >
        ✓ Cell ({selectedCell.x}, {selectedCell.y}) already complete
      </div>
    );
  }

  const oilNeeded = liveQubiq?.oilRemaining ?? resourceEligibility?.required.oil ?? 0n;
  const lemonsNeeded = liveQubiq?.lemonsRemaining ?? resourceEligibility?.required.lemons ?? 0n;
  const ironNeeded = liveQubiq?.ironRemaining ?? resourceEligibility?.required.iron ?? 0n;

  const oilAvail = resourceEligibility?.balances.oil ?? 0n;
  const lemonsAvail = resourceEligibility?.balances.lemons ?? 0n;
  const ironAvail = resourceEligibility?.balances.iron ?? 0n;

  const oilOk = oilAvail >= oilNeeded;
  const lemonsOk = lemonsAvail >= lemonsNeeded;
  const ironOk = ironAvail >= ironNeeded;
  const allOk = oilOk && lemonsOk && ironOk;

  const ResourceRow = ({ label, needed, avail, ok }: { label: string; needed: bigint; avail: bigint; ok: boolean }) => (
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "2px 0" }}>
      <span style={{ color: "var(--color-text-dim, #888)" }}>{label}</span>
      <span style={{ color: ok ? "var(--color-success, #00ff88)" : "var(--color-danger, #ff3333)", fontWeight: "bold" }}>
        {ok ? "✓" : "✗"} {needed.toString()} / {avail.toString()}
      </span>
    </div>
  );

  return (
    <div
      style={{
        padding: 10,
        background: allOk ? "rgba(0,255,136,0.05)" : "rgba(255,136,0,0.05)",
        borderLeftWidth: 3,
        borderLeftStyle: "solid",
        borderLeftColor: allOk ? "var(--color-success, #00ff88)" : "var(--color-warning, #ff8800)",
        borderRadius: 4,
        fontFamily: "'Courier New', monospace",
      }}
    >
      <div style={{ fontSize: 10, color: "var(--color-text-dim, #888)", letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
        💰 Cost for cell ({selectedCell.x}, {selectedCell.y})
      </div>
      <ResourceRow label="Oil" needed={oilNeeded} avail={oilAvail} ok={oilOk} />
      <ResourceRow label="Lemons" needed={lemonsNeeded} avail={lemonsAvail} ok={lemonsOk} />
      <ResourceRow label="Iron" needed={ironNeeded} avail={ironAvail} ok={ironOk} />
      {!allOk && (
        <div style={{ marginTop: 4, fontSize: 10, color: "var(--color-warning, #ff8800)" }}>
          ⚠ Insufficient resources — acquire more before contributing
        </div>
      )}
    </div>
  );
}

// ============================================================
// 💎 IDEE 4: QUICK ACTIONS BAR
// ============================================================
function QuickActionsBar(props: {
  plot: InfinityPlot | null;
  walletAddress?: string | null;
  selectedCityKeyTokenId?: string;
  effectivePlotId?: string;
}) {
  const { plot, walletAddress, selectedCityKeyTokenId, effectivePlotId } = props;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = useCallback(async (label: string, text: string) => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopiedKey(label);
      setTimeout(() => setCopiedKey(null), 1500);
    }
  }, []);

  const actions = [
    effectivePlotId && effectivePlotId !== "—" && effectivePlotId !== "next slot"
      ? { icon: "🏙", label: "Plot ID", value: effectivePlotId }
      : null,
    selectedCityKeyTokenId
      ? { icon: "🗝", label: "City Key", value: `#${selectedCityKeyTokenId}` }
      : null,
    walletAddress
      ? { icon: "👤", label: "Wallet", value: walletAddress }
      : null,
  ].filter(Boolean) as Array<{ icon: string; label: string; value: string }>;

  if (actions.length === 0) return null;

  return (
    <div
      style={{
        display: "flex",
        gap: 6,
        flexWrap: "wrap",
        marginBottom: 8,
        padding: 6,
        background: "rgba(255,255,255,0.02)",
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "var(--color-border-soft, #1a1a1a)",
      }}
    >
      {actions.map((action) => (
        <button
          key={action.label}
          onClick={() => handleCopy(action.label, action.value)}
          title={`Copy ${action.label}: ${action.value}`}
          style={{
            padding: "3px 8px",
            background: copiedKey === action.label ? "rgba(0,255,136,0.15)" : "rgba(255,255,255,0.05)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: copiedKey === action.label ? "var(--color-success, #00ff88)" : "var(--color-border, #333)",
            borderRadius: 999,
            fontSize: 10,
            color: copiedKey === action.label ? "var(--color-success, #00ff88)" : "var(--color-text-dim, #888)",
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            letterSpacing: 0.5,
            cursor: "pointer",
            transition: "all 0.15s ease",
          }}
          aria-label={`Copy ${action.label}`}
        >
          {copiedKey === action.label ? "✓" : action.icon} {action.label}
        </button>
      ))}
      {plot?.plotId && (
        <a
          href={`https://basescan.org/token/0x0547a35c2Ff215004A2EBfe2Be5f3A8EeE6A5323?a=${plot.plotId}`}
          target="_blank"
          rel="noopener noreferrer"
          title="View on BaseScan"
          style={{
            padding: "3px 8px",
            background: "rgba(0,229,255,0.08)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: "var(--color-info, #00e5ff)",
            borderRadius: 999,
            fontSize: 10,
            color: "var(--color-info, #00e5ff)",
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            letterSpacing: 0.5,
            textDecoration: "none",
          }}
        >
          ↗ BaseScan
        </a>
      )}
    </div>
  );
}

// ============================================================
// 💎 IDEE 1: QUBIQ GRID mit Keyboard Navigation
// ============================================================
function QubiqGrid(props: {
  selectedQubiqCell: { x: number; y: number };
  onSelectQubiqCell: (cell: { x: number; y: number }) => void;
  liveAllQubiqs?: PlotQubiqMap;
  flowBusy: boolean;
}) {
  const { selectedQubiqCell, onSelectQubiqCell, liveAllQubiqs, flowBusy } = props;
  const [focusedIdx, setFocusedIdx] = useState<number>(() => {
    return selectedQubiqCell.y * 5 + selectedQubiqCell.x;
  });
  const gridRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIdx = focusedIdx;
      if (e.key === "ArrowRight") nextIdx = focusedIdx + 1;
      else if (e.key === "ArrowLeft") nextIdx = focusedIdx - 1;
      else if (e.key === "ArrowDown") nextIdx = focusedIdx + 5;
      else if (e.key === "ArrowUp") nextIdx = focusedIdx - 5;
      else if (e.key === "Home") nextIdx = 0;
      else if (e.key === "End") nextIdx = 24;
      else if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const x = focusedIdx % 5;
        const y = Math.floor(focusedIdx / 5);
        onSelectQubiqCell({ x, y });
        return;
      } else {
        return;
      }

      e.preventDefault();
      nextIdx = Math.max(0, Math.min(24, nextIdx));
      setFocusedIdx(nextIdx);

      // Nur fokussieren, nicht selektieren (Enter/Space wird oben behandelt)
      const btn = gridRef.current?.querySelectorAll("button")[nextIdx] as HTMLButtonElement | null;
      btn?.focus();
    },
    [focusedIdx, onSelectQubiqCell]
  );

  return (
    <div
      ref={gridRef}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: 6,
        marginTop: 6,
      }}
      onKeyDown={handleKeyDown}
      role="grid"
      aria-label="Qubiq 5×5 cell grid"
    >
      {Array.from({ length: 25 }).map((_, index) => {
        const x = index % 5;
        const y = Math.floor(index / 5);
        const selected = selectedQubiqCell.x === x && selectedQubiqCell.y === y;
        const key = `${x},${y}`;
        const qubiq = liveAllQubiqs?.[key] ?? null;

        const isOptimistic =
          flowBusy && selected && !(qubiq?.completed || qubiq?.usedAether);

        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelectQubiqCell({ x, y })}
            onFocus={() => setFocusedIdx(index)}
            tabIndex={selected ? 0 : -1}
            style={getCellStyle({ selected, qubiq, optimistic: isOptimistic })}
            title={`Cell (${x}, ${y})${qubiq ? ` · ${getQubiqStateLabel(qubiq)}` : ""}`}
            aria-label={`Select Qubiq cell ${x}, ${y}${selected ? " (currently selected)" : ""}`}
            aria-pressed={selected}
            disabled={flowBusy}
          >
            {getCellText(qubiq, x, y)}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function MintPreparationPanel({
  plot,
  viewedPlot = null,
  wallet,
  eligibility,
  resourceEligibility,
  onConnectWallet,
  onPrepareContribution,
  flowBusy,
  flowStep,
  flowResult,
  selectedQubiqCell,
  onSelectQubiqCell,
  reservedPlotId,
  txHash,
  liveCompletion,
  liveQubiq,
  liveAllQubiqs,
  liveLoading = false,
  liveError = null,
  ownedCityKeys,
  selectedCityKeyTokenId,
  onSelectCityKeyTokenId,
  buildPlotOptions,
  activeBuildPlotId,
  onSelectActiveBuildPlotId,
  buildMode = "existing",
  preferredFaction = null,
  onSelectPreferredFaction,
  showAdvanced = false,
}: Props) {
  const [showSetupDetails, setShowSetupDetails] = useState(showAdvanced);

  const targetQubiqs = 25;
  const currentQubiqs = liveCompletion?.completedQubiqs ?? plot?.qubiqProgress?.completed ?? 0;
  const remainingQubiqs = Math.max(0, targetQubiqs - currentQubiqs);
  const progressPercent = liveCompletion?.completionPercent ?? Math.round((currentQubiqs / targetQubiqs) * 100);

  const effectivePlotId = buildMode === "existing"
    ? activeBuildPlotId || reservedPlotId || plot?.plotId || "—"
    : "next slot";

  const flowBadgeKind = flowStep === "done" ? "ok" : flowStep === "error" ? "bad" : "neutral";

  const primaryAction = getPrimaryAction({
    plot, wallet, eligibility, flowBusy, flowResult, reservedPlotId,
    selectedCityKeyTokenId, ownedCityKeys, buildMode, preferredFaction,
  });

  const primaryOnClick = primaryAction.action === "connect"
    ? onConnectWallet
    : primaryAction.action === "flow"
    ? onPrepareContribution
    : undefined;

  const importantReasons = eligibility.reasons.slice(0, 2);
  const viewingDifferentPlot = !!viewedPlot && !!plot && viewedPlot.id !== plot.id;
  const buildModeLabel = buildMode === "existing" ? "Existing active plot" : "Next personal plot";

  const setupFactionLocked = wallet.chosenFaction === "inpinity" || wallet.chosenFaction === "inphinity";
  const showCityKeySetup = wallet.hasCityKey === false;
  const showFactionSetup = wallet.hasCityKey === true && !setupFactionLocked;

  const hasApproval = flowResult?.code === "approval_sent" || flowResult?.code === "contribution_sent" || !!liveCompletion;
  const hasQubiq = (liveCompletion?.completedQubiqs ?? 0) > 0;

  // 💎 IDEE 2: Auto-Advance zur nächsten leeren Zelle
  const lastAutoAdvanceRef = useRef<string | null>(null);
  useEffect(() => {
    if (flowResult?.code !== "contribution_sent") return;
    if (!liveAllQubiqs) return;

    const resultKey = `${txHash ?? "no-tx"}-${selectedQubiqCell.x}-${selectedQubiqCell.y}`;
    if (lastAutoAdvanceRef.current === resultKey) return;
    lastAutoAdvanceRef.current = resultKey;

    const cells: Array<{ x: number; y: number; idx: number }> = [];
    for (let idx = 0; idx < 25; idx++) {
      const x = idx % 5;
      const y = Math.floor(idx / 5);
      const key = `${x},${y}`;
      const q = liveAllQubiqs[key];
      const isEmpty = !q || (q.visualState !== "complete" && q.visualState !== "aether-complete");
      if (isEmpty) cells.push({ x, y, idx });
    }

    const currentIdx = selectedQubiqCell.y * 5 + selectedQubiqCell.x;
    const nextCell =
      cells.find((c) => c.idx > currentIdx) ??
      cells[0];

    if (nextCell) {
      const t = setTimeout(() => {
        onSelectQubiqCell({ x: nextCell.x, y: nextCell.y });
      }, 800);
      return () => clearTimeout(t);
    }
  }, [flowResult?.code, liveAllQubiqs, selectedQubiqCell, onSelectQubiqCell, txHash]);

  return (
    <section className="panel">
      <h2>⚡ Qubiq Build Terminal</h2>

      <ProgressStepsBar
        hasWallet={wallet.isConnected}
        hasCityKey={wallet.hasCityKey ?? null}
        hasFaction={setupFactionLocked}
        hasPlot={!!plot && isStartedBuildPlot(plot, reservedPlotId, wallet.address)}
        hasApproval={hasApproval}
        hasQubiq={hasQubiq}
      />

      <QuickActionsBar
        plot={plot}
        walletAddress={wallet.address}
        selectedCityKeyTokenId={selectedCityKeyTokenId}
        effectivePlotId={effectivePlotId}
      />

      <div className="terminalStack">
        {/* 1. CURRENT ACTION */}
        <div style={primaryAction.action === "connect" ? cardHighlightStyle() : cardStyle()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 6 }}>
            <strong style={{ color: "var(--color-primary, #ffcc00)", letterSpacing: "1px", fontSize: "11px" }}>
              CURRENT ACTION
            </strong>
            <span style={badgeStyle(flowBadgeKind)}>{getFlowLabel(flowStep)}</span>
          </div>

          <div style={{ fontSize: "16px", fontWeight: "bold", color: "var(--color-primary, #ffcc00)", letterSpacing: "1px" }}>
            {primaryAction.label}
          </div>
          <div style={{ color: "var(--color-text-dim, #888)", fontSize: "12px", lineHeight: 1.5 }}>
            {primaryAction.helper}
          </div>

          {importantReasons.length > 0 && (
            <div style={{ borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: "var(--color-warning, #ff8800)", paddingLeft: 10, fontSize: "11px", color: "var(--color-text-dim, #888)" }}>
              {importantReasons.map((reason, i) => (
                <div key={`${reason}-${i}`}>• {reason}</div>
              ))}
            </div>
          )}

          <button
            className="ip-btn"
            disabled={primaryAction.disabled || flowBusy}
            onClick={primaryOnClick}
            style={{
              width: "100%",
              padding: "14px 20px",
              fontSize: "13px",
              letterSpacing: "2px",
              marginTop: 4,
            }}
          >
            {flowBusy ? "⏳ Processing…" : primaryAction.label} →
          </button>

          {flowResult && (
            <div
              style={{
                padding: 10,
                borderRadius: 4,
                background: flowResult.ok ? "rgba(0,255,136,0.08)" : "rgba(255,51,51,0.08)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: flowResult.ok ? "var(--color-success)" : "var(--color-danger)",
                fontSize: "11px",
              }}
            >
              <div>
                <strong style={{ color: flowResult.ok ? "var(--color-success)" : "var(--color-danger)" }}>
                  {flowResult.ok ? "✓ Success" : "✗ Error"}:
                </strong>{" "}
                {flowResult.code}
              </div>
              <div style={{ marginTop: 4, color: "var(--color-text-dim)" }}>{flowResult.message}</div>
              {showAdvanced && txHash && (
                <div style={{ marginTop: 6, fontSize: "9px", opacity: 0.6, wordBreak: "break-all" }}>
                  TX: {txHash}
                </div>
              )}
            </div>
          )}
        </div>

        {/* 2. FACTION SETUP */}
        {showFactionSetup && (
          <div style={cardHighlightStyle()}>
            <strong style={{ color: "var(--color-primary, #ffcc00)", letterSpacing: "1px", fontSize: "11px" }}>
              ⚔️ CHOOSE YOUR FACTION (one-time)
            </strong>
            <div style={{ color: "var(--color-text-dim)", fontSize: "12px" }}>
              Your wallet will be permanently bound to one side of the ∞ city.
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
              <button
                type="button"
                style={factionButtonStyle("inpinity", preferredFaction === "inpinity")}
                onClick={() => onSelectPreferredFaction("inpinity")}
              >
                ⚔ INPINITY
                <div style={{ fontSize: "9px", opacity: 0.7, marginTop: 2 }}>BLUE SIDE</div>
              </button>

              <button
                type="button"
                style={factionButtonStyle("inphinity", preferredFaction === "inphinity")}
                onClick={() => onSelectPreferredFaction("inphinity")}
              >
                ⚔ INPHINITY
                <div style={{ fontSize: "9px", opacity: 0.7, marginTop: 2 }}>RED SIDE</div>
              </button>
            </div>

            <div style={{ fontSize: "11px", color: "var(--color-text-dim)" }}>
              {preferredFaction
                ? `Selected: ${pretty(preferredFaction)}. Press "${primaryAction.label}" to lock it.`
                : "Pick a faction above to continue."}
            </div>
          </div>
        )}

        {setupFactionLocked && (
          <div style={cardSuccessStyle()}>
            <strong style={{ color: "var(--color-success)", letterSpacing: "1px", fontSize: "11px" }}>
              ✓ FACTION LOCKED
            </strong>
            <div style={{ fontSize: "13px", color: "var(--color-text)" }}>
              You are <strong>{pretty(wallet.chosenFaction || "—")}</strong>. No need to repeat this step.
            </div>
          </div>
        )}

        {/* 3. CITY KEY SETUP */}
        {showCityKeySetup && (
          <div style={cardDangerStyle()}>
            <strong style={{ color: "var(--color-danger)", letterSpacing: "1px", fontSize: "11px" }}>
              🔑 CITY KEY REQUIRED
            </strong>
            <div style={{ fontSize: "12px", color: "var(--color-text)" }}>
              {ownedCityKeys.length > 0
                ? "Select one of your InpinityNFTs to use as your City Key."
                : "You need at least one InpinityNFT to enter the city. Mint one first."}
            </div>

            {ownedCityKeys.length > 0 && (
              <label style={{ display: "grid", gap: 6 }}>
                <span style={{ fontSize: "10px", color: "var(--color-text-dim)", letterSpacing: "1px" }}>
                  SELECT CITY KEY TOKEN
                </span>
                <select
                  value={selectedCityKeyTokenId}
                  onChange={(e) => onSelectCityKeyTokenId(e.target.value)}
                  style={selectStyle()}
                >
                  {ownedCityKeys.map((item) => (
                    <option key={item.tokenId} value={item.tokenId} style={{ color: "black" }}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
            )}
          </div>
        )}

        {/* 4. BUILD TARGET */}
        <div style={cardStyle()}>
          <strong style={{ color: "var(--color-primary, #ffcc00)", letterSpacing: "1px", fontSize: "11px" }}>
            🏙 BUILD TARGET
          </strong>

          <div className="info-row" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--color-border-soft)", paddingBottom: 6 }}>
            <span style={{ color: "var(--color-text-dim)" }}>Mode</span>
            <strong>{buildModeLabel}</strong>
          </div>
          <div className="info-row" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--color-border-soft)", paddingBottom: 6 }}>
            <span style={{ color: "var(--color-text-dim)" }}>Target</span>
            <strong>{plot?.label || "—"}</strong>
          </div>
          <div className="info-row" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--color-border-soft)", paddingBottom: 6 }}>
            <span style={{ color: "var(--color-text-dim)" }}>On-chain ID</span>
            <strong style={{ color: "var(--color-info, #00e5ff)" }}>{effectivePlotId}</strong>
          </div>
          {plot && (
            <>
              <div className="info-row" style={{ borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "var(--color-border-soft)", paddingBottom: 6 }}>
                <span style={{ color: "var(--color-text-dim)" }}>Faction</span>
                <strong style={{
                  color: plot.faction === "inpinity" ? "#4a7bff" : plot.faction === "inphinity" ? "#ff5858" : "var(--color-text-dim)"
                }}>
                  {pretty(plot.faction)}
                </strong>
              </div>
              <div className="info-row">
                <span style={{ color: "var(--color-text-dim)" }}>Side</span>
                <strong>{pretty(plot.side)}</strong>
              </div>
            </>
          )}

          {viewingDifferentPlot && (
            <div style={{ borderLeftWidth: 3, borderLeftStyle: "solid", borderLeftColor: "var(--color-info)", paddingLeft: 10, fontSize: "11px", color: "var(--color-info)" }}>
              Viewing <strong>{viewedPlot?.label}</strong> · Terminal follows <strong>{plot?.label}</strong>
            </div>
          )}

          {buildPlotOptions.length > 0 && (
            <label style={{ display: "grid", gap: 6 }}>
              <span style={{ fontSize: "10px", color: "var(--color-text-dim)", letterSpacing: "1px" }}>
                SWITCH BUILD TARGET
              </span>
              <select
                value={activeBuildPlotId}
                onChange={(e) => onSelectActiveBuildPlotId(e.target.value)}
                style={selectStyle()}
              >
                {buildPlotOptions.map((item) => (
                  <option key={item.plotId} value={item.plotId} style={{ color: "black" }}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          )}
        </div>

        {/* 5. QUBIQ PROGRESS + GRID */}
        <div style={cardStyle()}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <strong style={{ color: "var(--color-primary, #ffcc00)", letterSpacing: "1px", fontSize: "11px" }}>
              ⚡ QUBIQ PROGRESS
            </strong>
            <span style={{
              fontSize: "16px",
              fontWeight: "bold",
              color: progressPercent >= 100 ? "var(--color-success)" : "var(--color-primary)",
            }}>
              {currentQubiqs} / {targetQubiqs}
            </span>
          </div>

          <div className="ip-progress" style={{ height: 8 }}>
            <div
              className="ip-progress__fill"
              style={{
                width: `${progressPercent}%`,
                background: progressPercent >= 100
                  ? "linear-gradient(90deg, var(--color-success), var(--color-success-dim))"
                  : "linear-gradient(90deg, var(--color-primary), var(--color-primary-dim))",
              }}
            />
          </div>
          <div style={{ fontSize: "11px", color: "var(--color-text-dim)" }}>
            {progressPercent}% complete · {remainingQubiqs} cell{remainingQubiqs !== 1 ? "s" : ""} remaining
          </div>

          <QubiqGrid
            selectedQubiqCell={selectedQubiqCell}
            onSelectQubiqCell={onSelectQubiqCell}
            liveAllQubiqs={liveAllQubiqs}
            flowBusy={flowBusy}
          />

          <div style={{
            display: "flex", gap: 12, flexWrap: "wrap",
            fontSize: "10px", color: "var(--color-text-dim)",
          }}>
            <span><span style={{ color: "var(--color-success)" }}>✓</span> Complete</span>
            <span><span style={{ color: "#ffeeb0" }}>✦</span> Aether</span>
            <span><span style={{ color: "#d8e3ff" }}>•</span> In progress</span>
            <span><span style={{ color: "var(--color-text-dim)" }}>·</span> Empty</span>
            <span style={{ marginLeft: "auto", opacity: 0.6 }}>⌨ ↑↓←→ navigate · Enter select</span>
          </div>

          {/* 💎 FIX: liveQubiq ?? null */}
          <CostPreview
            selectedCell={selectedQubiqCell}
            liveQubiq={liveQubiq ?? null}
            resourceEligibility={resourceEligibility}
          />

          {liveLoading && (
            <div style={{ fontSize: "11px", color: "var(--color-info)" }}>⏳ Loading live data…</div>
          )}
          {liveError && (
            <div style={{ fontSize: "11px", color: "var(--color-danger)" }}>⚠ {liveError}</div>
          )}
        </div>

        {/* 6. SETUP DETAILS */}
        <CollapsibleSection
          title="⚙ Setup & wallet details"
          defaultOpen={showSetupDetails}
        >
          <div style={cardStyle()}>
            <strong>Identity</strong>
            <div className="info-row">
              <span>Wallet</span>
              <strong>{wallet.isConnected ? shortAddress(wallet.address) : "Not connected"}</strong>
            </div>
            <div className="info-row">
              <span>Chain</span>
              <strong>{wallet.chainId ?? "—"}</strong>
            </div>
            <div className="info-row">
              <span>Faction</span>
              <strong>{wallet.chosenFaction && wallet.chosenFaction !== "none" ? pretty(wallet.chosenFaction) : "Not chosen"}</strong>
            </div>
            <div className="info-row">
              <span>City Key</span>
              <strong>{wallet.hasCityKey == null ? "Unknown" : wallet.hasCityKey ? "Set" : "Not set"}</strong>
            </div>
          </div>

          {eligibility.checks.length > 0 && (
            <>
              <div style={{ height: 10 }} />
              <div style={cardStyle()}>
                <strong>Eligibility Checks</strong>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {eligibility.checks.map((check) => (
                    <span key={check.key} style={badgeStyle(check.passed ? "ok" : "bad")}>
                      {check.passed ? "✓" : "✗"} {check.label}
                    </span>
                  ))}
                </div>
              </div>
            </>
          )}

          {showAdvanced && ownedCityKeys.length > 0 && wallet.hasCityKey === true && (
            <>
              <div style={{ height: 10 }} />
              <div style={cardStyle()}>
                <strong>Switch City Key (advanced)</strong>
                <select
                  value={selectedCityKeyTokenId}
                  onChange={(e) => onSelectCityKeyTokenId(e.target.value)}
                  style={selectStyle()}
                >
                  {ownedCityKeys.map((item) => (
                    <option key={item.tokenId} value={item.tokenId} style={{ color: "black" }}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}
        </CollapsibleSection>

        {/* 7. LIVE READOUTS */}
        <CollapsibleSection title="📡 Live readouts" defaultOpen={showAdvanced}>
          <div style={cardStyle()}>
            <strong>Selected Cell (live)</strong>
            {liveLoading && <div style={{ fontSize: "11px", color: "var(--color-info)" }}>Loading…</div>}
            {!liveLoading && !liveError && (
              <>
                <div className="info-row"><span>Cell</span><strong>({selectedQubiqCell.x}, {selectedQubiqCell.y})</strong></div>
                <div className="info-row"><span>State</span><strong>{getQubiqStateLabel(liveQubiq)}</strong></div>
                <div className="info-row"><span>Completion</span><strong>{liveQubiq ? `${liveQubiq.completionPercent}%` : "—"}</strong></div>
                <div className="info-row"><span>Oil</span><strong>{liveQubiq ? `${liveQubiq.oilDeposited.toString()}/${liveQubiq.oilRequired.toString()}` : "—"}</strong></div>
                <div className="info-row"><span>Lemons</span><strong>{liveQubiq ? `${liveQubiq.lemonsDeposited.toString()}/${liveQubiq.lemonsRequired.toString()}` : "—"}</strong></div>
                <div className="info-row"><span>Iron</span><strong>{liveQubiq ? `${liveQubiq.ironDeposited.toString()}/${liveQubiq.ironRequired.toString()}` : "—"}</strong></div>
                <div className="info-row"><span>Last Contributor</span><strong>{liveQubiq ? shortAddress(liveQubiq.lastContributor) : "—"}</strong></div>
              </>
            )}
          </div>

          <div style={{ height: 10 }} />
          <div style={cardStyle()}>
            <strong>Wallet Resources vs Required</strong>
            <div className="info-row">
              <span>Oil</span>
              <strong>{resourceEligibility ? `${resourceEligibility.balances.oil.toString()} / ${resourceEligibility.required.oil.toString()}` : "—"}</strong>
            </div>
            <div className="info-row">
              <span>Lemons</span>
              <strong>{resourceEligibility ? `${resourceEligibility.balances.lemons.toString()} / ${resourceEligibility.required.lemons.toString()}` : "—"}</strong>
            </div>
            <div className="info-row">
              <span>Iron</span>
              <strong>{resourceEligibility ? `${resourceEligibility.balances.iron.toString()} / ${resourceEligibility.required.iron.toString()}` : "—"}</strong>
            </div>
            {resourceEligibility && !resourceEligibility.ready && (
              <div style={{ marginTop: 6, fontSize: "11px", color: "var(--color-warning)" }}>
                ⚠ Missing: Oil {resourceEligibility.missing.oil.toString()} · Lemons {resourceEligibility.missing.lemons.toString()} · Iron {resourceEligibility.missing.iron.toString()}
              </div>
            )}
          </div>
        </CollapsibleSection>

        {/* 8. RESET */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            className="ip-btn ip-btn--ghost"
            disabled={flowBusy || !plot}
            onClick={() => onSelectQubiqCell({ x: 0, y: 0 })}
            style={{ flex: 1, fontSize: "11px" }}
          >
            🔄 Reset Cell to (0,0)
          </button>
          <button
            className="ip-btn ip-btn--ghost"
            onClick={() => setShowSetupDetails((v) => !v)}
            style={{ flex: 1, fontSize: "11px" }}
          >
            {showSetupDetails ? "🔒 Hide Setup" : "⚙ Show Setup"}
          </button>
        </div>
      </div>
    </section>
  );
}