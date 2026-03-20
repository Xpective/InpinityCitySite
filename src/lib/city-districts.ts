import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

export type CityDistrictKind =
  | "None"
  | "Nexus"
  | "InpinityResidential"
  | "InphinityResidential"
  | "Borderline"
  | "CommunityCore"
  | "Research"
  | "Defense"
  | "Trade";

export type CityDistrictFaction =
  | "None"
  | "Inpinity"
  | "Inphinity"
  | "Neutral"
  | "Borderline"
  | "Community";

export type CityDistrictRead = {
  plotId: bigint;
  kindId: number;
  kind: CityDistrictKind;
  factionId: number;
  faction: CityDistrictFaction;
  bonusBps: number;
  exists: boolean;
  isBorderline: boolean;
};

const CITY_DISTRICTS_ABI = [
  "function getDistrict(uint256 plotId) view returns ((uint8 kind,uint8 faction,uint32 bonusBps,bool exists))",
  "function isBorderline(uint256 plotId) view returns (bool)",
  "function deriveDistrict(uint8 plotType, uint8 faction) pure returns (uint8 kind, uint8 factionOut, uint32 bonusBps)",
  "function assignDistrictAuto(uint256 plotId)",
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

function getCityDistrictsAddress(): string {
  const address = (CONFIG.cityDistrictsAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_DISTRICTS_ADDRESS.");
  }
  return address;
}

function getCityDistrictsReadContract(): Contract {
  return new Contract(
    getCityDistrictsAddress(),
    CITY_DISTRICTS_ABI,
    getReadProvider()
  );
}

async function getCityDistrictsWriteContract(): Promise<Contract> {
  const provider = getInjectedProvider();
  const signer = await provider.getSigner();

  return new Contract(
    getCityDistrictsAddress(),
    CITY_DISTRICTS_ABI,
    signer
  );
}

function mapDistrictKind(kindId: number): CityDistrictKind {
  switch (kindId) {
    case 0:
      return "None";
    case 1:
      return "Nexus";
    case 2:
      return "InpinityResidential";
    case 3:
      return "InphinityResidential";
    case 4:
      return "Borderline";
    case 5:
      return "CommunityCore";
    case 6:
      return "Research";
    case 7:
      return "Defense";
    case 8:
      return "Trade";
    default:
      return "None";
  }
}

function mapDistrictFaction(factionId: number): CityDistrictFaction {
  switch (factionId) {
    case 0:
      return "None";
    case 1:
      return "Inpinity";
    case 2:
      return "Inphinity";
    case 3:
      return "Neutral";
    case 4:
      return "Borderline";
    case 5:
      return "Community";
    default:
      return "None";
  }
}

function toBigIntPlotId(plotId: number | bigint | string): bigint {
  if (typeof plotId === "bigint") return plotId;
  if (typeof plotId === "number") return BigInt(plotId);
  return BigInt(plotId.trim());
}

export async function getDistrict(plotId: number | bigint | string): Promise<CityDistrictRead> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityDistrictsReadContract();

  const result = await contract.getDistrict(normalizedPlotId);
  const isBorderline = (await contract.isBorderline(normalizedPlotId)) as boolean;

  const kindId = Number(result.kind);
  const factionId = Number(result.faction);
  const bonusBps = Number(result.bonusBps);
  const exists = Boolean(result.exists);

  return {
    plotId: normalizedPlotId,
    kindId,
    kind: mapDistrictKind(kindId),
    factionId,
    faction: mapDistrictFaction(factionId),
    bonusBps,
    exists,
    isBorderline,
  };
}

export async function isBorderlineDistrict(plotId: number | bigint | string): Promise<boolean> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityDistrictsReadContract();
  return (await contract.isBorderline(normalizedPlotId)) as boolean;
}

export async function deriveDistrict(
  plotTypeId: number,
  factionId: number
): Promise<{
  kindId: number;
  kind: CityDistrictKind;
  factionId: number;
  faction: CityDistrictFaction;
  bonusBps: number;
}> {
  const contract = getCityDistrictsReadContract();
  const result = await contract.deriveDistrict(plotTypeId, factionId);

  const kindId = Number(result.kind);
  const outFactionId = Number(result.factionOut);
  const bonusBps = Number(result.bonusBps);

  return {
    kindId,
    kind: mapDistrictKind(kindId),
    factionId: outFactionId,
    faction: mapDistrictFaction(outFactionId),
    bonusBps,
  };
}

export async function assignDistrictAuto(plotId: number | bigint | string) {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = await getCityDistrictsWriteContract();
  return contract.assignDistrictAuto(normalizedPlotId);
}

export function getDistrictKindLabel(kind: CityDistrictKind): string {
  switch (kind) {
    case "InpinityResidential":
      return "Inpinity Residential";
    case "InphinityResidential":
      return "Inphinity Residential";
    case "CommunityCore":
      return "Community Core";
    default:
      return kind;
  }
}

export function getDistrictFactionLabel(faction: CityDistrictFaction): string {
  switch (faction) {
    case "Inpinity":
      return "Inpinity";
    case "Inphinity":
      return "Inphinity";
    case "Neutral":
      return "Neutral";
    case "Borderline":
      return "Borderline";
    case "Community":
      return "Community";
    default:
      return "None";
  }
}