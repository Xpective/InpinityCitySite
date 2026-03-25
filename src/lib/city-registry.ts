import {
  BrowserProvider,
  Contract,
  Signer,
  type ContractTransactionResponse,
  type Eip1193Provider,
} from "ethers";
import { CONFIG } from "./config";

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

export type ReservationReadiness = {
  hasCityKey: boolean;
  hasFaction: boolean;
  slotFree: boolean;
  ready: boolean;
};

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

function normalizeAddress(address: string): string {
  return address.trim();
}

function getProvider(): BrowserProvider {
  const ethereum = (window as Window & {
    ethereum?: Eip1193Provider;
  }).ethereum;

  if (!ethereum) {
    throw new Error("No injected wallet found.");
  }

  return new BrowserProvider(ethereum);
}

export function getCityRegistryAddress(): string {
  const address = normalizeAddress(CONFIG.cityRegistryAddress);
  if (!address) {
    throw new Error("Missing VITE_CITY_REGISTRY_ADDRESS.");
  }
  return address;
}

export function getCityRegistryContract(providerOrSigner: BrowserProvider | Signer) {
  return new Contract(getCityRegistryAddress(), CITY_REGISTRY_ABI, providerOrSigner);
}

function mapFaction(raw: number): CityFactionUi {
  if (raw === 1) return "inpinity";
  if (raw === 2) return "inphinity";
  return "none";
}

function toSlotState(
  slotIndex: number,
  plotIdRaw: bigint,
  occupied: boolean,
  registryState: RegistryReadState
): PersonalPlotSlotState {
  return {
    slotIndex,
    plotId: occupied ? plotIdRaw : null,
    occupied,
    isExpectedNextSlot: registryState.personalPlotCount === slotIndex,
  };
}

export function getNextPersonalSlotIndex(registryState: RegistryReadState): number {
  return registryState.personalPlotCount;
}

export async function readRegistryState(walletAddress: string): Promise<RegistryReadState> {
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const address = normalizeAddress(walletAddress);

  const [hasCityKey, cityKeyTokenIdRaw, chosenFactionRaw, personalPlotCountRaw] =
    await Promise.all([
      contract.hasCityKeyOf(address) as Promise<boolean>,
      contract.cityKeyTokenOf(address) as Promise<bigint>,
      contract.chosenFactionOf(address) as Promise<bigint>,
      contract.personalPlotCountOf(address) as Promise<bigint>,
    ]);

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
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const address = normalizeAddress(walletAddress);

  const [plotTuple, registryState] = await Promise.all([
    contract.getPersonalPlot(address, slotIndex) as Promise<[bigint, boolean]>,
    readRegistryState(address),
  ]);

  const [plotIdRaw, occupied] = plotTuple;
  return toSlotState(slotIndex, plotIdRaw, occupied, registryState);
}

export async function readPersonalPlots(
  walletAddress: string
): Promise<PersonalPlotSlotState[]> {
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const address = normalizeAddress(walletAddress);
  const registryState = await readRegistryState(address);

  const slotCountToRead = Math.max(registryState.personalPlotCount + 1, 1);
  const tuples = await Promise.all(
    Array.from({ length: slotCountToRead }, (_, slotIndex) =>
      contract.getPersonalPlot(address, slotIndex) as Promise<[bigint, boolean]>
    )
  );

  return tuples
    .map(([plotIdRaw, occupied], slotIndex) =>
      toSlotState(slotIndex, plotIdRaw, occupied, registryState)
    )
    .filter((slot) => slot.occupied || slot.isExpectedNextSlot);
}

export async function findPersonalPlotSlotByPlotId(
  walletAddress: string,
  plotId: bigint | number | string
): Promise<number | null> {
  let targetPlotId: bigint;

  try {
    targetPlotId = BigInt(plotId);
  } catch {
    return null;
  }

  const slots = await readPersonalPlots(walletAddress);
  const match = slots.find((slot) => slot.occupied && slot.plotId === targetPlotId);
  return typeof match?.slotIndex === "number" ? match.slotIndex : null;
}

export async function readReservationReadiness(
  walletAddress: string,
  slotIndex: number
): Promise<ReservationReadiness> {
  const [registryState, slotState] = await Promise.all([
    readRegistryState(walletAddress),
    readPersonalPlot(walletAddress, slotIndex),
  ]);

  const hasFaction = registryState.chosenFaction !== "none";
  const slotFree = !slotState.occupied && slotState.isExpectedNextSlot;

  return {
    hasCityKey: registryState.hasCityKey,
    hasFaction,
    slotFree,
    ready: registryState.hasCityKey && hasFaction && slotFree,
  };
}

export async function readPlotCore(plotId: bigint | number) {
  const provider = getProvider();
  const contract = getCityRegistryContract(provider);
  const core = (await contract.getPlotCore(plotId)) as PlotCoreStruct;

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

export async function setCityKeyToken(
  tokenId: bigint | number
): Promise<ContractTransactionResponse> {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);

  return contract.setCityKeyToken(tokenId) as Promise<ContractTransactionResponse>;
}

export async function chooseFaction(
  faction: "inpinity" | "inphinity"
): Promise<ContractTransactionResponse> {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);
  const factionValue = faction === "inpinity" ? 1 : 2;

  return contract.chooseFaction(factionValue) as Promise<ContractTransactionResponse>;
}

export async function reserveNextPersonalPlot(
  slotIndex: number
): Promise<ContractTransactionResponse> {
  const provider = getProvider();
  const signer = await provider.getSigner();
  const contract = getCityRegistryContract(signer);

  return contract.reserveNextPersonalPlot(slotIndex) as Promise<ContractTransactionResponse>;
}
