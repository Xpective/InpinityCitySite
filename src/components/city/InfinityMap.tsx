import type { InfinityPlot } from "../../types/infinity";
import { getPlotFill } from "../../lib/infinity-layout";

type InfinityMapProps = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
};

export default function InfinityMap({
  plots,
  selectedPlot,
  onSelectPlot,
}: InfinityMapProps) {
  return (
    <div
      style={{
        width: "100%",
        background: "rgba(15,23,42,0.65)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 24,
        padding: 16,
        overflow: "hidden",
      }}
    >
      <svg
        viewBox="-340 -220 680 440"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60a5fa" />
            <stop offset="50%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>

        <path
          d="M -260 0
             C -260 -120, -120 -160, 0 0
             C 120 160, 260 120, 260 0
             C 260 -120, 120 -160, 0 0
             C -120 160, -260 120, -260 0 Z"
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth="6"
          opacity="0.35"
        />

        <line
          x1="-18"
          y1="-110"
          x2="18"
          y2="110"
          stroke="#f4c542"
          strokeWidth="5"
          opacity="0.55"
        />
        <line
          x1="-18"
          y1="110"
          x2="18"
          y2="-110"
          stroke="#f4c542"
          strokeWidth="5"
          opacity="0.55"
        />

        {plots.map((plot) => {
          const selected = selectedPlot?.id === plot.id;

          return (
            <g
              key={plot.id}
              onClick={() => onSelectPlot(plot)}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={plot.x}
                cy={plot.y}
                r={selected ? plot.size * 0.78 : plot.size * 0.62}
                fill={getPlotFill(plot)}
                stroke={selected ? "#ffffff" : "rgba(255,255,255,0.28)"}
                strokeWidth={selected ? 3 : 1.2}
                opacity={plot.status === "locked" ? 0.35 : 0.95}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}