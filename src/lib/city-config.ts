import { CONFIG } from "./config";
import { BrowserProvider, Contract } from "ethers";

export type CityQubiqCosts = {
  oilCost: bigint;
  lemonsCost: bigint;
  ironCost: bigint;
};

export type CityThresholds = {
  dormantDays: bigint;
  decayedDays: bigint;
  layerEligibleDays: bigint;
};

export type CityConfigSnapshot = {
  resourceTokenAddress: string;
  qubiqCosts: CityQubiqCosts;
  thresholds: CityThresholds;
};

const CITY_CONFIG_ABI = [
  "function getUintConfig(bytes32 key) view returns (uint256)",
  "function getAddressConfig(bytes32 key) view returns (address)",
  "function KEY_RESOURCE_TOKEN() view returns (bytes32)",
  "function KEY_QUBIQ_OIL_COST() view returns (bytes32)",
  "function KEY_QUBIQ_LEMONS_COST() view returns (bytes32)",
  "function KEY_QUBIQ_IRON_COST() view returns (bytes32)",
  "function KEY_DORMANT_THRESHOLD_DAYS() view returns (bytes32)",
  "function KEY_DECAYED_THRESHOLD_DAYS() view returns (bytes32)",
  "function KEY_LAYER_ELIGIBLE_THRESHOLD_DAYS() view returns (bytes32)",
] as const;

function getEthereum() {
  return (window as Window & {
    ethereum?: unknown;
  }).ethereum;
}

async function getProvider() {
  const ethereum = getEthereum();
  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }
  return new BrowserProvider(ethereum as any);
}

export async function readCityConfigSnapshot(): Promise<CityConfigSnapshot> {
  const cityConfigAddress = (CONFIG.cityConfigAddress || "").trim();

  if (!cityConfigAddress) {
    throw new Error("Missing VITE_CITY_CONFIG_ADDRESS.");
  }

  const provider = await getProvider();
  const contract = new Contract(cityConfigAddress, CITY_CONFIG_ABI, provider);

  const [
    keyResourceToken,
    keyQubiqOilCost,
    keyQubiqLemonsCost,
    keyQubiqIronCost,
    keyDormantDays,
    keyDecayedDays,
    keyLayerEligibleDays,
  ] = await Promise.all([
    contract.KEY_RESOURCE_TOKEN(),
    contract.KEY_QUBIQ_OIL_COST(),
    contract.KEY_QUBIQ_LEMONS_COST(),
    contract.KEY_QUBIQ_IRON_COST(),
    contract.KEY_DORMANT_THRESHOLD_DAYS(),
    contract.KEY_DECAYED_THRESHOLD_DAYS(),
    contract.KEY_LAYER_ELIGIBLE_THRESHOLD_DAYS(),
  ]);

  const [
    resourceTokenAddress,
    oilCost,
    lemonsCost,
    ironCost,
    dormantDays,
    decayedDays,
    layerEligibleDays,
  ] = await Promise.all([
    contract.getAddressConfig(keyResourceToken),
    contract.getUintConfig(keyQubiqOilCost),
    contract.getUintConfig(keyQubiqLemonsCost),
    contract.getUintConfig(keyQubiqIronCost),
    contract.getUintConfig(keyDormantDays),
    contract.getUintConfig(keyDecayedDays),
    contract.getUintConfig(keyLayerEligibleDays),
  ]);

  return {
    resourceTokenAddress,
    qubiqCosts: {
      oilCost: BigInt(oilCost),
      lemonsCost: BigInt(lemonsCost),
      ironCost: BigInt(ironCost),
    },
    thresholds: {
      dormantDays: BigInt(dormantDays),
      decayedDays: BigInt(decayedDays),
      layerEligibleDays: BigInt(layerEligibleDays),
    },
  };
}