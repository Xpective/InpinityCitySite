import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

type LiveWarnings = {
  district?: string;
  status?: string;
  history?: string;
};

type SectionId = "live" | "history";

// ============================================================
// 💎 IDEE 5: Section-Collapse-Memory (localStorage)
// ============================================================
const SECTION_MEMORY_KEY = "phircle-plot-details-sections";

function loadSectionMemory(): Record<SectionId, boolean> {
  const fallback: Record<SectionId, boolean> = { live: false, history: false };
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(SECTION_MEMORY_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      live: typeof parsed.live === "boolean" ? parsed.live : fallback.live,
      history: typeof parsed.history === "boolean" ? parsed.history : fallback.history,
    };
  } catch {
    return fallback;
  }
}

function saveSectionMemory(memory: Record<SectionId, boolean>) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SECTION_MEMORY_KEY, JSON.stringify(memory));
  } catch {}
}

// ============================================================
// HELPERS
// ============================================================
function pretty(value: string): string {
  return value.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase());
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

function normalizePlotId(value?: string | number | null): string | null {
  if (value == null) return null;
  const normalized = String(value).trim();
  return normalized ? normalized : null;
}

function getErrorMessage(error: unknown, fallback: string): string {
  if (!(error instanceof Error)) return fallback;
  if (error.message.includes("missing revert data") || error.message.includes("CALL_EXCEPTION")) {
    return `${fallback} ABI or contract mismatch on the live deployment.`;
  }
  return error.message || fallback;
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
function badgeStyle(tone: "gold" | "blue" | "green" | "red" | "gray" | "violet"): CSSProperties {
  const map = {
    gold: { background: "rgba(255,204,0,0.12)", border: "1px solid var(--color-primary, #ffcc00)", color: "var(--color-primary, #ffcc00)" },
    blue: { background: "rgba(90,140,255,0.14)", border: "1px solid #4a7bff", color: "#9bb7ff" },
    green: { background: "rgba(0,255,136,0.12)", border: "1px solid var(--color-success, #00ff88)", color: "var(--color-success, #00ff88)" },
    red: { background: "rgba(255,51,51,0.12)", border: "1px solid var(--color-danger, #ff3333)", color: "var(--color-danger, #ff3333)" },
    gray: { background: "rgba(255,255,255,0.06)", border: "1px solid var(--color-border, #333)", color: "var(--color-text-dim, #888)" },
    violet: { background: "rgba(192,96,255,0.12)", border: "1px solid var(--color-partner, #c060ff)", color: "var(--color-partner, #c060ff)" },
  };
  return {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    padding: "5px 10px",
    borderRadius: 999,
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.5px",
    fontFamily: "'Courier New', monospace",
    ...map[tone],
  };
}

function cardBlockStyle(): CSSProperties {
  return {
    display: "grid",
    gap: 8,
    padding: 12,
    borderRadius: 6,
    background: "rgba(8, 8, 16, 0.7)",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "var(--color-border, #333)",
    fontFamily: "'Courier New', monospace",
  };
}

// ============================================================
// 💎 IDEE 1: Copyable-Value Component
// ============================================================
function CopyableValue(props: {
  value: string;
  label: string;
  mono?: boolean;
  color?: string;
}) {
  const { value, label, mono = true, color } = props;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const ok = await copyToClipboard(value);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, minWidth: 0 }}>
      <strong
        style={{
          color: color || "var(--color-text, #e0e0e0)",
          fontFamily: mono ? "'Courier New', monospace" : undefined,
          wordBreak: "break-all",
        }}
      >
        {value}
      </strong>
      <button
        onClick={handleCopy}
        title={`Copy ${label}`}
        aria-label={`Copy ${label}`}
        style={{
          background: copied ? "rgba(0,255,136,0.15)" : "transparent",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: copied ? "var(--color-success)" : "transparent",
          borderRadius: 3,
          padding: "1px 4px",
          fontSize: 10,
          color: copied ? "var(--color-success)" : "var(--color-text-faint, #555)",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        {copied ? "✓" : "📋"}
      </button>
    </span>
  );
}

