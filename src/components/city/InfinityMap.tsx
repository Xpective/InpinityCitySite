import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import type { FocusEvent, KeyboardEvent, MouseEvent } from "react";
import type { InfinityPlot } from "../../types/infinity";
import {
  CENTER_X,
  CENTER_Y,
  SVG_HEIGHT,
  SVG_WIDTH,
  getCanonicalSideFromFaction,
  getFactionGlow,
  getFactionStroke,
  getInfinityPath,
} from "../../lib/infinity-layout";
import {
  colors,
  fontSize,
  letterSpacing,
  radius,
  spacing,
  transition,
  zIndex,
} from "../../lib/theme";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

// ============================================================
// PROPS
// ============================================================
type Props = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;
  /** Advanced mode enables extra warnings + side-correction badges */
  advancedMode?: boolean;
  walletAddress?: string | null;
  userFaction?: "inpinity" | "inphinity" | null;
  isLoading?: boolean;
  isDemoData?: boolean;
  onConnectWallet?: () => void;
  onChooseFaction?: () => void;
  onReservePlot?: () => void;
  onMintPlot?: () => void;
  onResetFilters?: () => void;
};

// ============================================================
// STATUS STYLES
// ============================================================
const STATUS_STYLES = {
  reserved: { baseColor: "#ffaa33", pattern: "url(#diagonalStripes)", borderColor: "#ffaa33", opacity: 0.9, label: "Reserved" },
  owned: { baseColor: "#44ff44", pattern: "url(#solidFill)", borderColor: "#00aa00", opacity: 1, label: "Owned" },
  locked: { baseColor: "#888888", pattern: "url(#crossHatch)", borderColor: "#555555", opacity: 0.7, label: "Locked" },
  free: { baseColor: "#ffffff", pattern: undefined, borderColor: "#cccccc", opacity: 0.8, label: "Free" },
  community: { baseColor: "#ff3b30", pattern: "url(#communityPattern)", borderColor: "#ff0000", opacity: 0.95, label: "Community" },
  borderline: { baseColor: "#59ff2b", pattern: "url(#borderlinePattern)", borderColor: "#00ff00", opacity: 0.95, label: "Borderline" },
  nexus: { baseColor: "#ffd700", pattern: "url(#nexusPattern)", borderColor: "#ffaa00", opacity: 1, label: "Nexus" },
} as const;

type PlotTypeFilter = { personal: boolean; community: boolean; borderline: boolean; nexus: boolean };

// ============================================================
// HELPERS
// ============================================================
function mix(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function getRenderSide(plot: InfinityPlot): "left" | "right" | "center" {
  if (plot.plotKind === "personal-5x5") {
    const canonical = getCanonicalSideFromFaction(plot.faction);
    if (canonical) return canonical;
  }
  return plot.side;
}

function getEnhancedHeatColor(plot: InfinityPlot): string {
  const historicScore = plot.provenance?.historicScore;
  const aetherUses = plot.provenance?.aetherUses;
  const renderSide = getRenderSide(plot);

  if (historicScore !== undefined) {
    const intensity = Math.min(historicScore / 1000, 1);
    if (renderSide === "left") return `rgba(255, ${Math.round(100 + intensity * 155)}, 100, ${0.4 + intensity * 0.6})`;
    if (renderSide === "right") return `rgba(100, ${Math.round(100 + intensity * 155)}, 255, ${0.4 + intensity * 0.6})`;
  }
  if (aetherUses !== undefined) {
    const intensity = Math.min(aetherUses / 10, 1);
    return `rgba(255, 215, 0, ${0.3 + intensity * 0.7})`;
  }

  const d = Math.min(plot.distanceToNexus, 360);
  const intensity = 1 - d / 360;

  if (renderSide === "left") return `rgb(${Math.round(255 - intensity * 12)}, ${Math.round(145 + intensity * 70)}, ${Math.max(28, Math.round(75 - intensity * 35))})`;
  if (renderSide === "right") return `rgb(${Math.round(95 + intensity * 55)}, ${Math.round(125 + intensity * 35)}, ${Math.round(255 - intensity * 24)})`;
  return `rgb(${245 - intensity * 8}, ${220 - intensity * 10}, ${120})`;
}

function getPersonalSideColor(plot: InfinityPlot): string {
  const t = Math.min(plot.distanceToNexus / 380, 1);
  const renderSide = getRenderSide(plot);

  if (renderSide === "left") {
    const inner = { r: 245, g: 196, b: 110 };
    const outer = { r: 134, g: 122, b: 116 };
    return `rgb(${mix(inner.r, outer.r, t)}, ${mix(inner.g, outer.g, t)}, ${mix(inner.b, outer.b, t)})`;
  }
  if (renderSide === "right") {
    const inner = { r: 245, g: 196, b: 110 };
    const outer = { r: 116, g: 126, b: 142 };
    return `rgb(${mix(inner.r, outer.r, t)}, ${mix(inner.g, outer.g, t)}, ${mix(inner.b, outer.b, t)})`;
  }
  return "rgb(220,200,140)";
}

function getStatusBasedFill(plot: InfinityPlot, heatmapMode: boolean): { fill: string; pattern?: string } {
  if (heatmapMode) return { fill: getEnhancedHeatColor(plot) };
  if (plot.faction === "community") return { fill: STATUS_STYLES.community.baseColor, pattern: STATUS_STYLES.community.pattern };
  if (plot.faction === "borderline") return { fill: STATUS_STYLES.borderline.baseColor, pattern: STATUS_STYLES.borderline.pattern };
  if (plot.faction === "neutral") return { fill: "#1d4cff" };
  if (plot.faction === "inpinity" || plot.faction === "inphinity") return { fill: getPersonalSideColor(plot) };
  const statusStyle = STATUS_STYLES[plot.status] || STATUS_STYLES.free;
  return { fill: statusStyle.baseColor, pattern: statusStyle.pattern };
}

function getWarningGlow(plot: InfinityPlot): string | undefined {
  const inactivity = plot.statusInfo?.inactivityLevel;
  const maintenance = plot.statusInfo?.maintenanceLevel;
  if (inactivity === "critical" || maintenance === "overdue") return "url(#dangerGlow)";
  if (inactivity === "warning" || maintenance === "due") return "url(#warningGlow)";
  return undefined;
}

function getOwnerShort(owner?: string | null): string {
  if (!owner) return "—";
  if (owner.length < 10) return owner;
  return `${owner.substring(0, 6)}...${owner.substring(owner.length - 4)}`;
}

function isMyPlot(plot: InfinityPlot, walletAddress?: string | null): boolean {
  if (!walletAddress || !plot.owner) return false;
  return plot.owner.toLowerCase() === walletAddress.toLowerCase();
}

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}

