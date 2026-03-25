import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { isFavoritePlot } from "../../lib/favorites";
import { getLaneWeight } from "../../lib/infinity-layout";
import type { InfinityPlot } from "../../types/infinity";
import {
  getDistrict,
  getDistrictFactionLabel,
  getDistrictKindLabel,
  type CityDistrictRead,
} from "../../lib/city-districts";
import {
  getCityStatusLabel,
  readCityStatus,
  type CityPlotStatusRead,
} from "../../lib/city-status";
import {
  getHistoryFactionLabel,
  getHistoricWeight,
  getPlotProvenance,
  type CityPlotProvenanceRead,
} from "../../lib/city-history";

type Props = {
  plot: InfinityPlot | null;
  onToggleFavorite: (id: string) => void;
  showAdvanced?: boolean;
};

function pretty(value: string): string {
  return value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (m) => m.toUpperCase());
}

function yesNo(value: boolean): string {
  return value ? "Yes" : "No";
}

function formatUnix(value?: number | bigint): string {
  if (value == null) return "—";
  const numeric = typeof value === "bigint" ? Number(value) : value;
  if (!numeric) return "—";

  const date = new Date(numeric * 1000);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-GB");
}

function badgeStyle(
  tone: "gold" | "blue" | "green" | "red" | "gray" | "violet"
): CSSProperties {
  const map = {
    gold: {
      background: "rgba(245, 196, 110, 0.18)",
      border: "1px solid rgba(245, 196, 110, 0.45)",
      color: "#f5c46e",
    },
    blue: {
      background: "rgba(90, 140, 255, 0.16)",
      border: "1px solid rgba(90, 140, 255, 0.4)",
      color: "#9bb7ff",
    },
    green: {
      background: "rgba(89, 255, 43, 0.14)",
      border: "1px solid rgba(89, 255, 43, 0.38)",
      color: "#8cff73",
    },
    red: {
      background: "rgba(255, 90, 90, 0.14)",
      border: "1px solid rgba(255, 90, 90, 0.38)",
      color: "#ff9d9d",
    },
    gray: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.14)",
      color: "#d7dbe3",
    },
    violet: {
      background: "rgba(155,124,255,0.16)",
      border: "1px solid rgba(155,124,255,0.38)",
      color: "#c8b4ff",
    },
  };

  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "6px 10px",
    borderRadius: 999,
    fontSize: 12,
    fontWeight: 600,
    ...map[tone],
  };
}

function sectionTitleStyle(): CSSProperties {
  return {
    marginTop: 0,
    marginBottom: 10,
    fontSize: 15,
    fontWeight: 700,
  };
}

