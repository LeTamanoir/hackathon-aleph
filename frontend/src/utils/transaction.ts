import { parseAbi, zeroAddress } from "viem";
import { OperationType, Transaction } from "../types/transaction";
import { config } from "../wagmi";
import { getPublicClient } from "wagmi/actions";

const publicClient = getPublicClient(config);

export async function parseRawTransaction(
  safuAddress: `0x${string}`,
  tx: Record<string, string>
): Promise<Transaction> {
  const nonce = await publicClient.readContract({
    abi: parseAbi(["function nonce() public view returns (uint256)"]),
    functionName: "nonce",
    address: safuAddress,
  });

  return {
    to: (tx["to"] as `0x${string}`) ?? zeroAddress,
    value: BigInt(tx["value"] ?? "0"),
    data: tx["data"] as `0x${string}`,
    operation: Number(tx["operation"] ?? OperationType.Call),
    safeTxGas: BigInt(tx["safeTxGas"] ?? "0"),
    baseGas: BigInt(tx["baseGas"] ?? "0"),
    gasPrice: BigInt(tx["gasPrice"] ?? "0"),
    gasToken: (tx["gasToken"] as `0x${string}`) ?? zeroAddress,
    refundReceiver: (tx["refundReceiver"] as `0x${string}`) ?? zeroAddress,
    nonce: BigInt(tx["nonce"] ?? nonce),
  };
}
