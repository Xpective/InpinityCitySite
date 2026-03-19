import type { InfinityPlot } from "../../types/infinity";
import {
  CENTER_X,
  CENTER_Y,
  SVG_HEIGHT,
  SVG_WIDTH,
  getFactionGlow,
  getFactionStroke,
  getInfinityPath,
  getRarityColor,
  getStatusOpacity,
} from "../../lib/infinity-layout";

type Props = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  heatmapMode: boolean;
};

function getHeatColor(plot: InfinityPlot): string {
  const d = Math.min(plot.distanceToNexus, 360);
  const intensity = 1 - d / 360;

  if (plot.side === "left") {
    const r = Math.round(255 - intensity * 25);
    const g = Math.round(130 + intensity * 80);
    const b = Math.round(80 - intensity * 40);
    return `rgb(${r},${g},${Math.max(20, b)})`;
  }

  if (plot.side === "right") {
    const r = Math.round(90 + intensity * 70);
    const g = Math.round(120 + intensity * 40);
    const b = Math.round(255 - intensity * 20);
    return `rgb(${r},${g},${b})`;
  }

  return `rgb(${255 - intensity * 20}, ${220 - intensity * 10}, ${120})`;
}

function getPlotFill(plot: InfinityPlot, heatmapMode: boolean): string {
  return heatmapMode ? getHeatColor(plot) : getRarityColor(plot.rarity);
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
        <div>Left: Inpinity</div>
        <div>Right: Inphinity</div>
        <div>Center: Borderline / Community</div>
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
            <feGaussianBlur stdDeviation="12" result="blur" />
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

        <path d={infinityPath} fill="none" stroke="rgba(255,215,130,0.16)" strokeWidth="26" filter="url(#softGlow)" />
        <path d={infinityPath} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" />

        <rect
          x={CENTER_X - 8}
          y={CENTER_Y - 140}
          width={16}
          height={280}
          rx={6}
          fill="rgba(255,215,130,0.32)"
          filter="url(#nexusGlow)"
        />
        <rect
          x={CENTER_X - 140}
          y={CENTER_Y - 8}
          width={280}
          height={16}
          rx={6}
          fill="rgba(255,215,130,0.28)"
          filter="url(#nexusGlow)"
        />

        {plots.map((plot) => {
          const selected = selectedPlot?.id === plot.id;
          const fill = getPlotFill(plot, heatmapMode);
          const stroke = getFactionStroke(plot.faction);
          const opacity = getStatusOpacity(plot.status);

          return (
            <g
              key={plot.id}
              onClick={() => onSelectPlot(plot)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={plot.x - plot.width / 2}
                y={plot.y - plot.height / 2}
                width={selected ? plot.width * 1.12 : plot.width}
                height={selected ? plot.height * 1.12 : plot.height}
                rx={plot.plotKind === "personal-5x5" ? 4 : 8}
                ry={plot.plotKind === "personal-5x5" ? 4 : 8}
                fill={fill}
                stroke={selected ? "#ffffff" : stroke}
                strokeWidth={selected ? 3 : 1.4}
                opacity={opacity}
                filter={plot.plotKind !== "personal-5x5" ? "url(#softGlow)" : undefined}
              />

              <rect
                x={plot.x - plot.width / 2 - 3}
                y={plot.y - plot.height / 2 - 3}
                width={plot.width + 6}
                height={plot.height + 6}
                rx={plot.plotKind === "personal-5x5" ? 6 : 10}
                ry={plot.plotKind === "personal-5x5" ? 6 : 10}
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth={plot.lane * 0.35}
                opacity={0.4}
              />

              {showLabels && (
                <text
                  x={plot.x}
                  y={plot.y + 4}
                  textAnchor="middle"
                  fontSize={plot.plotKind === "personal-5x5" ? "7" : "10"}
                  fill="rgba(255,255,255,0.9)"
                  style={{ pointerEvents: "none", userSelect: "none" }}
                >
                  {plot.label}
                </text>
              )}
            </g>
          );
        })}

        <text x={CENTER_X - 260} y={CENTER_Y} fill="rgba(255,220,150,0.7)" fontSize="18">
          INPINITY
        </text>
        <text x={CENTER_X + 165} y={CENTER_Y} fill="rgba(180,200,255,0.7)" fontSize="18">
          INPHINITY
        </text>
      </svg>
    </div>
  );
}