function cardBlockStyle(): CSSProperties {
  return {
    display: "grid",
    gap: 10,
    padding: 12,
    borderRadius: 12,
    background: "rgba(255,255,255,0.035)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
}

function normalizePlotId(value?: string | number | null): string | null {
  if (value == null) return null;
  const normalized = String(value).trim();
  return normalized ? normalized : null;
}

function getOpportunitySignals(
  plot: InfinityPlot,
  liveStatus: CityPlotStatusRead | null,
  liveHistory: CityPlotProvenanceRead | null,
  liveDistrict: CityDistrictRead | null
): Array<{
  label: string;
  tone: "gold" | "blue" | "green" | "red" | "gray" | "violet";
}> {
  const signals: Array<{
    label: string;
    tone: "gold" | "blue" | "green" | "red" | "gray" | "violet";
  }> = [];

  if (plot.tier === "nexus" || plot.distanceToNexus < 90) {
    signals.push({ label: "Prime Nexus Proximity", tone: "gold" });
  }

  if ((plot.provenance?.legacyScore || 0) >= 140) {
    signals.push({ label: "High Legacy Value", tone: "violet" });
  }

  if ((plot.provenance?.provenanceScore || 0) >= 180) {
    signals.push({ label: "Strong Provenance", tone: "blue" });
  }

  if (plot.statusInfo?.canLayerUpgrade || liveStatus?.layerEligible) {
    signals.push({ label: "Layer Upgrade Possible", tone: "green" });
  }

  if (plot.statusInfo?.maintenanceLevel === "overdue") {
    signals.push({ label: "Maintenance Overdue", tone: "red" });
  }

  if (plot.statusInfo?.inactivityLevel === "critical") {
    signals.push({ label: "Critical Inactivity", tone: "red" });
  }

  if (plot.policy.sharedUse) {
    signals.push({ label: "Shared Governance Zone", tone: "blue" });
  }

  if (plot.policy.factionLocked) {
    signals.push({ label: "Faction Restricted", tone: "gray" });
  }

  if (liveDistrict?.isBorderline) {
    signals.push({ label: "Borderline District", tone: "green" });
  }

  if (liveHistory && getHistoricWeight(liveHistory) >= 220) {
    signals.push({ label: "Historically Significant", tone: "violet" });
  }

  if (plot.status === "reserved") {
    signals.push({ label: "Reserved Build Slot", tone: "gold" });
  }

  if (plot.status === "owned") {
    signals.push({ label: "Owned / Active Plot", tone: "green" });
  }

  if (plot.layoutState === "corrected") {
    signals.push({ label: "Faction Side Corrected", tone: "gold" });
  }

  if (!signals.length) {
    signals.push({ label: "Stable Standard Plot", tone: "gray" });
  }

  return signals;
}

function getRightsSummary(plot: InfinityPlot): string[] {
  const lines: string[] = [];

  if (plot.policy.isPersonal) {
    lines.push("Private personal plot in the ∞ city structure.");
  }

  if (plot.policy.isCommunity) {
    lines.push(
      "Reserved for shared community infrastructure and later governance use."
    );
  }

  if (plot.policy.isBorderline) {
    lines.push("Borderline cooperation zone between Inpinity and Inphinity.");
  }

  if (plot.policy.isNexus) {
    lines.push("Core nexus bridge zone with strategic central importance.");
  }

  if (plot.policy.factionLocked) {
    lines.push("Bound to faction-side logic and placement rules.");
  }

  if (plot.policy.sharedUse) {
    lines.push(
      "Designed for collective or cross-faction utility rather than simple ownership."
    );
  }

  if (plot.policy.purchasable) {
    lines.push("Prepared for a future purchase flow, not yet active.");
  } else {
    lines.push("Not part of the direct personal sale flow at this phase.");
  }

  return lines;
}

export default function PlotDetails({
  plot,
  onToggleFavorite,
  showAdvanced = false,
}: Props) {
  const [liveDistrict, setLiveDistrict] = useState<CityDistrictRead | null>(null);
  const [liveStatus, setLiveStatus] = useState<CityPlotStatusRead | null>(null);
  const [liveHistory, setLiveHistory] = useState<CityPlotProvenanceRead | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  const normalizedPlotId = useMemo(
    () => normalizePlotId(plot?.plotId),
    [plot?.plotId]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadLiveDetails() {
      if (!normalizedPlotId) {
        setLiveDistrict(null);
        setLiveStatus(null);
        setLiveHistory(null);
        setLiveError(null);
        setLiveLoading(false);
        return;
      }

      setLiveLoading(true);
      setLiveError(null);

      try {
        const [district, status, history] = await Promise.all([
          getDistrict(normalizedPlotId),
          readCityStatus(normalizedPlotId),
          getPlotProvenance(normalizedPlotId),
        ]);

        if (cancelled) return;

        setLiveDistrict(district);
        setLiveStatus(status);
        setLiveHistory(history);
        setLiveLoading(false);
      } catch (error) {
        if (cancelled) return;

        setLiveDistrict(null);
        setLiveStatus(null);
        setLiveHistory(null);
        setLiveLoading(false);
        setLiveError(
          error instanceof Error ? error.message : "Live plot details failed."
        );
      }
    }

    void loadLiveDetails();

    return () => {
      cancelled = true;
    };
  }, [normalizedPlotId]);

  if (!plot) {
    return (
      <div className="detailsCard">
        <h3 style={{ marginTop: 0 }}>Plot Details</h3>
        <div>Select a plot on the map.</div>
      </div>
    );
  }

  const favorite = isFavoritePlot(plot.id);
  const laneWeight = getLaneWeight(plot.lane);

  const estimatedValue = plot.valueModel?.finalEstimate ?? plot.priceEstimate ?? 0;
  const provenance = plot.provenance;
  const statusInfo = plot.statusInfo;
  const policy = plot.policy;

  const signals = getOpportunitySignals(plot, liveStatus, liveHistory, liveDistrict);
  const rightsSummary = getRightsSummary(plot);

  return (
    <div className="detailsCard">
      <div className="detailsHeader">
        <div>
          <h3 style={{ margin: 0 }}>
            {plot.label} · {pretty(plot.rarity)}
          </h3>
          <div className="muted" style={{ marginTop: 6, marginBottom: 0 }}>
            {pretty(plot.status)} · {pretty(plot.faction)} · {pretty(plot.plotKind)}
          </div>
        </div>

        <button
          className="toolbarButton active"
          onClick={() => onToggleFavorite(plot.id)}
        >
          {favorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>

      {plot.layoutNote && (
        <div className="infoNote" style={{ marginBottom: 16 }}>
          <strong>Placement note:</strong> {plot.layoutNote}
        </div>
      )}

      <div className="detailsGrid">
        <div>Status: {pretty(plot.status)}</div>
        <div>Faction: {pretty(plot.faction)}</div>
        <div>Kind: {pretty(plot.plotKind)}</div>
        <div>Tier: {pretty(plot.tier)}</div>
        <div>Side: {pretty(plot.side)}</div>
        <div>Lane: {plot.lane}</div>
        <div>Nexus Weight: {laneWeight}</div>
        <div>Distance to Nexus: {plot.distanceToNexus}</div>
        <div>Estimated Value: {estimatedValue} PIT</div>
        <div>Owner: {plot.ownerLabel || plot.owner || "—"}</div>
        <div>Plot ID: {normalizedPlotId || "—"}</div>
        <div>Favorite: {yesNo(favorite)}</div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Rights & Plot Role</h4>
      <div style={cardBlockStyle()}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {policy.isPersonal && <span style={badgeStyle("gray")}>Personal Zone</span>}
          {policy.isCommunity && <span style={badgeStyle("red")}>Community Reserve</span>}
          {policy.isBorderline && <span style={badgeStyle("green")}>Borderline Zone</span>}
          {policy.isNexus && <span style={badgeStyle("gold")}>Nexus Core</span>}
          {policy.sharedUse && <span style={badgeStyle("blue")}>Shared Use</span>}
          {policy.factionLocked && <span style={badgeStyle("violet")}>Faction Locked</span>}
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          {rightsSummary.map((line, index) => (
            <div key={index}>• {line}</div>
          ))}
        </div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Opportunity Signals</h4>
      <div style={cardBlockStyle()}>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {signals.map((signal, index) => (
            <span key={`${signal.label}-${index}`} style={badgeStyle(signal.tone)}>
              {signal.label}
            </span>
          ))}
        </div>
      </div>

      <details className="detailSection" open={showAdvanced}>
        <summary className="detailSectionSummary">Live core data</summary>
        <div style={cardBlockStyle()}>
          {liveLoading && <div>Loading live district / status / history...</div>}
          {liveError && <div style={{ color: "#ff9d9d" }}>{liveError}</div>}

          {!liveLoading && !liveError && (
            <>
              <div>
                <strong>Onchain Plot ID:</strong> {normalizedPlotId || "—"}
              </div>
              <div>
                <strong>District:</strong>{" "}
                {liveDistrict ? getDistrictKindLabel(liveDistrict.kind) : "—"}
              </div>
              <div>
                <strong>District Faction:</strong>{" "}
                {liveDistrict ? getDistrictFactionLabel(liveDistrict.faction) : "—"}
              </div>
              <div>
                <strong>District Bonus:</strong>{" "}
                {liveDistrict ? `${liveDistrict.bonusBps} bps` : "—"}
              </div>
              <div>
                <strong>Derived Status:</strong>{" "}
                {liveStatus ? getCityStatusLabel(liveStatus.derivedStatus) : "—"}
              </div>
              <div>
                <strong>Manual Status:</strong>{" "}
                {liveStatus ? getCityStatusLabel(liveStatus.manualStatus) : "—"}
              </div>
              <div>
                <strong>Layer Eligible:</strong>{" "}
                {liveStatus ? yesNo(liveStatus.layerEligible) : "—"}
              </div>
              <div>
                <strong>Origin Faction:</strong>{" "}
                {liveHistory ? getHistoryFactionLabel(liveHistory.originFaction) : "—"}
              </div>
              <div>
                <strong>Historic Weight:</strong>{" "}
                {liveHistory ? getHistoricWeight(liveHistory) : "—"}
              </div>
            </>
          )}
        </div>
      </details>

      <details className="detailSection" open={showAdvanced}>
        <summary className="detailSectionSummary">History, activity and value model</summary>
        <div className="detailsGrid" style={{ marginBottom: 12 }}>
          <div>Historic Score: {provenance?.historicScore ?? "—"}</div>
          <div>Legacy Score: {provenance?.legacyScore ?? "—"}</div>
          <div>Provenance Score: {provenance?.provenanceScore ?? "—"}</div>
          <div>Layer Count: {provenance?.layerCount ?? "—"}</div>
          <div>Ownership Transfers: {provenance?.ownershipTransfers ?? "—"}</div>
          <div>Aether Uses: {provenance?.aetherUses ?? "—"}</div>
          <div>Historic Core: {provenance ? yesNo(provenance.isHistoricCore) : "—"}</div>
          <div>Age In Days: {provenance?.ageInDays ?? "—"}</div>
          <div>Inactivity Level: {statusInfo?.inactivityLevel ?? "—"}</div>
          <div>Maintenance Level: {statusInfo?.maintenanceLevel ?? "—"}</div>
          <div>Inactivity Days: {statusInfo?.inactivityDays ?? "—"}</div>
          <div>Maintenance Age: {statusInfo?.maintenanceAgeDays ?? "—"}</div>
          <div>Layer Eligible: {statusInfo ? yesNo(statusInfo.layerEligible) : "—"}</div>
          <div>Can Layer Upgrade: {statusInfo ? yesNo(statusInfo.canLayerUpgrade) : "—"}</div>
          {plot.valueModel && <div>Base Value: {plot.valueModel.baseValue}</div>}
          {plot.valueModel && <div>Final Estimate: {plot.valueModel.finalEstimate}</div>}
        </div>

        <div style={cardBlockStyle()}>
          <div>Created: {formatUnix(provenance?.createdAt ?? plot.createdAt)}</div>
          <div>Provenance Updated: {formatUnix(provenance?.lastUpdated)}</div>
          <div>Last Activity: {formatUnix(statusInfo?.lastActivityAt)}</div>
          <div>Last Maintenance: {formatUnix(statusInfo?.lastMaintenanceAt)}</div>
          <div>Live Activity: {formatUnix(liveStatus?.lastActivityAt)}</div>
          <div>Live Maintenance: {formatUnix(liveStatus?.lastMaintenanceAt)}</div>
        </div>

        <div className="infoNote" style={{ marginTop: 12 }}>
          Validation helper rows were removed from the default panel because they used
          a hardcoded slot and cell context. Reconnect them later only with the active
          build slot and selected Qubiq cell from the terminal.
        </div>
      </details>
    </div>
  );
}
