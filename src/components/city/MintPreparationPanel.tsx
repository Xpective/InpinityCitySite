import type { CSSProperties } from "react";
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

type BuildPlotOption = {
  plotId: string;
  label: string;
};

type Props = {
  plot: InfinityPlot | null;
  wallet: WalletState;
  eligibility: PlotEligibility;
  resourceEligibility?: ResourceEligibility | null;
  onConnectWallet: () => void;

  onPrepareContribution: () => void;
  flowBusy: boolean;
  flowStep: QubiqFlowStep;
  flowResult: QubiqFlowResult | null;

  selectedQubiqCell: {
    x: number;
    y: number;
  };
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
};

function pretty(value: string): string {
  return value.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
}

function shortAddress(address?: string | null): string {
  if (!address) return "—";
  if (address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function badgeStyle(kind: "ok" | "bad" | "neutral"): CSSProperties {
  if (kind === "ok") {
    return {
      background: "rgba(89,255,43,0.14)",
      border: "1px solid rgba(89,255,43,0.35)",
      color: "#9aff84",
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
    };
  }

  if (kind === "bad") {
    return {
      background: "rgba(255,90,90,0.14)",
      border: "1px solid rgba(255,90,90,0.35)",
      color: "#ff9d9d",
      padding: "6px 10px",
      borderRadius: 999,
      fontSize: 12,
      fontWeight: 700,
    };
  }

  return {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "#d7dbe3",
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 700,
  };
}

function panelBoxStyle(): CSSProperties {
  return {
    display: "grid",
    gap: 8,
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
}

function selectStyle(): CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: 10,
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.12)",
    color: "white",
    width: "100%",
  };
}

function getFlowLabel(step: QubiqFlowStep): string {
  switch (step) {
    case "idle":
      return "Idle";
    case "validate":
      return "Validate";
    case "prepare":
      return "Prepare";
    case "reserve":
      return "Reserve";
    case "approve":
      return "Approve";
    case "contribute":
      return "Contribute";
    case "refresh":
      return "Refresh";
    case "done":
      return "Done";
    case "error":
      return "Error";
    default:
      return step;
  }
}

function getQubiqStateLabel(qubiq?: QubiqReadState | null): string {
  if (!qubiq) return "—";
  if (qubiq.visualState === "aether-complete") return "Aether Complete";
  if (qubiq.visualState === "complete") return "Complete";
  if (qubiq.visualState === "in-progress") return "In Progress";
  return "Empty";
}

function hasReservedPlotIdentity(
  flowResult: QubiqFlowResult | null,
  reservedPlotId?: string | null
): boolean {
  return !!reservedPlotId || !!flowResult?.plotId;
}

