export type MetaBlock = {
  number: string;
};

export type MetaData = {
  block: MetaBlock;
};

export type WeaponDefinition = {
  id: string;
  weaponDefinitionId: string;
  name: string;
  classId: string;
  damageTypeId: string;
  techTier: string;
  requiredLevel: string;
  minDamage: string;
  maxDamage: string;
  attackSpeed: string;
  maxDurability: string;
  enchantmentSlots: string;
  materiaSlots: string;
  enabled: boolean;
};

export type WeaponInstanceOwner = {
  id: string;
};

export type WeaponInstanceDefinition = {
  id: string;
  name: string;
};

export type WeaponInstance = {
  id: string;
  tokenId: string;
  rarityTier: string;
  frameTier: string;
  durability: string;
  upgradeLevel: string;
  originPlotId: string;
  originFaction: string;
  originDistrictKind: string;
  craftedAt: string;
  resonanceType: string;
  usedAether: boolean;
  owner: WeaponInstanceOwner | null;
  weaponDefinition: WeaponInstanceDefinition | null;
};

export type MateriaDefinition = {
  id: string;
  materiaId: string;
  name: string;
  categoryRaw: string;
  categoryLabel: string;
  elementRaw: string;
  elementLabel: string;
  rarityTier: string;
  maxLevel: string;
  enabled: boolean;
};

export type PlotOwner = {
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
  createdAt: string;
  exists: boolean;
  owner: PlotOwner | null;
};

export type Player = {
  id: string;
  cityKeyTokenId: string | null;
  faction: string;
  personalPlotCount: string;
  craftedWeapons: string;
};

export type DashboardQueryResult = {
  _meta: MetaData;
  weaponDefinitions: WeaponDefinition[];
  weaponInstances: WeaponInstance[];
  materiaDefinitions: MateriaDefinition[];
  plots: Plot[];
  players: Player[];
};