import { Contract, JsonRpcProvider } from "ethers";
import { BASE_NETWORK, CONFIG } from "./config";

export type InspectorKind =
  | "weapon"
  | "recipe"
  | "blueprint"
  | "component"
  | "materia"
  | "enchantment"
  | "materia-item"
  | "enchantment-item";

export type InspectorField = {
  label: string;
  value: string;
};

export type InspectorResult = {
  title: string;
  subtitle?: string;
  fields: InspectorField[];
  notes?: string[];
};

const provider = new JsonRpcProvider(BASE_NETWORK.rpcUrls[0]);

const WEAPONS_ABI = [
  "function weaponExists(uint256 tokenId) view returns (bool)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function weaponsPaused() view returns (bool)",
  "function getWeaponStats(uint256 tokenId) view returns ((uint256 id,string name,uint8 class,uint8 damageType,uint256 techTier,uint256 requiredLevel,uint256 requiredTechTier,uint256 minDamage,uint256 maxDamage,uint256 attackSpeed,uint256 critChanceBps,uint256 critMultiplierBps,uint256 accuracyBps,uint256 range,uint256 maxDurability,uint256 armorPenBps,uint256 blockChanceBps,uint256 lifeStealBps,uint256 energyCost,uint256 heatGeneration,uint256 stability,uint256 cooldownMs,uint256 projectileSpeed,uint256 aoeRadius,uint256 enchantmentSlots,uint256 materiaSlots,uint256 visualVariant,uint256 maxUpgradeLevel,uint256 familySetId,bool enabled) def,(uint256 tokenId,uint256 weaponDefinitionId,uint256 rarityTier,uint256 frameTier,uint256 durability,uint256 upgradeLevel,uint256 metadataRevision,uint256 originPlotId,uint256 originFaction,uint256 originDistrictKind,uint256 craftedAt,uint256 visualVariant,uint8 resonanceType,bytes32 craftSeed,bytes32 provenanceHash,bool genesisEra,bool usedAether) inst,(int256 minDamageBonus,int256 maxDamageBonus,int256 attackSpeedBonus,int256 critChanceBpsBonus,int256 critMultiplierBpsBonus,int256 accuracyBpsBonus,int256 rangeBonus,int256 maxDurabilityBonus,int256 armorPenBpsBonus,int256 blockChanceBpsBonus,int256 lifeStealBpsBonus,int256 energyCostBonus,int256 heatGenerationBonus,int256 stabilityBonus,int256 cooldownMsBonus,int256 projectileSpeedBonus,int256 aoeRadiusBonus,int256 enchantmentSlotsBonus,int256 materiaSlotsBonus) bonuses)",
] as const;

const CRAFTING_ABI = [
  "function recipeOf(uint256 recipeId) view returns (uint256 id,uint8 outputKind,uint256 outputId,uint256 outputAmount,uint256 requiredFaction,uint256 requiredDistrictKind,uint256 requiredBuildingId,uint256 requiredTechTier,uint256 rarityTier,uint256 frameTier,bool requiresDiscovery,bool enabled)",
  "function getRecipeCosts(uint256 recipeId) view returns (uint256[10])",
  "function recipeDiscoveredBy(address user, uint256 recipeId) view returns (bool)",
  "function craftingPaused() view returns (bool)",
] as const;

const BLUEPRINTS_ABI = [
  "function blueprintExists(uint256 blueprintId) view returns (bool)",
  "function getBlueprintMeta(uint256 blueprintId) view returns (string name,uint256 rarityTier,uint256 techTier,uint256 factionLock,uint256 districtLock,bool enabled)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 blueprintId) view returns (string)",
] as const;

const COMPONENTS_ABI = [
  "function componentExists(uint256 componentId) view returns (bool)",
  "function getComponentMeta(uint256 componentId) view returns (string name,uint256 category,uint256 rarityTier,uint256 techTier,bool enabled)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 componentId) view returns (string)",
] as const;

