export type WeaponDefinition = {
  id: string;
  weaponDefinitionId: string;
  name: string;
  classId: string;
  damageTypeId: string;
  techTier: string;
  minDamage: string;
  maxDamage: string;
  enchantmentSlots: string;
  materiaSlots: string;
  enabled: boolean;
};

export type WeaponInstanceDefinitionRef = {
  id: string;
  name: string;
};

export type WeaponInstance = {
  id: string;
  tokenId: string;
  owner: string;
  rarityTier: string;
  upgradeLevel: string;
  durability: string;
  originPlotId: string;
  weaponDefinition?: WeaponInstanceDefinitionRef | null;
};

export type MateriaDefinition = {
  id: string;
  materiaId: string;
  name: string;
  categoryLabel: string;
  elementLabel: string;
  rarityTier: string;
  maxLevel: string;
  enabled: boolean;
};

export type PlotOwnerRef = {
  id: string;
};

export type Plot = {
  id: string;
  plotId: string;
  plotType: string;
  faction: string;
  status: string;
  width: string;
  height: string;
  exists: boolean;
  createdAt: string;
  owner?: PlotOwnerRef | null;
};

export type Player = {
  id: string;
  cityKeyTokenId?: string | null;
  faction?: string | null;
  personalPlotCount?: string | null;
  craftedWeapons?: string | null;
};

export type PlotRef = {
  id: string;
  plotId: string;
};

export type PlotStatusInfo = {
  id: string;
  plot?: PlotRef | null;
  lastActivityAt?: string | null;
  lastMaintenanceAt?: string | null;
  manualStatusOverride?: string | null;
  derivedStatus?: string | null;
  layerEligible?: boolean | null;
  updatedAtBlock?: string | null;
  updatedAtTimestamp?: string | null;
};

export type PlotProvenance = {
  id: string;
  plot?: PlotRef | null;
  firstBuilder?: string | null;
  createdAt?: string | null;
  layerCount?: string | null;
  ownershipTransfers?: string | null;
  aetherUses?: string | null;
  historicScore?: string | null;
  originFaction?: string | null;
  genesisEra?: string | null;
  updatedAtBlock?: string | null;
  updatedAtTimestamp?: string | null;
};

export type DashboardMeta = {
  block: {
    number: number;
  };
};

export type DashboardQueryResult = {
  _meta: DashboardMeta;
  weaponDefinitions: WeaponDefinition[];
  weaponInstances: WeaponInstance[];
  materiaDefinitions: MateriaDefinition[];
  plots: Plot[];
  players: Player[];
  plotStatusInfos: PlotStatusInfo[];
  plotProvenances: PlotProvenance[];
};