import type { CSSProperties } from "react";
import type { InfinityPlot } from "../../types/infinity";
import type { PlotEligibility, WalletState } from "../../lib/eligibility";
import type { ResourceEligibility } from "../../lib/resource-check";

type Props = {
  plot: InfinityPlot | null;
  wallet: WalletState;
  eligibility: PlotEligibility;
  resourceEligibility?: ResourceEligibility | null;
  onConnectWallet: () => void;
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

export default function MintPreparationPanel({
  plot,
  wallet,
  eligibility,
  resourceEligibility,
  onConnectWallet,
}: Props) {
  const currentQubiqs = plot?.qubiqProgress?.completed ?? 0;
  const targetQubiqs = plot?.qubiqProgress?.total ?? 25;
  const remainingQubiqs = Math.max(0, targetQubiqs - currentQubiqs);
  const progressPercent =
    targetQubiqs > 0 ? Math.round((currentQubiqs / targetQubiqs) * 100) : 0;

  return (
    <section className="panel">
      <h2>Qubiq Contribution Preparation</h2>

      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        <div
          style={{
            display: "grid",
            gap: 8,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <strong>Wallet:</strong>{" "}
            {wallet.isConnected ? shortAddress(wallet.address) : "Not connected"}
          </div>
          <div>
            <strong>Chain:</strong> {wallet.chainId ?? "—"}
          </div>
          {!wallet.isConnected && (
            <button className="toolbarButton active" onClick={onConnectWallet}>
              Connect Wallet
            </button>
          )}
        </div>

        <div
          style={{
            display: "grid",
            gap: 8,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <div>
            <strong>Selected Plot:</strong> {plot?.label || "—"}
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

        <div
          style={{
            display: "grid",
            gap: 10,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <strong>Plot Completion Preview</strong>

          <div>
            <strong>Plot Size:</strong> 5x5
          </div>
          <div>
            <strong>Target:</strong> {targetQubiqs} Qubiqs
          </div>
          <div>
            <strong>Current Progress:</strong> {currentQubiqs} / {targetQubiqs}
          </div>
          <div>
            <strong>Remaining Qubiqs:</strong> {remainingQubiqs}
          </div>
          <div>
            <strong>Completion:</strong> {progressPercent}%
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
        </div>

        <div
          style={{
            display: "grid",
            gap: 8,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <strong>Qubiq Cost Check</strong>

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

        <div
          style={{
            display: "grid",
            gap: 8,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <strong>Eligibility Checks</strong>

          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {eligibility.checks.map((check) => (
              <span key={check.key} style={badgeStyle(check.passed ? "ok" : "bad")}>
                {check.passed ? "✓" : "✗"} {check.label}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gap: 8,
            padding: 12,
            borderRadius: 12,
            background: "rgba(255,255,255,0.035)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
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
            disabled={!eligibility.reservable}
            title={eligibility.reservable ? "Qubiq contribution preview ready" : "Eligibility not met"}
          >
            Prepare Qubiq Contribution
          </button>

          <button
            className="toolbarButton"
            disabled
            title="Qubiq completion is intentionally disabled in this phase"
          >
            Complete Qubiq (Coming Soon)
          </button>
        </div>
      </div>
    </section>
  );
}