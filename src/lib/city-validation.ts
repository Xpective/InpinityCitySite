import { BrowserProvider, Contract } from "ethers";

import { CONFIG } from "./config";
import { getInjectedEthereum, normalizeAddress } from "./evm-wallet";

const CITY_VALIDATION_ABI = [
  "function canFillQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canReservePersonalPlot(address user, uint8 slotIndex) view returns (bool)",
  "function canUseAetherOnQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canUseFaction(address user, uint8 faction) view returns (bool)",
  "function isValidPersonalPlotSize(uint256 plotId) view returns (bool)",
  "function isValidCommunityPlotSize(uint256 plotId) view returns (bool)",
] as const;

function getProvider(): BrowserProvider {
  const ethereum = getInjectedEthereum();

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return new BrowserProvider(ethereum);
}

function getCityValidationAddress(): string {
  const address = normalizeAddress(CONFIG.cityValidationAddress);

  if (!address) {
    throw new Error("Missing VITE_CITY_VALIDATION_ADDRESS.");
  }

  return address;
}

function getCityValidationContract(provider: BrowserProvider) {
  return new Contract(getCityValidationAddress(), CITY_VALIDATION_ABI, provider);
}

function mapFaction(faction: "inpinity" | "inphinity"): number {
  return faction === "inpinity" ? 1 : 2;
}

export async function canReservePersonalPlot(
  walletAddress: string,
  slotIndex: number
): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.canReservePersonalPlot(
    normalizeAddress(walletAddress),
    slotIndex
  )) as boolean;
}

export async function canFillQubiq(
  walletAddress: string,
  plotId: bigint | number,
  x: number,
  y: number
): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.canFillQubiq(
    normalizeAddress(walletAddress),
    plotId,
    x,
    y
  )) as boolean;
}

export async function canUseAetherOnQubiq(
  walletAddress: string,
  plotId: bigint | number,
  x: number,
  y: number
): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.canUseAetherOnQubiq(
    normalizeAddress(walletAddress),
    plotId,
    x,
    y
  )) as boolean;
}

export async function canUseFaction(
  walletAddress: string,
  faction: "inpinity" | "inphinity"
): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.canUseFaction(
    normalizeAddress(walletAddress),
    mapFaction(faction)
  )) as boolean;
}

export async function isValidPersonalPlotSize(plotId: bigint | number): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.isValidPersonalPlotSize(plotId)) as boolean;
}


export async function isValidCommunityPlotSize(
  plotId: bigint | number
): Promise<boolean> {
  const provider = getProvider();
  const contract = getCityValidationContract(provider);

  return (await contract.isValidCommunityPlotSize(plotId)) as boolean;
}

export type CityValidationSummaryArgs = {
  user: string;
  slotIndex: number;
  plotId: bigint | number | string;
  x: number;
  y: number;
};

export type CityValidationSummary = {
  canReservePersonalPlot: boolean;
  isValidPersonalPlotSize: boolean;
  isValidCommunityPlotSize: boolean;
  canUseFactionInpinity: boolean;
  canUseFactionInphinity: boolean;
  canFillQubiq: boolean;
  canUseAetherOnQubiq: boolean;
};

function toPlotId(value: bigint | number | string): bigint | number {
  if (typeof value === "string") {
    const normalized = value.trim();
    return normalized ? BigInt(normalized) : 0n;
  }

  return value;
}

export async function readCityValidationSummary(
  args: CityValidationSummaryArgs
): Promise<CityValidationSummary> {
  const plotId = toPlotId(args.plotId);

  const [
    canReservePersonalPlotValue,
    isValidPersonalPlotSizeValue,
    isValidCommunityPlotSizeValue,
    canUseFactionInpinityValue,
    canUseFactionInphinityValue,
    canFillQubiqValue,
    canUseAetherOnQubiqValue,
  ] = await Promise.all([
    canReservePersonalPlot(args.user, args.slotIndex),
    isValidPersonalPlotSize(plotId),
    isValidCommunityPlotSize(plotId),
    canUseFaction(args.user, "inpinity"),
    canUseFaction(args.user, "inphinity"),
    canFillQubiq(args.user, plotId, args.x, args.y),
    canUseAetherOnQubiq(args.user, plotId, args.x, args.y),
  ]);

  return {
    canReservePersonalPlot: canReservePersonalPlotValue,
    isValidPersonalPlotSize: isValidPersonalPlotSizeValue,
    isValidCommunityPlotSize: isValidCommunityPlotSizeValue,
    canUseFactionInpinity: canUseFactionInpinityValue,
    canUseFactionInphinity: canUseFactionInphinityValue,
    canFillQubiq: canFillQubiqValue,
    canUseAetherOnQubiq: canUseAetherOnQubiqValue,
  };
}
