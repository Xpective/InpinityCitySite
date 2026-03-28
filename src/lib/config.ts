function clean(value: string | undefined): string {
  return (value || "").trim();
}

function cleanOrFallback(value: string | undefined, fallback: string): string {
  const cleaned = clean(value);
  return cleaned || fallback;
}

function numberOrFallback(value: string | undefined, fallback: number): number {
  const cleaned = clean(value);
  if (!cleaned) return fallback;

  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const LIVE_DEFAULTS = {
  subgraphUrl: "https://api.city.inpinity.online/graphql",
  chainId: 8453,
  cityRegistryAddress: "0x5d3269813Fea0C0F487A21cBf9992b95008558BF",
  cityLandAddress: "0x0547a35c2Ff215004A2EBfe2Be5f3A8EeE6A5323",
  cityConfigAddress: "0x565076216ec76E7Af61BafBE22D8EA7C1C8DF691",
  cityStatusAddress: "0x28AfE371044e9AcD4C99Bef3F5FbBe2431cF04C0",
  cityDistrictsAddress: "0xB3cFaeDA09FB5ee84C3c26F276980773197af113",
  cityHistoryAddress: "0x6C83aC3E4C58c493e3116E31cF7e32935497Af3c",
  cityValidationAddress: "0x77BBd6850C2780055c4C20008145E9E5dEC20332",
  inpinityNftAddress: "0x277a0D5864293C78d7387C54B48c35D5E9578Ab1",
  cityWeaponsAddress: "0x6b3cDe1DdACDFB5dC060f10A94Ea52b237E5131F",
  cityComponentsAddress: "0xae6fd8664Ba6E147bfb7bb1Ed4354F60Fc86854e",
  cityBlueprintsAddress: "0x9F6453783A8935f57D9E15560012C1e9cb3Ae684",
  cityEnchantmentsAddress: "0xEC99851ff472a90bA0f75727FC4a274F8FB19380",
  cityEnchantmentItemsAddress: "0x23D0A8E95f2cFf7ae59f033d0B46eAa22CE80d56",
  cityMateriaAddress: "0xC3f75ce5539C888cdDE0Aa2E58bC33Be758a37a1",
  cityMateriaItemsAddress: "0xd3258b6b0bAED28f7D90A808d3Cb39d8fF9eD080",
  cityCraftingAddress: "0x5cC5e3a0455b83620759D2eD6712A5aFc45F9eCF",
} as const;

export const CONFIG = {
  subgraphUrl: cleanOrFallback(import.meta.env.VITE_SUBGRAPH_URL, LIVE_DEFAULTS.subgraphUrl),
  chainId: numberOrFallback(import.meta.env.VITE_CHAIN_ID, LIVE_DEFAULTS.chainId),
  cityRegistryAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_REGISTRY_ADDRESS,
    LIVE_DEFAULTS.cityRegistryAddress
  ),
  cityLandAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_LAND_ADDRESS,
    LIVE_DEFAULTS.cityLandAddress
  ),
  cityConfigAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_CONFIG_ADDRESS,
    LIVE_DEFAULTS.cityConfigAddress
  ),
  cityStatusAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_STATUS_ADDRESS,
    LIVE_DEFAULTS.cityStatusAddress
  ),
  cityDistrictsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_DISTRICTS_ADDRESS,
    LIVE_DEFAULTS.cityDistrictsAddress
  ),
  cityHistoryAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_HISTORY_ADDRESS,
    LIVE_DEFAULTS.cityHistoryAddress
  ),
  cityValidationAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_VALIDATION_ADDRESS,
    LIVE_DEFAULTS.cityValidationAddress
  ),
  inpinityNftAddress: cleanOrFallback(
    import.meta.env.VITE_INPINITY_NFT_ADDRESS,
    LIVE_DEFAULTS.inpinityNftAddress
  ),
  cityWeaponsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_WEAPONS_ADDRESS,
    LIVE_DEFAULTS.cityWeaponsAddress
  ),
  cityComponentsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_COMPONENTS_ADDRESS,
    LIVE_DEFAULTS.cityComponentsAddress
  ),
  cityBlueprintsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_BLUEPRINTS_ADDRESS,
    LIVE_DEFAULTS.cityBlueprintsAddress
  ),
  cityEnchantmentsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_ENCHANTMENTS_ADDRESS,
    LIVE_DEFAULTS.cityEnchantmentsAddress
  ),
  cityEnchantmentItemsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_ENCHANTMENT_ITEMS_ADDRESS,
    LIVE_DEFAULTS.cityEnchantmentItemsAddress
  ),
  cityMateriaAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_MATERIA_ADDRESS,
    LIVE_DEFAULTS.cityMateriaAddress
  ),
  cityMateriaItemsAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_MATERIA_ITEMS_ADDRESS,
    LIVE_DEFAULTS.cityMateriaItemsAddress
  ),
  cityCraftingAddress: cleanOrFallback(
    import.meta.env.VITE_CITY_CRAFTING_ADDRESS,
    LIVE_DEFAULTS.cityCraftingAddress
  ),
} as const;

export const BASE_NETWORK = {
  chainId: CONFIG.chainId,
  chainIdHex: `0x${CONFIG.chainId.toString(16)}`,
  chainName: "Base",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://mainnet.base.org"],
  blockExplorerUrls: ["https://basescan.org"],
} as const;

export function isConfiguredChain(chainId?: number | null): boolean {
  return chainId === CONFIG.chainId;
}
