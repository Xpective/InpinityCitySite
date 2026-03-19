import type {
  InfinityFaction,
  InfinityPlot,
  InfinityPlotStatus,
  InfinityRarity,
  InfinityRingSide,
} from "../types/infinity";

const TOTAL_POINTS = 180;
const SCALE_X = 260;
const SCALE_Y = 170;
const PLOT_SIZE = 16;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getLaneWeight(distanceToNexus: number): number {
  const normalized = clamp(1 - distanceToNexus / 320, 0, 1);
  return Number(normalized.toFixed(3));
}

export function getRarityFromDistance(distanceToNexus: number): InfinityRarity {
  if (distanceToNexus < 55) return "legendary";
  if (distanceToNexus < 95) return "epic";
  if (distanceToNexus < 145) return "rare";
  if (distanceToNexus < 220) return "uncommon";
  return "common";
}

export function getFactionFromSide(side: InfinityRingSide): InfinityFaction {
  if (side === "left") return "inpinity";
  if (side === "right") return "inphinity";
  return "neutral";
}

export function getStatusFromIndex(index: number): InfinityPlotStatus {
  if (index === 1 || index === TOTAL_POINTS / 2 + 1) return "nexus";
  if (index % 17 === 0) return "reserved";
  if (index % 29 === 0) return "owned";
  return "free";
}

export function getPlotFill(plot: InfinityPlot): string {
  if (plot.status === "nexus") return "#f4c542";
  if (plot.status === "owned") return "#6ee7b7";
  if (plot.status === "reserved") return "#93c5fd";
  if (plot.rarity === "legendary") return "#f59e0b";
  if (plot.rarity === "epic") return "#a78bfa";
  if (plot.rarity === "rare") return "#60a5fa";
  if (plot.rarity === "uncommon") return "#94a3b8";
  return "#64748b";
}

export function buildInfinityPlots(): InfinityPlot[] {
  const plots: InfinityPlot[] = [];

  for (let i = 0; i < TOTAL_POINTS; i++) {
    const t = (Math.PI * 2 * i) / TOTAL_POINTS;

    const x = SCALE_X * Math.sin(t);
    const y = SCALE_Y * Math.sin(t) * Math.cos(t);

    let side: InfinityRingSide = "bridge";
    if (x < -25) side = "left";
    if (x > 25) side = "right";

    const distanceToNexus = Math.sqrt(x * x + y * y);
    const rarity = getRarityFromDistance(distanceToNexus);
    const faction = getFactionFromSide(side);
    const status = getStatusFromIndex(i + 1);

    plots.push({
      id: `plot-${i + 1}`,
      index: i + 1,
      x,
      y,
      size: PLOT_SIZE,
      lane: Math.max(1, Math.round((1 - clamp(distanceToNexus / 320, 0, 1)) * 5)),
      side,
      distanceToNexus: Number(distanceToNexus.toFixed(2)),
      rarity,
      faction,
      status,
      label: `Q${i + 1}`,
    });
  }

  return plots;
}