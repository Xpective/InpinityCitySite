
import {
  BrowserProvider,
  Contract,
  JsonRpcProvider,
  type ContractTransactionResponse,
  type Eip1193Provider,
} from "ethers";
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
  "function authorizedCallers(address caller) view returns (bool)",
  "function cityConfig() view returns (address)",
  "function cityRegistry() view returns (address)",
  "function clearManualStatus(uint256 plotId)",
  "function getDerivedStatus(uint256 plotId) view returns (uint8)",
  "function isLayerEligible(uint256 plotId) view returns (bool)",
  "function lastActivityAtOf(uint256 plotId) view returns (uint64)",
  "function lastMaintenanceAtOf(uint256 plotId) view returns (uint64)",
  "function manualStatusOverrideOf(uint256 plotId) view returns (uint8)",
  "function recordMaintenance(uint256 plotId)",
  "function setAuthorizedCaller(address caller, bool allowed)",
  "function setManualStatus(uint256 plotId, uint8 status)",
  "function touchActivity(uint256 plotId)",
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

function getBaseRpcUrl(): string | null {
  const envUrl =
    typeof import.meta !== "undefined" ? import.meta.env.VITE_BASE_RPC_URL : "";

  const value = (envUrl || "").trim();
  if (value) return value;

  return "https://mainnet.base.org";
}

function getReadProvider(): BrowserProvider | JsonRpcProvider {
  const rpcUrl = getBaseRpcUrl();

  if (rpcUrl) {
    return new JsonRpcProvider(rpcUrl);
  }

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
  return new Contract(getCityStatusAddress(), CITY_STATUS_ABI, getReadProvider());
}

async function getCityStatusWriteContract(): Promise<Contract> {
  const provider = getInjectedProvider();
  const signer = await provider.getSigner();

  return new Contract(getCityStatusAddress(), CITY_STATUS_ABI, signer);
}

function toBigIntPlotId(plotId: number | bigint | string): bigint {
  if (typeof plotId === "bigint") return plotId;
  if (typeof plotId === "number") return BigInt(plotId);

  const normalized = plotId.trim();
  if (!normalized) {
    throw new Error("Plot ID must not be empty.");
  }

  return BigInt(normalized);
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

function formatReadError(error: unknown): Error {
  if (!(error instanceof Error)) {
    return new Error("City status read failed.");
  }

  const message = error.message || "City status read failed.";

  if (message.includes("missing revert data") || message.includes("CALL_EXCEPTION")) {
    return new Error(
      "CityStatus read failed on the live contract. Check ABI/address alignment or whether the plot exists onchain."
    );
  }

  return error;
}

export async function manualStatusOverrideOf(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();
    const statusId = Number(await contract.manualStatusOverrideOf(normalizedPlotId));
    return mapStatus(statusId);
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function getDerivedStatus(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();
    const statusId = Number(await contract.getDerivedStatus(normalizedPlotId));
    return mapStatus(statusId);
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function plotStatusOf(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  return manualStatusOverrideOf(plotId);
}

export async function deriveStatus(
  plotId: number | bigint | string
): Promise<CityPlotDerivedStatus> {
  return getDerivedStatus(plotId);
}

export async function lastActivityAtOf(
  plotId: number | bigint | string
): Promise<bigint> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();
    return BigInt(await contract.lastActivityAtOf(normalizedPlotId));
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function lastMaintenanceAtOf(
  plotId: number | bigint | string
): Promise<bigint> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();
    return BigInt(await contract.lastMaintenanceAtOf(normalizedPlotId));
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function isLayerEligible(
  plotId: number | bigint | string
): Promise<boolean> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();
    return Boolean(await contract.isLayerEligible(normalizedPlotId));
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function readCityStatus(
  plotId: number | bigint | string
): Promise<CityPlotStatusRead> {
  try {
    const normalizedPlotId = toBigIntPlotId(plotId);
    const contract = getCityStatusReadContract();

    const [
      manualStatusRaw,
      derivedStatusRaw,
      lastActivityRaw,
      lastMaintenanceRaw,
      layerEligibleRaw,
    ] = await Promise.all([
      contract.manualStatusOverrideOf(normalizedPlotId),
      contract.getDerivedStatus(normalizedPlotId),
      contract.lastActivityAtOf(normalizedPlotId),
      contract.lastMaintenanceAtOf(normalizedPlotId),
      contract.isLayerEligible(normalizedPlotId),
    ]);

    const manualStatusId = Number(manualStatusRaw);
    const derivedStatusId = Number(derivedStatusRaw);
    const lastActivityAt = BigInt(lastActivityRaw);
    const lastMaintenanceAt = BigInt(lastMaintenanceRaw);
    const updatedAt =
      lastActivityAt > lastMaintenanceAt ? lastActivityAt : lastMaintenanceAt;

    return {
      plotId: normalizedPlotId,
      manualStatusId,
      manualStatus: mapStatus(manualStatusId),
      derivedStatusId,
      derivedStatus: mapStatus(derivedStatusId),
      lastActivityAt,
      lastMaintenanceAt,
      updatedAt,
      layerEligible: Boolean(layerEligibleRaw),
    };
  } catch (error) {
    throw formatReadError(error);
  }
}

export async function setManualStatus(
  plotId: number | bigint | string,
  statusId: number
): Promise<ContractTransactionResponse> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = await getCityStatusWriteContract();
  return contract.setManualStatus(normalizedPlotId, statusId) as Promise<ContractTransactionResponse>;
}

export async function setPlotStatus(
  plotId: number | bigint | string,
  statusId: number
): Promise<ContractTransactionResponse> {
  return setManualStatus(plotId, statusId);
}

export async function clearManualStatus(
  plotId: number | bigint | string
): Promise<ContractTransactionResponse> {
  const normalizedPlotId = toBigIntPlotId(plotId);
  const contract = await getCityStatusWriteContract();
  return contract.clearManualStatus(normalizedPlotId) as Promise<ContractTransactionResponse>;
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
  return (
    status === "Dormant" ||
    status === "Decayed" ||
    status === "LayerEligible"
  );
}
