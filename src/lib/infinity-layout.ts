import type { InfinityFaction, InfinityPlot, InfinityRarity, InfinityPlotStatus } from "../types/infinity";

export const SVG_WIDTH = 1400;
export const SVG_HEIGHT = 900;
export const CENTER_X = SVG_WIDTH / 2;
export const CENTER_Y = SVG_HEIGHT / 2;

const PERSONAL_SIZE = 16;
const COMMUNITY_SIZE = 48;
const BORDERLINE_SIZE = 44;
const NEXUS_SIZE = 56;

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

function getLemniscatePoint(t: number) {
  const scale = 330;
  const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
  const y = (scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t)) * 0.8;
  return { x: CENTER_X + x, y: CENTER_Y + y };
}

export function getInfinityPath(): string {
  const steps = 280;
  let path = "";

  for (let i = 0; i <= steps; i++) {
    const t = (Math.PI * 2 * i) / steps;
    const p = getLemniscatePoint(t);
    path += i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;
  }

  return path;
}

export function getFactionGlow(side: "left" | "right"): string {
  return side === "left"
    ? "radial-gradient(circle at 30% 50%, rgba(255,180,80,0.16), rgba(255,120,60,0.05), transparent 60%)"
    : "radial-gradient(circle at 70% 50%, rgba(120,170,255,0.16), rgba(140,110,255,0.05), transparent 60%)";
}

export function getRarityColor(rarity: InfinityRarity): string {
  if (rarity === "common") return "#9ca3af";
  if (rarity === "uncommon") return "#60a5fa";
  if (rarity === "rare") return "#38bdf8";
  if (rarity === "epic") return "#a78bfa";
  if (rarity === "legendary") return "#f59e0b";
  return "#facc15";
}

export function getFactionStroke(faction: InfinityFaction): string {
  if (faction === "inpinity") return "#f5c16c";
  if (faction === "inphinity") return "#9fb7ff";
  if (faction === "borderline") return "#f4d58d";
  if (faction === "community") return "#f8e7a2";
  return "rgba(255,255,255,0.35)";
}

export function getStatusOpacity(status: InfinityPlotStatus): number {
  if (status === "locked") return 0.28;
  if (status === "reserved") return 0.78;
  return 0.96;
}

export function getLaneWeight(lane: number): number {
  return Number((1 + lane * 0.35).toFixed(2));
}

export function estimatePlotPrice(plot: Pick<InfinityPlot, "rarity" | "lane" | "distanceToNexus" | "plotKind">): number {
  let base = 120;

  if (plot.plotKind === "community-25x25") base = 2500;
  if (plot.plotKind === "borderline-25x25") base = 3100;
  if (plot.plotKind === "nexus") base = 5000;

  const rarityBoost =
    plot.rarity === "common"
      ? 1
      : plot.rarity === "uncommon"
      ? 1.18
      : plot.rarity === "rare"
      ? 1.45
      : plot.rarity === "epic"
      ? 1.9
      : plot.rarity === "legendary"
      ? 2.8
      : 4.2;

  const laneBoost = 1 + plot.lane * 0.22;
  const nexusBoost = 1 + clamp((320 - plot.distanceToNexus) / 320, 0, 1) * 0.8;

  return Math.round(base * rarityBoost * laneBoost * nexusBoost);
}

function getRarityByDistance(distanceToNexus: number): InfinityRarity {
  if (distanceToNexus < 65) return "mythic";
  if (distanceToNexus < 100) return "legendary";
  if (distanceToNexus < 145) return "epic";
  if (distanceToNexus < 200) return "rare";
  if (distanceToNexus < 255) return "uncommon";
  return "common";
}

function getStatusByIndex(i: number): InfinityPlotStatus {
  if (i % 17 === 0) return "owned";
  if (i % 11 === 0) return "reserved";
  if (i % 29 === 0) return "locked";
  return "free";
}

