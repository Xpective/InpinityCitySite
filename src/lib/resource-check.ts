import { BrowserProvider, Contract } from "ethers";
import { readCityConfigSnapshot, type CityConfigSnapshot } from "./city-config";
import type { InfinityPlot } from "../types/infinity";

export const RESOURCE_IDS = {
  OIL: 0,
  LEMONS: 1,
  IRON: 2,
} as const;

const ERC1155_ABI = [
  "function balanceOf(address account, uint256 id) view returns (uint256)",
] as const;

export type ResourceBalances = {
  oil: bigint;
  lemons: bigint;
  iron: bigint;
};

export type ResourceRequirement = {
  oil: bigint;
  lemons: bigint;
  iron: bigint;
};

export type ResourceEligibility = {
  ready: boolean;
  enoughOil: boolean;
  enoughLemons: boolean;
  enoughIron: boolean;
  balances: ResourceBalances;
  required: ResourceRequirement;
  missing: ResourceRequirement;
};

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

export function getRequiredResourcesForPlot(
  plot: InfinityPlot | null,
  snapshot: CityConfigSnapshot | null
): ResourceRequirement {
  if (!plot || !snapshot || !plot.policy.isPersonal) {
    return {
      oil: 0n,
      lemons: 0n,
      iron: 0n,
    };
  }

  return {
    oil: snapshot.qubiqCosts.oilCost,
    lemons: snapshot.qubiqCosts.lemonsCost,
    iron: snapshot.qubiqCosts.ironCost,
  };
}

export async function readWalletResourceBalances(
  walletAddress: string
): Promise<{
  snapshot: CityConfigSnapshot;
  balances: ResourceBalances;
}> {
  const snapshot = await readCityConfigSnapshot();
  const provider = await getProvider();

  const resourceToken = new Contract(
    snapshot.resourceTokenAddress,
    ERC1155_ABI,
    provider
  );

  const [oil, lemons, iron] = await Promise.all([
    resourceToken.balanceOf(walletAddress, RESOURCE_IDS.OIL),
    resourceToken.balanceOf(walletAddress, RESOURCE_IDS.LEMONS),
    resourceToken.balanceOf(walletAddress, RESOURCE_IDS.IRON),
  ]);

  return {
    snapshot,
    balances: {
      oil: BigInt(oil),
      lemons: BigInt(lemons),
      iron: BigInt(iron),
    },
  };
}

export function evaluateResourceEligibility(
  plot: InfinityPlot | null,
  balances: ResourceBalances,
  snapshot: CityConfigSnapshot | null
): ResourceEligibility {
  const required = getRequiredResourcesForPlot(plot, snapshot);

  const enoughOil = balances.oil >= required.oil;
  const enoughLemons = balances.lemons >= required.lemons;
  const enoughIron = balances.iron >= required.iron;

  return {
    ready: enoughOil && enoughLemons && enoughIron,
    enoughOil,
    enoughLemons,
    enoughIron,
    balances,
    required,
    missing: {
      oil: required.oil > balances.oil ? required.oil - balances.oil : 0n,
      lemons: required.lemons > balances.lemons ? required.lemons - balances.lemons : 0n,
      iron: required.iron > balances.iron ? required.iron - balances.iron : 0n,
    },
  };
}