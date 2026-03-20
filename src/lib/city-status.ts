import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

export type CityPlotDerivedStatus =
  | "None"
  | "Reserved"
  | "Active"
  | "Dormant"
  | "Decayed"
  | "LayerEligible";

export type CityPlotStatusRead = {
  plotId: bigint;
  manualStatusId: number;
  manualStatus: CityPlotDerivedStatus;
  derivedStatusId: number;
  derivedStatus: CityPlotDerivedStatus;
  lastActivityAt: bigint;
  lastMaintenanceAt: bigint;
  updatedAt: bigint;
  layerEligible: boolean;
};

const CITY_STATUS_ABI = [
  "function plotStatusOf(uint256 plotId) view returns (uint8)",
  "function lastActivityAtOf(uint256 plotId) view returns (uint64)",
  "function lastMaintenanceAtOf(uint256 plotId) view returns (uint64)",
  "function deriveStatus(uint256 plotId) view returns (uint8)",
  "function setPlotStatus(uint256 plotId, uint8 status)",
  "function clearManualStatus(uint256 plotId)",
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

function getCityStatusAddress(): string {
  const address = (CONFIG.cityStatusAddress || "").trim();
  if (!address) {
    throw new Error("Missing VITE_CITY_STATUS_ADDRESS.");
  }
  return address;
}

function getCityStatusReadContract(): Contract {
  return new Contract(
    getCityStatusAddress(),
    CITY_STATUS_ABI,
    getReadProvider()
  );
}

async function getCityStatusWriteContract(): Promise<Contract> {
  const provider = getInjectedProvider();
  const signer = await provider.getSigner();

  return new Contract(
    getCityStatusAddress(),
    CITY_STATUS_ABI,
    signer
  );
}

function toBigIntPlotId(plotId: number | bigint | string): bigint {
  if (typeof plotId === "bigint") return plotId;
  if (typeof plotId === "number") return BigInt(plotId);
  return BigInt(plotId.trim());
}

function mapStatus(statusId: number): CityPlotDerivedStatus {
  switch (statusId) {
    case 0:
      return "None";
    case 1:
      return "Reserved";
    case 2:
      return "Active";
    case 3:
      return "Dormant";
    case 4:
      return "Decayed";
    case 5:
      return "LayerEligible";
    default:
      return "None";
  }
}

export async function plotStatusOf(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityStatusReadContract();
  const statusId = Number(await contract.plotStatusOf(normalizedPlotId));
  return mapStatus(statusId);
}

export async function lastActivityAtOf(
  plotId: number | bigint | string
): Promise<bigint> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityStatusReadContract();
  return BigInt(await contract.lastActivityAtOf(normalizedPlotId));
}

export async function lastMaintenanceAtOf(
  plotId: number | bigint | string
): Promise<bigint> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityStatusReadContract();
  return BigInt(await contract.lastMaintenanceAtOf(normalizedPlotId));
}

export async function deriveStatus(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityStatusReadContract();
  const statusId = Number(await contract.deriveStatus(normalizedPlotId));
  return mapStatus(statusId);
}

export async function readCityStatus(
  plotId: number | bigint | string
): Promise<CityPlotStatusRead> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = getCityStatusReadContract();

  const [manualStatusRaw, derivedStatusRaw, lastActivityRaw, lastMaintenanceRaw] =
    await Promise.all([
      contract.plotStatusOf(normalizedPlotId),
      contract.deriveStatus(normalizedPlotId),
      contract.lastActivityAtOf(normalizedPlotId),
      contract.lastMaintenanceAtOf(normalizedPlotId),
    ]);

  const manualStatusId = Number(manualStatusRaw);
  const derivedStatusId = Number(derivedStatusRaw);
  const lastActivityAt = BigInt(lastActivityRaw);
  const lastMaintenanceAt = BigInt(lastMaintenanceRaw);
  const updatedAt = lastActivityAt > lastMaintenanceAt ? lastActivityAt : lastMaintenanceAt;

  return {
    plotId: normalizedPlotId,
    manualStatusId,
    manualStatus: mapStatus(manualStatusId),
    derivedStatusId,
    derivedStatus: mapStatus(derivedStatusId),
    lastActivityAt,
    lastMaintenanceAt,
    updatedAt,
    layerEligible: derivedStatusId === 5,
  };
}

export async function setPlotStatus(
  plotId: number | bigint | string,
  statusId: number
) {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = await getCityStatusWriteContract();
  return contract.setPlotStatus(normalizedPlotId, statusId);
}

export async function clearManualStatus(
  plotId: number | bigint | string
) {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = await getCityStatusWriteContract();
  return contract.clearManualStatus(normalizedPlotId);
}

export function getCityStatusLabel(status: CityPlotDerivedStatus): string {
  switch (status) {
    case "LayerEligible":
      return "Layer Eligible";
    default:
      return status;
  }
}

export function isInactiveLikeStatus(status: CityPlotDerivedStatus): boolean {
  return status === "Dormant" || status === "Decayed" || status === "LayerEligible";
}