export type MetaBlock = {
  number: number;
};

export type Meta = {
  block: MetaBlock;
};

export type WeaponDefinition = {
  id: string;
  weaponDefinitionId: string;
  name: string;
  category: string;
  rarityTier: string;
};

export type MateriaDefinition = {
  id: string;
  materiaId: string;
  name: string;
  elementLabel: string;
  categoryLabel: string;
  rarityTier: string;
  maxLevel: string;
  enabled: boolean;
};

export type EnchantmentItemDefinition = {
  id: string;
  itemId: string;
  enchantmentDefinitionId: string;
  level: string;
  rarityTier: string;
  enabled: boolean;
};

export type MateriaItemDefinition = {
  id: string;
  itemId: string;
  materiaDefinitionId: string;
  level: string;
  rarityTier: string;
  enabled: boolean;
};

export type DashboardQueryResult = {
  _meta: Meta;
  weaponDefinitions: WeaponDefinition[];
  materiaDefinitions: MateriaDefinition[];
  enchantmentItemDefinitions: EnchantmentItemDefinition[];
  materiaItemDefinitions: MateriaItemDefinition[];
};