// ============================================================
// SIGNALS / IDEAS
// ============================================================
function getOpportunitySignals(
  plot: InfinityPlot,
  liveStatus: CityPlotStatusRead | null,
  liveHistory: CityPlotProvenanceRead | null,
  liveDistrict: CityDistrictRead | null
): Array<{ label: string; tone: "gold" | "blue" | "green" | "red" | "gray" | "violet" }> {
  const signals: Array<{ label: string; tone: "gold" | "blue" | "green" | "red" | "gray" | "violet" }> = [];

  if (plot.tier === "nexus" || plot.distanceToNexus < 90) signals.push({ label: "Prime Nexus Proximity", tone: "gold" });
  if ((plot.provenance?.legacyScore || 0) >= 140) signals.push({ label: "High Legacy Value", tone: "violet" });
  if ((plot.provenance?.provenanceScore || 0) >= 180) signals.push({ label: "Strong Provenance", tone: "blue" });
  if (plot.statusInfo?.canLayerUpgrade || liveStatus?.layerEligible) signals.push({ label: "Layer Upgrade Possible", tone: "green" });
  if (plot.statusInfo?.maintenanceLevel === "overdue") signals.push({ label: "Maintenance Overdue", tone: "red" });
  if (plot.statusInfo?.inactivityLevel === "critical") signals.push({ label: "Critical Inactivity", tone: "red" });
  if (plot.policy.sharedUse) signals.push({ label: "Shared Governance Zone", tone: "blue" });
  if (plot.policy.factionLocked) signals.push({ label: "Faction Restricted", tone: "gray" });
  if (liveDistrict?.isBorderline) signals.push({ label: "Borderline District", tone: "green" });
  if (liveHistory && getHistoricWeight(liveHistory) >= 220) signals.push({ label: "Historically Significant", tone: "violet" });
  if (plot.status === "reserved") signals.push({ label: "Reserved Build Slot", tone: "gold" });
  if (plot.status === "owned") signals.push({ label: "Owned / Active Plot", tone: "green" });
  if (plot.layoutState === "corrected") signals.push({ label: "Faction Side Corrected", tone: "gold" });
  if (!signals.length) signals.push({ label: "Stable Standard Plot", tone: "gray" });

  return signals;
}

function getRightsSummary(plot: InfinityPlot): string[] {
  const lines: string[] = [];
  if (plot.policy.isPersonal) lines.push("Private personal plot in the ∞ city structure.");
  if (plot.policy.isCommunity) lines.push("Reserved for shared community infrastructure and later governance.");
  if (plot.policy.isBorderline) lines.push("Borderline cooperation zone between Inpinity and Inphinity.");
  if (plot.policy.isNexus) lines.push("Core nexus bridge zone with strategic central importance.");
  if (plot.policy.factionLocked) lines.push("Bound to faction-side logic and placement rules.");
  if (plot.policy.sharedUse) lines.push("Designed for collective or cross-faction utility rather than simple ownership.");
  if (plot.policy.purchasable) lines.push("Prepared for a future purchase flow — not yet active.");
  else lines.push("Not part of the direct personal sale flow at this phase.");
  return lines;
}

