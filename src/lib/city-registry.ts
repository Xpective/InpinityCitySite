import {
  BrowserProvider,
  Contract,
  Signer,
  type ContractTransactionResponse,
} from "ethers";

import { CONFIG } from "./config";
import { getInjectedEthereum, normalizeAddress } from "./evm-wallet";

// ============================================================
// TYPES
// ============================================================
export type CityFactionUi = "none" | "inpinity" | "inphinity";

export type RegistryReadState = {
  walletAddress: string;
  hasCityKey: boolean;
  cityKeyTokenId: bigint | null;
  chosenFactionRaw: number;
  chosenFaction: CityFactionUi;
  personalPlotCount: number;
};

export type PersonalPlotSlotState = {
  slotIndex: number;
  plotId: bigint | null;
  occupied: boolean;
  isExpectedNextSlot: boolean;
};

export type ResolvedPersonalPlotSlot = PersonalPlotSlotState & {
  resolution: "preferred" | "target" | "next";
};

export type ReservationReadiness = {
  hasCityKey: boolean;
  hasFaction: boolean;
  slotFree: boolean;
  ready: boolean;
  /** Additional context for UI */
  reasons: string[];
};

export type PlotCoreStruct = {
  id: bigint;
  plotType: number;
  faction: number;
  status: number;
  owner: string;
  width: number;
  height: number;
  createdAt: bigint;
  exists: boolean;
};

export type PlotCoreRead = {
  id: bigint;
  plotType: number;
  faction: number;
  status: number;
  owner: string;
  width: number;
  height: number;
  createdAt: number;
  exists: boolean;
};

// ============================================================
// ABI
// ============================================================
const CITY_REGISTRY_ABI = [
  "function hasCityKeyOf(address) view returns (bool)",
  "function cityKeyTokenOf(address) view returns (uint256)",
  "function chosenFactionOf(address) view returns (uint8)",
  "function personalPlotCountOf(address) view returns (uint8)",
  "function getPersonalPlot(address user, uint8 slotIndex) view returns (uint256 plotId, bool occupied)",
  "function getPlotCore(uint256 plotId) view returns ((uint256 id,uint8 plotType,uint8 faction,uint8 status,address owner,uint32 width,uint32 height,uint64 createdAt,bool exists))",
  "function setCityKeyToken(uint256 tokenId)",
  "function chooseFaction(uint8 faction)",
  "function reserveNextPersonalPlot(uint8 slotIndex) returns (uint256 plotId)",
] as const;

// ============================================================
// CONSTANTS
// ============================================================
const RPC_RETRIES = 3;
const RPC_RETRY_DELAY_MS = 800;

// ============================================================
// DEBUG
// ============================================================
function isDebugEnabled(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return new URLSearchParams(window.location.search).has("debug");
  } catch {
    return false;
  }
}

function logDebug(...args: unknown[]): void {
  if (isDebugEnabled()) {
    // eslint-disable-next-line no-console
    console.debug("%c[city-registry]", "color:#00e5ff", ...args);
  }
}

// ============================================================
// RETRY WRAPPER
// ============================================================
async function withRetry<T>(
  fn: () => Promise<T>,
  label = "RPC call",
  retries = RPC_RETRIES
): Promise<T> {
  let lastError: unknown = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      logDebug(`${label} attempt ${attempt + 1} failed`, err);
      if (attempt < retries - 1) {
        await new Promise((r) => setTimeout(r, RPC_RETRY_DELAY_MS * (attempt + 1)));
      }
    }
  }
  throw lastError;
}

// ============================================================
// PROVIDER / CONTRACT HELPERS
// ============================================================
function getProvider(): BrowserProvider {
  const ethereum = getInjectedEthereum();
  if (!ethereum) {
    throw new Error("No injected wallet found. Please install MetaMask or another EVM wallet.");
  }
  return new BrowserProvider(ethereum);
}

export function getCityRegistryAddress(): string {
  const address = normalizeAddress(CONFIG.cityRegistryAddress);
  if (!address) {
    throw new Error("Missing VITE_CITY_REGISTRY_ADDRESS. Please check your environment config.");
  }
  return address;
}

export function getCityRegistryContract(providerOrSigner: BrowserProvider | Signer) {
  return new Contract(getCityRegistryAddress(), CITY_REGISTRY_ABI, providerOrSigner);
}

