import type {
  InfinityFaction,
  InfinityLane,
  InfinityMapStats,
  InfinityPlot,
  PlotVisualState,
} from "../types/infinity";

const SVG_WIDTH = 1200;
const SVG_HEIGHT = 760;

const LEFT_CENTER = { x: 410, y: 340 };
const RIGHT_CENTER = { x: 790, y: 340 };

const LANE_RADIUS: Record<InfinityLane, number> = {
  inner: 118,
  middle: 165,
  outer: 214,
};

const LANE_SIZE: Record<InfinityLane, number> = {
  inner: 26,
  middle: 28,
  outer: 30,
};

const SEGMENTS_PER_LANE: Record<InfinityLane, number> = {
  inner: 18,
  middle: 24,
  outer: 30,
};

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function round(num: number): number {
  return Math.round(num * 1000) / 1000;
}

function makePlotId(
  faction: InfinityFaction,
  lane: InfinityLane,
  segment: number
): string {
  return `${faction}-${lane}-${segment}`;
}

function makeLabel(
  faction: InfinityFaction,
  lane: InfinityLane,
  segment: number
): string {
  const side = faction === "inpinity" ? "Pi" : "Phi";
  const laneLabel =
    lane === "inner" ? "Inner" : lane === "middle" ? "Middle" : "Outer";

  return `${side} · ${laneLabel} · ${segment + 1}`;
}

function computeDistanceToNexus(x: number, y: number): number {
  const nexusX = 600;
  const nexusY = 340;
  const dx = x - nexusX;
  const dy = y - nexusY;
  return Math.sqrt(dx * dx + dy * dy);
}

function computeRarityScore(distanceToNexus: number): number {
  const normalized = 1 - clamp((distanceToNexus - 20) / 420, 0, 1);
  return round(normalized);
}

function computeVisualState(
  faction: InfinityFaction,
  lane: InfinityLane,
  segment: number
): PlotVisualState {
  if (lane === "inner" && segment % 11 === 0) return "occupied";
  if (lane === "middle" && segment % 9 === 0) return "reserved";
  if (faction === "inphinity" && lane === "outer" && segment % 13 === 0) {
    return "occupied";
  }
  return "free";
}

function createRingPlots(
  faction: InfinityFaction,
  center: { x: number; y: number }
): InfinityPlot[] {
  const lanes: InfinityLane[] = ["inner", "middle", "outer"];
  const plots: InfinityPlot[] = [];
  let numericPlotId = faction === "inpinity" ? 1 : 1001;

  lanes.forEach((lane) => {
    const radius = LANE_RADIUS[lane];
    const size = LANE_SIZE[lane];
    const segments = SEGMENTS_PER_LANE[lane];

    for (let i = 0; i < segments; i += 1) {
      const angle = (-Math.PI / 2) + (i / segments) * Math.PI * 2;

      const x = center.x + Math.cos(angle) * radius;
      const y = center.y + Math.sin(angle) * radius;
      const distanceToNexus = computeDistanceToNexus(x, y);

      plots.push({
        id: makePlotId(faction, lane, i),
        plotId: numericPlotId,
        faction,
        lane,
        segment: i,
        distanceToNexus: round(distanceToNexus),
        rarityScore: computeRarityScore(distanceToNexus),
        x: round(x),
        y: round(y),
        size,
        rotation: round((angle * 180) / Math.PI + 45),
        visualState: computeVisualState(faction, lane, i),
        label: makeLabel(faction, lane, i),
      });

      numericPlotId += 1;
    }
  });

  return plots;
}

function createBridgePlots(): InfinityPlot[] {
  const bridge: InfinityPlot[] = [];

  for (let i = 0; i < 8; i += 1) {
    const x = 510 + i * 26;
    const y = i % 2 === 0 ? 340 : 372;
    const distanceToNexus = computeDistanceToNexus(x, y);

    bridge.push({
      id: `bridge-${i + 1}`,
      plotId: 5000 + i,
      faction: i < 4 ? "inpinity" : "inphinity",
      lane: "inner",
      segment: i,
      distanceToNexus: round(distanceToNexus),
      rarityScore: computeRarityScore(distanceToNexus),
      x,
      y,
      size: 24,
      rotation: i % 2 === 0 ? 0 : 45,
      visualState: i === 2 || i === 5 ? "occupied" : i === 3 ? "reserved" : "free",
      label: `Nexus Bridge ${i + 1}`,
    });
  }

  return bridge;
}

export function generateInfinityPlots(): InfinityPlot[] {
  const leftPlots = createRingPlots("inpinity", LEFT_CENTER);
  const rightPlots = createRingPlots("inphinity", RIGHT_CENTER);
  const bridgePlots = createBridgePlots();

  return [...leftPlots, ...rightPlots, ...bridgePlots];
}

export function getInfinityMapStats(plots: InfinityPlot[]): InfinityMapStats {
  return {
    totalPlots: plots.length,
    freePlots: plots.filter((p) => p.visualState === "free").length,
    reservedPlots: plots.filter((p) => p.visualState === "reserved").length,
    occupiedPlots: plots.filter((p) => p.visualState === "occupied").length,
  };
}

export function getInfinityCanvas() {
  return {
    width: SVG_WIDTH,
    height: SVG_HEIGHT,
    nexus: { x: 600, y: 340 },
    leftCenter: LEFT_CENTER,
    rightCenter: RIGHT_CENTER,
  };
}

export function getPlotFill(plot: InfinityPlot): string {
  const isLeft = plot.faction === "inpinity";
  const score = plot.rarityScore;

  if (plot.visualState === "occupied") {
    return isLeft
      ? `rgba(${Math.round(140 + score * 70)}, ${Math.round(170 + score * 40)}, 255, 0.95)`
      : `rgba(255, ${Math.round(170 + score * 55)}, ${Math.round(120 + score * 50)}, 0.95)`;
  }

  if (plot.visualState === "reserved") {
    return isLeft
      ? `rgba(${Math.round(95 + score * 55)}, ${Math.round(135 + score * 35)}, 220, 0.82)`
      : `rgba(220, ${Math.round(145 + score * 45)}, ${Math.round(100 + score * 35)}, 0.82)`;
  }

  return isLeft
    ? `rgba(${Math.round(80 + score * 50)}, ${Math.round(105 + score * 55)}, ${Math.round(120 + score * 95)}, 0.70)`
    : `rgba(${Math.round(125 + score * 90)}, ${Math.round(110 + score * 45)}, ${Math.round(100 + score * 35)}, 0.70)`;
}

export function getPlotStroke(plot: InfinityPlot): string {
  if (plot.visualState === "occupied") return "rgba(255,255,255,0.9)";
  if (plot.visualState === "reserved") return "rgba(255,235,180,0.9)";
  return "rgba(255,255,255,0.28)";
}

export function getLaneWeight(lane: InfinityLane): string {
  if (lane === "inner") return "Inner Lane";
  if (lane === "middle") return "Middle Lane";
  return "Outer Lane";
}