function getGamePrepIdeas(
  plot: InfinityPlot,
  liveStatus: CityPlotStatusRead | null,
  liveHistory: CityPlotProvenanceRead | null,
  liveDistrict: CityDistrictRead | null
): string[] {
  const ideas: string[] = [];
  if (plot.policy.isPersonal) ideas.push("Personal plots are your main entry point for the private build loop.");
  if (plot.status === "free") ideas.push("Fresh candidate for reservation and first-cell setup.");
  if (plot.status === "reserved" || plot.status === "owned") ideas.push("Already in motion — prioritize Qubiq completion over switching context.");
  if (liveStatus?.layerEligible) ideas.push("Mark this plot for a later layer-upgrade path once the base grid is stable.");
  if (liveDistrict?.bonusBps && liveDistrict.bonusBps > 0) ideas.push(`District bonus is live (${liveDistrict.bonusBps} bps). Use it for future specialization.`);
  if (liveHistory && getHistoricWeight(liveHistory) >= 220) ideas.push("High historic weight makes this a prestige or showcase candidate.");
  if (plot.policy.isCommunity || plot.policy.isBorderline || plot.policy.isNexus) ideas.push("Keep this zone out of the personal build loop and treat it as shared-world planning.");
  if (plot.layoutState === "corrected") ideas.push("Faction side was corrected visually. Keep canonical side checks enabled before launch.");
  if (plot.statusInfo?.maintenanceLevel === "overdue") ideas.push("Overdue maintenance is a good narrative hook for repair or upkeep gameplay.");
  if (!ideas.length) ideas.push("Good fallback plot for early economy and onboarding flow tests.");
  return ideas.slice(0, 5);
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function PlotDetails({ plot, onToggleFavorite, showAdvanced = false }: Props) {
  const [liveDistrict, setLiveDistrict] = useState<CityDistrictRead | null>(null);
  const [liveStatus, setLiveStatus] = useState<CityPlotStatusRead | null>(null);
  const [liveHistory, setLiveHistory] = useState<CityPlotProvenanceRead | null>(null);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveError, setLiveError] = useState<string | null>(null);
  const [liveWarnings, setLiveWarnings] = useState<LiveWarnings>({});
  const [refreshTick, setRefreshTick] = useState(0);

  // 💎 IDEE 5: Section-Collapse-Memory
  const [sectionMemory] = useState(() => loadSectionMemory());
  const [liveCoreOpen, setLiveCoreOpen] = useState(showAdvanced || sectionMemory.live);
  const [historyOpen, setHistoryOpen] = useState(showAdvanced || sectionMemory.history);

  // 💎 IDEE 3: Sticky Header / Scroll
  const headerRef = useRef<HTMLDivElement>(null);
  const liveSectionRef = useRef<HTMLDetailsElement>(null);
  const historySectionRef = useRef<HTMLDetailsElement>(null);

  const normalizedPlotId = useMemo(() => normalizePlotId(plot?.plotId), [plot?.plotId]);
  const shouldLoadLive = Boolean(normalizedPlotId) && (showAdvanced || liveCoreOpen || historyOpen);

  // Sync section-memory → localStorage
  useEffect(() => {
    saveSectionMemory({ live: liveCoreOpen, history: historyOpen });
  }, [liveCoreOpen, historyOpen]);

  useEffect(() => {
    if (showAdvanced) {
      setLiveCoreOpen(true);
      setHistoryOpen(true);
    }
  }, [showAdvanced]);

  useEffect(() => {
    if (!plot) {
      setLiveDistrict(null);
      setLiveStatus(null);
      setLiveHistory(null);
      setLiveError(null);
      setLiveWarnings({});
      setLiveLoading(false);
      return;
    }
    setLiveDistrict(null);
    setLiveStatus(null);
    setLiveHistory(null);
    setLiveError(null);
    setLiveWarnings({});
  }, [plot?.id]);

  useEffect(() => {
    let cancelled = false;
    async function loadLiveDetails() {
      if (!normalizedPlotId || !shouldLoadLive) return;
      setLiveLoading(true);
      setLiveError(null);
      setLiveWarnings({});

      const [districtResult, statusResult, historyResult] = await Promise.allSettled([
        getDistrict(normalizedPlotId),
        readCityStatus(normalizedPlotId),
        getPlotProvenance(normalizedPlotId),
      ]);

      if (cancelled) return;

      const nextWarnings: LiveWarnings = {};

      if (districtResult.status === "fulfilled") setLiveDistrict(districtResult.value);
      else { setLiveDistrict(null); nextWarnings.district = getErrorMessage(districtResult.reason, "District read failed."); }

      if (statusResult.status === "fulfilled") setLiveStatus(statusResult.value);
      else { setLiveStatus(null); nextWarnings.status = getErrorMessage(statusResult.reason, "City status read failed."); }

      if (historyResult.status === "fulfilled") setLiveHistory(historyResult.value);
      else { setLiveHistory(null); nextWarnings.history = getErrorMessage(historyResult.reason, "History read failed."); }

      const succeededCount =
        Number(districtResult.status === "fulfilled") +
        Number(statusResult.status === "fulfilled") +
        Number(historyResult.status === "fulfilled");

      setLiveWarnings(nextWarnings);
      setLiveLoading(false);
      if (succeededCount === 0) setLiveError("No live source could be loaded for this plot.");
      else setLiveError(null);
    }
    void loadLiveDetails();
    return () => { cancelled = true; };
  }, [normalizedPlotId, shouldLoadLive, refreshTick]);

  const scrollToSection = useCallback((sectionId: SectionId) => {
    const ref = sectionId === "live" ? liveSectionRef : historySectionRef;
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    if (sectionId === "live") setLiveCoreOpen(true);
    else setHistoryOpen(true);
  }, []);

  // === GUARD: kein Plot ===
  if (!plot) {
    return (
      <div className="detailsCard" style={{ textAlign: "center", padding: "40px 20px" }}>
        <div style={{ fontSize: "48px", opacity: 0.4, marginBottom: 12 }}>🏙</div>
        <h3
          style={{
            color: "var(--color-primary, #ffcc00)",
            marginTop: 0,
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontSize: "14px",
          }}
        >
          Plot Details
        </h3>
        <div style={{ color: "var(--color-text-dim, #888)", fontSize: "12px", lineHeight: 1.6 }}>
          Select a plot on the map to see its details, ownership, and build status.
        </div>
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
  const prepIdeas = getGamePrepIdeas(plot, liveStatus, liveHistory, liveDistrict);

  const rarityTone = (() => {
    const r = plot.rarity?.toLowerCase();
    if (r === "bronze") return "#cd7f32";
    if (r === "silver") return "#c0c0c0";
    if (r === "gold") return "#ffcc00";
    if (r === "platinum") return "#e5e4e2";
    if (r === "diamond") return "#b9f2ff";
    return "var(--color-text, #e0e0e0)";
  })();

  const factionColor =
    plot.faction === "inpinity" ? "#4a7bff" :
    plot.faction === "inphinity" ? "#ff5858" :
    "var(--color-text-dim, #888)";

  // 💎 IDEE 4: Live-Status-Puls für kritische Zustände
  const hasCriticalStatus =
    statusInfo?.maintenanceLevel === "overdue" ||
    statusInfo?.inactivityLevel === "critical";

  return (
    <div className="detailsCard">
      {/* === STICKY HEADER === */}
      <div
        ref={headerRef}
        className="detailsHeader"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "rgba(8, 8, 16, 0.98)",
          backdropFilter: "blur(8px)",
          marginBottom: 8,
          paddingBottom: 8,
          borderBottomWidth: 1,
          borderBottomStyle: "solid",
          borderBottomColor: "var(--color-border-soft, #1a1a1a)",
        }}
      >
        <div>
          <h3 style={{ margin: 0, display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span>{plot.label}</span>
            <span
              style={{
                fontSize: "10px",
                padding: "3px 8px",
                borderRadius: 999,
                background: `${rarityTone}22`,
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: rarityTone,
                color: rarityTone,
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            >
              {pretty(plot.rarity)}
            </span>
            {hasCriticalStatus && (
              <span
                title="This plot needs attention"
                style={{
                  fontSize: "10px",
                  animation: "ip-pulse 1.8s ease-in-out infinite",
                  color: "var(--color-danger, #ff3333)",
                }}
              >
                ●
              </span>
            )}
          </h3>
          <div style={{ marginTop: 6, fontSize: "11px", color: "var(--color-text-dim)", letterSpacing: "0.5px" }}>
            <span style={{ color: factionColor, fontWeight: "bold" }}>{pretty(plot.faction)}</span>
            {" · "}
            {pretty(plot.status)}
            {" · "}
            {pretty(plot.plotKind)}
          </div>
        </div>

        <button
          className="ip-btn ip-btn--ghost"
          onClick={() => onToggleFavorite(plot.id)}
          style={{ fontSize: "11px", padding: "6px 12px" }}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>

      {/* === STICKY SECTION NAV === */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 12,
          padding: 4,
          background: "rgba(255,255,255,0.02)",
          borderRadius: 6,
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: "var(--color-border-soft, #1a1a1a)",
        }}
        role="tablist"
        aria-label="Jump to section"
      >
        <button
          onClick={() => scrollToSection("live")}
          style={{
            flex: 1,
            padding: "6px 10px",
            background: liveCoreOpen ? "rgba(0,229,255,0.1)" : "transparent",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: liveCoreOpen ? "var(--color-info, #00e5ff)" : "transparent",
            borderRadius: 4,
            color: liveCoreOpen ? "var(--color-info, #00e5ff)" : "var(--color-text-dim, #888)",
            fontSize: 10,
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          📡 Live Data
        </button>
        <button
          onClick={() => scrollToSection("history")}
          style={{
            flex: 1,
            padding: "6px 10px",
            background: historyOpen ? "rgba(192,96,255,0.1)" : "transparent",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: historyOpen ? "var(--color-partner, #c060ff)" : "transparent",
            borderRadius: 4,
            color: historyOpen ? "var(--color-partner, #c060ff)" : "var(--color-text-dim, #888)",
            fontSize: 10,
            fontFamily: "'Courier New', monospace",
            fontWeight: "bold",
            letterSpacing: 1,
            cursor: "pointer",
            textTransform: "uppercase",
          }}
        >
          📜 History
        </button>
      </div>

      {plot.layoutNote && (
        <div
          style={{
            borderLeftWidth: 3,
            borderLeftStyle: "solid",
            borderLeftColor: "var(--color-info)",
            paddingLeft: 10,
            fontSize: "11px",
            color: "var(--color-text-dim)",
            marginBottom: 12,
            marginTop: 0,
          }}
        >
          <strong style={{ color: "var(--color-info)" }}>Placement note:</strong> {plot.layoutNote}
        </div>
      )}

      {/* === QUICK STATS === */}
      <div className="detailsGrid" style={{ marginTop: 12 }}>
        <div>
          <span style={{ color: "var(--color-text-dim)" }}>Plot ID</span><br />
          {normalizedPlotId ? (
            <CopyableValue value={normalizedPlotId} label="Plot ID" color="var(--color-info)" />
          ) : (
            <strong>—</strong>
          )}
        </div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Side</span><br /><strong>{pretty(plot.side)}</strong></div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Tier</span><br /><strong>{pretty(plot.tier)}</strong></div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Lane</span><br /><strong>{plot.lane}</strong></div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Nexus Weight</span><br /><strong style={{ color: "var(--color-primary)" }}>{laneWeight}</strong></div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Nexus Distance</span><br /><strong>{plot.distanceToNexus}</strong></div>
        <div><span style={{ color: "var(--color-text-dim)" }}>Est. Value</span><br /><strong style={{ color: "var(--color-primary)" }}>{estimatedValue} PIT</strong></div>
        <div>
          <span style={{ color: "var(--color-text-dim)" }}>Owner</span><br />
          {plot.owner ? (
            <CopyableValue value={plot.ownerLabel || plot.owner} label="Owner address" />
          ) : (
            <strong>—</strong>
          )}
        </div>
        {plot.plotId && (
          <div style={{ gridColumn: "1 / -1", marginTop: 4 }}>
            <a
              href={`https://basescan.org/token/0x0547a35c2Ff215004A2EBfe2Be5f3A8EeE6A5323?a=${plot.plotId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                padding: "4px 10px",
                background: "rgba(0,229,255,0.08)",
                borderWidth: 1,
                borderStyle: "solid",
                borderColor: "var(--color-info, #00e5ff)",
                borderRadius: 999,
                color: "var(--color-info, #00e5ff)",
                fontSize: 10,
                fontWeight: "bold",
                letterSpacing: 1,
                textDecoration: "none",
                fontFamily: "'Courier New', monospace",
              }}
            >
              ↗ View on BaseScan
            </a>
          </div>
        )}
      </div>

      <hr style={{ opacity: 0.15, margin: "16px 0", borderColor: "var(--color-border)" }} />

      {/* === RIGHTS & ROLE === */}
      <h4 style={{ marginTop: 0, marginBottom: 10, fontSize: "13px", color: "var(--color-primary)" }}>Rights & Role</h4>
      <div style={cardBlockStyle()}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {policy.isPersonal && <span style={badgeStyle("gray")}>Personal Zone</span>}
          {policy.isCommunity && <span style={badgeStyle("red")}>Community Reserve</span>}
          {policy.isBorderline && <span style={badgeStyle("green")}>Borderline Zone</span>}
          {policy.isNexus && <span style={badgeStyle("gold")}>Nexus Core</span>}
          {policy.sharedUse && <span style={badgeStyle("blue")}>Shared Use</span>}
          {policy.factionLocked && <span style={badgeStyle("violet")}>Faction Locked</span>}
        </div>
        <div style={{ display: "grid", gap: 4, fontSize: "11px", color: "var(--color-text-dim)" }}>
          {rightsSummary.map((line, i) => (
            <div key={i}>• {line}</div>
          ))}
        </div>
      </div>

      {/* === SIGNALS & PREP === */}
      <h4 style={{ marginTop: 16, marginBottom: 10, fontSize: "13px", color: "var(--color-primary)" }}>Signals & Prep</h4>
      <div style={cardBlockStyle()}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {signals.map((signal, i) => (
            <span
              key={`${signal.label}-${i}`}
              style={{
                ...badgeStyle(signal.tone),
                animation:
                  signal.tone === "red"
                    ? "ip-pulse 2s ease-in-out infinite"
                    : undefined,
              }}
            >
              {signal.label}
            </span>
          ))}
        </div>
        <div style={{ display: "grid", gap: 4, fontSize: "11px", color: "var(--color-text-dim)" }}>
          {prepIdeas.map((idea, i) => (
            <div key={i}>• {idea}</div>
          ))}
        </div>
      </div>

      {/* === LIVE DATA === */}
      <details
        ref={liveSectionRef}
        className="detailSection"
        open={liveCoreOpen}
        onToggle={(event) => setLiveCoreOpen((event.currentTarget as HTMLDetailsElement).open)}
        style={{ marginTop: 16 }}
      >
        <summary className="detailSectionSummary">📡 Live Core Data</summary>

        <div style={{ ...cardBlockStyle(), marginTop: 12 }}>
          <div style={{ display: "flex", gap: 8, justifyContent: "space-between", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ fontSize: "11px", color: "var(--color-text-dim)" }}>
              Reads load independently — one failure doesn't blank the panel.
            </div>
            <button
              type="button"
              className="ip-btn ip-btn--ghost"
              onClick={() => setRefreshTick((v) => v + 1)}
              style={{ fontSize: "10px", padding: "5px 10px" }}
            >
              ↻ Refresh
            </button>
          </div>

          {liveLoading && (
            <div style={{ fontSize: "11px", color: "var(--color-info)" }}>⏳ Loading live reads…</div>
          )}
          {liveError && (
            <div style={{ fontSize: "11px", color: "var(--color-danger)" }}>⚠ {liveError}</div>
          )}

          {Object.values(liveWarnings).length > 0 && (
            <div style={{ display: "grid", gap: 4 }}>
              {liveWarnings.district && <div style={{ fontSize: "10px", color: "var(--color-warning)" }}>District: {liveWarnings.district}</div>}
              {liveWarnings.status && <div style={{ fontSize: "10px", color: "var(--color-warning)" }}>Status: {liveWarnings.status}</div>}
              {liveWarnings.history && <div style={{ fontSize: "10px", color: "var(--color-warning)" }}>History: {liveWarnings.history}</div>}
            </div>
          )}

          {!liveLoading && (
            <>
              <div className="info-row"><span>On-chain Plot ID</span><strong>{normalizedPlotId || "—"}</strong></div>
              <div className="info-row"><span>District</span><strong>{liveDistrict ? getDistrictKindLabel(liveDistrict.kind) : "—"}</strong></div>
              <div className="info-row"><span>District Faction</span><strong>{liveDistrict ? getDistrictFactionLabel(liveDistrict.faction) : "—"}</strong></div>
              <div className="info-row"><span>District Bonus</span><strong>{liveDistrict ? `${liveDistrict.bonusBps} bps` : "—"}</strong></div>
              <div className="info-row"><span>Derived Status</span><strong>{liveStatus ? getCityStatusLabel(liveStatus.derivedStatus) : "—"}</strong></div>
              <div className="info-row"><span>Manual Status</span><strong>{liveStatus ? getCityStatusLabel(liveStatus.manualStatus) : "—"}</strong></div>
              <div className="info-row"><span>Layer Eligible</span><strong>{liveStatus ? yesNo(liveStatus.layerEligible) : "—"}</strong></div>
              <div className="info-row"><span>Origin Faction</span><strong>{liveHistory ? getHistoryFactionLabel(liveHistory.originFaction) : "—"}</strong></div>
              <div className="info-row"><span>Historic Weight</span><strong>{liveHistory ? getHistoricWeight(liveHistory) : "—"}</strong></div>
            </>
          )}
        </div>
      </details>

      {/* === HISTORY === */}
      <details
        ref={historySectionRef}
        className="detailSection"
        open={historyOpen}
        onToggle={(event) => setHistoryOpen((event.currentTarget as HTMLDetailsElement).open)}
        style={{ marginTop: 12 }}
      >
        <summary className="detailSectionSummary">📜 History & Value Model</summary>

        <div className="detailsGrid" style={{ marginTop: 12, marginBottom: 12 }}>
          <div><span style={{ color: "var(--color-text-dim)" }}>Historic Score</span><br /><strong>{provenance?.historicScore ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Legacy Score</span><br /><strong>{provenance?.legacyScore ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Provenance Score</span><br /><strong>{provenance?.provenanceScore ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Layer Count</span><br /><strong>{provenance?.layerCount ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Ownership Transfers</span><br /><strong>{provenance?.ownershipTransfers ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Aether Uses</span><br /><strong>{provenance?.aetherUses ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Historic Core</span><br /><strong>{provenance ? yesNo(provenance.isHistoricCore) : "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Age (days)</span><br /><strong>{provenance?.ageInDays ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Inactivity</span><br /><strong style={{ color: statusInfo?.inactivityLevel === "critical" ? "var(--color-danger)" : undefined }}>{statusInfo?.inactivityLevel ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Maintenance</span><br /><strong style={{ color: statusInfo?.maintenanceLevel === "overdue" ? "var(--color-danger)" : undefined }}>{statusInfo?.maintenanceLevel ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Inactivity Days</span><br /><strong>{statusInfo?.inactivityDays ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Maintenance Age</span><br /><strong>{statusInfo?.maintenanceAgeDays ?? "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Layer Eligible</span><br /><strong>{statusInfo ? yesNo(statusInfo.layerEligible) : "—"}</strong></div>
          <div><span style={{ color: "var(--color-text-dim)" }}>Can Layer Upgrade</span><br /><strong>{statusInfo ? yesNo(statusInfo.canLayerUpgrade) : "—"}</strong></div>
          {plot.valueModel && <div><span style={{ color: "var(--color-text-dim)" }}>Base Value</span><br /><strong>{plot.valueModel.baseValue}</strong></div>}
          {plot.valueModel && <div><span style={{ color: "var(--color-text-dim)" }}>Final Estimate</span><br /><strong style={{ color: "var(--color-primary)" }}>{plot.valueModel.finalEstimate}</strong></div>}
        </div>

        <div style={cardBlockStyle()}>
          <div className="info-row"><span>Created</span><strong>{formatUnix(provenance?.createdAt ?? plot.createdAt)}</strong></div>
          <div className="info-row"><span>Provenance Updated</span><strong>{formatUnix(provenance?.lastUpdated)}</strong></div>
          <div className="info-row"><span>Last Activity</span><strong>{formatUnix(statusInfo?.lastActivityAt)}</strong></div>
          <div className="info-row"><span>Last Maintenance</span><strong>{formatUnix(statusInfo?.lastMaintenanceAt)}</strong></div>
          <div className="info-row"><span>Live Activity</span><strong>{formatUnix(liveStatus?.lastActivityAt)}</strong></div>
          <div className="info-row"><span>Live Maintenance</span><strong>{formatUnix(liveStatus?.lastMaintenanceAt)}</strong></div>
        </div>

        <div
          style={{
            marginTop: 12,
            borderLeftWidth: 3,
            borderLeftStyle: "solid",
            borderLeftColor: "var(--color-info)",
            paddingLeft: 10,
            fontSize: "10px",
            color: "var(--color-text-dim)",
          }}
        >
          Validation helper rows stay removed here because they previously relied on a hardcoded slot and cell context. Reconnect them only from the active build slot and selected Qubiq cell inside the terminal.
        </div>
      </details>
    </div>
  );
}