// ============================================================
// 💎 IDEE 3: Selection Memory persistence
// ============================================================
const SELECTION_MEMORY_KEY = "phircle-city-selection-memory";
const MAX_SELECTION_MEMORY = 3;

function loadSelectionMemory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SELECTION_MEMORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_SELECTION_MEMORY) : [];
  } catch {
    return [];
  }
}

function saveSelectionMemory(ids: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(
      SELECTION_MEMORY_KEY,
      JSON.stringify(ids.slice(0, MAX_SELECTION_MEMORY))
    );
  } catch {}
}

// ============================================================
// MAIN COMPONENT
// ============================================================
export default function InfinityMap({
  plots,
  selectedPlot,
  onSelectPlot,
  showLabels,
  heatmapMode,
  advancedMode = false, // in Props, aber als Info-Flag genutzt
  walletAddress,
  userFaction,
  isLoading = false,
  isDemoData = false,
  onConnectWallet,
  onChooseFaction,
  onReservePlot,
  onMintPlot,
  onResetFilters,
}: Props) {
  const infinityPath = getInfinityPath();
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion] = useState(prefersReducedMotion);

  const [plotTypeFilter, setPlotTypeFilter] = useState<PlotTypeFilter>(() => {
    try {
      const raw = localStorage.getItem("phircle-city-filters");
      if (raw) return JSON.parse(raw);
    } catch {}
    return { personal: true, community: true, borderline: true, nexus: true };
  });

  const [zoomedPlot, setZoomedPlot] = useState<InfinityPlot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<InfinityPlot | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mapZoom, setMapZoom] = useState(1);
  const [showLegend, setShowLegend] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  const [myPlotsOnly, setMyPlotsOnly] = useState(false);

  // 💎 IDEE 3: Selection Memory
  const [selectionMemory, setSelectionMemory] = useState<string[]>(loadSelectionMemory);

  // 💎 IDEE 1: Keyboard-Navigation
  const [focusedPlotIdx, setFocusedPlotIdx] = useState<number>(-1);

  // 💎 IDEE 5: Mini-Map Sichtfeld
  const [showMiniMap, setShowMiniMap] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem("phircle-city-filters", JSON.stringify(plotTypeFilter));
    } catch {}
  }, [plotTypeFilter]);

  // ============================================================
  // 💎 IDEE 3: Selection-Memory Update
  // ============================================================
  useEffect(() => {
    if (!selectedPlot?.id) return;
    setSelectionMemory((prev) => {
      const next = [selectedPlot.id, ...prev.filter((id) => id !== selectedPlot.id)]
        .slice(0, MAX_SELECTION_MEMORY);
      saveSelectionMemory(next);
      return next;
    });
  }, [selectedPlot?.id]);

  // ============================================================
  // SCOPED STATS
  // ============================================================
  const scopedStats = useMemo(() => {
    return {
      total: plots.length,
      personal: plots.filter((p) => p.policy.isPersonal).length,
      community: plots.filter((p) => p.policy.isCommunity).length,
      borderline: plots.filter((p) => p.policy.isBorderline).length,
      nexus: plots.filter((p) => p.policy.isNexus).length,
      mine: plots.filter((p) => isMyPlot(p, walletAddress)).length,
      mismatches: plots.filter((p) => p.factionSideMismatch).length,
    };
  }, [plots, walletAddress]);

  // ============================================================
  // FILTERED PLOTS
  // ============================================================
  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      if (myPlotsOnly && !isMyPlot(plot, walletAddress)) return false;
      if (plot.plotKind === "personal-5x5" && !plotTypeFilter.personal) return false;
      if (plot.plotKind === "community-25x25" && !plotTypeFilter.community) return false;
      if (plot.plotKind === "borderline-25x25" && !plotTypeFilter.borderline) return false;
      if (plot.plotKind === "nexus" && !plotTypeFilter.nexus) return false;
      return true;
    });
  }, [plots, plotTypeFilter, myPlotsOnly, walletAddress]);

  // ============================================================
  // HANDLERS
  // ============================================================
  const handleMouseMove = useCallback((event: MouseEvent<SVGGElement>, plot: InfinityPlot) => {
    setHoveredPlot(plot);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => setHoveredPlot(null), []);

  const handlePlotFocus = useCallback((event: FocusEvent<SVGGElement>, plot: InfinityPlot) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHoveredPlot(plot);
    setTooltipPosition({ x: rect.left + rect.width / 2, y: rect.top + 8 });
  }, []);

  const handlePlotClick = useCallback(
    (plot: InfinityPlot) => {
      if (plot.plotKind === "community-25x25" || plot.plotKind === "borderline-25x25") {
        setZoomedPlot(plot);
      }
      onSelectPlot(plot);
    },
    [onSelectPlot]
  );

  const handlePlotKeyDown = useCallback(
    (event: KeyboardEvent<SVGGElement>, plot: InfinityPlot) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handlePlotClick(plot);
      }
    },
    [handlePlotClick]
  );

  const changeZoom = useCallback((delta: number) => {
    setMapZoom((prev) => clamp(Number((prev + delta).toFixed(2)), 0.7, 2.4));
  }, []);

  const resetZoom = useCallback(() => {
    setMapZoom(1);
    if (containerRef.current) {
      containerRef.current.scrollTo({ left: 0, top: 0, behavior: "smooth" });
    }
  }, []);

  const resetAllFilters = useCallback(() => {
    setPlotTypeFilter({ personal: true, community: true, borderline: true, nexus: true });
    setMyPlotsOnly(false);
    try {
      localStorage.removeItem("phircle-city-filters");
    } catch {}
    onResetFilters?.();
  }, [onResetFilters]);

  const jumpToMyPlot = useCallback(() => {
    const myPlot = plots.find((p) => isMyPlot(p, walletAddress));
    if (myPlot) {
      onSelectPlot(myPlot);
      setMyPlotsOnly(true);
    }
  }, [plots, walletAddress, onSelectPlot]);

  // ============================================================
  // 💎 IDEE 1: Keyboard-Navigation (ArrowKeys)
  // ============================================================
  const handleMapKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (filteredPlots.length === 0) return;
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
      e.preventDefault();

      let nextIdx = focusedPlotIdx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        nextIdx = (focusedPlotIdx + 1) % filteredPlots.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        nextIdx = (focusedPlotIdx - 1 + filteredPlots.length) % filteredPlots.length;
      } else if (e.key === "Home") {
        nextIdx = 0;
      } else if (e.key === "End") {
        nextIdx = filteredPlots.length - 1;
      }

      setFocusedPlotIdx(nextIdx);
      const plot = filteredPlots[nextIdx];
      if (plot) {
        onSelectPlot(plot);
      }
    },
    [filteredPlots, focusedPlotIdx, onSelectPlot]
  );

  const hasActiveFilter =
    !plotTypeFilter.personal ||
    !plotTypeFilter.community ||
    !plotTypeFilter.borderline ||
    !plotTypeFilter.nexus ||
    myPlotsOnly;

  // ============================================================
  // GUARDS
  // ============================================================
  if (isLoading) {
    return (
      <MapPlaceholder
        variant="loading"
        icon="⏳"
        title="Loading city data…"
        subtitle="Connecting to Base (Chain 8453) — the map will appear shortly."
      />
    );
  }

  if (walletAddress === null && plots.length === 0) {
    return (
      <MapPlaceholder
        variant="wallet"
        icon="🔌"
        title="Connect your wallet"
        subtitle="Your journey into the city begins with your wallet. Connect it to choose your faction and reserve your first plot."
        cta="Connect Wallet"
        onCta={onConnectWallet}
      />
    );
  }

  if (walletAddress && userFaction === null && plots.length === 0) {
    return (
      <MapPlaceholder
        variant="faction"
        icon="⚔️"
        title="Choose your faction"
        subtitle="Inpinity or Inphinity — your choice defines which side of the ∞ city you build on. Your map appears after you pick a side."
        cta="Choose Faction"
        onCta={onChooseFaction}
      />
    );
  }

  if (plots.length === 0) {
    return (
      <MapPlaceholder
        variant="empty"
        icon="🏙️"
        title="The city is still empty"
        subtitle="Be the first: reserve your plot at the Nexus and start your build. Once your plot exists on-chain, it will appear here."
        cta="Reserve Plot"
        onCta={onReservePlot || onMintPlot}
      />
    );
  }

  if (filteredPlots.length === 0) {
    return (
      <MapPlaceholder
        variant="empty"
        icon="🔍"
        title="No plots match your filters"
        subtitle={
          myPlotsOnly
            ? "You have no plots of your own yet. Reset filters to see all plots, or reserve your first plot."
            : "Your current filter combination shows no plots. Reset filters to see everything."
        }
        cta="Reset Filters"
        onCta={resetAllFilters}
        secondaryCta={myPlotsOnly ? "Reserve Plot" : undefined}
        onSecondaryCta={myPlotsOnly ? onReservePlot : undefined}
      />
    );
  }

  // ============================================================
  // 💎 IDEE 4: Faction Badge helper
  // ============================================================
  const factionBadge = (() => {
    if (!userFaction) {
      return { label: "No faction", color: colors.textFaint, icon: "○" };
    }
    return userFaction === "inpinity"
      ? { label: "Inpinity", color: "#4a7bff", icon: "◈" }
      : { label: "Inphinity", color: "#ff5858", icon: "◈" };
  })();

  // ============================================================
  // MAIN RENDER
  // ============================================================
  return (
    <div
      className="mapWrap"
      id="city-map-capture"
      ref={containerRef}
      style={{
        position: "relative",
        background: `radial-gradient(ellipse at center, ${colors.bgSoft} 0%, ${colors.bg} 80%)`,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing[3],
      }}
      onKeyDown={handleMapKeyDown}
      tabIndex={-1}
    >
      {isDemoData && (
        <div
          style={{
            background: "rgba(255,136,0,0.15)",
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: colors.warning,
            color: colors.warning,
            borderRadius: radius.md,
            padding: `${spacing[2]} ${spacing[3]}`,
            fontSize: fontSize.sm,
            letterSpacing: letterSpacing.base,
            marginBottom: spacing[2],
            textAlign: "center",
          }}
        >
          ⚠️ Demo data — connect wallet and choose a faction for real plots
        </div>
      )}

      {/* 💎 IDEE 4: Faction Badge + Advanced Warning */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: spacing[2],
          marginBottom: spacing[2],
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: spacing[2],
            padding: `${spacing[1]} ${spacing[3]}`,
            background: `${factionBadge.color}15`,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: factionBadge.color,
            borderRadius: 999,
            fontSize: fontSize.xs,
            color: factionBadge.color,
            fontWeight: "bold",
            letterSpacing: letterSpacing.base,
            textTransform: "uppercase",
          }}
        >
          <span aria-hidden="true">{factionBadge.icon}</span>
          {factionBadge.label}
          {scopedStats.mine > 0 && (
            <span style={{ opacity: 0.7 }}>· {scopedStats.mine} yours</span>
          )}
        </div>

        {/* Advanced-Mode-Warnung (produktive Nutzung von advancedMode) */}
        {advancedMode && scopedStats.mismatches > 0 && (
          <div
            style={{
              padding: `${spacing[1]} ${spacing[3]}`,
              background: "rgba(255,157,157,0.12)",
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#ff9d9d",
              borderRadius: radius.md,
              fontSize: fontSize.xs,
              color: "#ff9d9d",
              letterSpacing: letterSpacing.base,
            }}
          >
            ⚠ {scopedStats.mismatches} side correction{scopedStats.mismatches !== 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* 💎 IDEE 3: Selection Memory Chips */}
      {selectionMemory.length > 0 && (
        <div
          style={{
            display: "flex",
            gap: spacing[1],
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: spacing[2],
            fontSize: fontSize.xs,
            color: colors.textFaint,
          }}
        >
          <span style={{ letterSpacing: letterSpacing.base, textTransform: "uppercase" }}>
            Recent:
          </span>
          {selectionMemory.map((id) => {
            const plot = plots.find((p) => p.id === id);
            if (!plot) return null;
            const isActive = selectedPlot?.id === id;
            return (
              <button
                key={id}
                onClick={() => onSelectPlot(plot)}
                style={{
                  padding: `2px ${spacing[2]}`,
                  background: isActive ? colors.primary : "rgba(255,255,255,0.05)",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: isActive ? colors.primary : colors.border,
                  borderRadius: 999,
                  fontSize: fontSize.xs,
                  color: isActive ? "#000" : colors.textDim,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: "bold",
                  letterSpacing: letterSpacing.tight,
                  cursor: "pointer",
                }}
                aria-label={`Jump to recently viewed plot ${plot.label}`}
              >
                {plot.label}
              </button>
            );
          })}
        </div>
      )}

      {/* UTILITY BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: spacing[2],
          marginBottom: spacing[2],
        }}
      >
        <div style={{ display: "flex", gap: spacing[1], flexWrap: "wrap" }}>
          <button
            type="button"
            className={`toolbarButton ${showFilters ? "active" : ""}`}
            onClick={() => setShowFilters((v) => !v)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <button
            type="button"
            className={`toolbarButton ${showLegend ? "active" : ""}`}
            onClick={() => setShowLegend((v) => !v)}
          >
            {showLegend ? "Hide Legend" : "Show Legend"}
          </button>
          <button
            type="button"
            className={`toolbarButton ${showMiniMap ? "active" : ""}`}
            onClick={() => setShowMiniMap((v) => !v)}
            title="Toggle mini map"
          >
            🗺 Mini Map
          </button>
          {walletAddress && scopedStats.mine > 0 && (
            <button
              type="button"
              className={`toolbarButton ${myPlotsOnly ? "active" : ""}`}
              onClick={() => setMyPlotsOnly((v) => !v)}
              title="Only show my plots"
            >
              💎 My Plots ({scopedStats.mine})
            </button>
          )}
          {walletAddress && scopedStats.mine > 0 && !myPlotsOnly && (
            <button
              type="button"
              className="toolbarButton"
              onClick={jumpToMyPlot}
              title="Jump to my first plot"
            >
              🎯 Jump
            </button>
          )}
          {hasActiveFilter && (
            <button
              type="button"
              className="toolbarButton"
              onClick={resetAllFilters}
              style={{ borderColor: colors.warning, color: colors.warning }}
              title="Reset all filters"
            >
              ✕ Reset Filters
            </button>
          )}
        </div>
        <div style={{ display: "flex", gap: spacing[2], alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: fontSize.sm, color: colors.textDim }}>
            {filteredPlots.length} / {scopedStats.total}
          </span>
          <span style={{ fontSize: fontSize.sm, color: colors.textFaint }}>
            {Math.round(mapZoom * 100)}%
          </span>
          <button
            type="button"
            className="toolbarButton"
            onClick={() => changeZoom(-0.15)}
            title="Zoom out"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            type="button"
            className="toolbarButton"
            onClick={resetZoom}
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            ⟲
          </button>
          <button
            type="button"
            className="toolbarButton"
            onClick={() => changeZoom(0.15)}
            title="Zoom in"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>

      {/* FILTERS */}
      {showFilters && (
        <div
          style={{
            display: "flex",
            gap: spacing[3],
            flexWrap: "wrap",
            marginBottom: spacing[2],
            padding: spacing[2],
            background: "rgba(255,255,255,0.02)",
            borderRadius: radius.md,
            fontSize: fontSize.sm,
          }}
        >
          <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={plotTypeFilter.personal}
              onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, personal: e.target.checked }))}
            />
            <span style={{ color: colors.text }}>Personal</span>
            <span style={{ color: colors.textFaint, fontSize: fontSize.xs }}>({scopedStats.personal})</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={plotTypeFilter.community}
              onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, community: e.target.checked }))}
            />
            <span style={{ color: colors.text }}>Community</span>
            <span style={{ color: colors.textFaint, fontSize: fontSize.xs }}>({scopedStats.community})</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={plotTypeFilter.borderline}
              onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, borderline: e.target.checked }))}
            />
            <span style={{ color: colors.text }}>Borderline</span>
            <span style={{ color: colors.textFaint, fontSize: fontSize.xs }}>({scopedStats.borderline})</span>
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={plotTypeFilter.nexus}
              onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, nexus: e.target.checked }))}
            />
            <span style={{ color: colors.text }}>Nexus</span>
            <span style={{ color: colors.textFaint, fontSize: fontSize.xs }}>({scopedStats.nexus})</span>
          </label>
        </div>
      )}

      {/* LEGEND */}
      {showLegend && (
        <div
          style={{
            display: "flex",
            gap: spacing[3],
            flexWrap: "wrap",
            marginBottom: spacing[2],
            fontSize: fontSize.xs,
            color: colors.textDim,
          }}
        >
          <div><span style={{ color: "#ff3b30" }}>■</span> Community</div>
          <div><span style={{ color: "#1d4cff" }}>■</span> Neutral</div>
          <div><span style={{ color: "#59ff2b" }}>■</span> Borderline</div>
          <div><span style={{ color: "#f5c46e" }}>■</span> Personal</div>
          <div><span style={{ color: "#ffaa33" }}>■</span> Reserved</div>
          <div><span style={{ color: "#44ff44" }}>■</span> Owned</div>
          <div><span style={{ color: "#888888" }}>■</span> Locked</div>
          <div><span style={{ color: "#ffd700" }}>■</span> Nexus</div>
        </div>
      )}

      {/* SVG MAP */}
      <div
        style={{
          position: "relative",
          width: `${mapZoom * 100}%`,
          minWidth: mapZoom > 1 ? `${Math.round(SVG_WIDTH * mapZoom)}px` : `${SVG_WIDTH}px`,
          transition: reducedMotion ? "none" : `width ${transition.base}`,
        }}
      >
        <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className="citySvg">
          <defs>
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="nexusGlow">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="warningGlow">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feFlood floodOpacity="0.7" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="dangerGlow">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feFlood floodOpacity="0.85" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <pattern id="diagonalStripes" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
              <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
            </pattern>
            <pattern id="crossHatch" patternUnits="userSpaceOnUse" width="8" height="8">
              <line x1="0" y1="0" x2="8" y2="8" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
              <line x1="0" y1="8" x2="8" y2="0" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
            </pattern>
            <pattern id="communityPattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <circle cx="4" cy="4" r="2" fill="rgba(255,255,255,0.4)" />
            </pattern>
            <pattern id="borderlinePattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <rect x="0" y="0" width="8" height="8" fill="none" stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
            </pattern>
            <pattern id="nexusPattern" patternUnits="userSpaceOnUse" width="8" height="8">
              <circle cx="4" cy="4" r="3" fill="rgba(255,255,0,0.3)" />
            </pattern>
            <pattern id="solidFill" patternUnits="userSpaceOnUse" width="8" height="8">
              <rect width="8" height="8" fill="rgba(255,255,255,0.04)" />
            </pattern>
          </defs>

          <foreignObject x="0" y="0" width={SVG_WIDTH / 2} height={SVG_HEIGHT}>
            <div style={{ width: "100%", height: "100%", background: getFactionGlow("left") }} />
          </foreignObject>
          <foreignObject x={SVG_WIDTH / 2} y="0" width={SVG_WIDTH / 2} height={SVG_HEIGHT}>
            <div style={{ width: "100%", height: "100%", background: getFactionGlow("right") }} />
          </foreignObject>

          <path d={infinityPath} fill="none" stroke="rgba(245, 214, 149, 0.18)" strokeWidth="28" filter="url(#softGlow)" />
          <path d={infinityPath} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="3" />

          <rect x={CENTER_X - 210} y={CENTER_Y - 10} width={420} height={20} rx={8} fill="rgba(245,206,126,0.88)" filter="url(#nexusGlow)" />
          <rect x={CENTER_X - 10} y={CENTER_Y - 240} width={20} height={480} rx={8} fill="rgba(245,206,126,0.78)" filter="url(#nexusGlow)" />
          <rect x={CENTER_X - 18} y={CENTER_Y - 18} width={36} height={36} rx={10} fill="rgba(255,232,160,0.96)" filter="url(#nexusGlow)" />

          {filteredPlots.map((plot, idx) => {
            const selected = selectedPlot?.id === plot.id;
            const mine = isMyPlot(plot, walletAddress);
            const { fill, pattern } = getStatusBasedFill(plot, heatmapMode);
            const statusStyle = STATUS_STYLES[plot.status] || STATUS_STYLES.free;
            const width = selected ? plot.width * 1.12 : plot.width;
            const height = selected ? plot.height * 1.12 : plot.height;
            const warningGlow = getWarningGlow(plot);
            const isFocused = focusedPlotIdx === idx;

            const stroke = mine
              ? colors.info
              : plot.factionSideMismatch
              ? "#ff9d9d"
              : selected
              ? "#ffffff"
              : getFactionStroke(plot.faction);

            const strokeWidth = isFocused
              ? 3.5
              : mine
              ? 2.5
              : plot.factionSideMismatch
              ? 2.2
              : selected
              ? 3
              : 1.4;

            const ariaLabel = `${plot.label}, ${plot.plotKind}, ${plot.status}, ${plot.faction}${
              mine ? ", yours" : ""
            }${selected ? ", selected" : ""}`;

            return (
              <g
                key={plot.id}
                onClick={() => handlePlotClick(plot)}
                onMouseMove={(event) => handleMouseMove(event, plot)}
                onMouseLeave={handleMouseLeave}
                onFocus={(event) => handlePlotFocus(event, plot)}
                onBlur={handleMouseLeave}
                onKeyDown={(event) => handlePlotKeyDown(event, plot)}
                tabIndex={0}
                role="button"
                aria-label={ariaLabel}
                aria-pressed={selected}
                style={{
                  cursor: "pointer",
                  outline: isFocused ? `2px solid ${colors.primary}` : "none",
                  outlineOffset: isFocused ? 4 : 0,
                }}
              >
                {mine && (
                  <rect
                    x={plot.x - width / 2 - 3}
                    y={plot.y - height / 2 - 3}
                    width={width + 6}
                    height={height + 6}
                    rx={plot.plotKind === "personal-5x5" ? 6 : 9}
                    ry={plot.plotKind === "personal-5x5" ? 6 : 9}
                    fill="none"
                    stroke={colors.info}
                    strokeWidth={1}
                    opacity={0.4}
                    style={{ pointerEvents: "none" }}
                  />
                )}
                <rect
                  x={plot.x - width / 2}
                  y={plot.y - height / 2}
                  width={width}
                  height={height}
                  rx={plot.plotKind === "personal-5x5" ? 4 : 7}
                  ry={plot.plotKind === "personal-5x5" ? 4 : 7}
                  fill={pattern || fill}
                  stroke={stroke}
                  strokeWidth={strokeWidth}
                  opacity={statusStyle.opacity}
                  filter={warningGlow || (plot.plotKind !== "personal-5x5" ? "url(#softGlow)" : undefined)}
                  strokeDasharray={plot.factionSideMismatch ? "4 2" : undefined}
                />
                {showLabels && (
                  <text
                    x={plot.x}
                    y={plot.y + 4}
                    textAnchor="middle"
                    fontSize={plot.plotKind === "personal-5x5" ? "7" : "10"}
                    fill="rgba(255,255,255,0.94)"
                    style={{ pointerEvents: "none", userSelect: "none" }}
                  >
                    {plot.label}
                  </text>
                )}
              </g>
            );
          })}

          <text x={CENTER_X - 520} y={CENTER_Y + 5} fill="rgba(255,235,190,0.95)" fontSize="26" fontWeight="700">
            INPINITY
          </text>
          <text x={CENTER_X + 330} y={CENTER_Y + 5} fill="rgba(225,235,255,0.95)" fontSize="26" fontWeight="700">
            INPHINITY
          </text>
        </svg>

        {/* 💎 IDEE 5: Mini-Map (unten rechts in Ecke) */}
        {showMiniMap && (
          <div
            style={{
              position: "absolute",
              bottom: spacing[2],
              right: spacing[2],
              width: 100,
              height: 60,
              background: "rgba(0,0,0,0.7)",
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.primary,
              borderRadius: radius.md,
              padding: 4,
              pointerEvents: "none",
              zIndex: 5,
              boxShadow: `0 0 15px ${colors.primary}44`,
            }}
            aria-hidden="true"
          >
            <svg
              viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
              style={{ width: "100%", height: "100%" }}
            >
              <path
                d={infinityPath}
                fill="none"
                stroke="rgba(245,214,149,0.3)"
                strokeWidth="8"
              />
              <rect
                x={CENTER_X - 18}
                y={CENTER_Y - 18}
                width={36}
                height={36}
                rx={6}
                fill="rgba(255,232,160,0.6)"
              />
              {/* Viewport-Rechteck basierend auf Zoom */}
              <rect
                x={CENTER_X - (SVG_WIDTH / 2) / mapZoom}
                y={CENTER_Y - (SVG_HEIGHT / 2) / mapZoom}
                width={SVG_WIDTH / mapZoom}
                height={SVG_HEIGHT / mapZoom}
                fill="none"
                stroke={colors.primary}
                strokeWidth={4}
                strokeDasharray="8 6"
                opacity={0.7}
              />
            </svg>
            <div
              style={{
                position: "absolute",
                bottom: 2,
                left: 4,
                fontSize: 8,
                color: colors.primary,
                letterSpacing: 1,
                fontFamily: "'Courier New', monospace",
                opacity: 0.7,
              }}
            >
              {Math.round(mapZoom * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* 💎 IDEE 2: Quick-Action Tooltip */}
      {hoveredPlot && (
        <Tooltip
          title={
            <div
              style={{
                padding: "8px",
                fontFamily: "'Courier New', monospace",
                fontSize: "11px",
                minWidth: 220,
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <strong style={{ color: colors.primary }}>{hoveredPlot.label}</strong>
                {isMyPlot(hoveredPlot, walletAddress) && (
                  <span style={{ marginLeft: 8, color: colors.info, fontSize: 10 }}>● YOU</span>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 8px", marginBottom: 6 }}>
                <span style={{ color: colors.textFaint }}>Status:</span>
                <span>{STATUS_STYLES[hoveredPlot.status]?.label || hoveredPlot.status}</span>
                <span style={{ color: colors.textFaint }}>Faction:</span>
                <span>{hoveredPlot.faction}</span>
                <span style={{ color: colors.textFaint }}>Tier:</span>
                <span>{hoveredPlot.tier}</span>
                <span style={{ color: colors.textFaint }}>Owner:</span>
                <span>{getOwnerShort(hoveredPlot.owner)}</span>
                <span style={{ color: colors.textFaint }}>Value:</span>
                <span>{hoveredPlot.valueModel?.finalEstimate || hoveredPlot.priceEstimate} PIT</span>
                {hoveredPlot.provenance?.legacyScore != null && (
                  <>
                    <span style={{ color: colors.textFaint }}>Legacy:</span>
                    <span>{hoveredPlot.provenance.legacyScore}</span>
                  </>
                )}
                {hoveredPlot.statusInfo?.inactivityLevel && (
                  <>
                    <span style={{ color: colors.textFaint }}>Activity:</span>
                    <span
                      style={{
                        color:
                          hoveredPlot.statusInfo.inactivityLevel === "critical"
                            ? colors.danger
                            : hoveredPlot.statusInfo.inactivityLevel === "warning"
                            ? colors.warning
                            : colors.text,
                      }}
                    >
                      {hoveredPlot.statusInfo.inactivityLevel}
                    </span>
                  </>
                )}
                {hoveredPlot.lastTransferDaysAgo !== undefined && (
                  <>
                    <span style={{ color: colors.textFaint }}>Last transfer:</span>
                    <span>{hoveredPlot.lastTransferDaysAgo}d ago</span>
                  </>
                )}
              </div>

              {hoveredPlot.factionSideMismatch && (
                <div
                  style={{
                    marginBottom: 6,
                    padding: 4,
                    background: "rgba(255,157,157,0.15)",
                    borderLeft: "2px solid #ff9d9d",
                    fontSize: 10,
                    color: "#ff9d9d",
                  }}
                >
                  Side corrected for faction placement
                </div>
              )}

              {/* QUICK ACTIONS */}
              <div
                style={{
                  display: "flex",
                  gap: 6,
                  marginTop: 8,
                  borderTop: `1px solid ${colors.borderSoft}`,
                  paddingTop: 8,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handlePlotClick(hoveredPlot)}
                  style={{
                    flex: 1,
                    padding: "4px 8px",
                    background: colors.primary,
                    color: "#000",
                    border: "none",
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: "bold",
                    fontFamily: "'Courier New', monospace",
                    letterSpacing: 1,
                    cursor: "pointer",
                    textTransform: "uppercase",
                  }}
                >
                  Details
                </button>
                {hoveredPlot.status === "free" && onReservePlot && (
                  <button
                    onClick={() => {
                      onSelectPlot(hoveredPlot);
                      onReservePlot();
                    }}
                    style={{
                      flex: 1,
                      padding: "4px 8px",
                      background: colors.success,
                      color: "#000",
                      border: "none",
                      borderRadius: 4,
                      fontSize: 10,
                      fontWeight: "bold",
                      fontFamily: "'Courier New', monospace",
                      letterSpacing: 1,
                      cursor: "pointer",
                      textTransform: "uppercase",
                    }}
                  >
                    Reserve
                  </button>
                )}
              </div>
            </div>
          }
          open={true}
          placement="top"
          TransitionComponent={Zoom}
          arrow
          PopperProps={{
            style: { zIndex: 1000 },
          }}
        >
          <div
            style={{
              position: "fixed",
              left: tooltipPosition.x,
              top: tooltipPosition.y - 40,
              width: 0,
              height: 0,
              pointerEvents: "none",
            }}
          />
        </Tooltip>
      )}

      {/* ZOOMED OVERLAY */}
      {zoomedPlot && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: zIndex.modalTop,
            padding: spacing[4],
          }}
          onClick={() => setZoomedPlot(null)}
        >
          <div
            style={{
              background: colors.bgElevated,
              borderWidth: 2,
              borderStyle: "solid",
              borderColor: colors.primary,
              padding: spacing[6],
              borderRadius: radius.xl,
              maxWidth: "800px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "auto",
              boxShadow: "0 0 60px rgba(255,204,0,0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3
              style={{
                marginTop: 0,
                color: colors.primary,
                letterSpacing: letterSpacing.wide,
                fontSize: fontSize.xl,
                textTransform: "uppercase",
                fontFamily: "'Courier New', monospace",
              }}
            >
              {zoomedPlot.label} — Enlarged View
            </h3>
            <svg width="100%" height="auto" viewBox="0 0 400 400" style={{ display: "block", maxWidth: 520, margin: "0 auto" }}>
              <rect
                x="50"
                y="50"
                width="300"
                height="300"
                fill={getStatusBasedFill(zoomedPlot, heatmapMode).fill}
                stroke={colors.primary}
                strokeWidth="2"
                rx={8}
              />
              <text x="200" y="200" textAnchor="middle" fill="#fff" fontFamily="'Courier New', monospace" fontSize="18" fontWeight="bold">
                {zoomedPlot.label}
              </text>
              <text x="200" y="230" textAnchor="middle" fill={colors.textDim} fontSize="12" fontFamily="'Courier New', monospace">
                {zoomedPlot.plotKind}
              </text>
            </svg>
            <button
              onClick={() => setZoomedPlot(null)}
              className="ip-btn ip-btn--ghost"
              style={{ marginTop: spacing[4], width: "100%" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================================
// PLACEHOLDER COMPONENT
// ============================================================
type PlaceholderVariant = "loading" | "wallet" | "faction" | "empty";

interface MapPlaceholderProps {
  variant: PlaceholderVariant;
  icon: string;
  title: string;
  subtitle: string;
  cta?: string;
  onCta?: () => void;
  secondaryCta?: string;
  onSecondaryCta?: () => void;
}

function MapPlaceholder({
  variant,
  icon,
  title,
  subtitle,
  cta,
  onCta,
  secondaryCta,
  onSecondaryCta,
}: MapPlaceholderProps) {
  const accent = (() => {
    if (variant === "loading") return colors.info;
    if (variant === "wallet") return colors.info;
    if (variant === "faction") return colors.primary;
    return colors.success;
  })();

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "2 / 1",
        minHeight: 360,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(ellipse at center, ${colors.bgSoft} 0%, ${colors.bg} 80%)`,
        borderWidth: 1,
        borderStyle: "dashed",
        borderColor: colors.border,
        borderRadius: radius.lg,
        padding: spacing[7],
        textAlign: "center",
        gap: spacing[4],
        fontFamily: "'Courier New', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 280,
          height: 280,
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: accent,
          opacity: 0.15,
          animation:
            variant === "loading"
              ? "ip-pulse 1.5s ease-in-out infinite"
              : "ip-pulse 3s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />
      <div style={{ fontSize: "56px", opacity: 0.7, position: "relative" }}>{icon}</div>
      <h3
        style={{
          color: accent,
          fontSize: fontSize["2xl"],
          letterSpacing: letterSpacing.wide,
          textTransform: "uppercase",
          margin: 0,
          position: "relative",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: colors.textDim,
          fontSize: fontSize.md,
          lineHeight: 1.6,
          maxWidth: 520,
          margin: 0,
          position: "relative",
        }}
      >
        {subtitle}
      </p>
      <div style={{ display: "flex", gap: spacing[3], flexWrap: "wrap", justifyContent: "center" }}>
        {cta && onCta && (
          <button
            onClick={onCta}
            style={{
              marginTop: spacing[3],
              padding: `${spacing[4]} ${spacing[7]}`,
              background: `linear-gradient(135deg, ${accent}, ${accent}cc)`,
              color: "#000",
              border: "none",
              borderRadius: radius.md,
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
              fontSize: fontSize.lg,
              letterSpacing: letterSpacing.wide,
              cursor: "pointer",
              boxShadow: `0 0 25px ${accent}66`,
              transition: `all ${transition.base}`,
              position: "relative",
              textTransform: "uppercase",
            }}
          >
            {cta} →
          </button>
        )}
        {secondaryCta && onSecondaryCta && (
          <button
            onClick={onSecondaryCta}
            style={{
              marginTop: spacing[3],
              padding: `${spacing[4]} ${spacing[5]}`,
              background: "transparent",
              color: colors.textDim,
              borderWidth: 1,
              borderStyle: "solid",
              borderColor: colors.border,
              borderRadius: radius.md,
              fontFamily: "'Courier New', monospace",
              fontWeight: "bold",
              fontSize: fontSize.md,
              letterSpacing: letterSpacing.base,
              cursor: "pointer",
              position: "relative",
              textTransform: "uppercase",
            }}
          >
            {secondaryCta}
          </button>
        )}
      </div>
    </div>
  );
}