const MATERIA_ABI = [
  "function materiaExists(uint256 materiaId) view returns (bool)",
  "function getMateriaMeta(uint256 materiaId) view returns (string name,uint8 category,uint8 element,uint256 rarityTier,uint256 maxLevel,bool enabled)",
  "function hasBonusesForLevel(uint256 materiaId, uint256 level) view returns (bool)",
] as const;

const ENCHANTMENTS_ABI = [
  "function enchantmentExists(uint256 enchantmentId) view returns (bool)",
  "function getEnchantmentMeta(uint256 enchantmentId) view returns (string name,uint8 category,uint256 rarityTier,uint256 maxLevel,bool enabled)",
  "function hasBonusesForLevel(uint256 enchantmentId, uint256 level) view returns (bool)",
] as const;

const MATERIA_ITEMS_ABI = [
  "function materiaItemExists(uint256 itemId) view returns (bool)",
  "function getMateriaItemMeta(uint256 itemId) view returns (uint256 materiaDefinitionId,uint256 level,uint256 rarityTier,bool burnOnUse,bool enabled)",
  "function getMateriaDefinitionForItem(uint256 itemId) view returns ((uint256 id,string name,uint8 category,uint8 element,uint256 rarityTier,uint256 maxLevel,bool enabled))",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 itemId) view returns (string)",
] as const;

const ENCHANTMENT_ITEMS_ABI = [
  "function enchantmentItemExists(uint256 itemId) view returns (bool)",
  "function getEnchantmentItemMeta(uint256 itemId) view returns (uint256 enchantmentDefinitionId,uint256 level,uint256 rarityTier,bool burnOnUse,bool enabled)",
  "function getEnchantmentDefinitionForItem(uint256 itemId) view returns ((uint256 id,string name,uint8 category,uint256 rarityTier,uint256 maxLevel,bool enabled))",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function uri(uint256 itemId) view returns (string)",
] as const;

function toBigIntId(value: string): bigint {
  const cleaned = value.trim();
  if (!cleaned) {
    throw new Error("Please enter an item or recipe id.");
  }
  return BigInt(cleaned);
}

function toDisplay(value: unknown): string {
  if (value == null) return "—";
  if (typeof value === "bigint") return value.toString();
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "string") return value || "—";
  return String(value);
}

function mapFactionCode(value: unknown): string {
  const code = Number(value);
  if (code === 1) return "Inpinity";
  if (code === 2) return "Inphinity";
  if (code === 0) return "None";
  return `Code ${code}`;
}

function mapOutputKind(value: unknown): string {
  const code = Number(value);
  const labels = [
    "Resource",
    "Component",
    "Blueprint",
    "WeaponPrototype",
    "Enchantment",
    "MateriaItem",
    "EnchantmentItem",
  ];
  return labels[code] ?? `Code ${code}`;
}

function summarizeRecipeCosts(costs: readonly bigint[]): string {
  const resourceLabels = [
    "Oil",
    "Lemons",
    "Iron",
    "Gold",
    "Platinum",
    "Copper",
    "Crystal",
    "Obsidian",
    "Mysterium",
    "Aether",
  ];

  const parts = costs
    .map((amount, index) => {
      if (!amount || amount <= 0n) return null;
      return `${resourceLabels[index] ?? `Resource ${index}`}: ${amount.toString()}`;
    })
    .filter(Boolean);

  return parts.length ? parts.join(" · ") : "No resource cost configured";
}

function withWalletBalance(
  fields: InspectorField[],
  label: string,
  value: bigint | null
): InspectorField[] {
  if (value == null) return fields;
  return [...fields, { label, value: value.toString() }];
}

async function readOptionalBalance(
  contract: Contract,
  walletAddress: string | null | undefined,
  id: bigint
): Promise<bigint | null> {
  if (!walletAddress) return null;

  try {
    return (await contract.balanceOf(walletAddress, id)) as bigint;
  } catch {
    return null;
  }
}

