import { BrowserProvider, Contract } from "ethers";

import { readCityConfigSnapshot, type CityConfigSnapshot } from "./city-config";
import type { QubiqReadState } from "./city-land";
import type { InfinityPlot } from "../types/infinity";

export const RESOURCE_IDS = {
  OIL: 0,
  LEMONS: 1,
  IRON: 2,
} as const;

const RESOURCE_TOKEN_ABI = [
  "function OIL() view returns (uint256)",
  "function LEMONS() view returns (uint256)",
  "function IRON() view returns (uint256)",
  "function balanceOf(address account, uint256 id) view returns (uint256)",
  "function balanceOfBatch(address[] accounts, uint256[] ids) view returns (uint256[])",
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
  source: "static" | "live";
};

function getEthereum() {
  return (window as Window & { ethereum?: unknown }).ethereum;
}

async function getProvider() {
  const ethereum = getEthereum();

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return new BrowserProvider(ethereum as any);
}

function emptyRequirement(): ResourceRequirement {
  return {
    oil: 0n,
    lemons: 0n,
    iron: 0n,
  };
}

function mapRemainingRequirement(
  liveQubiq: Pick<
    QubiqReadState,
    "completed" | "usedAether" | "oilRemaining" | "lemonsRemaining" | "ironRemaining"
  >
): ResourceRequirement {
  if (liveQubiq.completed || liveQubiq.usedAether) {
    return emptyRequirement();
  }

  return {
    oil: liveQubiq.oilRemaining,
    lemons: liveQubiq.lemonsRemaining,
    iron: liveQubiq.ironRemaining,
  };
}

export function getRequiredResourcesForPlot(
  plot: InfinityPlot | null,
  snapshot: CityConfigSnapshot | null
): ResourceRequirement {
  if (!plot || !snapshot || !plot.policy.isPersonal) {
    return emptyRequirement();
  }

  return {
    oil: snapshot.qubiqCosts.oilCost,
    lemons: snapshot.qubiqCosts.lemonsCost,
    iron: snapshot.qubiqCosts.ironCost,
  };
}

export function getRequiredResourcesForContribution(
  plot: InfinityPlot | null,
  snapshot: CityConfigSnapshot | null,
  liveQubiq?: Pick<
    QubiqReadState,
    "completed" | "usedAether" | "oilRemaining" | "lemonsRemaining" | "ironRemaining"
  > | null
): { required: ResourceRequirement; source: "static" | "live" } {
  if (!plot || !snapshot || !plot.policy.isPersonal) {
    return {
      required: emptyRequirement(),
      source: "static",
    };
  }

  if (liveQubiq) {
    return {
      required: mapRemainingRequirement(liveQubiq),
      source: "live",
    };
  }

  return {
    required: getRequiredResourcesForPlot(plot, snapshot),
    source: "static",
  };
}

export async function readWalletResourceBalances(walletAddress: string): Promise<{
  snapshot: CityConfigSnapshot;
  balances: ResourceBalances;
}> {
  const snapshot = await readCityConfigSnapshot();
  const provider = await getProvider();
  const resourceToken = new Contract(
    snapshot.resourceTokenAddress,
    RESOURCE_TOKEN_ABI,
    provider
  );

  let oilId = BigInt(RESOURCE_IDS.OIL);
  let lemonsId = BigInt(RESOURCE_IDS.LEMONS);
  let ironId = BigInt(RESOURCE_IDS.IRON);

  try {
    [oilId, lemonsId, ironId] = await Promise.all([
      resourceToken.OIL() as Promise<bigint>,
      resourceToken.LEMONS() as Promise<bigint>,
      resourceToken.IRON() as Promise<bigint>,
    ]);
  } catch {
    // Keep the known fallback ids if the token does not expose named getters.
  }

  let balancesRaw: bigint[];

  try {
    balancesRaw = (await resourceToken.balanceOfBatch(
      [walletAddress, walletAddress, walletAddress],
      [oilId, lemonsId, ironId]
    )) as bigint[];
  } catch {
    balancesRaw = (await Promise.all([
      resourceToken.balanceOf(walletAddress, oilId) as Promise<bigint>,
      resourceToken.balanceOf(walletAddress, lemonsId) as Promise<bigint>,
      resourceToken.balanceOf(walletAddress, ironId) as Promise<bigint>,
    ])) as bigint[];
  }

  const [oil, lemons, iron] = balancesRaw;

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
  snapshot: CityConfigSnapshot | null,
  liveQubiq?: Pick<
    QubiqReadState,
    "completed" | "usedAether" | "oilRemaining" | "lemonsRemaining" | "ironRemaining"
  > | null
): ResourceEligibility {
  const { required, source } = getRequiredResourcesForContribution(
    plot,
    snapshot,
    liveQubiq
  );

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
    source,
  };
}
