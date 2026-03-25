import type { Eip1193Provider } from "ethers";

import { BASE_NETWORK, CONFIG } from "./config";

type RequestArguments = {
  method: string;
  params?: unknown[] | object;
};

type WalletListener = (...args: any[]) => void;

export type InjectedEthereum = Eip1193Provider & {
  request: (args: RequestArguments) => Promise<unknown>;
  on?: (event: string, listener: WalletListener) => void;
  removeListener?: (event: string, listener: WalletListener) => void;
};

export type InjectedWalletState = {
  isConnected: boolean;
  address: string | null;
  chainId: number | null;
};

function parseChainId(value: string | number | null | undefined): number | null {
  if (value == null) return null;
  if (typeof value === "number") return Number.isFinite(value) ? value : null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("0x")) {
    const parsed = Number.parseInt(trimmed, 16);
    return Number.isFinite(parsed) ? parsed : null;
  }

  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export function normalizeAddress(value?: string | null): string {
  return (value || "").trim().toLowerCase();
}

export function getInjectedEthereum(): InjectedEthereum | null {
  return ((window as Window & { ethereum?: InjectedEthereum }).ethereum || null);
}

export async function readInjectedWalletState(): Promise<InjectedWalletState> {
  const ethereum = getInjectedEthereum();

  if (!ethereum) {
    return {
      isConnected: false,
      address: null,
      chainId: null,
    };
  }

  const [accountsRaw, chainIdRaw] = await Promise.all([
    ethereum.request({ method: "eth_accounts" }),
    ethereum.request({ method: "eth_chainId" }),
  ]);

  const accounts = Array.isArray(accountsRaw) ? accountsRaw : [];
  const address =
    typeof accounts[0] === "string" && accounts[0].trim() ? accounts[0] : null;

  return {
    isConnected: !!address,
    address,
    chainId: parseChainId(chainIdRaw as string | number | null),
  };
}

export async function connectInjectedWallet(): Promise<InjectedWalletState> {
  const ethereum = getInjectedEthereum();

  if (!ethereum) {
    throw new Error("No injected wallet found. Please install MetaMask or another EVM wallet.");
  }

  await ethereum.request({ method: "eth_requestAccounts" });
  return readInjectedWalletState();
}

function getSwitchErrorCode(error: unknown): number | null {
  if (
    typeof error === "object" &&
    error != null &&
    "code" in error &&
    typeof (error as { code?: unknown }).code === "number"
  ) {
    return (error as { code: number }).code;
  }

  return null;
}

export async function switchToConfiguredChain(): Promise<boolean> {
  const ethereum = getInjectedEthereum();

  if (!ethereum) {
    return false;
  }

  const current = await readInjectedWalletState();
  if (current.chainId === CONFIG.chainId) {
    return true;
  }

  try {
    await ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: BASE_NETWORK.chainIdHex }],
    });
  } catch (error) {
    const code = getSwitchErrorCode(error);

    if (code !== 4902) {
      throw error;
    }

    await ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: BASE_NETWORK.chainIdHex,
          chainName: BASE_NETWORK.chainName,
          nativeCurrency: BASE_NETWORK.nativeCurrency,
          rpcUrls: [...BASE_NETWORK.rpcUrls],
          blockExplorerUrls: [...BASE_NETWORK.blockExplorerUrls],
        },
      ],
    });
  }

  const next = await readInjectedWalletState();
  return next.chainId === CONFIG.chainId;
}

export function subscribeWalletEvents(handlers: {
  onAccountsChanged?: () => void;
  onChainChanged?: () => void;
  onDisconnect?: () => void;
}): () => void {
  const ethereum = getInjectedEthereum();

  if (!ethereum?.on || !ethereum.removeListener) {
    return () => {};
  }

  const handleAccountsChanged = () => handlers.onAccountsChanged?.();
  const handleChainChanged = () => handlers.onChainChanged?.();
  const handleDisconnect = () => handlers.onDisconnect?.();

  ethereum.on("accountsChanged", handleAccountsChanged);
  ethereum.on("chainChanged", handleChainChanged);
  ethereum.on("disconnect", handleDisconnect);

  return () => {
    ethereum.removeListener?.("accountsChanged", handleAccountsChanged);
    ethereum.removeListener?.("chainChanged", handleChainChanged);
    ethereum.removeListener?.("disconnect", handleDisconnect);
  };
}