export async function inspectEntity(args: {
  kind: InspectorKind;
  id: string;
  walletAddress?: string | null;
}): Promise<InspectorResult> {
  const id = toBigIntId(args.id);

  switch (args.kind) {
    case "weapon": {
      const contract = new Contract(CONFIG.cityWeaponsAddress, WEAPONS_ABI, provider);
      const exists = (await contract.weaponExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Weapon token ${id.toString()} does not exist.`);
      }

      const [owner, tokenUri, stats, paused] = await Promise.all([
        contract.ownerOf(id),
        contract.tokenURI(id),
        contract.getWeaponStats(id),
        contract.weaponsPaused(),
      ]);

      const def = (stats as any)[0] ?? (stats as any).def;
      const inst = (stats as any)[1] ?? (stats as any).inst;
      const bonuses = (stats as any)[2] ?? (stats as any).bonuses;

      return {
        title: `Weapon #${id.toString()}`,
        subtitle: def?.name ? String(def.name) : "Live weapon inspector",
        fields: [
          { label: "Owner", value: toDisplay(owner) },
          { label: "Token URI", value: toDisplay(tokenUri) },
          { label: "Weapons paused", value: toDisplay(paused) },
          { label: "Definition ID", value: toDisplay(inst?.weaponDefinitionId) },
          { label: "Tech tier", value: toDisplay(def?.techTier) },
          { label: "Rarity tier", value: toDisplay(inst?.rarityTier) },
          { label: "Frame tier", value: toDisplay(inst?.frameTier) },
          { label: "Origin plot", value: toDisplay(inst?.originPlotId) },
          { label: "Origin faction", value: mapFactionCode(inst?.originFaction) },
          { label: "Origin district", value: toDisplay(inst?.originDistrictKind) },
          { label: "Resonance", value: toDisplay(inst?.resonanceType) },
          { label: "Genesis era", value: toDisplay(inst?.genesisEra) },
          { label: "Used Aether", value: toDisplay(inst?.usedAether) },
          { label: "Durability", value: toDisplay(inst?.durability) },
          { label: "Upgrade level", value: toDisplay(inst?.upgradeLevel) },
          { label: "Min / Max damage", value: `${toDisplay(def?.minDamage)} / ${toDisplay(def?.maxDamage)}` },
          { label: "Attack speed", value: toDisplay(def?.attackSpeed) },
          { label: "Crit chance (bps)", value: toDisplay(def?.critChanceBps) },
          { label: "Materia slots", value: toDisplay(def?.materiaSlots) },
          { label: "Enchantment slots", value: toDisplay(def?.enchantmentSlots) },
          { label: "Bonuses configured", value: bonuses ? "Yes" : "No" },
        ],
        notes: [
          "This read combines weapon definition, live instance data and bonus tuple output.",
          "Origin plot / faction / district are ready for provenance-aware game presentation.",
        ],
      };
    }

    case "recipe": {
      const contract = new Contract(CONFIG.cityCraftingAddress, CRAFTING_ABI, provider);
      const [recipe, costs, paused] = await Promise.all([
        contract.recipeOf(id),
        contract.getRecipeCosts(id),
        contract.craftingPaused(),
      ]);
      const discovered = args.walletAddress
        ? ((await contract.recipeDiscoveredBy(args.walletAddress, id)) as boolean)
        : null;

      const recipeData = recipe as any;
      const costList = Array.from(costs as readonly bigint[]);

      return {
        title: `Recipe #${id.toString()}`,
        subtitle: `${mapOutputKind(recipeData.outputKind)} → ${toDisplay(recipeData.outputId)}`,
        fields: [
          { label: "Crafting paused", value: toDisplay(paused) },
          { label: "Output kind", value: mapOutputKind(recipeData.outputKind) },
          { label: "Output id", value: toDisplay(recipeData.outputId) },
          { label: "Output amount", value: toDisplay(recipeData.outputAmount) },
          { label: "Required faction", value: mapFactionCode(recipeData.requiredFaction) },
          { label: "Required district", value: toDisplay(recipeData.requiredDistrictKind) },
          { label: "Required building", value: toDisplay(recipeData.requiredBuildingId) },
          { label: "Required tech tier", value: toDisplay(recipeData.requiredTechTier) },
          { label: "Requires discovery", value: toDisplay(recipeData.requiresDiscovery) },
          { label: "Enabled", value: toDisplay(recipeData.enabled) },
          { label: "Wallet discovered", value: discovered == null ? "No wallet linked" : toDisplay(discovered) },
          { label: "Resource cost summary", value: summarizeRecipeCosts(costList) },
        ],
        notes: [
          "Recipes already expose faction, district, building and tech requirements.",
          "This makes Inspector Mode a good foundation for later Forge / Research Lab gating.",
        ],
      };
    }

    case "blueprint": {
      const contract = new Contract(CONFIG.cityBlueprintsAddress, BLUEPRINTS_ABI, provider);
      const exists = (await contract.blueprintExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Blueprint ${id.toString()} does not exist.`);
      }

      const [meta, uri, balance] = await Promise.all([
        contract.getBlueprintMeta(id),
        contract.uri(id),
        readOptionalBalance(contract, args.walletAddress, id),
      ]);
      const data = meta as any;

      let fields: InspectorField[] = [
        { label: "Name", value: toDisplay(data.name) },
        { label: "Rarity tier", value: toDisplay(data.rarityTier) },
        { label: "Tech tier", value: toDisplay(data.techTier) },
        { label: "Faction lock", value: mapFactionCode(data.factionLock) },
        { label: "District lock", value: toDisplay(data.districtLock) },
        { label: "Enabled", value: toDisplay(data.enabled) },
        { label: "Metadata URI", value: toDisplay(uri) },
      ];
      fields = withWalletBalance(fields, "Wallet balance", balance);

      return {
        title: `Blueprint #${id.toString()}`,
        subtitle: "Blueprint inspector",
        fields,
        notes: [
          "Blueprints already encode faction and district locks, which fits later building progression.",
        ],
      };
    }

    case "component": {
      const contract = new Contract(CONFIG.cityComponentsAddress, COMPONENTS_ABI, provider);
      const exists = (await contract.componentExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Component ${id.toString()} does not exist.`);
      }

      const [meta, uri, balance] = await Promise.all([
        contract.getComponentMeta(id),
        contract.uri(id),
        readOptionalBalance(contract, args.walletAddress, id),
      ]);
      const data = meta as any;

      let fields: InspectorField[] = [
        { label: "Name", value: toDisplay(data.name) },
        { label: "Category", value: toDisplay(data.category) },
        { label: "Rarity tier", value: toDisplay(data.rarityTier) },
        { label: "Tech tier", value: toDisplay(data.techTier) },
        { label: "Enabled", value: toDisplay(data.enabled) },
        { label: "Metadata URI", value: toDisplay(uri) },
      ];
      fields = withWalletBalance(fields, "Wallet balance", balance);

      return {
        title: `Component #${id.toString()}`,
        subtitle: "Component inspector",
        fields,
      };
    }

    case "materia": {
      const contract = new Contract(CONFIG.cityMateriaAddress, MATERIA_ABI, provider);
      const exists = (await contract.materiaExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Materia ${id.toString()} does not exist.`);
      }

      const [meta, hasLevelOne] = await Promise.all([
        contract.getMateriaMeta(id),
        contract.hasBonusesForLevel(id, 1n),
      ]);
      const data = meta as any;

      return {
        title: `Materia #${id.toString()}`,
        subtitle: toDisplay(data.name),
        fields: [
          { label: "Category", value: toDisplay(data.category) },
          { label: "Element", value: toDisplay(data.element) },
          { label: "Rarity tier", value: toDisplay(data.rarityTier) },
          { label: "Max level", value: toDisplay(data.maxLevel) },
          { label: "Enabled", value: toDisplay(data.enabled) },
          { label: "Level 1 bonuses configured", value: toDisplay(hasLevelOne) },
        ],
      };
    }

    case "enchantment": {
      const contract = new Contract(CONFIG.cityEnchantmentsAddress, ENCHANTMENTS_ABI, provider);
      const exists = (await contract.enchantmentExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Enchantment ${id.toString()} does not exist.`);
      }

      const [meta, hasLevelOne] = await Promise.all([
        contract.getEnchantmentMeta(id),
        contract.hasBonusesForLevel(id, 1n),
      ]);
      const data = meta as any;

      return {
        title: `Enchantment #${id.toString()}`,
        subtitle: toDisplay(data.name),
        fields: [
          { label: "Category", value: toDisplay(data.category) },
          { label: "Rarity tier", value: toDisplay(data.rarityTier) },
          { label: "Max level", value: toDisplay(data.maxLevel) },
          { label: "Enabled", value: toDisplay(data.enabled) },
          { label: "Level 1 bonuses configured", value: toDisplay(hasLevelOne) },
        ],
      };
    }

    case "materia-item": {
      const contract = new Contract(CONFIG.cityMateriaItemsAddress, MATERIA_ITEMS_ABI, provider);
      const exists = (await contract.materiaItemExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Materia item ${id.toString()} does not exist.`);
      }

      const [meta, definition, uri, balance] = await Promise.all([
        contract.getMateriaItemMeta(id),
        contract.getMateriaDefinitionForItem(id),
        contract.uri(id),
        readOptionalBalance(contract, args.walletAddress, id),
      ]);
      const item = meta as any;
      const def = definition as any;

      let fields: InspectorField[] = [
        { label: "Materia definition", value: toDisplay(item.materiaDefinitionId) },
        { label: "Definition name", value: toDisplay(def.name) },
        { label: "Level", value: toDisplay(item.level) },
        { label: "Rarity tier", value: toDisplay(item.rarityTier) },
        { label: "Burn on use", value: toDisplay(item.burnOnUse) },
        { label: "Enabled", value: toDisplay(item.enabled) },
        { label: "Metadata URI", value: toDisplay(uri) },
      ];
      fields = withWalletBalance(fields, "Wallet balance", balance);

      return {
        title: `Materia Item #${id.toString()}`,
        subtitle: toDisplay(def.name),
        fields,
      };
    }

    case "enchantment-item": {
      const contract = new Contract(CONFIG.cityEnchantmentItemsAddress, ENCHANTMENT_ITEMS_ABI, provider);
      const exists = (await contract.enchantmentItemExists(id)) as boolean;
      if (!exists) {
        throw new Error(`Enchantment item ${id.toString()} does not exist.`);
      }

      const [meta, definition, uri, balance] = await Promise.all([
        contract.getEnchantmentItemMeta(id),
        contract.getEnchantmentDefinitionForItem(id),
        contract.uri(id),
        readOptionalBalance(contract, args.walletAddress, id),
      ]);
      const item = meta as any;
      const def = definition as any;

      let fields: InspectorField[] = [
        { label: "Enchantment definition", value: toDisplay(item.enchantmentDefinitionId) },
        { label: "Definition name", value: toDisplay(def.name) },
        { label: "Level", value: toDisplay(item.level) },
        { label: "Rarity tier", value: toDisplay(item.rarityTier) },
        { label: "Burn on use", value: toDisplay(item.burnOnUse) },
        { label: "Enabled", value: toDisplay(item.enabled) },
        { label: "Metadata URI", value: toDisplay(uri) },
      ];
      fields = withWalletBalance(fields, "Wallet balance", balance);

      return {
        title: `Enchantment Item #${id.toString()}`,
        subtitle: toDisplay(def.name),
        fields,
      };
    }

    default:
      throw new Error("Unsupported inspector kind.");
  }
}