function buildPersonalPlots(): InfinityPlot[] {
  const plots: InfinityPlot[] = [];
  const steps = 220;
  let created = 0;

  for (let i = 0; i < steps; i++) {
    const t = (Math.PI * 2 * i) / steps;
    const anchor = getLemniscatePoint(t);

    const ringOffset = (i % 2 === 0 ? 1 : -1) * (20 + (i % 5) * 7);
    const x = anchor.x + Math.cos(t + Math.PI / 2) * ringOffset;
    const y = anchor.y + Math.sin(t + Math.PI / 2) * ringOffset;

    const side = x < CENTER_X - 20 ? "left" : x > CENTER_X + 20 ? "right" : "center";
    if (side === "center") continue;

    const distanceToNexus = distance(x, y, CENTER_X, CENTER_Y);
    const rarity = getRarityByDistance(distanceToNexus);
    const faction = side === "left" ? "inpinity" : "inphinity";
    const lane = Math.max(1, Math.round((1 - clamp(distanceToNexus / 360, 0, 1)) * 6));
    const status = getStatusByIndex(i);

    created += 1;

    const plot: InfinityPlot = {
      id: `plot-${created}`,
      index: created,
      x,
      y,
      width: PERSONAL_SIZE + lane * 0.7,
      height: PERSONAL_SIZE + lane * 0.7,
      lane,
      side,
      distanceToNexus: Number(distanceToNexus.toFixed(2)),
      rarity,
      faction,
      status,
      label: `Q${created}`,
      plotKind: "personal-5x5",
      priceEstimate: 0,
      ownerLabel: status === "owned" ? `0x${(1200 + created).toString(16)}...${(8800 + created).toString(16)}` : undefined,
      lastTransferDaysAgo: status === "owned" ? (created % 90) + 3 : undefined,
    };

    plot.priceEstimate = estimatePlotPrice(plot);
    plots.push(plot);
  }

  return plots;
}

function buildCenterPlots(): InfinityPlot[] {
  const raw: Omit<InfinityPlot, "priceEstimate">[] = [
    {
      id: "community-1",
      index: 10001,
      x: CENTER_X - 110,
      y: CENTER_Y - 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 54,
      rarity: "mythic",
      faction: "community",
      status: "community",
      label: "COMMUNITY A",
      plotKind: "community-25x25",
    },
    {
      id: "community-2",
      index: 10002,
      x: CENTER_X + 110,
      y: CENTER_Y - 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 54,
      rarity: "mythic",
      faction: "community",
      status: "community",
      label: "COMMUNITY B",
      plotKind: "community-25x25",
    },
    {
      id: "community-3",
      index: 10003,
      x: CENTER_X - 110,
      y: CENTER_Y + 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 54,
      rarity: "mythic",
      faction: "community",
      status: "community",
      label: "COMMUNITY C",
      plotKind: "community-25x25",
    },
    {
      id: "community-4",
      index: 10004,
      x: CENTER_X + 110,
      y: CENTER_Y + 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 54,
      rarity: "mythic",
      faction: "community",
      status: "community",
      label: "COMMUNITY D",
      plotKind: "community-25x25",
    },
    {
      id: "borderline-1",
      index: 10101,
      x: CENTER_X - 42,
      y: CENTER_Y - 72,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 30,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "BORDER 1",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-2",
      index: 10102,
      x: CENTER_X + 42,
      y: CENTER_Y - 72,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 30,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "BORDER 2",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-3",
      index: 10103,
      x: CENTER_X - 42,
      y: CENTER_Y + 72,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 30,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "BORDER 3",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-4",
      index: 10104,
      x: CENTER_X + 42,
      y: CENTER_Y + 72,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 30,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "BORDER 4",
      plotKind: "borderline-25x25",
    },
    {
      id: "nexus-1",
      index: 10201,
      x: CENTER_X,
      y: CENTER_Y - 8,
      width: NEXUS_SIZE,
      height: NEXUS_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 0,
      rarity: "mythic",
      faction: "neutral",
      status: "nexus",
      label: "NEXUS",
      plotKind: "nexus",
    },
  ];

  return raw.map((plot) => ({
    ...plot,
    priceEstimate: estimatePlotPrice(plot),
    ownerLabel: plot.status === "community" ? "Collective Reserve" : undefined,
    lastTransferDaysAgo: plot.status === "community" ? 0 : undefined,
  }));
}

export function generateInfinityPlots(): InfinityPlot[] {
  return [...buildPersonalPlots(), ...buildCenterPlots()];
}