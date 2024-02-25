import { getPublicClient } from "wagmi/actions";
import { config } from "../wagmi";
import { SafeInfo } from "@safe-global/safe-apps-sdk";
import { parseAbi } from "viem";

const publicClient = getPublicClient(config);

export async function getSafuWalletInfo(
  safuAddress: `0x${string}`
): Promise<SafeInfo> {
  const owners = await publicClient.readContract({
    abi: parseAbi(["function getOwners() public view returns (address[])"]),
    functionName: "getOwners",
    address: safuAddress,
  });

  const threshold = await publicClient.readContract({
    abi: parseAbi(["function getThreshold() public view returns (uint256)"]),
    functionName: "getThreshold",
    address: safuAddress,
  });

  return {
    chainId: publicClient.chain.id,
    isReadOnly: false,
    safeAddress: safuAddress,
    owners: owners as string[],
    threshold: Number(threshold),
  };
}
