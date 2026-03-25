import { BrowserProvider, Contract } from "ethers";

import { CONFIG } from "./config";
import { getInjectedEthereum, normalizeAddress } from "./evm-wallet";

const CITY_VALIDATION_ABI = [
  "function canFillQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canReservePersonalPlot(address user, uint8 slotIndex) view returns (bool)",
  "function canUseAetherOnQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canUseFaction(address user, uint8 faction) view returns (bool)",
  "function isValidPersonalPlotSize(uint256 plotId) view returns (bool)",
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
