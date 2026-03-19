export type MetaBlock = {
  number: string;
};

export type MetaData = {
  block: MetaBlock;
};

export type CityPlayer = {
  id: string;
  cityKeyTokenId: string | null;
  faction: string | null;
  personalPlotCount: string | null;
  craftedWeapons?: string[] | null;
};

export type CityPlot = {
  id: string;
  plotId: string;
  owner: {
    id: string;
  } | null;
  plotType: string | null;
  faction: string | null;
  status: string | null;
  width: string | null;
  height: string | null;
  createdAt: string | null;
  exists: boolean | null;
};

export type PlotStatusInfo = {
  id: string;
  currentStatus: string | null;
  updatedAt: string | null;
  activatedAt: string | null;
  lastMaintenanceAt: string | null;
  inactivityWarningAt: string | null;
};

export type PlotProvenance = {
  id: string;
  plotId: string;
  currentOwner: string | null;
  transferCount: string | null;
  lastTransferAt: string | null;
};

export type WeaponDefinitionLite = {
  id: string;
  weaponDefinitionId: string;
  name: string;
  techTier: string;
  minDamage: string;
  maxDamage: string;
  enchantmentSlots: string;
  materiaSlots: string;
  enabled: boolean;
};

export type WeaponInstanceLite = {
  id: string;
  tokenId: string;
  owner: string;
  rarityTier: string;
  upgradeLevel: string;
  durability: string;
  originPlotId: string | null;
  weaponDefinition: {
    id: string;
    name: string;
  };
};

export type MateriaDefinitionLite = {
  id: string;
  materiaId: string;
  name: string;
  categoryLabel: string;
  elementLabel: string;
  maxLevel: string;
  enabled: boolean;
};

export type CityDashboardQueryResult = {
  _meta: MetaData;
  players: CityPlayer[];
  plots: CityPlot[];
  plotStatusInfos: PlotStatusInfo[];
  plotProvenances: PlotProvenance[];
  weaponDefinitions: WeaponDefinitionLite[];
  weaponInstances: WeaponInstanceLite[];
  materiaDefinitions: MateriaDefinitionLite[];
};