import { useMemo, useState } from "react";
import type { InfinityPlot, InfinityPlotStatus } from "../../types/infinity";
import {
  getFactionStroke,
  getLaneWeight,
  getPlotDisplaySize,
  getRarityColor,
  getStatusBadgeColor,
} from "../../lib/infinity-layout";

type InfinityMapProps = {
  plots: InfinityPlot[];
  selectedPlot: InfinityPlot | null;
  onSelectPlot: (plot: InfinityPlot) => void;
  showLabels: boolean;
  activeFilter: "all" | InfinityPlotStatus;
};

function toGray(hex: string, mix = 0.58): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);

  const avg = Math.round((r + g + b) / 3);
  const nr = Math.round(r * (1 - mix) + avg * mix);
  const ng = Math.round(g * (1 - mix) + avg * mix);
  const nb = Math.round(b * (1 - mix) + avg * mix);

  return `rgb(${nr}, ${ng}, ${nb})`;
}

export default function InfinityMap({
  plots,
  selectedPlot,
  onSelectPlot,
  showLabels,
  activeFilter,
}: InfinityMapProps) {
  const [hoveredPlot, setHoveredPlot] = useState<InfinityPlot | null>(null);

  const defs = useMemo(() => {
    return plots.map((plot) => {
      const rarityColor = getRarityColor(plot.rarity);
      const outerColor = toGray(rarityColor, 0.74);
      return {
        id: plot.id,
        gradientId: `grad-${plot.id}`,
        rarityColor,
        outerColor,
      };
    });
  }, [plots]);

  return (
    <div
      style={{
        width: "100%",
        background:
          "radial-gradient(circle at 50% 50%, rgba(88,28,135,0.18), rgba(15,23,42,0.92) 42%, rgba(2,6,23,1) 100%)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 26,
        padding: 18,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <svg
        viewBox="-360 -235 720 470"
        style={{ width: "100%", height: "auto", display: "block" }}
      >
        <defs>
          <filter id="nexusGlow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="ringGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {defs.map((item) => (
            <radialGradient
              id={item.gradientId}
              key={item.gradientId}
              cx="35%"
              cy="35%"
              r="80%"
            >
              <stop offset="0%" stopColor={item.rarityColor} />
              <stop offset="62%" stopColor={item.rarityColor} />
              <stop offset="100%" stopColor={item.outerColor} />
            </radialGradient>
          ))}
        </defs>

        <rect x="-360" y="-235" width="360" height="470" fill="rgba(120,60,60,0.05)" />
        <rect x="0" y="-235" width="360" height="470" fill="rgba(80,110,170,0.05)" />

        {Array.from({ length: 80 }).map((_, i) => {
          const x = ((i * 97) % 680) - 340;
          const y = ((i * 53) % 430) - 215;
          const r = (i % 3) + 0.4;
          return (
            <circle
              key={`star-${i}`}
              cx={x}
              cy={y}
              r={r}
              fill="rgba(255,255,255,0.18)"
            />
          );
        })}

        <path
          d="M -255 0
             C -255 -126, -120 -164, 0 0
             C 120 164, 255 126, 255 0
             C 255 -126, 120 -164, 0 0
             C -120 164, -255 126, -255 0 Z"
          fill="none"
          stroke="rgba(255,255,255,0.09)"
          strokeWidth="18"
          filter="url(#ringGlow)"
        />

        <path
          d="M -255 0
             C -255 -126, -120 -164, 0 0
             C 120 164, 255 126, 255 0
             C 255 -126, 120 -164, 0 0
             C -120 164, -255 126, -255 0 Z"
          fill="none"
          stroke="rgba(244,197,66,0.28)"
          strokeWidth="4"
        />

        <rect
          x={-12}
          y={-118}
          width={24}
          height={236}
          rx={8}
          fill="rgba(244,197,66,0.22)"
          filter="url(#nexusGlow)"
        />
        <rect
          x={-118}
          y={-12}
          width={236}
          height={24}
          rx={8}
          fill="rgba(167,139,250,0.18)"
          filter="url(#nexusGlow)"
        />

        <g>
          <polygon
            points="-118,-18 -102,8 -134,8"
            fill="rgba(244,197,66,0.85)"
            opacity="0.85"
          />
          <polygon
            points="118,-18 134,8 102,8"
            fill="rgba(192,199,209,0.85)"
            opacity="0.85"
          />
        </g>

        {plots.map((plot) => {
          const selected = selectedPlot?.id === plot.id;
          const hovered = hoveredPlot?.id === plot.id;
          const visible =
            activeFilter === "all" || plot.status === activeFilter;

          if (!visible) return null;

          const displaySize = getPlotDisplaySize(plot);
          const x = plot.x - displaySize / 2;
          const y = plot.y - displaySize / 2;
          const factionStroke = getFactionStroke(plot.faction);
          const laneWeight = getLaneWeight(plot.distanceToNexus);
          const gradientId = `grad-${plot.id}`;

          return (
            <g
              key={plot.id}
              onMouseEnter={() => setHoveredPlot(plot)}
              onMouseLeave={() => setHoveredPlot((current) => (current?.id === plot.id ? null : current))}
              onClick={() => onSelectPlot(plot)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x - 2}
                y={y - 2}
                width={displaySize + 4}
                height={displaySize + 4}
                rx={plot.kind === "community" ? 8 : 4}
                ry={plot.kind === "community" ? 8 : 4}
                fill="none"
                stroke={`rgba(255,255,255,${0.06 + laneWeight * 0.22})`}
                strokeWidth={plot.kind === "community" ? 2.2 : 1.1}
              />

              <rect
                x={x}
                y={y}
                width={displaySize}
                height={displaySize}
                rx={plot.kind === "community" ? 8 : 4}
                ry={plot.kind === "community" ? 8 : 4}
                fill={`url(#${gradientId})`}
                stroke={selected ? "#ffffff" : factionStroke}
                strokeWidth={selected ? 3 : plot.kind === "community" ? 2.2 : 1.2}
                opacity={plot.status === "locked" ? 0.36 : 0.96}
                transform={
                  hovered && !selected
                    ? `translate(${plot.x}, ${plot.y}) scale(1.07) translate(${-plot.x}, ${-plot.y})`
                    : undefined
                }
              />

              {(plot.status === "owned" || plot.kind === "community") && (
                <rect
                  x={plot.x - 3}
                  y={plot.y - 3}
                  width={6}
                  height={6}
                  rx={2}
                  ry={2}
                  fill={getStatusBadgeColor(plot.status)}
                />
              )}

              {showLabels && (
                <text
                  x={plot.x}
                  y={plot.y - displaySize * 0.8}
                  textAnchor="middle"
                  fontSize={plot.kind === "community" ? 11 : 8}
                  fill="rgba(255,255,255,0.8)"
                >
                  {plot.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          right: 16,
          top: 16,
          padding: "10px 12px",
          borderRadius: 14,
          background: "rgba(15,23,42,0.78)",
          border: "1px solid rgba(255,255,255,0.08)",
          fontSize: 12,
          lineHeight: 1.5,
        }}
      >
        <div><strong>Legende</strong></div>
        <div>Gold = Inpinity</div>
        <div>Silber = Inphinity</div>
        <div>Große Felder = 25×25 Community</div>
        <div>Kleine Felder = 5×5 Personal</div>
      </div>

      {hoveredPlot && (
        <div
          style={{
            position: "absolute",
            left: 16,
            bottom: 16,
            minWidth: 220,
            padding: "12px 14px",
            borderRadius: 14,
            background: "rgba(15,23,42,0.86)",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 14px 34px rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        >
          <div style={{ fontWeight: 700, marginBottom: 6 }}>{hoveredPlot.label}</div>
          <div>Status: {hoveredPlot.status}</div>
          <div>Typ: {hoveredPlot.kind === "community" ? "25×25" : "5×5"}</div>
          <div>Rarity: {hoveredPlot.rarity}</div>
          <div>Faction: {hoveredPlot.faction}</div>
          <div>Lane: {hoveredPlot.lane}</div>
        </div>
      )}
    </div>
  );
}