import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

const CITY_VALIDATION_ABI = [
  "function canReservePersonalPlot(address user, uint8 slotIndex) view returns (bool)",
  "function canFillQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canUseAetherOnQubiq(address user, uint256 plotId, uint32 x, uint32 y) view returns (bool)",
  "function canUseFaction(address user, uint8 faction) view returns (bool)",
] as const;

function getProvider(): BrowserProvider {
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

function getCityValidationContract() {
  return new Contract(getCityValidationAddress(), CITY_VALIDATION_ABI, getProvider());
}

export async function canReservePersonalPlot(
  walletAddress: string,
  slotIndex: number
): Promise<boolean> {
  const contract = getCityValidationContract();
  return (await contract.canReservePersonalPlot(walletAddress, slotIndex)) as boolean;
}

export async function canFillQubiq(
  walletAddress: string,
  plotId: bigint | number | string,
  x: number,
  y: number
): Promise<boolean> {
  const contract = getCityValidationContract();
  return (await contract.canFillQubiq(walletAddress, plotId, x, y)) as boolean;
}

export async function canUseAetherOnQubiq(
  walletAddress: string,
  plotId: bigint | number | string,
  x: number,
  y: number
): Promise<boolean> {
  const contract = getCityValidationContract();
  return (await contract.canUseAetherOnQubiq(walletAddress, plotId, x, y)) as boolean;
}
