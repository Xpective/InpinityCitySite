import type { InfinityPlot } from "../../types/infinity";
import {
  getInfinityCanvas,
  getPlotFill,
  getPlotStroke,
} from "../../lib/infinity-layout";

type Props = {
  plots: InfinityPlot[];
  selectedPlotId: string | null;
  onSelectPlot: (plot: InfinityPlot) => void;
};

function renderDiamond(plot: InfinityPlot, selected: boolean) {
  const half = plot.size / 2;
  const strokeWidth = selected ? 3 : 1.2;

  return (
    <g
      key={plot.id}
      transform={`translate(${plot.x}, ${plot.y}) rotate(${plot.rotation})`}
      onClick={() => {}}
      style={{ cursor: "pointer" }}
    >
      <rect
        x={-half}
        y={-half}
        width={plot.size}
        height={plot.size}
        rx={4}
        fill={getPlotFill(plot)}
        stroke={selected ? "rgba(255,255,255,1)" : getPlotStroke(plot)}
        strokeWidth={strokeWidth}
      />
    </g>
  );
}

export default function InfinityMap({
  plots,
  selectedPlotId,
  onSelectPlot,
}: Props) {
  const canvas = getInfinityCanvas();

  return (
    <section className="panel infinityMapPanel">
      <div className="infinityHeader">
        <div>
          <h2>Infinity City Layout</h2>
          <p className="muted">
            Linker Ring = Inpinity / Pi · Rechter Ring = Inphinity / Phi · Mitte = Nexus
          </p>
        </div>
      </div>

      <div className="infinityMapWrap">
        <svg
          viewBox={`0 0 ${canvas.width} ${canvas.height}`}
          className="infinitySvg"
          role="img"
          aria-label="Inpinity City Infinity Map"
        >
          <defs>
            <radialGradient id="nexusGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(255,245,190,1)" />
              <stop offset="35%" stopColor="rgba(255,210,120,0.95)" />
              <stop offset="100%" stopColor="rgba(255,190,80,0.05)" />
            </radialGradient>

            <linearGradient id="leftAura" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(90,160,255,0.18)" />
              <stop offset="100%" stopColor="rgba(120,220,255,0.04)" />
            </linearGradient>

            <linearGradient id="rightAura" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,190,120,0.16)" />
              <stop offset="100%" stopColor="rgba(255,230,180,0.04)" />
            </linearGradient>
          </defs>

          <ellipse
            cx={canvas.leftCenter.x}
            cy={canvas.leftCenter.y}
            rx="248"
            ry="238"
            fill="url(#leftAura)"
            stroke="rgba(120,180,255,0.18)"
            strokeWidth="2"
          />
          <ellipse
            cx={canvas.rightCenter.x}
            cy={canvas.rightCenter.y}
            rx="248"
            ry="238"
            fill="url(#rightAura)"
            stroke="rgba(255,210,140,0.18)"
            strokeWidth="2"
          />

          <path
            d="M 470 340 C 525 300, 560 300, 600 340 C 640 380, 675 380, 730 340"
            fill="none"
            stroke="rgba(255,255,255,0.14)"
            strokeWidth="26"
            strokeLinecap="round"
          />

          <circle
            cx={canvas.nexus.x}
            cy={canvas.nexus.y}
            r="72"
            fill="url(#nexusGlow)"
          />
          <circle
            cx={canvas.nexus.x}
            cy={canvas.nexus.y}
            r="26"
            fill="rgba(255,245,200,0.95)"
            stroke="rgba(255,255,255,0.85)"
            strokeWidth="2"
          />

          <line
            x1={canvas.nexus.x - 24}
            y1={canvas.nexus.y}
            x2={canvas.nexus.x + 24}
            y2={canvas.nexus.y}
            stroke="rgba(120,90,40,0.95)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <line
            x1={canvas.nexus.x}
            y1={canvas.nexus.y - 24}
            x2={canvas.nexus.x}
            y2={canvas.nexus.y + 24}
            stroke="rgba(120,90,40,0.95)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <text x="280" y="88" className="svgFactionLabel left">
            INPFINITY / PI
          </text>
          <text x="780" y="88" className="svgFactionLabel right">
            INPHINITY / PHI
          </text>
          <text x="566" y="246" className="svgNexusLabel">
            NEXUS
          </text>

          {plots.map((plot) => (
            <g
              key={plot.id}
              onClick={() => onSelectPlot(plot)}
              style={{ cursor: "pointer" }}
            >
              {renderDiamond(plot, selectedPlotId === plot.id)}
            </g>
          ))}
        </svg>
      </div>
    </section>
  );
}
