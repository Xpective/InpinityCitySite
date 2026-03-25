import type {
  InfinityFaction,
  InfinityPlot,
  InfinityPlotKind,
  InfinityPlotPolicy,
  InfinityRarity,
  InfinityPlotStatus,
  InfinityPlotTier,
} from "../types/infinity";

export const SVG_WIDTH = 1400;
export const SVG_HEIGHT = 900;
export const CENTER_X = SVG_WIDTH / 2;
export const CENTER_Y = SVG_HEIGHT / 2;

const PERSONAL_SIZE = 16;
const COMMUNITY_SIZE = 50;
const MID_COMMUNITY_SIZE = 42;
const BORDERLINE_SIZE = 34;
const NEUTRAL_SIZE = 34;

function getTier(
  distanceToNexus: number,
  plotKind: InfinityPlotKind
): InfinityPlotTier {
  if (plotKind === "nexus") return "nexus";
  if (distanceToNexus <= 120) return "inner";
  if (distanceToNexus <= 260) return "mid";
  return "outer";
}

function buildPolicy(
  plotKind: InfinityPlotKind,
  faction: InfinityFaction
): InfinityPlotPolicy {
  const isPersonal = plotKind === "personal-5x5";
  const isCommunity = plotKind === "community-25x25";
  const isBorderline = plotKind === "borderline-25x25";
  const isNexus = plotKind === "nexus";

  return {
    isPersonal,
    isCommunity,
    isBorderline,
    isNexus,
    reservable: isPersonal,
    purchasable: false,
    factionLocked:
      isPersonal && (faction === "inpinity" || faction === "inphinity"),
    sharedUse: isCommunity || isBorderline || isNexus,
  };
}

function getDefaultQubiqProgress(plotKind: InfinityPlotKind) {
  if (plotKind === "personal-5x5") {
    return { completed: 0, total: 25 };
  }

  if (
    plotKind === "community-25x25" ||
    plotKind === "borderline-25x25"
  ) {
    return { completed: 0, total: 625 };
  }

  return { completed: 0, total: 1 };
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function distance(
  ax: number,
  ay: number,
  bx: number,
  by: number
): number {
  return Math.hypot(ax - bx, ay - by);
}

function getLemniscatePoint(t: number) {
  const scale = 330;
  const x = (scale * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t));
  const y =
    ((scale * Math.sin(t) * Math.cos(t)) / (1 + Math.sin(t) * Math.sin(t))) *
    0.8;

  return {
    x: CENTER_X + x,
    y: CENTER_Y + y,
  };
}

export function getInfinityPath(): string {
  const steps = 280;
  let path = "";

  for (let i = 0; i <= steps; i += 1) {
    const t = (Math.PI * 2 * i) / steps;
    const p = getLemniscatePoint(t);
    path += i === 0 ? `M ${p.x} ${p.y}` : ` L ${p.x} ${p.y}`;
  }

  return path;
}

export function getCanonicalSideFromFaction(
  faction: InfinityFaction
): "left" | "right" | null {
  if (faction === "inpinity") return "left";
  if (faction === "inphinity") return "right";
  return null;
}

export function isFactionOnExpectedSide(
  faction: InfinityFaction,
  side: "left" | "right" | "center"
): boolean {
  const expectedSide = getCanonicalSideFromFaction(faction);
  if (!expectedSide) return true;
  return expectedSide === side;
}

export function getFactionGlow(side: "left" | "right"): string {
  return side === "left"
    ? "radial-gradient(circle at 30% 50%, rgba(255,160,95,0.18), rgba(255,110,70,0.07), transparent 60%)"
    : "radial-gradient(circle at 70% 50%, rgba(100,150,255,0.18), rgba(115,105,255,0.07), transparent 60%)";
}

export function getRarityColor(rarity: InfinityRarity): string {
  if (rarity === "common") return "#93a0b2";
  if (rarity === "uncommon") return "#68b6ff";
  if (rarity === "rare") return "#53d7ff";
  if (rarity === "epic") return "#9b7cff";
  if (rarity === "legendary") return "#f4b84d";
  return "#f8de7a";
}

