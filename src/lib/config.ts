function clean(value: string | undefined): string {
  return (value || "").trim();
}

export const CONFIG = {
  subgraphUrl: clean(import.meta.env.VITE_SUBGRAPH_URL),
  chainId: Number(clean(import.meta.env.VITE_CHAIN_ID) || "8453"),

  cityRegistryAddress: clean(import.meta.env.VITE_CITY_REGISTRY_ADDRESS),
  cityLandAddress: clean(import.meta.env.VITE_CITY_LAND_ADDRESS),
  cityConfigAddress: clean(import.meta.env.VITE_CITY_CONFIG_ADDRESS),
  cityStatusAddress: clean(import.meta.env.VITE_CITY_STATUS_ADDRESS),
  cityDistrictsAddress: clean(import.meta.env.VITE_CITY_DISTRICTS_ADDRESS),
  cityHistoryAddress: clean(import.meta.env.VITE_CITY_HISTORY_ADDRESS),
  cityValidationAddress: clean(import.meta.env.VITE_CITY_VALIDATION_ADDRESS),

  inpinityNftAddress: clean(import.meta.env.VITE_INPINITY_NFT_ADDRESS),
};