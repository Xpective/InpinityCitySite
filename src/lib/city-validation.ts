import { BrowserProvider, Contract, type ContractTransactionResponse, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

export type CityValidationFactionUi = "none" | "inpinity" | "inphinity" | "neutral";

export type CityValidationSummary = {
  canReservePersonalPlot: boolean;
  isValidPersonalPlotSize: boolean;
  isValidCommunityPlotSize: boolean;
  canUseFactionInpinity: boolean;
  canUseFactionInphinity: boolean;
  canFillQubiq: boolean;
  canUseAetherOnQubiq: boolean;
};

const CITY_VALIDATION_ABI = [
  "function cityConfig() view returns (address)",
  "function cityRegistry() view returns (address)",
  "function cityStatus() view returns (address)",
  "function cityLand() view returns (address)",
  "function setHooks(address cityStatusAddress, address cityLandAddress)",
  "function canReservePersonalPlot(address user, uint8 slotIndex) view returns (bool)",
  "function isValidPersonalPlotSize(uint256 plotId) view returns (bool)",
  "function isValidCommunityPlotSize(uint256 plotId) view returns (bool)",
  "function canUseFaction(address user, uint8 faction) view returns (bool)",
  "function canFillQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canUseAetherOnQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
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

function getCityValidationAddress(): string {
  const address = (CONFIG.cityValidationAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_VALIDATION_ADDRESS.");
  }
  return address;
}

function getReadContract(): Contract {
  return new Contract(getCityValidationAddress(), CITY_VALIDATION_ABI, getInjectedProvider());
}

async function getWriteContract(): Promise<Contract> {
  const provider = getInjectedProvider();
  const signer = await provider.getSigner();
  return new Contract(getCityValidationAddress(), CITY_VALIDATION_ABI, signer);
}

function toBigIntPlotId(plotId: number | bigint | string): bigint {
  if (typeof plotId === "bigint") return plotId;
  if (typeof plotId === "number") return BigInt(plotId);
  return BigInt(plotId.trim());
}

function toFactionId(faction: CityValidationFactionUi): number {
  switch (faction) {
    case "inpinity":
      return 1;
    case "inphinity":
      return 2;
    case "neutral":
      return 3;
    default:
      return 0;
  }
}

export async function getCityValidationHooks(): Promise<{
  cityConfig: string;
  cityRegistry: string;
  cityStatus: string;
  cityLand: string;
}> {
  const contract = getReadContract();

  const [cityConfig, cityRegistry, cityStatus, cityLand] = await Promise.all([
    contract.cityConfig(),
    contract.cityRegistry(),
    contract.cityStatus(),
    contract.cityLand(),
  ]);

  return {
    cityConfig: String(cityConfig),
    cityRegistry: String(cityRegistry),
    cityStatus: String(cityStatus),
    cityLand: String(cityLand),
  };
}

export async function setCityValidationHooks(
  cityStatusAddress: string,
  cityLandAddress: string
): Promise<ContractTransactionResponse> {
  const contract = await getWriteContract();
  return contract.setHooks(cityStatusAddress.trim(), cityLandAddress.trim()) as Promise<ContractTransactionResponse>;
}

export async function canReservePersonalPlot(
  user: string,
  slotIndex: number
): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.canReservePersonalPlot(user.trim(), slotIndex)) as boolean;
}

export async function isValidPersonalPlotSize(
  plotId: number | bigint | string
): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.isValidPersonalPlotSize(toBigIntPlotId(plotId))) as boolean;
}

export async function isValidCommunityPlotSize(
  plotId: number | bigint | string
): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.isValidCommunityPlotSize(toBigIntPlotId(plotId))) as boolean;
}

export async function canUseFaction(
  user: string,
  faction: CityValidationFactionUi
): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.canUseFaction(user.trim(), toFactionId(faction))) as boolean;
}

export async function canFillQubiq(args: {
  user: string;
  plotId: number | bigint | string;
  x: number;
  y: number;
}): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.canFillQubiq(
    args.user.trim(),
    toBigIntPlotId(args.plotId),
    args.x,
    args.y
  )) as boolean;
}

export async function canUseAetherOnQubiq(args: {
  user: string;
  plotId: number | bigint | string;
  x: number;
  y: number;
}): Promise<boolean> {
  const contract = getReadContract();
  return (await contract.canUseAetherOnQubiq(
    args.user.trim(),
    toBigIntPlotId(args.plotId),
    args.x,
    args.y
  )) as boolean;
}

export async function readCityValidationSummary(args: {
  user: string;
  slotIndex: number;
  plotId: number | bigint | string;
  x: number;
  y: number;
}): Promise<CityValidationSummary> {
  const [
    reserveOk,
    personalSizeOk,
    communitySizeOk,
    factionInpinityOk,
    factionInphinityOk,
    fillOk,
    aetherOk,
  ] = await Promise.all([
    canReservePersonalPlot(args.user, args.slotIndex),
    isValidPersonalPlotSize(args.plotId),
    isValidCommunityPlotSize(args.plotId),
    canUseFaction(args.user, "inpinity"),
    canUseFaction(args.user, "inphinity"),
    canFillQubiq({
      user: args.user,
      plotId: args.plotId,
      x: args.x,
      y: args.y,
    }),
    canUseAetherOnQubiq({
      user: args.user,
      plotId: args.plotId,
      x: args.x,
      y: args.y,
    }),
  ]);

  return {
    canReservePersonalPlot: reserveOk,
    isValidPersonalPlotSize: personalSizeOk,
    isValidCommunityPlotSize: communitySizeOk,
    canUseFactionInpinity: factionInpinityOk,
    canUseFactionInphinity: factionInphinityOk,
    canFillQubiq: fillOk,
    canUseAetherOnQubiq: aetherOk,
  };
}