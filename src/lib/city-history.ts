import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

export type CityHistoryFaction =
  | "None"
  | "Inpinity"
  | "Inphinity"
  | "Neutral";

export type CityPlotProvenanceRead = {
  plotId: bigint;
  firstBuilder: string;
  createdAt: bigint;
  layerCount: number;
  ownershipTransfers: number;
  aetherUses: number;
  historicScore: number;
  originFactionId: number;
  originFaction: CityHistoryFaction;
  genesisEra: boolean;
  exists: boolean;
};

const CITY_HISTORY_ABI = [
  "function cityRegistry() view returns (address)",
  "function authorizedCallers(address caller) view returns (bool)",
  "function provenanceOf(uint256 plotId) view returns (address firstBuilder, uint64 createdAt, uint32 layerCount, uint32 ownershipTransfers, uint32 aetherUses, uint32 historicScore, uint8 originFaction, bool genesisEra)",
  "function initializePlotHistory(uint256 plotId, address firstBuilder, uint8 faction, bool genesisEra)",
  "function recordOwnershipTransfer(uint256 plotId)",
  "function recordLayerAdded(uint256 plotId)",
  "function recordAetherUse(uint256 plotId)",
] as const;

function getInjectedProvider(): BrowserProvider {
  const ethereum = (window as Window & {
    ethereum?: Eip1193Provider;
  }).ethereum;

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return new BrowserProvider(ethereum);
}

function getReadProvider(): BrowserProvider {
  return getInjectedProvider();
}

function getCityHistoryAddress(): string {
  const address = (CONFIG.cityHistoryAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_HISTORY_ADDRESS.");
  }
  return address;
}

function getCityHistoryReadContract(): Contract {
  return new Contract(
    getCityHistoryAddress(),
    CITY_HISTORY_ABI,
    getReadProvider()
  );
}

async function getCityHistoryWriteContract(): Promise<Contract> {
  const provider = getInjectedProvider();
  const signer = await provider.getSigner();

  return new Contract(
    getCityHistoryAddress(),
    CITY_HISTORY_ABI,
    signer
  );
}

function toBigIntPlotId(plotId: number | bigint | string): bigint {
  if (typeof plotId === "bigint") return plotId;
  if (typeof plotId === "number") return BigInt(plotId);
  return BigInt(plotId.trim());
}

function mapFaction(factionId: number): CityHistoryFaction {
  switch (factionId) {
    case 0:
      return "None";
    case 1:
      return "Inpinity";
    case 2:
      return "Inphinity";
    case 3:
      return "Neutral";
    default:
      return "None";
  }
}

export async function getCityHistoryRegistryAddress(): Promise<string> {
  const contract = getCityHistoryReadContract();
  return (await contract.cityRegistry()) as string;
}

export async function isAuthorizedHistoryCaller(address: string): Promise<boolean> {
  const contract = getCityHistoryReadContract();
  return (await contract.authorizedCallers(address.trim())) as boolean;
}

export async function getPlotProvenance(
  plotId: number | bigint | string
): Promise<CityPlotProvenanceRead> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityHistoryReadContract();

  const result = await contract.provenanceOf(normalizedPlotId);

  const firstBuilder = String(result.firstBuilder);
  const createdAt = BigInt(result.createdAt);
  const layerCount = Number(result.layerCount);
  const ownershipTransfers = Number(result.ownershipTransfers);
  const aetherUses = Number(result.aetherUses);
  const historicScore = Number(result.historicScore);
  const originFactionId = Number(result.originFaction);
  const genesisEra = Boolean(result.genesisEra);

  return {
    plotId: normalizedPlotId,
    firstBuilder,
    createdAt,
    layerCount,
    ownershipTransfers,
    aetherUses,
    historicScore,
    originFactionId,
    originFaction: mapFaction(originFactionId),
    genesisEra,
    exists: createdAt > 0n,
  };
}

export async function initializePlotHistory(args: {
  plotId: number | bigint | string;
  firstBuilder: string;
  factionId: number;
  genesisEra: boolean;
}) {
  const contract = await getCityHistoryWriteContract();

  return contract.initializePlotHistory(
    toBigIntPlotId(args.plotId),
    args.firstBuilder.trim(),
    args.factionId,
    args.genesisEra
  );
}

export async function recordOwnershipTransfer(
  plotId: number | bigint | string
) {
  const contract = await getCityHistoryWriteContract();
  return contract.recordOwnershipTransfer(toBigIntPlotId(plotId));
}

export async function recordLayerAdded(
  plotId: number | bigint | string
) {
  const contract = await getCityHistoryWriteContract();
  return contract.recordLayerAdded(toBigIntPlotId(plotId));
}

export async function recordAetherUse(
  plotId: number | bigint | string
) {
  const contract = await getCityHistoryWriteContract();
  return contract.recordAetherUse(toBigIntPlotId(plotId));
}

export function getHistoryFactionLabel(faction: CityHistoryFaction): string {
  switch (faction) {
    case "Inpinity":
      return "Inpinity";
    case "Inphinity":
      return "Inphinity";
    case "Neutral":
      return "Neutral";
    default:
      return "None";
  }
}

export function getHistoricWeight(provenance: Pick<
  CityPlotProvenanceRead,
  "historicScore" | "layerCount" | "ownershipTransfers" | "aetherUses"
>): number {
  return (
    provenance.historicScore +
    provenance.layerCount * 10 +
    provenance.ownershipTransfers * 5 +
    provenance.aetherUses * 25
  );
}