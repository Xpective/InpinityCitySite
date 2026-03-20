import {
    BrowserProvider,
    Contract,
    type ContractTransactionReceipt,
    type ContractTransactionResponse,
    type Eip1193Provider,
  } from "ethers";
  import { CONFIG } from "./config";
  import {
    chooseFaction,
    readPersonalPlot,
    readRegistryState,
    reserveNextPersonalPlot,
    setCityKeyToken,
    type CityFactionUi,
    type RegistryReadState,
  } from "./city-registry";
  import {
    contributeQubiq,
    getPlotCompletionState,
    type PlotCompletionState,
  } from "./city-land";
  import type { ResourceEligibility } from "./resource-check";
  
  export type QubiqFlowStep =
    | "idle"
    | "validate"
    | "prepare"
    | "reserve"
    | "approve"
    | "contribute"
    | "refresh"
    | "done"
    | "error";
  
  export type QubiqFlowCode =
    | "ok"
    | "needs_wallet"
    | "wrong_chain"
    | "needs_city_key"
    | "needs_faction"
    | "needs_personal_plot"
    | "plot_not_ready"
    | "needs_resource_approval"
    | "insufficient_resources"
    | "missing_resource_requirements"
    | "reservation_sent"
    | "approval_sent"
    | "contribution_sent"
    | "unexpected_error";
  
  export type QubiqFlowResult = {
    ok: boolean;
    code: QubiqFlowCode;
    step: QubiqFlowStep;
    message: string;
    txHash?: string;
    plotId?: bigint | null;
    slotIndex?: number;
    faction?: CityFactionUi;
    completion?: PlotCompletionState | null;
  };
  
  export type RunQubiqFlowArgs = {
    walletAddress: string;
    slotIndex: number;
    cityKeyTokenId?: bigint | number | null;
    desiredFaction?: "inpinity" | "inphinity" | null;
    qubiqX: number;
    qubiqY: number;
    resourceEligibility?: ResourceEligibility | null;
  };
  
  const BASE_CHAIN_ID = Number((CONFIG.chainId || 8453).toString().trim());
  const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
  
  const RESOURCE_TOKEN_ABI = [
    "function isApprovedForAll(address account, address operator) view returns (bool)",
    "function setApprovalForAll(address operator, bool approved)",
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
  
  function getCityLandAddress(): string {
    const address = (CONFIG.cityLandAddress || "").trim();
    if (!address) {
      throw new Error("Missing VITE_CITY_LAND_ADDRESS.");
    }
    return address;
  }
  
  async function getWalletRuntime() {
    const provider = getProvider();
    const signer = await provider.getSigner();
    const walletAddress = normalizeAddress(await signer.getAddress());
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
  
    return {
      provider,
      signer,
      walletAddress,
      chainId,
    };
  }
  
  async function readResourceTokenAddress(): Promise<string> {
    const cityConfigAddress = (CONFIG.cityConfigAddress || "").trim();
    if (!cityConfigAddress) {
      throw new Error("Missing VITE_CITY_CONFIG_ADDRESS.");
    }
  
    const CITY_CONFIG_ABI = [
      "function KEY_RESOURCE_TOKEN() view returns (bytes32)",
      "function getAddressConfig(bytes32 key) view returns (address)",
    ] as const;
  
    const provider = getProvider();
    const contract = new Contract(cityConfigAddress, CITY_CONFIG_ABI, provider);
  
    const key = (await contract.KEY_RESOURCE_TOKEN()) as string;
    const tokenAddress = (await contract.getAddressConfig(key)) as string;
  
    if (!tokenAddress || tokenAddress === ZERO_ADDRESS) {
      throw new Error("Resource token is not configured in CityConfig.");
    }
  
    return tokenAddress;
  }
  
  async function isResourceApprovedForCityLand(walletAddress: string): Promise<boolean> {
    const provider = getProvider();
    const resourceTokenAddress = await readResourceTokenAddress();
    const resourceToken = new Contract(resourceTokenAddress, RESOURCE_TOKEN_ABI, provider);
  
    return (await resourceToken.isApprovedForAll(
      normalizeAddress(walletAddress),
      getCityLandAddress()
    )) as boolean;
  }
  
  export async function approveResourcesForCityLand(): Promise<ContractTransactionResponse> {
    const { signer } = await getWalletRuntime();
    const resourceTokenAddress = await readResourceTokenAddress();
    const resourceToken = new Contract(resourceTokenAddress, RESOURCE_TOKEN_ABI, signer);
  
    return resourceToken.setApprovalForAll(
      getCityLandAddress(),
      true
    ) as Promise<ContractTransactionResponse>;
  }
  
  async function waitForReceipt(
    tx: ContractTransactionResponse
  ): Promise<ContractTransactionReceipt | null> {
    return tx.wait();
  }
  
  function getRequiredResourcesFromEligibility(resourceEligibility?: ResourceEligibility | null) {
    if (!resourceEligibility) {
      throw new Error("Resource requirement check is not loaded yet.");
    }
  
    return {
      oil: resourceEligibility.required.oil,
      lemons: resourceEligibility.required.lemons,
      iron: resourceEligibility.required.iron,
    };
  }
  
  async function ensureWalletAndChain(expectedWalletAddress: string): Promise<QubiqFlowResult | null> {
    const runtime = await getWalletRuntime();
  
    if (!runtime.walletAddress) {
      return {
        ok: false,
        code: "needs_wallet",
        step: "validate",
        message: "Wallet not connected.",
      };
    }
  
    if (
      normalizeAddress(runtime.walletAddress).toLowerCase() !==
      normalizeAddress(expectedWalletAddress).toLowerCase()
    ) {
      return {
        ok: false,
        code: "needs_wallet",
        step: "validate",
        message: "Connected wallet does not match the expected wallet address.",
      };
    }
  
    if (runtime.chainId !== BASE_CHAIN_ID) {
      return {
        ok: false,
        code: "wrong_chain",
        step: "validate",
        message: `Wallet is connected to chain ${runtime.chainId}, expected Base (${BASE_CHAIN_ID}).`,
      };
    }
  
    return null;
  }
  
  export async function inspectQubiqFlowReadiness(args: {
    walletAddress: string;
    slotIndex: number;
  }): Promise<{
    registry: RegistryReadState;
    slot: Awaited<ReturnType<typeof readPersonalPlot>>;
    approved: boolean;
  }> {
    const [registry, slot, approved] = await Promise.all([
      readRegistryState(args.walletAddress),
      readPersonalPlot(args.walletAddress, args.slotIndex),
      isResourceApprovedForCityLand(args.walletAddress),
    ]);
  
    return {
      registry,
      slot,
      approved,
    };
  }
  
  export async function runQubiqContributionFlow(
    args: RunQubiqFlowArgs
  ): Promise<QubiqFlowResult> {
    try {
      const walletCheck = await ensureWalletAndChain(args.walletAddress);
      if (walletCheck) return walletCheck;
  
      if (args.resourceEligibility && !args.resourceEligibility.ready) {
        return {
          ok: false,
          code: "insufficient_resources",
          step: "validate",
          message: "Not enough resources for the next Qubiq contribution.",
        };
      }
  
      let registry = await readRegistryState(args.walletAddress);
  
      if (!registry.hasCityKey) {
        if (args.cityKeyTokenId == null) {
          return {
            ok: false,
            code: "needs_city_key",
            step: "prepare",
            message: "No City Key is linked yet. Set a city key token first.",
          };
        }
  
        const tx = await setCityKeyToken(args.cityKeyTokenId);
        await waitForReceipt(tx);
  
        registry = await readRegistryState(args.walletAddress);
  
        return {
          ok: true,
          code: "ok",
          step: "prepare",
          txHash: tx.hash,
          message: "City Key token has been linked. Run the flow again to continue.",
        };
      }
  
      if (registry.chosenFaction === "none") {
        if (!args.desiredFaction) {
          return {
            ok: false,
            code: "needs_faction",
            step: "prepare",
            message: "No faction chosen yet. Choose Inpinity or Inphinity first.",
          };
        }
  
        const tx = await chooseFaction(args.desiredFaction);
        await waitForReceipt(tx);
  
        registry = await readRegistryState(args.walletAddress);
  
        return {
          ok: true,
          code: "ok",
          step: "prepare",
          txHash: tx.hash,
          faction: registry.chosenFaction,
          message: `Faction ${args.desiredFaction} has been chosen. Run the flow again to continue.`,
        };
      }
  
      let slotState = await readPersonalPlot(args.walletAddress, args.slotIndex);
  
      if (!slotState.occupied) {
        if (!slotState.isExpectedNextSlot) {
          return {
            ok: false,
            code: "plot_not_ready",
            step: "reserve",
            slotIndex: args.slotIndex,
            message: "This slot is not the next expected personal slot.",
          };
        }
  
        const reserveTx = await reserveNextPersonalPlot(args.slotIndex);
        await waitForReceipt(reserveTx);
  
        slotState = await readPersonalPlot(args.walletAddress, args.slotIndex);
  
        return {
          ok: true,
          code: "reservation_sent",
          step: "reserve",
          txHash: reserveTx.hash,
          slotIndex: args.slotIndex,
          plotId: slotState.plotId,
          faction: registry.chosenFaction,
          message: "Personal plot reserved successfully. Run the flow again to contribute to the first Qubiq.",
        };
      }
  
      if (!slotState.plotId) {
        return {
          ok: false,
          code: "needs_personal_plot",
          step: "reserve",
          slotIndex: args.slotIndex,
          message: "No personal plot found for this slot.",
        };
      }
  
      const approved = await isResourceApprovedForCityLand(args.walletAddress);
      if (!approved) {
        const approvalTx = await approveResourcesForCityLand();
        await waitForReceipt(approvalTx);
  
        return {
          ok: true,
          code: "approval_sent",
          step: "approve",
          txHash: approvalTx.hash,
          plotId: slotState.plotId,
          slotIndex: args.slotIndex,
          faction: registry.chosenFaction,
          message: "Resource approval granted for CityLand. Run the flow again to contribute the Qubiq.",
        };
      }
  
      let required: { oil: bigint; lemons: bigint; iron: bigint };
      try {
        required = getRequiredResourcesFromEligibility(args.resourceEligibility);
      } catch (error) {
        return {
          ok: false,
          code: "missing_resource_requirements",
          step: "validate",
          message: error instanceof Error ? error.message : "Missing resource requirements.",
        };
      }
  
      const contributeTx = await contributeQubiq({
        plotId: slotState.plotId,
        x: args.qubiqX,
        y: args.qubiqY,
        oilAmount: required.oil,
        lemonsAmount: required.lemons,
        ironAmount: required.iron,
      });
  
      await waitForReceipt(contributeTx);
  
      const completion = await getPlotCompletionState(slotState.plotId);
  
      return {
        ok: true,
        code: "contribution_sent",
        step: "refresh",
        txHash: contributeTx.hash,
        plotId: slotState.plotId,
        slotIndex: args.slotIndex,
        faction: registry.chosenFaction,
        completion,
        message: "Qubiq contribution successful.",
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected Qubiq flow error.";
  
      return {
        ok: false,
        code: "unexpected_error",
        step: "error",
        message,
      };
    }
  }
  
  export async function getDefaultQubiqCoordinates(): Promise<{ x: number; y: number }> {
    return { x: 0, y: 0 };
  }