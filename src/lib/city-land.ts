import {
    BrowserProvider,
    Contract,
    type ContractTransactionResponse,
    type Eip1193Provider,
    type Signer,
  } from "ethers";
  import { CONFIG } from "./config";
  
  export type QubiqReadState = {
    plotId: bigint;
    x: number;
    y: number;
    oilDeposited: bigint;
    lemonsDeposited: bigint;
    ironDeposited: bigint;
    completed: boolean;
    usedAether: boolean;
    lastContributor: string | null;
    completedAt: number | null;
  
    oilRequired: bigint;
    lemonsRequired: bigint;
    ironRequired: bigint;
  
    oilRemaining: bigint;
    lemonsRemaining: bigint;
    ironRemaining: bigint;
  
    completionPercent: number;
    visualState: "empty" | "in-progress" | "complete" | "aether-complete";
  };
  
  export type PlotCompletionState = {
    plotId: bigint;
    completionBps: number;
    completionPercent: number;
    isFullyCompleted: boolean;
  };
  
  const CITY_LAND_ABI = [
    "function getQubiq(uint256 plotId, uint32 x, uint32 y) view returns (tuple(uint256 oilDeposited,uint256 lemonsDeposited,uint256 ironDeposited,bool completed,bool usedAether,address lastContributor,uint64 completedAt))",
    "function contributeQubiq(uint256 plotId, uint32 x, uint32 y, uint256 oilAmount, uint256 lemonsAmount, uint256 ironAmount)",
    "function useAetherOnQubiq(uint256 plotId, uint32 x, uint32 y)",
    "function isPlotFullyCompleted(uint256 plotId) view returns (bool)",
    "function getPlotCompletionBps(uint256 plotId) view returns (uint256)",
    "function completedQubiqCountOf(uint256 plotId) view returns (uint256)",
    "function aetherUsesOf(uint256 plotId) view returns (uint256)",
  ] as const;
  
  const CITY_CONFIG_ABI = [
    "function KEY_QUBIQ_OIL_COST() view returns (bytes32)",
    "function KEY_QUBIQ_LEMONS_COST() view returns (bytes32)",
    "function KEY_QUBIQ_IRON_COST() view returns (bytes32)",
    "function getUintConfig(bytes32 key) view returns (uint256)",
  ] as const;
  
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
  
  export function getCityLandAddress(): string {
    const address = normalizeAddress(CONFIG.cityLandAddress);
    if (!address) {
      throw new Error("Missing VITE_CITY_LAND_ADDRESS.");
    }
    return address;
  }
  
  export function getCityConfigAddress(): string {
    const address = normalizeAddress(CONFIG.cityConfigAddress);
    if (!address) {
      throw new Error("Missing VITE_CITY_CONFIG_ADDRESS.");
    }
    return address;
  }
  
  export function getCityLandContract(providerOrSigner: BrowserProvider | Signer) {
    return new Contract(getCityLandAddress(), CITY_LAND_ABI, providerOrSigner);
  }
  
  export function getCityConfigContract(providerOrSigner: BrowserProvider | Signer) {
    return new Contract(getCityConfigAddress(), CITY_CONFIG_ABI, providerOrSigner);
  }
  
  async function readQubiqCosts() {
    const provider = getProvider();
    const config = getCityConfigContract(provider);
  
    const [oilKey, lemonsKey, ironKey] = await Promise.all([
      config.KEY_QUBIQ_OIL_COST() as Promise<string>,
      config.KEY_QUBIQ_LEMONS_COST() as Promise<string>,
      config.KEY_QUBIQ_IRON_COST() as Promise<string>,
    ]);
  
    const [oilRequired, lemonsRequired, ironRequired] = await Promise.all([
      config.getUintConfig(oilKey) as Promise<bigint>,
      config.getUintConfig(lemonsKey) as Promise<bigint>,
      config.getUintConfig(ironKey) as Promise<bigint>,
    ]);
  
    return {
      oilRequired,
      lemonsRequired,
      ironRequired,
    };
  }
  
  function clampBigintMinZero(value: bigint): bigint {
    return value < 0n ? 0n : value;
  }
  
  function computeCompletionPercent(
    oilDeposited: bigint,
    lemonsDeposited: bigint,
    ironDeposited: bigint,
    oilRequired: bigint,
    lemonsRequired: bigint,
    ironRequired: bigint,
    completed: boolean,
    usedAether: boolean
  ): number {
    if (usedAether || completed) return 100;
  
    const oilPct =
      oilRequired > 0n ? Number((oilDeposited * 10000n) / oilRequired) / 100 : 100;
    const lemonsPct =
      lemonsRequired > 0n ? Number((lemonsDeposited * 10000n) / lemonsRequired) / 100 : 100;
    const ironPct =
      ironRequired > 0n ? Number((ironDeposited * 10000n) / ironRequired) / 100 : 100;
  
    return Math.max(0, Math.min(100, Math.round(Math.min(oilPct, lemonsPct, ironPct))));
  }
  
  function getVisualState(
    completed: boolean,
    usedAether: boolean,
    completionPercent: number
  ): QubiqReadState["visualState"] {
    if (usedAether) return "aether-complete";
    if (completed || completionPercent >= 100) return "complete";
    if (completionPercent > 0) return "in-progress";
    return "empty";
  }
  
  export async function getQubiq(
    plotId: bigint | number,
    x: number,
    y: number
  ): Promise<QubiqReadState> {
    const provider = getProvider();
    const contract = getCityLandContract(provider);
  
    const [rawQubiq, costs] = await Promise.all([
      contract.getQubiq(plotId, x, y) as Promise<{
        oilDeposited: bigint;
        lemonsDeposited: bigint;
        ironDeposited: bigint;
        completed: boolean;
        usedAether: boolean;
        lastContributor: string;
        completedAt: bigint;
      }>,
      readQubiqCosts(),
    ]);
  
    const oilRemaining = clampBigintMinZero(costs.oilRequired - rawQubiq.oilDeposited);
    const lemonsRemaining = clampBigintMinZero(costs.lemonsRequired - rawQubiq.lemonsDeposited);
    const ironRemaining = clampBigintMinZero(costs.ironRequired - rawQubiq.ironDeposited);
  
    const completionPercent = computeCompletionPercent(
      rawQubiq.oilDeposited,
      rawQubiq.lemonsDeposited,
      rawQubiq.ironDeposited,
      costs.oilRequired,
      costs.lemonsRequired,
      costs.ironRequired,
      rawQubiq.completed,
      rawQubiq.usedAether
    );
  
    return {
      plotId: BigInt(plotId),
      x,
      y,
      oilDeposited: rawQubiq.oilDeposited,
      lemonsDeposited: rawQubiq.lemonsDeposited,
      ironDeposited: rawQubiq.ironDeposited,
      completed: rawQubiq.completed,
      usedAether: rawQubiq.usedAether,
      lastContributor:
        rawQubiq.lastContributor &&
        rawQubiq.lastContributor !== "0x0000000000000000000000000000000000000000"
          ? rawQubiq.lastContributor
          : null,
      completedAt:
        rawQubiq.completedAt && rawQubiq.completedAt > 0n
          ? Number(rawQubiq.completedAt)
          : null,
  
      oilRequired: costs.oilRequired,
      lemonsRequired: costs.lemonsRequired,
      ironRequired: costs.ironRequired,
  
      oilRemaining,
      lemonsRemaining,
      ironRemaining,
  
      completionPercent,
      visualState: getVisualState(
        rawQubiq.completed,
        rawQubiq.usedAether,
        completionPercent
      ),
    };
  }
  
  export async function getPlotCompletionState(
    plotId: bigint | number
  ): Promise<PlotCompletionState> {
    const provider = getProvider();
    const contract = getCityLandContract(provider);
  
    const [completionBpsRaw, isFullyCompleted] = await Promise.all([
      contract.getPlotCompletionBps(plotId) as Promise<bigint>,
      contract.isPlotFullyCompleted(plotId) as Promise<boolean>,
    ]);
  
    const completionBps = Number(completionBpsRaw);
    const completionPercent = Math.max(
      0,
      Math.min(100, Number((completionBps / 100).toFixed(2)))
    );
  
    return {
      plotId: BigInt(plotId),
      completionBps,
      completionPercent,
      isFullyCompleted,
    };
  }
  
  export async function getPlotCompletionBps(
    plotId: bigint | number
  ): Promise<number> {
    const state = await getPlotCompletionState(plotId);
    return state.completionBps;
  }
  
  export async function isPlotFullyCompleted(
    plotId: bigint | number
  ): Promise<boolean> {
    const state = await getPlotCompletionState(plotId);
    return state.isFullyCompleted;
  }
  
  export async function contributeQubiq(args: {
    plotId: bigint | number;
    x: number;
    y: number;
    oilAmount: bigint | number;
    lemonsAmount: bigint | number;
    ironAmount: bigint | number;
  }): Promise<ContractTransactionResponse> {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contract = getCityLandContract(signer);
  
    return contract.contributeQubiq(
      args.plotId,
      args.x,
      args.y,
      args.oilAmount,
      args.lemonsAmount,
      args.ironAmount
    ) as Promise<ContractTransactionResponse>;
  }
  
  export async function useAetherOnQubiq(args: {
    plotId: bigint | number;
    x: number;
    y: number;
  }): Promise<ContractTransactionResponse> {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const contract = getCityLandContract(signer);
  
    return contract.useAetherOnQubiq(
      args.plotId,
      args.x,
      args.y
    ) as Promise<ContractTransactionResponse>;
  }