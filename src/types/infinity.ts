export type InfinityRingSide = "left" | "right" | "center";

export type InfinityRarity =
  | "common"
  | "uncommon"
  | "rare"
  | "epic"
  | "legendary"
  | "mythic";

export type InfinityFaction =
  | "inpinity"
  | "inphinity"
  | "borderline"
  | "community"
  | "neutral";

export type InfinityPlotStatus =
  | "free"
  | "reserved"
  | "owned"
  | "community"
  | "borderline"
  | "nexus"
  | "locked";

export type InfinityPlotKind =
  | "personal-5x5"
  | "community-25x25"
  | "borderline-25x25"
  | "nexus";

export type InfinityPlot = {
  id: string;
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  lane: number;
  side: InfinityRingSide;
  distanceToNexus: number;
  rarity: InfinityRarity;
  faction: InfinityFaction;
  status: InfinityPlotStatus;
  label: string;
  plotKind: InfinityPlotKind;
  priceEstimate: number;
  ownerLabel?: string;
  lastTransferDaysAgo?: number;
  isFavorite?: boolean;
};