function getPrimaryAction(props: {
  plot: InfinityPlot | null;
  wallet: WalletState;
  eligibility: PlotEligibility;
  resourceEligibility?: ResourceEligibility | null;
  flowBusy: boolean;
  flowResult: QubiqFlowResult | null;
  reservedPlotId?: string | null;
  selectedCityKeyTokenId: string;
  ownedCityKeys: CityKeyOption[];
}): {
  label: string;
  helper: string;
  disabled: boolean;
  action: "connect" | "flow" | "none";
} {
  const {
    plot,
    wallet,
    eligibility,
    resourceEligibility,
    flowBusy,
    flowResult,
    reservedPlotId,
    selectedCityKeyTokenId,
    ownedCityKeys,
  } = props;

  if (flowBusy) {
    return {
      label: "Processing...",
      helper: "The onchain flow is currently running.",
      disabled: true,
      action: "none",
    };
  }

  if (!plot) {
    return {
      label: "Select Plot",
      helper: "Choose a plot on the map first.",
      disabled: true,
      action: "none",
    };
  }

  if (!wallet.isConnected) {
    return {
      label: "Connect Wallet",
      helper: "Connect your wallet to begin the city flow.",
      disabled: false,
      action: "connect",
    };
  }

  if (plot.policy.isCommunity) {
    return {
      label: "Community Plot Reserved",
      helper:
        "Community plots are not privately buildable. Shared infrastructure and support flow can come later.",
      disabled: true,
      action: "none",
    };
  }

  if (plot.policy.isBorderline) {
    return {
      label: "Borderline Crowdfunding Later",
      helper:
        "Borderline plots are cooperative zones and will use shared contribution later.",
      disabled: true,
      action: "none",
    };
  }

  if (plot.policy.isNexus) {
    return {
      label: "Nexus Crowdfunding Later",
      helper:
        "Nexus plots are central shared zones and are not privately buildable.",
      disabled: true,
      action: "none",
    };
  }

  if (!eligibility.plotKindAllowed) {
    return {
      label: "Plot Type Not Allowed",
      helper:
        "Only personal 5x5 plots can currently enter the private Qubiq flow.",
      disabled: true,
      action: "none",
    };
  }

  if (!eligibility.statusAllowed) {
    return {
      label: "Plot Not Free",
      helper: "Only free personal plots can be reserved and built.",
      disabled: true,
      action: "none",
    };
  }

  if (flowResult?.code === "faction_mismatch") {
    return {
      label: "Faction Mismatch",
      helper:
        flowResult.message ||
        "This wallet is already bound to another faction and cannot build on this side.",
      disabled: true,
      action: "none",
    };
  }

  if (
    !eligibility.factionAllowed &&
    wallet.chosenFaction &&
    wallet.chosenFaction !== "none"
  ) {
    return {
      label: "Faction Mismatch",
      helper:
        "This wallet is already bound to another faction and cannot build on this side.",
      disabled: true,
      action: "none",
    };
  }

  if (flowResult?.code === "needs_city_key") {
    return {
      label: "Set City Key",
      helper:
        ownedCityKeys.length > 0 && selectedCityKeyTokenId
          ? `Use NFT #${selectedCityKeyTokenId} as your City Key.`
          : "Select one of your InpinityNFTs as City Key first.",
      disabled: ownedCityKeys.length === 0 || !selectedCityKeyTokenId,
      action: "flow",
    };
  }

  if (
    wallet.hasCityKey &&
    (!wallet.chosenFaction || wallet.chosenFaction === "none")
  ) {
    return {
      label: "Choose Faction",
      helper:
        "Your City Key is already set. Choose exactly one faction for this wallet.",
      disabled: false,
      action: "flow",
    };
  }

  if (flowResult?.code === "needs_faction") {
    return {
      label: "Choose Faction",
      helper: "Choose exactly one faction for this wallet.",
      disabled: false,
      action: "flow",
    };
  }

  if (flowResult?.code === "needs_resource_approval") {
    return {
      label: "Approve Resources",
      helper: "CityLand needs ERC1155 approval before Qubiq contribution.",
      disabled: false,
      action: "flow",
    };
  }

  if (flowResult?.code === "approval_sent") {
    return {
      label: "Contribute Qubiq",
      helper: "Approval is done. Continue with the first Qubiq contribution.",
      disabled: false,
      action: "flow",
    };
  }

  if (flowResult?.code === "reservation_sent") {
    return {
      label: "Contribute Qubiq",
      helper: "The plot is reserved. Continue with the first Qubiq contribution.",
      disabled: false,
      action: "flow",
    };
  }

  if (flowResult?.code === "contribution_sent") {
    return {
      label: "Contribute Next Qubiq",
      helper:
        "The last contribution succeeded. You can continue building the next cell.",
      disabled: false,
      action: "flow",
    };
  }

  if (resourceEligibility && !resourceEligibility.ready) {
    return {
      label: "Need More Resources",
      helper: "You need more Oil, Lemons, or Iron for the next Qubiq.",
      disabled: true,
      action: "none",
    };
  }

  if (hasReservedPlotIdentity(flowResult, reservedPlotId)) {
    return {
      label: "Contribute Qubiq",
      helper: "Contribute resources into the selected Qubiq cell.",
      disabled: false,
      action: "flow",
    };
  }

  if (wallet.chosenFaction && wallet.chosenFaction !== "none") {
    return {
      label: "Reserve Plot",
      helper: "Reserve the next personal plot for this wallet.",
      disabled: false,
      action: "flow",
    };
  }

  if (!wallet.hasCityKey && ownedCityKeys.length > 0 && selectedCityKeyTokenId) {
    return {
      label: "Set City Key",
      helper: `Use NFT #${selectedCityKeyTokenId} as your City Key.`,
      disabled: false,
      action: "flow",
    };
  }

  return {
    label: "Set City Key",
    helper: "Select one of your InpinityNFTs as City Key first.",
    disabled: true,
    action: "none",
  };
}

