function clean(value: string | undefined): string {
  return (value || "").trim();
}

const LIVE_DEFAULTS = {
  chainId: 8453,
  chainName: "Base",
  subgraphUrl: "https://api.city.inpinity.online/graphql",
  blockExplorerUrl: "https://basescan.org",
  cityConfigAddress: "0x565076216ec76E7Af61BafBE22D8EA7C1C8DF691",
  cityRegistryAddress: "0x5d3269813Fea0C0F487A21cBf9992b95008558BF",
  cityLandAddress: "0x0547a35c2Ff215004A2EBfe2Be5f3A8EeE6A5323",
  cityStatusAddress: "0x28AfE371044e9AcD4C99Bef3F5FbBe2431cF04C0",
  cityDistrictsAddress: "0xB3cFaeDA09FB5ee84C3c26F276980773197af113",
  cityHistoryAddress: "0x6C83aC3E4C58c493e3116E31cF7e32935497Af3c",
  cityValidationAddress: "0x77BBd6850C2780055c4C20008145E9E5dEC20332",
  resourceTokenAddress: "0x71E76a6065197acdd1a4d6B736712F80D1Fd3D8b",
  inpinityNftAddress: "0x277a0D5864293C78d7387C54B48c35D5E9578Ab1",
} as const;

const chainId = Number(clean(import.meta.env.VITE_CHAIN_ID) || String(LIVE_DEFAULTS.chainId));
const chainHex = clean(import.meta.env.VITE_CHAIN_HEX) || `0x${chainId.toString(16)}`;

export const CONFIG = {
  chainId,
  chainHex,
  chainName: clean(import.meta.env.VITE_CHAIN_NAME) || LIVE_DEFAULTS.chainName,
  chainRpcUrl: clean(import.meta.env.VITE_CHAIN_RPC_URL),
  blockExplorerUrl:
    clean(import.meta.env.VITE_CHAIN_BLOCK_EXPLORER_URL) ||
    LIVE_DEFAULTS.blockExplorerUrl,
  subgraphUrl: clean(import.meta.env.VITE_SUBGRAPH_URL) || LIVE_DEFAULTS.subgraphUrl,
  cityRegistryAddress:
    clean(import.meta.env.VITE_CITY_REGISTRY_ADDRESS) ||
    LIVE_DEFAULTS.cityRegistryAddress,
  cityLandAddress:
    clean(import.meta.env.VITE_CITY_LAND_ADDRESS) || LIVE_DEFAULTS.cityLandAddress,
  cityConfigAddress:
    clean(import.meta.env.VITE_CITY_CONFIG_ADDRESS) || LIVE_DEFAULTS.cityConfigAddress,
  cityStatusAddress:
    clean(import.meta.env.VITE_CITY_STATUS_ADDRESS) || LIVE_DEFAULTS.cityStatusAddress,
  cityDistrictsAddress:
    clean(import.meta.env.VITE_CITY_DISTRICTS_ADDRESS) ||
    LIVE_DEFAULTS.cityDistrictsAddress,
  cityHistoryAddress:
    clean(import.meta.env.VITE_CITY_HISTORY_ADDRESS) ||
    LIVE_DEFAULTS.cityHistoryAddress,
  cityValidationAddress:
    clean(import.meta.env.VITE_CITY_VALIDATION_ADDRESS) ||
    LIVE_DEFAULTS.cityValidationAddress,
  resourceTokenAddress:
    clean(import.meta.env.VITE_RESOURCE_TOKEN_ADDRESS) ||
    LIVE_DEFAULTS.resourceTokenAddress,
  inpinityNftAddress:
    clean(import.meta.env.VITE_INPINITY_NFT_ADDRESS) ||
    LIVE_DEFAULTS.inpinityNftAddress,
} as const;

export const BASE_CHAIN_PARAMETERS = {
  chainId: CONFIG.chainHex,
  chainName: CONFIG.chainName,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: CONFIG.chainRpcUrl ? [CONFIG.chainRpcUrl] : [],
  blockExplorerUrls: CONFIG.blockExplorerUrl ? [CONFIG.blockExplorerUrl] : [],
} as const;

export function shortConfigAddress(address: string): string {
  const trimmed = clean(address);
  if (!trimmed) return "not configured";
  if (trimmed.length <= 12) return trimmed;
  return `${trimmed.slice(0, 6)}...${trimmed.slice(-4)}`;
}