export function getFactionStroke(faction: InfinityFaction): string {
  if (faction === "inpinity") return "#ffbf78";
  if (faction === "inphinity") return "#9eb7ff";
  if (faction === "borderline") return "#7dff4d";
  if (faction === "community") return "#ff7a59";
  if (faction === "neutral") return "#2f65ff";
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

export function estimatePlotPrice(
  plot: Pick<InfinityPlot, "rarity" | "lane" | "distanceToNexus" | "plotKind">
): number {
  let base = 120;

  if (plot.plotKind === "community-25x25") base = 2500;
  if (plot.plotKind === "borderline-25x25") base = 2900;
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
  const nexusBoost =
    1 + clamp((320 - plot.distanceToNexus) / 320, 0, 1) * 0.8;

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

function getMockStatusByIndex(i: number): InfinityPlotStatus {
  if (i % 29 === 0) return "locked";
  return "free";
}

function buildPersonalPlots(): InfinityPlot[] {
  const plots: InfinityPlot[] = [];
  const steps = 240;
  let created = 0;

  for (let i = 0; i < steps; i += 1) {
    const t = Math.PI + (Math.PI * 2 * i) / steps;
    const anchor = getLemniscatePoint(t);

    const ringOffset = (i % 2 === 0 ? 1 : -1) * (18 + (i % 6) * 7);
    const x = anchor.x + Math.cos(t + Math.PI / 2) * ringOffset;
    const y = anchor.y + Math.sin(t + Math.PI / 2) * ringOffset;

    const side =
      x < CENTER_X - 30 ? "left" : x > CENTER_X + 30 ? "right" : "center";

    if (side === "center") continue;

    const distanceToNexus = distance(x, y, CENTER_X, CENTER_Y);
    const rarity = getRarityByDistance(distanceToNexus);
    const faction: InfinityFaction =
      side === "left" ? "inpinity" : "inphinity";
    const lane = Math.max(
      1,
      Math.round((1 - clamp(distanceToNexus / 360, 0, 1)) * 6)
    );
    const status = getMockStatusByIndex(i);
    const plotKind: InfinityPlotKind = "personal-5x5";

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
      plotKind,
      plotId: String(created),
      tier: getTier(distanceToNexus, plotKind),
      policy: buildPolicy(plotKind, faction),
      qubiqProgress: getDefaultQubiqProgress(plotKind),
      priceEstimate: 0,
      ownerLabel: undefined,
      lastTransferDaysAgo: undefined,
    };

    plot.priceEstimate = estimatePlotPrice(plot);
    plots.push(plot);
  }

  return plots;
}

function buildCenterPlots(): InfinityPlot[] {
  type CenterBasePlot = Omit<
    InfinityPlot,
    "priceEstimate" | "tier" | "policy" | "qubiqProgress"
  >;

  const raw: CenterBasePlot[] = [
    {
      id: "borderline-1",
      index: 10101,
      x: CENTER_X,
      y: CENTER_Y - 210,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 210,
      rarity: "epic",
      faction: "borderline",
      status: "borderline",
      label: "B1",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-2",
      index: 10102,
      x: CENTER_X,
      y: CENTER_Y - 156,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 156,
      rarity: "epic",
      faction: "borderline",
      status: "borderline",
      label: "B2",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-3",
      index: 10103,
      x: CENTER_X,
      y: CENTER_Y - 102,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 102,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "B3",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-4",
      index: 10104,
      x: CENTER_X,
      y: CENTER_Y - 48,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 48,
      rarity: "mythic",
      faction: "borderline",
      status: "borderline",
      label: "B4",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-5",
      index: 10105,
      x: CENTER_X,
      y: CENTER_Y + 48,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 48,
      rarity: "mythic",
      faction: "borderline",
      status: "borderline",
      label: "B5",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-6",
      index: 10106,
      x: CENTER_X,
      y: CENTER_Y + 102,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 102,
      rarity: "legendary",
      faction: "borderline",
      status: "borderline",
      label: "B6",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-7",
      index: 10107,
      x: CENTER_X,
      y: CENTER_Y + 156,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 156,
      rarity: "epic",
      faction: "borderline",
      status: "borderline",
      label: "B7",
      plotKind: "borderline-25x25",
    },
    {
      id: "borderline-8",
      index: 10108,
      x: CENTER_X,
      y: CENTER_Y + 210,
      width: BORDERLINE_SIZE,
      height: BORDERLINE_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 210,
      rarity: "epic",
      faction: "borderline",
      status: "borderline",
      label: "B8",
      plotKind: "borderline-25x25",
    },

    {
      id: "neutral-1",
      index: 10201,
      x: CENTER_X - 58,
      y: CENTER_Y,
      width: NEUTRAL_SIZE,
      height: NEUTRAL_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 58,
      rarity: "legendary",
      faction: "neutral",
      status: "nexus",
      label: "N1",
      plotKind: "nexus",
    },
    {
      id: "neutral-2",
      index: 10202,
      x: CENTER_X,
      y: CENTER_Y,
      width: NEUTRAL_SIZE,
      height: NEUTRAL_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 0,
      rarity: "mythic",
      faction: "neutral",
      status: "nexus",
      label: "N2",
      plotKind: "nexus",
    },
    {
      id: "neutral-3",
      index: 10203,
      x: CENTER_X + 58,
      y: CENTER_Y,
      width: NEUTRAL_SIZE,
      height: NEUTRAL_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 58,
      rarity: "legendary",
      faction: "neutral",
      status: "nexus",
      label: "N3",
      plotKind: "nexus",
    },
    {
      id: "neutral-4",
      index: 10204,
      x: CENTER_X,
      y: CENTER_Y - 58,
      width: NEUTRAL_SIZE,
      height: NEUTRAL_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 58,
      rarity: "legendary",
      faction: "neutral",
      status: "nexus",
      label: "N4",
      plotKind: "nexus",
    },
    {
      id: "neutral-5",
      index: 10205,
      x: CENTER_X,
      y: CENTER_Y + 58,
      width: NEUTRAL_SIZE,
      height: NEUTRAL_SIZE,
      lane: 7,
      side: "center",
      distanceToNexus: 58,
      rarity: "legendary",
      faction: "neutral",
      status: "nexus",
      label: "N5",
      plotKind: "nexus",
    },

    {
      id: "community-left-top",
      index: 10301,
      x: CENTER_X - 150,
      y: CENTER_Y - 92,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "left",
      distanceToNexus: 176,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CL1",
      plotKind: "community-25x25",
    },
    {
      id: "community-left-bottom",
      index: 10302,
      x: CENTER_X - 150,
      y: CENTER_Y + 92,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "left",
      distanceToNexus: 176,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CL2",
      plotKind: "community-25x25",
    },
    {
      id: "community-left-outer-top",
      index: 10303,
      x: CENTER_X - 360,
      y: CENTER_Y - 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 4,
      side: "left",
      distanceToNexus: 367,
      rarity: "epic",
      faction: "community",
      status: "community",
      label: "CL3",
      plotKind: "community-25x25",
    },
    {
      id: "community-left-outer-bottom",
      index: 10304,
      x: CENTER_X - 360,
      y: CENTER_Y + 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 4,
      side: "left",
      distanceToNexus: 367,
      rarity: "epic",
      faction: "community",
      status: "community",
      label: "CL4",
      plotKind: "community-25x25",
    },

    {
      id: "community-right-top",
      index: 10305,
      x: CENTER_X + 150,
      y: CENTER_Y - 92,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "right",
      distanceToNexus: 176,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CR1",
      plotKind: "community-25x25",
    },
    {
      id: "community-right-bottom",
      index: 10306,
      x: CENTER_X + 150,
      y: CENTER_Y + 92,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 6,
      side: "right",
      distanceToNexus: 176,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CR2",
      plotKind: "community-25x25",
    },
    {
      id: "community-right-outer-top",
      index: 10307,
      x: CENTER_X + 360,
      y: CENTER_Y - 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 4,
      side: "right",
      distanceToNexus: 367,
      rarity: "epic",
      faction: "community",
      status: "community",
      label: "CR3",
      plotKind: "community-25x25",
    },
    {
      id: "community-right-outer-bottom",
      index: 10308,
      x: CENTER_X + 360,
      y: CENTER_Y + 72,
      width: COMMUNITY_SIZE,
      height: COMMUNITY_SIZE,
      lane: 4,
      side: "right",
      distanceToNexus: 367,
      rarity: "epic",
      faction: "community",
      status: "community",
      label: "CR4",
      plotKind: "community-25x25",
    },

    {
      id: "community-mid-1",
      index: 10309,
      x: CENTER_X - 88,
      y: CENTER_Y - 92,
      width: MID_COMMUNITY_SIZE,
      height: MID_COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 127,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CM1",
      plotKind: "community-25x25",
    },
    {
      id: "community-mid-2",
      index: 10310,
      x: CENTER_X + 88,
      y: CENTER_Y - 92,
      width: MID_COMMUNITY_SIZE,
      height: MID_COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 127,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CM2",
      plotKind: "community-25x25",
    },
    {
      id: "community-mid-3",
      index: 10311,
      x: CENTER_X - 88,
      y: CENTER_Y + 92,
      width: MID_COMMUNITY_SIZE,
      height: MID_COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 127,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CM3",
      plotKind: "community-25x25",
    },
    {
      id: "community-mid-4",
      index: 10312,
      x: CENTER_X + 88,
      y: CENTER_Y + 92,
      width: MID_COMMUNITY_SIZE,
      height: MID_COMMUNITY_SIZE,
      lane: 6,
      side: "center",
      distanceToNexus: 127,
      rarity: "legendary",
      faction: "community",
      status: "community",
      label: "CM4",
      plotKind: "community-25x25",
    },
  ];

  return raw.map((plot) => ({
    ...plot,
    tier: getTier(plot.distanceToNexus, plot.plotKind),
    policy: buildPolicy(plot.plotKind, plot.faction),
    qubiqProgress: getDefaultQubiqProgress(plot.plotKind),
    priceEstimate: estimatePlotPrice(plot),
    ownerLabel: plot.status === "community" ? "Collective Reserve" : undefined,
    lastTransferDaysAgo: undefined,
  }));
}

export function generateInfinityPlots(): InfinityPlot[] {
  return [...buildPersonalPlots(), ...buildCenterPlots()];
}