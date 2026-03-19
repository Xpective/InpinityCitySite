import type {
  InfinityFaction,
  InfinityPlot,
  InfinityPlotKind,
  InfinityPlotStatus,
  InfinityRarity,
  InfinityRingSide,
} from "../types/infinity";

const TOTAL_PERSONAL_PLOTS = 168;
const SCALE_X = 255;
const SCALE_Y = 160;
const BASE_PLOT_SIZE = 12;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function getLaneWeight(distanceToNexus: number): number {
  const normalized = clamp(1 - distanceToNexus / 320, 0, 1);
  return Number(normalized.toFixed(3));
}

export function getFactionFromSide(side: InfinityRingSide): InfinityFaction {
  if (side === "left") return "inpinity";
  if (side === "right") return "inphinity";
  return "neutral";
}

export function getRarityFromDistance(distanceToNexus: number): InfinityRarity {
  if (distanceToNexus < 55) return "legendary";
  if (distanceToNexus < 95) return "epic";
  if (distanceToNexus < 145) return "rare";
  if (distanceToNexus < 210) return "uncommon";
  return "common";
}

export function getStatusFromIndex(index: number): InfinityPlotStatus {
  if (index % 37 === 0) return "owned";
  if (index % 19 === 0) return "reserved";
  if (index % 31 === 0) return "locked";
  return "free";
}

export function getRarityColor(rarity: InfinityRarity): string {
  if (rarity === "legendary") return "#f4b942";
  if (rarity === "epic") return "#9f7aea";
  if (rarity === "rare") return "#4da3ff";
  if (rarity === "uncommon") return "#7dd3a7";
  return "#94a3b8";
}

export function getFactionStroke(faction: InfinityFaction): string {
  if (faction === "inpinity") return "#f4c542";
  if (faction === "inphinity") return "#c0c7d1";
  return "#8b95a7";
}

export function getStatusBadgeColor(status: InfinityPlotStatus): string {
  if (status === "community") return "#f4c542";
  if (status === "owned") return "#34d399";
  if (status === "reserved") return "#60a5fa";
  if (status === "nexus") return "#f59e0b";
  if (status === "locked") return "#64748b";
  return "#cbd5e1";
}

export function getPlotDisplaySize(plot: InfinityPlot): number {
  if (plot.kind === "community") return 34;
  if (plot.status === "nexus") return 24;
  return plot.size + (plot.lane - 1) * 0.8;
}

function getSideFromX(x: number): InfinityRingSide {
  if (x < -24) return "left";
  if (x > 24) return "right";
  return "bridge";
}

function buildCommunityPlots(): InfinityPlot[] {
  const plots: InfinityPlot[] = [];

  const communityPositions = [
    { id: "community-left", x: -118, y: 0, side: "left" as InfinityRingSide, label: "Community West" },
    { id: "community-right", x: 118, y: 0, side: "right" as InfinityRingSide, label: "Community East" },
  ];

  for (let i = 0; i < communityPositions.length; i++) {
    const p = communityPositions[i];
    const distanceToNexus = Math.sqrt(p.x * p.x + p.y * p.y);

    plots.push({
      id: p.id,
      index: i + 1,
      x: p.x,
      y: p.y,
      size: 34,
      lane: 5,
      side: p.side,
      distanceToNexus: Number(distanceToNexus.toFixed(2)),
      rarity: "legendary",
      faction: getFactionFromSide(p.side),
      status: "community",
      kind: "community",
      widthUnits: 25,
      heightUnits: 25,
      label: p.label,
    });
  }

  return plots;
}

function buildPersonalPlots(): InfinityPlot[] {
  const plots: InfinityPlot[] = [];

  for (let i = 0; i < TOTAL_PERSONAL_PLOTS; i++) {
    const t = (Math.PI * 2 * i) / TOTAL_PERSONAL_PLOTS;

    const x = SCALE_X * Math.sin(t);
    const y = SCALE_Y * Math.sin(t) * Math.cos(t);

    const side = getSideFromX(x);
    const distanceToNexus = Math.sqrt(x * x + y * y);
    const rarity = getRarityFromDistance(distanceToNexus);
    const faction = getFactionFromSide(side);
    const lane = Math.max(1, Math.round((1 - clamp(distanceToNexus / 320, 0, 1)) * 5));
    const status = getStatusFromIndex(i + 1);
    const ownerLabel = status === "owned" ? `0x${(1000 + i).toString(16)}...city` : undefined;

    plots.push({
      id: `plot-${i + 1}`,
      index: i + 1,
      x,
      y,
      size: BASE_PLOT_SIZE,
      lane,
      side,
      distanceToNexus: Number(distanceToNexus.toFixed(2)),
      rarity,
      faction,
      status,
      kind: "personal",
      widthUnits: 5,
      heightUnits: 5,
      label: `Q${i + 1}`,
      ownerLabel,
    });
  }

  return plots;
}

export function buildInfinityPlots(): InfinityPlot[] {
  return [...buildCommunityPlots(), ...buildPersonalPlots()];
}

export function filterPlots(
  plots: InfinityPlot[],
  filter: "all" | InfinityPlotStatus
): InfinityPlot[] {
  if (filter === "all") return plots;
  return plots.filter((plot) => plot.status === filter);
}

export function getPlotKindLabel(kind: InfinityPlotKind): string {
  return kind === "community" ? "25×25 Community Plot" : "5×5 Personal Plot";
}