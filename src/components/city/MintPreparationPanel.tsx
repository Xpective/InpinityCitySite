import type { CSSProperties } from "react";
import type { InfinityPlot } from "../../types/infinity";
import type { PlotEligibility, WalletState } from "../../lib/eligibility";
import type { ResourceEligibility } from "../../lib/resource-check";
import type { QubiqFlowResult, QubiqFlowStep } from "../../lib/city-qubiq-flow";
import type { PlotCompletionState, QubiqReadState } from "../../lib/city-land";

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
  liveLoading?: boolean;
  liveError?: string | null;
};

function pretty(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
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
  liveLoading = false,
  liveError = null,
}: Props) {
  const currentQubiqs = plot?.qubiqProgress?.completed ?? 0;
  const targetQubiqs = plot?.qubiqProgress?.total ?? 25;
  const remainingQubiqs = Math.max(0, targetQubiqs - currentQubiqs);
  const progressPercent =
    liveCompletion?.completionPercent ??
    (targetQubiqs > 0 ? Math.round((currentQubiqs / targetQubiqs) * 100) : 0);

  const effectivePlotId = reservedPlotId || plot?.plotId || "—";
  const flowBadgeKind =
    flowStep === "done"
      ? "ok"
      : flowStep === "error"
      ? "bad"
      : "neutral";

  return (
    <section className="panel">
      <h2>Qubiq Build Terminal</h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
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
          {!wallet.isConnected && (
            <button className="toolbarButton active" onClick={onConnectWallet}>
              Connect Wallet
            </button>
          )}
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
            {plot ? `${plot.valueModel?.finalEstimate || plot.priceEstimate} PIT` : "—"}
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Qubiq Progress</strong>

          <div>
            <strong>Plot Size:</strong> 5x5
          </div>
          <div>
            <strong>Target:</strong> {targetQubiqs} Qubiqs
          </div>
          <div>
            <strong>Mock Progress:</strong> {currentQubiqs} / {targetQubiqs}
          </div>
          <div>
            <strong>Remaining Qubiqs:</strong> {remainingQubiqs}
          </div>
          <div>
            <strong>Live Completion:</strong>{" "}
            {liveCompletion ? `${liveCompletion.completionPercent}%` : `${progressPercent}%`}
          </div>
          <div>
            <strong>Plot Complete:</strong>{" "}
            {liveCompletion ? (liveCompletion.isFullyCompleted ? "Yes" : "No") : "—"}
          </div>
          <div>
            <strong>Selected Cell:</strong> ({selectedQubiqCell.x}, {selectedQubiqCell.y})
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
              const selected = selectedQubiqCell.x === x && selectedQubiqCell.y === y;

              return (
                <button
                  key={`${x}-${y}`}
                  type="button"
                  onClick={() => onSelectQubiqCell({ x, y })}
                  style={{
                    padding: "8px 0",
                    borderRadius: 8,
                    border: selected
                      ? "1px solid rgba(255,255,255,0.9)"
                      : "1px solid rgba(255,255,255,0.12)",
                    background: selected
                      ? "rgba(245,196,110,0.22)"
                      : "rgba(255,255,255,0.05)",
                    color: "white",
                    cursor: "pointer",
                    fontSize: 12,
                  }}
                  title={`Qubiq (${x}, ${y})`}
                >
                  {x},{y}
                </button>
              );
            })}
          </div>
        </div>

        <div style={panelBoxStyle()}>
          <strong>Selected Qubiq Live Read</strong>

          {liveLoading && <div>Loading live Qubiq data...</div>}
          {liveError && <div style={{ color: "#ff9d9d" }}>{liveError}</div>}

          {!liveLoading && !liveError && (
            <>
              <div>
                <strong>Cell:</strong> ({selectedQubiqCell.x}, {selectedQubiqCell.y})
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
              <div>Missing Lemons: {resourceEligibility.missing.lemons.toString()}</div>
              <div>Missing Iron: {resourceEligibility.missing.iron.toString()}</div>
            </>
          )}
        </div>

        <div style={panelBoxStyle()}>
          <strong>Eligibility Checks</strong>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {eligibility.checks.map((check) => (
              <span key={check.key} style={badgeStyle(check.passed ? "ok" : "bad")}>
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
              display: "grid",
              gap: 8,
              marginTop: 8,
            }}
          >
            <div>• Reserve Plot</div>
            <div>• Approve Resources</div>
            <div>• Contribute Qubiq</div>
            <div>• Complete Plot</div>
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
            disabled={flowBusy || !plot}
            onClick={onPrepareContribution}
            title={
              flowBusy
                ? "Flow is running"
                : "Run the next real onchain Qubiq flow step"
            }
          >
            {flowBusy ? "Processing..." : "Run Next Qubiq Step"}
          </button>

          <button
            className="toolbarButton"
            disabled
            title="Full plot completion flow will be unlocked in a later phase"
          >
            Complete Plot (Coming Soon)
          </button>
        </div>
      </div>
    </section>
  );
}