function getCellStyle(args: {
  selected: boolean;
  qubiq: QubiqReadState | null;
}): CSSProperties {
  const { selected, qubiq } = args;

  if (selected) {
    return {
      padding: "8px 0",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.95)",
      background: "rgba(245,196,110,0.28)",
      color: "white",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  if (qubiq?.visualState === "aether-complete") {
    return {
      padding: "8px 0",
      borderRadius: 8,
      border: "1px solid rgba(255,215,0,0.5)",
      background: "rgba(255,215,0,0.18)",
      color: "#ffeeb0",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  if (qubiq?.usedAether || qubiq?.completed || qubiq?.visualState === "complete") {
    return {
      padding: "8px 0",
      borderRadius: 8,
      border: "1px solid rgba(89,255,43,0.5)",
      background: "rgba(89,255,43,0.18)",
      color: "#cfffbe",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  if (qubiq?.visualState === "in-progress") {
    return {
      padding: "8px 0",
      borderRadius: 8,
      border: "1px solid rgba(120,160,255,0.4)",
      background: "rgba(120,160,255,0.14)",
      color: "#d8e3ff",
      cursor: "pointer",
      fontSize: 12,
      fontWeight: 700,
    };
  }

  return {
    padding: "8px 0",
    borderRadius: 8,
    border: "1px solid rgba(255,255,255,0.12)",
    background: "rgba(255,255,255,0.05)",
    color: "white",
    cursor: "pointer",
    fontSize: 12,
  };
}

function getCellText(qubiq: QubiqReadState | null, x: number, y: number): string {
  if (qubiq?.visualState === "aether-complete") return "✦";
  if (qubiq?.usedAether || qubiq?.completed || qubiq?.visualState === "complete") return "✓";
  if (qubiq?.visualState === "in-progress") return "•";
  return `${x},${y}`;
}

export default function MintPreparationPanel({
  plot,
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
}: Props) {
  const targetQubiqs = 25;

  const currentQubiqs =
    liveCompletion?.completedQubiqs ??
    plot?.qubiqProgress?.completed ??
    0;

  const remainingQubiqs = Math.max(0, targetQubiqs - currentQubiqs);

  const progressPercent =
    liveCompletion?.completionPercent ??
    Math.round((currentQubiqs / targetQubiqs) * 100);

  const effectivePlotId = activeBuildPlotId || reservedPlotId || plot?.plotId || "—";

  const flowBadgeKind =
    flowStep === "done" ? "ok" : flowStep === "error" ? "bad" : "neutral";

  const primaryAction = getPrimaryAction({
    plot,
    wallet,
    eligibility,
    resourceEligibility,
    flowBusy,
    flowResult,
    reservedPlotId,
    selectedCityKeyTokenId,
    ownedCityKeys,
  });

  const primaryOnClick =
    primaryAction.action === "connect"
      ? onConnectWallet
      : primaryAction.action === "flow"
      ? onPrepareContribution
      : undefined;

  return (
    <section className="panel">
      <h2>Qubiq Build Terminal</h2>

      <div style={{ display: "grid", gap: 12 }}>
        <div style={panelBoxStyle()}>
          <strong>Identity</strong>
          <div>
            <strong>Wallet:</strong>{" "}
            {wallet.isConnected ? shortAddress(wallet.address) : "Not connected"}
          </div>
          <div>
            <strong>Chain:</strong> {wallet.chainId ?? "—"}
          </div>
          <div>
            <strong>Flow Step:</strong>{" "}
            <span style={badgeStyle(flowBadgeKind)}>{getFlowLabel(flowStep)}</span>
          </div>
          <div>
            <strong>Wallet Faction:</strong>{" "}
            {wallet.chosenFaction && wallet.chosenFaction !== "none"
              ? pretty(wallet.chosenFaction)
              : "Not chosen yet"}
          </div>
          <div>
            <strong>City Key:</strong>{" "}
            {wallet.hasCityKey == null
              ? "Unknown"
              : wallet.hasCityKey
              ? "Set"
              : "Not set"}
          </div>
          <div>
            <strong>Faction Rule:</strong> One wallet chooses one faction and
            builds only within that side. Community, Borderline and Nexus remain
            shared / later-governed zones.
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>City Key 🔑</strong>

          <div>
            <strong>Owned InpinityNFTs:</strong> {ownedCityKeys.length}
          </div>

          {ownedCityKeys.length > 0 ? (
            <label style={{ display: "grid", gap: 6 }}>
              <span>
                <strong>Selected City Key Token</strong>
              </span>
              <select
                value={selectedCityKeyTokenId}
                onChange={(e) => onSelectCityKeyTokenId(e.target.value)}
                style={selectStyle()}
              >
                {ownedCityKeys.map((item) => (
                  <option
                    key={item.tokenId}
                    value={item.tokenId}
                    style={{ color: "black" }}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div>No InpinityNFT city keys found in this wallet.</div>
          )}

          <div style={{ color: "#cfd6e4" }}>
            The selected NFT will be used as your City Key for registry setup.
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Active Build Plot</strong>

          {buildPlotOptions.length > 0 ? (
            <label style={{ display: "grid", gap: 6 }}>
              <span>
                <strong>Choose reserved / active plot</strong>
              </span>
              <select
                value={activeBuildPlotId}
                onChange={(e) => onSelectActiveBuildPlotId(e.target.value)}
                style={selectStyle()}
              >
                {buildPlotOptions.map((item) => (
                  <option
                    key={item.plotId}
                    value={item.plotId}
                    style={{ color: "black" }}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <div>No reserved or active personal plots detected yet.</div>
          )}

          <div style={{ color: "#cfd6e4" }}>
            Use this selector to continue building on a plot you already reserved or started.
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Plot Status</strong>
          <div>
            <strong>Selected Plot:</strong> {plot?.label || "—"}
          </div>
          <div>
            <strong>Onchain Plot ID:</strong> {effectivePlotId}
          </div>
          <div>
            <strong>Kind:</strong> {plot ? pretty(plot.plotKind) : "—"}
          </div>
          <div>
            <strong>Status:</strong> {plot ? pretty(plot.status) : "—"}
          </div>
          <div>
            <strong>Faction:</strong> {plot ? pretty(plot.faction) : "—"}
          </div>
          <div>
            <strong>Tier:</strong> {plot ? pretty(plot.tier) : "—"}
          </div>
          <div>
            <strong>Estimated Plot Value:</strong>{" "}
            {plot
              ? `${plot.valueModel?.finalEstimate || plot.priceEstimate} PIT`
              : "—"}
          </div>
          <div>
            <strong>Private Build Allowed:</strong>{" "}
            {plot ? (plot.policy.isPersonal ? "Yes" : "No") : "—"}
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Qubiq Progress</strong>

          <div>
            <strong>Plot Size:</strong> 5x5
          </div>
          <div>
            <strong>Completed Qubiqs:</strong> {currentQubiqs} / {targetQubiqs}
          </div>
          <div>
            <strong>Remaining Qubiqs:</strong> {remainingQubiqs}
          </div>
          <div>
            <strong>Live Completion:</strong>{" "}
            {liveCompletion
              ? `${liveCompletion.completionPercent}%`
              : `${progressPercent}%`}
          </div>
          <div>
            <strong>Plot Complete:</strong>{" "}
            {liveCompletion
              ? liveCompletion.isFullyCompleted
                ? "Yes"
                : "No"
              : "—"}
          </div>
          <div>
            <strong>Selected Cell:</strong> ({selectedQubiqCell.x},{" "}
            {selectedQubiqCell.y})
          </div>

          <div
            style={{
              width: "100%",
              height: 12,
              borderRadius: 999,
              overflow: "hidden",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                width: `${progressPercent}%`,
                height: "100%",
                borderRadius: 999,
                background:
                  progressPercent >= 100
                    ? "linear-gradient(90deg, rgba(89,255,43,0.95), rgba(180,255,120,0.95))"
                    : "linear-gradient(90deg, rgba(245,196,110,0.95), rgba(255,191,120,0.95))",
                transition: "width 250ms ease",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              gap: 6,
              marginTop: 6,
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => {
              const x = index % 5;
              const y = Math.floor(index / 5);
              const selected =
                selectedQubiqCell.x === x && selectedQubiqCell.y === y;
              const key = `${x},${y}`;
              const qubiq = liveAllQubiqs?.[key] ?? null;

              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelectQubiqCell({ x, y })}
                  style={getCellStyle({ selected, qubiq })}
                  title={`Qubiq (${x}, ${y})${
                    qubiq ? ` – ${getQubiqStateLabel(qubiq)}` : ""
                  }`}
                >
                  {getCellText(qubiq, x, y)}
                </button>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 8,
              fontSize: 12,
              color: "#cfd6e4",
            }}
          >
            <span>✓ complete</span>
            <span>✦ aether</span>
            <span>• in progress</span>
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Selected Qubiq Live Read</strong>

          {liveLoading && <div>Loading live Qubiq data...</div>}
          {liveError && <div style={{ color: "#ff9d9d" }}>{liveError}</div>}

          {!liveLoading && !liveError && (
            <>
              <div>
                <strong>Cell:</strong> ({selectedQubiqCell.x},{" "}
                {selectedQubiqCell.y})
              </div>
              <div>
                <strong>State:</strong> {getQubiqStateLabel(liveQubiq)}
              </div>
              <div>
                <strong>Completion:</strong>{" "}
                {liveQubiq ? `${liveQubiq.completionPercent}%` : "—"}
              </div>
              <div>
                <strong>Oil:</strong>{" "}
                {liveQubiq
                  ? `${liveQubiq.oilDeposited.toString()} / ${liveQubiq.oilRequired.toString()}`
                  : "—"}
              </div>
              <div>
                <strong>Lemons:</strong>{" "}
                {liveQubiq
                  ? `${liveQubiq.lemonsDeposited.toString()} / ${liveQubiq.lemonsRequired.toString()}`
                  : "—"}
              </div>
              <div>
                <strong>Iron:</strong>{" "}
                {liveQubiq
                  ? `${liveQubiq.ironDeposited.toString()} / ${liveQubiq.ironRequired.toString()}`
                  : "—"}
              </div>
              <div>
                <strong>Used Aether:</strong>{" "}
                {liveQubiq ? (liveQubiq.usedAether ? "Yes" : "No") : "—"}
              </div>
              <div>
                <strong>Last Contributor:</strong>{" "}
                {liveQubiq ? shortAddress(liveQubiq.lastContributor) : "—"}
              </div>
            </>
          )}
        </div>

        <div style={panelBoxStyle()}>
          <strong>Resource Check</strong>

          <div>
            Oil:{" "}
            {resourceEligibility
              ? `${resourceEligibility.balances.oil.toString()} / ${resourceEligibility.required.oil.toString()}`
              : "—"}
          </div>

          <div>
            Lemons:{" "}
            {resourceEligibility
              ? `${resourceEligibility.balances.lemons.toString()} / ${resourceEligibility.required.lemons.toString()}`
              : "—"}
          </div>

          <div>
            Iron:{" "}
            {resourceEligibility
              ? `${resourceEligibility.balances.iron.toString()} / ${resourceEligibility.required.iron.toString()}`
              : "—"}
          </div>

          {resourceEligibility && !resourceEligibility.ready && (
            <>
              <div>Missing Oil: {resourceEligibility.missing.oil.toString()}</div>
              <div>
                Missing Lemons: {resourceEligibility.missing.lemons.toString()}
              </div>
              <div>Missing Iron: {resourceEligibility.missing.iron.toString()}</div>
            </>
          )}
        </div>

        <div style={panelBoxStyle()}>
          <strong>Eligibility Checks</strong>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {eligibility.checks.map((check) => (
              <span
                key={check.key}
                style={badgeStyle(check.passed ? "ok" : "bad")}
              >
                {check.passed ? "✓" : "✗"} {check.label}
              </span>
            ))}
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Action Step</strong>

          {flowResult ? (
            <div
              style={{
                padding: 10,
                borderRadius: 10,
                background: flowResult.ok
                  ? "rgba(89,255,43,0.10)"
                  : "rgba(255,90,90,0.10)",
                border: flowResult.ok
                  ? "1px solid rgba(89,255,43,0.25)"
                  : "1px solid rgba(255,90,90,0.25)",
              }}
            >
              <div>
                <strong>Result:</strong> {flowResult.code}
              </div>
              <div style={{ marginTop: 4 }}>{flowResult.message}</div>
              {txHash && (
                <div style={{ marginTop: 6 }}>
                  <strong>TX:</strong> {txHash}
                </div>
              )}
            </div>
          ) : (
            <div>Choose a plot and prepare the next Qubiq contribution step.</div>
          )}

          <div
            style={{
              marginTop: 8,
              padding: 10,
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div>
              <strong>Current Action:</strong> {primaryAction.label}
            </div>
            <div style={{ marginTop: 4, color: "#cfd6e4" }}>
              {primaryAction.helper}
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gap: 8,
              marginTop: 8,
            }}
          >
            <div>• Set City Key</div>
            <div>• Choose Faction</div>
            <div>• Reserve Plot</div>
            <div>• Approve Resources</div>
            <div>• Contribute Qubiq</div>
            <div>• Plot completes automatically at 25 / 25</div>
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Rules / Notes</strong>
          {eligibility.reasons.map((reason, index) => (
            <div key={index}>• {reason}</div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <button
            className="toolbarButton"
            disabled={primaryAction.disabled}
            onClick={primaryOnClick}
            title={primaryAction.helper}
          >
            {primaryAction.label}
          </button>

          <button
            className="toolbarButton"
            disabled={flowBusy || !plot}
            onClick={() => onSelectQubiqCell({ x: 0, y: 0 })}
            title="Reset selected Qubiq cell to (0,0)"
          >
            Reset Cell
          </button>
        </div>
      </div>
    </section>
  );
}