// ============================================================
// FACTION MAPPING
// ============================================================
function mapFaction(raw: number): CityFactionUi {
  if (raw === 1) return "inpinity";
  if (raw === 2) return "inphinity";
  return "none";
}

function factionToContractValue(faction: "inpinity" | "inphinity"): number {
  return faction === "inpinity" ? 1 : 2;
}

// ============================================================
// READS
// ============================================================
export async function readRegistryState(walletAddress: string): Promise<RegistryReadState> {
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const address = normalizeAddress(walletAddress);

  if (!address) {
    throw new Error("Invalid wallet address provided to readRegistryState.");
  }

  const [hasCityKey, cityKeyTokenIdRaw, chosenFactionRaw, personalPlotCountRaw] =
    await withRetry(
      () =>
        Promise.all([
          contract.hasCityKeyOf(address) as Promise<boolean>,
          contract.cityKeyTokenOf(address) as Promise<bigint>,
          contract.chosenFactionOf(address) as Promise<bigint>,
          contract.personalPlotCountOf(address) as Promise<bigint>,
        ]),
      "readRegistryState"
    );

  logDebug("Registry state read", {
    address,
    hasCityKey,
    chosenFactionRaw: Number(chosenFactionRaw),
    personalPlotCount: Number(personalPlotCountRaw),
  });

  return {
    walletAddress: address,
    hasCityKey,
    cityKeyTokenId: hasCityKey ? cityKeyTokenIdRaw : null,
    chosenFactionRaw: Number(chosenFactionRaw),
    chosenFaction: mapFaction(Number(chosenFactionRaw)),
    personalPlotCount: Number(personalPlotCountRaw),
  };
}

export async function readCityKeyToken(walletAddress: string): Promise<bigint | null> {
  const state = await readRegistryState(walletAddress);
  return state.cityKeyTokenId;
}

export async function readChosenFaction(walletAddress: string): Promise<CityFactionUi> {
  const state = await readRegistryState(walletAddress);
  return state.chosenFaction;
}

export async function readPersonalPlot(
  walletAddress: string,
  slotIndex: number
): Promise<PersonalPlotSlotState> {
  if (slotIndex < 0) {
    throw new Error(`Invalid slot index: ${slotIndex}. Must be >= 0.`);
  }

  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const address = normalizeAddress(walletAddress);

  const [plotTuple, registryState] = await withRetry(
    () =>
      Promise.all([
        contract.getPersonalPlot(address, slotIndex) as Promise<[bigint, boolean]>,
        readRegistryState(address),
      ]),
    `readPersonalPlot slot ${slotIndex}`
  );

  const [plotIdRaw, occupied] = plotTuple;

  return {
    slotIndex,
    plotId: occupied ? plotIdRaw : null,
    occupied,
    isExpectedNextSlot: registryState.personalPlotCount === slotIndex,
  };
}

export async function readAllPersonalPlotSlots(
  walletAddress: string
): Promise<PersonalPlotSlotState[]> {
  const registryState = await readRegistryState(walletAddress);
  const slotCountToRead = Math.max(1, registryState.personalPlotCount + 1);

  logDebug("Reading all personal plot slots", { slotCountToRead });

  return Promise.all(
    Array.from({ length: slotCountToRead }).map((_, slotIndex) =>
      readPersonalPlot(walletAddress, slotIndex)
    )
  );
}

/**
 * Resolve the "active build plot" for a wallet.
 * Priority: explicit preferred slot → explicit target plotId → next expected slot.
 */
export async function resolvePersonalPlotSlot(
  walletAddress: string,
  options?: {
    targetPlotId?: bigint | number | null;
    preferredSlotIndex?: number | null;
  }
): Promise<ResolvedPersonalPlotSlot> {
  const address = normalizeAddress(walletAddress);
  const targetPlotId =
    options?.targetPlotId != null ? BigInt(options.targetPlotId) : null;

  // 1. Try the preferred slot first (fast path)
  if (typeof options?.preferredSlotIndex === "number" && options.preferredSlotIndex >= 0) {
    const preferred = await readPersonalPlot(address, options.preferredSlotIndex);
    if (!targetPlotId || preferred.plotId === targetPlotId) {
      return { ...preferred, resolution: "preferred" };
    }
  }

  // 2. Scan all slots
  const slots = await readAllPersonalPlotSlots(address);

  // 2a. Match by explicit target plotId
  if (targetPlotId != null) {
    const matched = slots.find(
      (slot) => slot.occupied && slot.plotId != null && slot.plotId === targetPlotId
    );
    if (matched) {
      return { ...matched, resolution: "target" };
    }
  }

  // 2b. Fallback: next expected empty slot
  const nextSlot = slots.find((slot) => slot.isExpectedNextSlot) || slots[slots.length - 1];
  return { ...nextSlot, resolution: "next" };
}

