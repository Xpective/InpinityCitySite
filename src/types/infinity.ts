export type InfinityFaction = "inpinity" | "inphinity" | "neutral";

export type InfinityRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary";

export type InfinityRingSide = "left" | "right" | "bridge";

export type InfinityPlotStatus =
  | "free"
  | "reserved"
  | "owned"
  | "nexus"
  | "locked";

export type InfinityPlot = {
  id: string;
  index: number;
  x: number;
  y: number;
  size: number;
  lane: number;
  side: InfinityRingSide;
  distanceToNexus: number;
  rarity: InfinityRarity;
  faction: InfinityFaction;
  status: InfinityPlotStatus;
  label: string;
};