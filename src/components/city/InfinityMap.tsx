import { useMemo, useState, useCallback, useRef } from "react";
import type { InfinityPlot } from "../../types/infinity";
import {
  CENTER_X,
  CENTER_Y,
  SVG_HEIGHT,
  SVG_WIDTH,
  getFactionGlow,
  getFactionStroke,
  getInfinityPath,
} from "../../lib/infinity-layout";
import Tooltip from "@mui/material/Tooltip";
import Zoom from "@mui/material/Zoom";

type Props = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;
};

const STATUS_STYLES = {
  reserved: {
    baseColor: "#ffaa33",
    pattern: "url(#diagonalStripes)",
    borderColor: "#ffaa33",
    opacity: 0.9,
    label: "Reserved",
  },
  owned: {
    baseColor: "#44ff44",
    pattern: "url(#solidFill)",
    borderColor: "#00aa00",
    opacity: 1,
    label: "Owned",
  },
  locked: {
    baseColor: "#888888",
    pattern: "url(#crossHatch)",
    borderColor: "#555555",
    opacity: 0.7,
    label: "Locked",
  },
  free: {
    baseColor: "#ffffff",
    pattern: undefined,
    borderColor: "#cccccc",
    opacity: 0.8,
    label: "Free",
  },
  community: {
    baseColor: "#ff3b30",
    pattern: "url(#communityPattern)",
    borderColor: "#ff0000",
    opacity: 0.95,
    label: "Community",
  },
  borderline: {
    baseColor: "#59ff2b",
    pattern: "url(#borderlinePattern)",
    borderColor: "#00ff00",
    opacity: 0.95,
    label: "Borderline",
  },
  nexus: {
    baseColor: "#ffd700",
    pattern: "url(#nexusPattern)",
    borderColor: "#ffaa00",
    opacity: 1,
    label: "Nexus",
  },
} as const;

function getEnhancedHeatColor(plot: InfinityPlot): string {
  const historicScore = plot.provenance?.historicScore;
  const aetherUses = plot.provenance?.aetherUses;

  if (historicScore !== undefined) {
    const intensity = Math.min(historicScore / 1000, 1);
    if (plot.side === "left") {
      return `rgba(255, ${Math.round(100 + intensity * 155)}, 100, ${0.4 + intensity * 0.6})`;
    }
    if (plot.side === "right") {
      return `rgba(100, ${Math.round(100 + intensity * 155)}, 255, ${0.4 + intensity * 0.6})`;
    }
  }

  if (aetherUses !== undefined) {
    const intensity = Math.min(aetherUses / 10, 1);
    return `rgba(255, 215, 0, ${0.3 + intensity * 0.7})`;
  }

  const d = Math.min(plot.distanceToNexus, 360);
  const intensity = 1 - d / 360;

  if (plot.side === "left") {
    const r = Math.round(255 - intensity * 12);
    const g = Math.round(145 + intensity * 70);
    const b = Math.round(75 - intensity * 35);
    return `rgb(${r},${g},${Math.max(28, b)})`;
  }

  if (plot.side === "right") {
    const r = Math.round(95 + intensity * 55);
    const g = Math.round(125 + intensity * 35);
    const b = Math.round(255 - intensity * 24);
    return `rgb(${r},${g},${b})`;
  }

  return `rgb(${245 - intensity * 8}, ${220 - intensity * 10}, ${120})`;
}

type PlotTypeFilter = {
  personal: boolean;
  community: boolean;
  borderline: boolean;
  nexus: boolean;
};

function mix(a: number, b: number, t: number): number {
  return Math.round(a + (b - a) * t);
}

function getPersonalSideColor(plot: InfinityPlot): string {
  const t = Math.min(plot.distanceToNexus / 380, 1);

  if (plot.side === "left") {
    const inner = { r: 245, g: 196, b: 110 };
    const outer = { r: 134, g: 122, b: 116 };
    return `rgb(${mix(inner.r, outer.r, t)}, ${mix(inner.g, outer.g, t)}, ${mix(inner.b, outer.b, t)})`;
  }

  if (plot.side === "right") {
    const inner = { r: 245, g: 196, b: 110 };
    const outer = { r: 116, g: 126, b: 142 };
    return `rgb(${mix(inner.r, outer.r, t)}, ${mix(inner.g, outer.g, t)}, ${mix(inner.b, outer.b, t)})`;
  }

  return "rgb(220,200,140)";
}

