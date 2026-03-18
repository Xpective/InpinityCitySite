export const CONFIG = {
  subgraphUrl: import.meta.env.VITE_SUBGRAPH_URL || "",
  chainId: Number(import.meta.env.VITE_CHAIN_ID || "8453"),
  cityRegistryAddress: import.meta.env.VITE_CITY_REGISTRY_ADDRESS || "",
  cityLandAddress: import.meta.env.VITE_CITY_LAND_ADDRESS || "",
  cityConfigAddress: import.meta.env.VITE_CITY_CONFIG_ADDRESS || "",
  cityStatusAddress: import.meta.env.VITE_CITY_STATUS_ADDRESS || "",
};
