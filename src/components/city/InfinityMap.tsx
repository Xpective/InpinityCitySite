import type { InfinityPlot } from "../../types/infinity";
import {
  CENTER_X,
  CENTER_Y,
  SVG_HEIGHT,
  SVG_WIDTH,
  getFactionGlow,
  getFactionStroke,
  getInfinityPath,
  getStatusOpacity,
} from "../../lib/infinity-layout";

type Props = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;
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

function getHeatColor(plot: InfinityPlot): string {
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

function getPlotFill(plot: InfinityPlot, heatmapMode: boolean): string {
  if (heatmapMode) return getHeatColor(plot);

  if (plot.faction === "community") return "#ff3b30";
  if (plot.faction === "neutral") return "#1d4cff";
  if (plot.faction === "borderline") return "#59ff2b";

  return getPersonalSideColor(plot);
}

export default function InfinityMap({
  plots,
  selectedPlot,
  onSelectPlot,
  showLabels,
  heatmapMode,
}: Props) {
  const infinityPath = getInfinityPath();

  return (
    <div className="mapWrap" id="city-map-capture">
      <div className="mapLegend">
        <div><span style={{ color: "#ff3b30" }}>■</span> Community</div>
        <div><span style={{ color: "#1d4cff" }}>■</span> Neutral</div>
        <div><span style={{ color: "#59ff2b" }}>■</span> Borderline</div>
        <div><span style={{ color: "#f5c46e" }}>■</span> Inpinity / Inphinity personal plots</div>
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
        </defs>

        <foreignObject x="0" y="0" width={SVG_WIDTH / 2} height={SVG_HEIGHT}>
          <div style={{ width: "100%", height: "100%", background: getFactionGlow("left") }} />
        </foreignObject>

        <foreignObject x={SVG_WIDTH / 2} y="0" width={SVG_WIDTH / 2} height={SVG_HEIGHT}>
          <div style={{ width: "100%", height: "100%", background: getFactionGlow("right") }} />
        </foreignObject>

        <path
          d={infinityPath}
          fill="none"
          stroke="rgba(245, 214, 149, 0.18)"
          strokeWidth="28"
          filter="url(#softGlow)"
        />
        <path
          d={infinityPath}
          fill="none"
          stroke="rgba(255,255,255,0.14)"
          strokeWidth="3"
        />

        {/* HORIZONTALE BRÜCKE */}
        <rect
          x={CENTER_X - 210}
          y={CENTER_Y - 10}
          width={420}
          height={20}
          rx={8}
          fill="rgba(245,206,126,0.88)"
          filter="url(#nexusGlow)"
        />

        {/* VERTIKALE KREUZ-ACHSE / BRÜCKE */}
        <rect
          x={CENTER_X - 10}
          y={CENTER_Y - 240}
          width={20}
          height={480}
          rx={8}
          fill="rgba(245,206,126,0.78)"
          filter="url(#nexusGlow)"
        />

        {/* LEUCHTENDER KREUZ-KERN */}
        <rect
          x={CENTER_X - 18}
          y={CENTER_Y - 18}
          width={36}
          height={36}
          rx={10}
          fill="rgba(255,232,160,0.96)"
          filter="url(#nexusGlow)"
        />

        {plots.map((plot) => {
          const selected = selectedPlot?.id === plot.id;
          const fill = getPlotFill(plot, heatmapMode);
          const stroke = getFactionStroke(plot.faction);
          const opacity = getStatusOpacity(plot.status);

          const width = selected ? plot.width * 1.12 : plot.width;
          const height = selected ? plot.height * 1.12 : plot.height;

          return (
            <g key={plot.id} onClick={() => onSelectPlot(plot)} style={{ cursor: "pointer" }}>
              <rect
                x={plot.x - width / 2}
                y={plot.y - height / 2}
                width={width}
                height={height}
                rx={plot.plotKind === "personal-5x5" ? 4 : 7}
                ry={plot.plotKind === "personal-5x5" ? 4 : 7}
                fill={fill}
                stroke={selected ? "#ffffff" : stroke}
                strokeWidth={selected ? 3 : 1.4}
                opacity={opacity}
                filter={plot.plotKind !== "personal-5x5" ? "url(#softGlow)" : undefined}
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

        <text
          x={CENTER_X - 520}
          y={CENTER_Y + 5}
          fill="rgba(255,235,190,0.95)"
          fontSize="26"
          fontWeight="700"
        >
          INPINITY
        </text>

        <text
          x={CENTER_X + 330}
          y={CENTER_Y + 5}
          fill="rgba(225,235,255,0.95)"
          fontSize="26"
          fontWeight="700"
        >
          INPHINITY
        </text>
      </svg>
    </div>
  );
}