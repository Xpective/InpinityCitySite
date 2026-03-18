export type InfinityFaction = "inpinity" | "inphinity";
export type InfinityLane = "inner" | "middle" | "outer";
export type PlotVisualState = "free" | "reserved" | "occupied";

export type InfinityPlot = {
  id: string;
  plotId: number;
  faction: InfinityFaction;
  lane: InfinityLane;
  segment: number;
  distanceToNexus: number;
  rarityScore: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  visualState: PlotVisualState;
  label: string;
};

export type InfinityMapStats = {
  totalPlots: number;
  freePlots: number;
  reservedPlots: number;
  occupiedPlots: number;
};