export async function readReservationReadiness(
  walletAddress: string,
  slotIndex: number
): Promise<ReservationReadiness> {
  const [registryState, slotState] = await Promise.all([
    readRegistryState(walletAddress),
    readPersonalPlot(walletAddress, slotIndex),
  ]);

  const hasCityKey = registryState.hasCityKey;
  const hasFaction = registryState.chosenFaction !== "none";
  const slotFree = !slotState.occupied && slotState.isExpectedNextSlot;
  const ready = hasCityKey && hasFaction && slotFree;

  const reasons: string[] = [];
  if (!hasCityKey) reasons.push("No City Key is linked to this wallet.");
  if (!hasFaction) reasons.push("No faction has been chosen yet.");
  if (slotState.occupied) reasons.push(`Slot ${slotIndex} is already occupied.`);
  else if (!slotState.isExpectedNextSlot) {
    reasons.push(`Slot ${slotIndex} is not the next expected slot.`);
  }

  return { hasCityKey, hasFaction, slotFree, ready, reasons };
}

export async function readPlotCore(plotId: bigint | number): Promise<PlotCoreRead> {
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);

  const core = (await withRetry(
    () => contract.getPlotCore(plotId) as Promise<PlotCoreStruct>,
    `readPlotCore ${plotId}`
  )) as PlotCoreStruct;

  return {
    id: core.id,
    plotType: Number(core.plotType),
    faction: Number(core.faction),
    status: Number(core.status),
    owner: core.owner,
    width: Number(core.width),
    height: Number(core.height),
    createdAt: Number(core.createdAt),
    exists: core.exists,
  };
}

// ============================================================
// WRITE ACTIONS
// ============================================================
export async function setCityKeyToken(
  tokenId: bigint | number
): Promise<ContractTransactionResponse> {
  const tokenBigInt = BigInt(tokenId);
  if (tokenBigInt <= 0n) {
    throw new Error("City Key token ID must be a positive number.");
  }

  logDebug("setCityKeyToken", tokenBigInt.toString());

  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);

  return contract.setCityKeyToken(tokenBigInt) as Promise<ContractTransactionResponse>;
}

export async function chooseFaction(
  faction: "inpinity" | "inphinity"
): Promise<ContractTransactionResponse> {
  if (faction !== "inpinity" && faction !== "inphinity") {
    throw new Error(`Invalid faction: ${faction}. Must be "inpinity" or "inphinity".`);
  }

  logDebug("chooseFaction", faction);

  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);
  const factionValue = factionToContractValue(faction);

  return contract.chooseFaction(factionValue) as Promise<ContractTransactionResponse>;
}

export async function reserveNextPersonalPlot(
  slotIndex: number
): Promise<ContractTransactionResponse> {
  if (slotIndex < 0) {
    throw new Error(`Invalid slot index: ${slotIndex}. Must be >= 0.`);
  }

  logDebug("reserveNextPersonalPlot", slotIndex);

  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);

  return contract.reserveNextPersonalPlot(slotIndex) as Promise<ContractTransactionResponse>;
}

// ============================================================
// UTILITIES
// ============================================================
/**
 * Get a human-readable label for a faction value.
 */
export function getFactionLabel(faction: CityFactionUi): string {
  switch (faction) {
    case "inpinity": return "Inpinity";
    case "inphinity": return "Inphinity";
    default: return "None";
  }
}

/**
 * Whether the wallet is locked to a faction (i.e., cannot change).
 */
export function isFactionLocked(state: RegistryReadState): boolean {
  return state.chosenFaction !== "none";
}

/**
 * Which faction should be visible in the UI based on the registry state.
 * Returns the locked faction if set, otherwise null.
 */
export function getActiveFaction(
  state: RegistryReadState
): "inpinity" | "inphinity" | null {
  return state.chosenFaction === "none" ? null : state.chosenFaction;
}