import { BrowserProvider, Contract, type Eip1193Provider } from "ethers";
import { CONFIG } from "./config";

export type CityKeyOption = {
  tokenId: string;
  label: string;
};

const ERC721_ENUMERABLE_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
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

function getInpinityNftAddress(): string {
  const address = CONFIG.inpinityNftAddress;
  if (!address) {
    throw new Error("Missing VITE_INPINITY_NFT_ADDRESS.");
  }
  return address;
}

export async function readOwnedCityKeys(walletAddress: string): Promise<CityKeyOption[]> {
  const provider = getProvider();
  const contract = new Contract(
    getInpinityNftAddress(),
    ERC721_ENUMERABLE_ABI,
    provider
  );

  const balance = await contract.balanceOf(walletAddress);
  const count = Number(balance);

  const tokenIds = await Promise.all(
    Array.from({ length: count }, (_, index) =>
      contract.tokenOfOwnerByIndex(walletAddress, index) as Promise<bigint>
    )
  );

  return tokenIds.map((tokenId) => {
    const tokenIdString = tokenId.toString();
    return {
      tokenId: tokenIdString,
      label: `City Key #${tokenIdString}`,
    };
  });
}