function getStatusBasedFill(plot: InfinityPlot, heatmapMode: boolean): { fill: string; pattern?: string } {
  if (heatmapMode) {
    return { fill: getEnhancedHeatColor(plot) };
  }

  if (plot.faction === "community") {
    return { fill: STATUS_STYLES.community.baseColor, pattern: STATUS_STYLES.community.pattern };
  }
  if (plot.faction === "borderline") {
    return { fill: STATUS_STYLES.borderline.baseColor, pattern: STATUS_STYLES.borderline.pattern };
  }
  if (plot.faction === "neutral") {
    return { fill: "#1d4cff" };
  }
  if (plot.faction === "inpinity" || plot.faction === "inphinity") {
    return { fill: getPersonalSideColor(plot) };
  }

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

export default function InfinityMap({
  plots,
  selectedPlot,
  onSelectPlot,
  showLabels,
  heatmapMode,
}: Props) {
  const infinityPath = getInfinityPath();
  const containerRef = useRef<HTMLDivElement>(null);

  const [plotTypeFilter, setPlotTypeFilter] = useState<PlotTypeFilter>({
    personal: true,
    community: true,
    borderline: true,
    nexus: true,
  });

  const [zoomedPlot, setZoomedPlot] = useState<InfinityPlot | null>(null);
  const [hoveredPlot, setHoveredPlot] = useState<InfinityPlot | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const filteredPlots = useMemo(() => {
    return plots.filter((plot) => {
      if (plot.plotKind === "personal-5x5" && !plotTypeFilter.personal) return false;
      if (plot.plotKind === "community-25x25" && !plotTypeFilter.community) return false;
      if (plot.plotKind === "borderline-25x25" && !plotTypeFilter.borderline) return false;
      if (plot.plotKind === "nexus" && !plotTypeFilter.nexus) return false;
      return true;
    });
  }, [plots, plotTypeFilter]);

  const plotStats = useMemo(() => {
    return {
      total: filteredPlots.length,
      personal: filteredPlots.filter((p) => p.policy.isPersonal).length,
      community: filteredPlots.filter((p) => p.policy.isCommunity).length,
      borderline: filteredPlots.filter((p) => p.policy.isBorderline).length,
      nexus: filteredPlots.filter((p) => p.policy.isNexus).length,
    };
  }, [filteredPlots]);

  const handleMouseMove = useCallback((event: React.MouseEvent, plot: InfinityPlot) => {
    setHoveredPlot(plot);
    setTooltipPosition({ x: event.clientX, y: event.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredPlot(null);
  }, []);

  const handlePlotClick = useCallback(
    (plot: InfinityPlot) => {
      if (plot.plotKind === "community-25x25" || plot.plotKind === "borderline-25x25") {
        setZoomedPlot(plot);
      } else {
        onSelectPlot(plot);
      }
    },
    [onSelectPlot]
  );

  return (
    <div className="mapWrap" id="city-map-capture" ref={containerRef}>
      <div className="filterBar" style={{ marginBottom: "10px", display: "flex", gap: "15px", flexWrap: "wrap" }}>
        <label>
          <input
            type="checkbox"
            checked={plotTypeFilter.personal}
            onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, personal: e.target.checked }))}
          />{" "}
          Personal Plots ({plotStats.personal})
        </label>
        <label>
          <input
            type="checkbox"
            checked={plotTypeFilter.community}
            onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, community: e.target.checked }))}
          />{" "}
          Community Plots ({plotStats.community})
        </label>
        <label>
          <input
            type="checkbox"
            checked={plotTypeFilter.borderline}
            onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, borderline: e.target.checked }))}
          />{" "}
          Borderline Plots ({plotStats.borderline})
        </label>
        <label>
          <input
            type="checkbox"
            checked={plotTypeFilter.nexus}
            onChange={(e) => setPlotTypeFilter((prev) => ({ ...prev, nexus: e.target.checked }))}
          />{" "}
          Nexus Plots ({plotStats.nexus})
        </label>
      </div>

      <div className="mapLegend">
        <div><span style={{ color: "#ff3b30" }}>■</span> Community</div>
        <div><span style={{ color: "#1d4cff" }}>■</span> Neutral</div>
        <div><span style={{ color: "#59ff2b" }}>■</span> Borderline</div>
        <div><span style={{ color: "#f5c46e" }}>■</span> Inpinity / Inphinity personal plots</div>
        <div><span style={{ color: "#ffaa33" }}>■</span> Reserved</div>
        <div><span style={{ color: "#44ff44" }}>■</span> Owned</div>
        <div><span style={{ color: "#888888" }}>■</span> Locked</div>
      </div>

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

        {filteredPlots.map((plot) => {
          const selected = selectedPlot?.id === plot.id;
          const { fill, pattern } = getStatusBasedFill(plot, heatmapMode);
          const stroke = selected ? "#ffffff" : getFactionStroke(plot.faction);
          const statusStyle = STATUS_STYLES[plot.status] || STATUS_STYLES.free;
          const width = selected ? plot.width * 1.12 : plot.width;
          const height = selected ? plot.height * 1.12 : plot.height;
          const warningGlow = getWarningGlow(plot);

          return (
            <g
              key={plot.id}
              onClick={() => handlePlotClick(plot)}
              onMouseMove={(e) => handleMouseMove(e, plot)}
              onMouseLeave={handleMouseLeave}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={plot.x - width / 2}
                y={plot.y - height / 2}
                width={width}
                height={height}
                rx={plot.plotKind === "personal-5x5" ? 4 : 7}
                ry={plot.plotKind === "personal-5x5" ? 4 : 7}
                fill={pattern || fill}
                stroke={stroke}
                strokeWidth={selected ? 3 : 1.4}
                opacity={statusStyle.opacity}
                filter={warningGlow || (plot.plotKind !== "personal-5x5" ? "url(#softGlow)" : undefined)}
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

      {hoveredPlot && (
        <Tooltip
          title={
            <div style={{ padding: "8px" }}>
              <strong>{hoveredPlot.label}</strong><br />
              Status: {STATUS_STYLES[hoveredPlot.status]?.label || hoveredPlot.status}<br />
              Faction: {hoveredPlot.faction}<br />
              Tier: {hoveredPlot.tier}<br />
              {hoveredPlot.owner && `Owner: ${hoveredPlot.owner.substring(0, 6)}...${hoveredPlot.owner.substring(hoveredPlot.owner.length - 4)}`}<br />
              Value: {hoveredPlot.valueModel?.finalEstimate || hoveredPlot.priceEstimate} PIT<br />
              {hoveredPlot.provenance?.legacyScore != null && `Legacy: ${hoveredPlot.provenance.legacyScore}`}<br />
              {hoveredPlot.statusInfo?.inactivityLevel && `Activity: ${hoveredPlot.statusInfo.inactivityLevel}`}<br />
              {hoveredPlot.lastTransferDaysAgo !== undefined && `Last Transfer: ${hoveredPlot.lastTransferDaysAgo} days ago`}
            </div>
          }
          open={true}
          placement="top"
          TransitionComponent={Zoom}
          arrow
        >
          <div style={{ position: "fixed", left: tooltipPosition.x, top: tooltipPosition.y - 40, width: 0, height: 0 }} />
        </Tooltip>
      )}

      {zoomedPlot && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setZoomedPlot(null)}
        >
          <div
            style={{
              background: "#1a1f2e",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "800px",
              width: "90%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 style={{ marginTop: 0 }}>{zoomedPlot.label} - Enlarged View</h3>
            <svg width="400" height="400" viewBox="0 0 400 400">
              <rect
                x="50"
                y="50"
                width="300"
                height="300"
                fill={getStatusBasedFill(zoomedPlot, heatmapMode).fill}
                stroke="#ffffff"
                strokeWidth="2"
              />
              <text x="200" y="200" textAnchor="middle" fill="white">{zoomedPlot.label}</text>
              <text x="200" y="230" textAnchor="middle" fill="white" fontSize="12">
                {zoomedPlot.plotKind}
              </text>
            </svg>
            <button
              onClick={() => setZoomedPlot(null)}
              style={{
                marginTop: "15px",
                padding: "8px 16px",
                background: "#2a3040",
                border: "none",
                borderRadius: "6px",
                color: "white",
                cursor: "pointer",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}