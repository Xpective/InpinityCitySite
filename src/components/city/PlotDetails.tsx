import { useEffect, useState } from "react";
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
import {
  readCityValidationSummary,
  type CityValidationSummary,
} from "../../lib/city-validation";

type Props = {
  plot: InfinityPlot | null;
  onToggleFavorite: (id: string) => void;
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
    lines.push("Reserved for shared community infrastructure and later governance use.");
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
    lines.push("Designed for collective or cross-faction utility rather than simple ownership.");
  }
  if (plot.policy.purchasable) {
    lines.push("Prepared for a future purchase flow, not yet active.");
  } else {
    lines.push("Not part of the direct personal sale flow at this phase.");
  }

  return lines;
}

export default function PlotDetails({ plot, onToggleFavorite }: Props) {
  const [liveDistrict, setLiveDistrict] = useState<CityDistrictRead | null>(null);
  const [liveStatus, setLiveStatus] = useState<CityPlotStatusRead | null>(null);
  const [liveHistory, setLiveHistory] = useState<CityPlotProvenanceRead | null>(null);
  const [liveValidation, setLiveValidation] = useState<CityValidationSummary | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadLiveDetails() {
      if (!plot?.plotId) {
        setLiveDistrict(null);
        setLiveStatus(null);
        setLiveHistory(null);
        setLiveValidation(null);
        setLiveError(null);
        setLiveLoading(false);
        return;
      }

      setLiveLoading(true);
      setLiveError(null);

      try {
        const districtPromise = getDistrict(plot.plotId);
        const statusPromise = readCityStatus(plot.plotId);
        const historyPromise = getPlotProvenance(plot.plotId);

        const validationPromise =
          plot.owner && plot.plotId
            ? readCityValidationSummary({
                user: plot.owner,
                slotIndex: 0,
                plotId: plot.plotId,
                x: 0,
                y: 0,
              })
            : Promise.resolve(null);

        const [district, status, history, validation] = await Promise.all([
          districtPromise,
          statusPromise,
          historyPromise,
          validationPromise,
        ]);

        if (cancelled) return;

        setLiveDistrict(district);
        setLiveStatus(status);
        setLiveHistory(history);
        setLiveValidation(validation);
        setLiveLoading(false);
      } catch (error) {
        if (cancelled) return;

        setLiveDistrict(null);
        setLiveStatus(null);
        setLiveHistory(null);
        setLiveValidation(null);
        setLiveLoading(false);
        setLiveError(
          error instanceof Error ? error.message : "Live plot details failed."
        );
      }
    }

    loadLiveDetails();

    return () => {
      cancelled = true;
    };
  }, [plot?.plotId, plot?.owner]);

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
        <h3 style={{ margin: 0 }}>
          {plot.label} · {pretty(plot.rarity)}
        </h3>
        <button
          className="toolbarButton active"
          onClick={() => onToggleFavorite(plot.id)}
        >
          {favorite ? "★ Favorite" : "☆ Favorite"}
        </button>
      </div>

      <div className="detailsGrid">
        <div>Status: {pretty(plot.status)}</div>
        <div>Faction: {pretty(plot.faction)}</div>
        <div>Kind: {pretty(plot.plotKind)}</div>
        <div>Tier: {pretty(plot.tier)}</div>

        <div>Side: {pretty(plot.side)}</div>
        <div>Lane: {plot.lane}</div>
        <div>Nexus Weight: {laneWeight}</div>
        <div>Distance to Nexus: {plot.distanceToNexus}</div>

        <div>Position: {plot.x.toFixed(1)} / {plot.y.toFixed(1)}</div>
        <div>Estimated Value: {estimatedValue} PIT</div>
        <div>Base Value: {plot.priceEstimate} PIT</div>
        <div>Owner: {plot.ownerLabel || plot.owner || "—"}</div>
        <div>
          Last Transfer:{" "}
          {plot.lastTransferDaysAgo != null
            ? `${plot.lastTransferDaysAgo} days ago`
            : "—"}
        </div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Policy</h4>
      <div className="detailsGrid">
        <div>Personal: {yesNo(policy.isPersonal)}</div>
        <div>Community: {yesNo(policy.isCommunity)}</div>
        <div>Borderline: {yesNo(policy.isBorderline)}</div>
        <div>Nexus: {yesNo(policy.isNexus)}</div>
        <div>Reservable: {yesNo(policy.reservable)}</div>
        <div>Purchasable: {yesNo(policy.purchasable)}</div>
        <div>Faction Locked: {yesNo(policy.factionLocked)}</div>
        <div>Shared Use: {yesNo(policy.sharedUse)}</div>
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

      <h4 style={sectionTitleStyle()}>Live Core Data</h4>
      <div style={cardBlockStyle()}>
        {liveLoading && <div>Loading live district / status / history...</div>}
        {liveError && <div style={{ color: "#ff9d9d" }}>{liveError}</div>}

        {!liveLoading && !liveError && (
          <>
            <div>
              <strong>Onchain Plot ID:</strong> {plot.plotId || "—"}
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

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Historical Value</h4>
      <div className="detailsGrid">
        <div>Historic Score: {provenance?.historicScore ?? "—"}</div>
        <div>Legacy Score: {provenance?.legacyScore ?? "—"}</div>
        <div>Provenance Score: {provenance?.provenanceScore ?? "—"}</div>
        <div>Layer Count: {provenance?.layerCount ?? "—"}</div>
        <div>Ownership Transfers: {provenance?.ownershipTransfers ?? "—"}</div>
        <div>Aether Uses: {provenance?.aetherUses ?? "—"}</div>
        <div>Historic Core: {provenance ? yesNo(provenance.isHistoricCore) : "—"}</div>
        <div>Age In Days: {provenance?.ageInDays ?? "—"}</div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Maintenance & Activity</h4>
      <div className="detailsGrid">
        <div>Derived Status: {statusInfo?.derivedStatus ?? "—"}</div>
        <div>Manual Override: {statusInfo?.manualStatusOverride ?? "—"}</div>
        <div>Inactivity Level: {statusInfo?.inactivityLevel ?? "—"}</div>
        <div>Maintenance Level: {statusInfo?.maintenanceLevel ?? "—"}</div>
        <div>Inactivity Days: {statusInfo?.inactivityDays ?? "—"}</div>
        <div>Maintenance Age: {statusInfo?.maintenanceAgeDays ?? "—"}</div>
        <div>Layer Eligible: {statusInfo ? yesNo(statusInfo.layerEligible) : "—"}</div>
        <div>Can Layer Upgrade: {statusInfo ? yesNo(statusInfo.canLayerUpgrade) : "—"}</div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Timeline</h4>
      <div style={cardBlockStyle()}>
        <div>Created: {formatUnix(provenance?.createdAt ?? plot.createdAt)}</div>
        <div>Provenance Updated: {formatUnix(provenance?.lastUpdated)}</div>
        <div>Last Activity: {formatUnix(statusInfo?.lastActivityAt)}</div>
        <div>Last Maintenance: {formatUnix(statusInfo?.lastMaintenanceAt)}</div>
        <div>Live Activity: {formatUnix(liveStatus?.lastActivityAt)}</div>
        <div>Live Maintenance: {formatUnix(liveStatus?.lastMaintenanceAt)}</div>
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0" }} />

      <h4 style={sectionTitleStyle()}>Validation Snapshot</h4>
      <div style={cardBlockStyle()}>
        {liveValidation ? (
          <>
            <div>Can Reserve Personal Plot: {yesNo(liveValidation.canReservePersonalPlot)}</div>
            <div>Valid Personal Plot Size: {yesNo(liveValidation.isValidPersonalPlotSize)}</div>
            <div>Valid Community Plot Size: {yesNo(liveValidation.isValidCommunityPlotSize)}</div>
            <div>Can Use Faction Inpinity: {yesNo(liveValidation.canUseFactionInpinity)}</div>
            <div>Can Use Faction Inphinity: {yesNo(liveValidation.canUseFactionInphinity)}</div>
            <div>Can Fill Qubiq: {yesNo(liveValidation.canFillQubiq)}</div>
            <div>Can Use Aether On Qubiq: {yesNo(liveValidation.canUseAetherOnQubiq)}</div>
          </>
        ) : (
          <div>No live validation snapshot available.</div>
        )}
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

      {plot.valueModel && (
        <>
          <hr style={{ opacity: 0.15, margin: "16px 0" }} />
          <h4 style={sectionTitleStyle()}>Value Model</h4>
          <div className="detailsGrid">
            <div>Base Value: {plot.valueModel.baseValue}</div>
            <div>Rarity Multiplier: {plot.valueModel.rarityMultiplier}</div>
            <div>Lane Multiplier: {plot.valueModel.laneMultiplier}</div>
            <div>Nexus Multiplier: {plot.valueModel.nexusMultiplier}</div>
            <div>Historical Multiplier: {plot.valueModel.historicalMultiplier}</div>
            <div>Final Estimate: {plot.valueModel.finalEstimate}</div>
          </div>
        </>
      )}
    </div>
  );
}