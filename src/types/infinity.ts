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

export type InfinityPlotTier =
  | "outer"
  | "mid"
  | "inner"
  | "nexus";

export type InfinityPlotPolicy = {
  isPersonal: boolean;
  isCommunity: boolean;
  isBorderline: boolean;
  isNexus: boolean;
  reservable: boolean;
  purchasable: boolean;
  factionLocked: boolean;
  sharedUse: boolean;
};

export type InfinityPlotProvenance = {
  firstBuilder?: string;
  createdAt?: number;
  layerCount: number;
  ownershipTransfers: number;
  aetherUses: number;
  historicScore: number;
  originFaction: string;
  genesisEra?: string;
  lastUpdated?: number;

  // Vorbereitete abgeleitete Werte
  legacyScore: number;
  provenanceScore: number;
  ageInDays?: number;
  isHistoricCore: boolean;
};

export type InfinityPlotStatusInfo = {
  lastActivityAt?: number;
  lastMaintenanceAt?: number;
  manualStatusOverride?: string;
  derivedStatus?: string;
  layerEligible: boolean;
  updatedAt?: number;

  // Vorbereitete abgeleitete Werte
  inactivityDays?: number;
  maintenanceAgeDays?: number;
  inactivityLevel: "fresh" | "watch" | "warning" | "critical";
  maintenanceLevel: "maintained" | "due" | "overdue";
  canLayerUpgrade: boolean;
};

export type InfinityPlotValueModel = {
  baseValue: number;
  rarityMultiplier: number;
  laneMultiplier: number;
  nexusMultiplier: number;
  historicalMultiplier: number;
  finalEstimate: number;
};

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

  // Layout / Klassifikation
  tier: InfinityPlotTier;
  policy: InfinityPlotPolicy;

  // Overlay-Felder aus Subgraph / Merge
  plotId?: string;
  owner?: string;
  createdAt?: number;
  exists?: boolean;

  provenance?: InfinityPlotProvenance;
  statusInfo?: InfinityPlotStatusInfo;
  valueModel?: InfinityPlotValueModel;
};