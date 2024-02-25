import { getPublicClient } from "wagmi/actions";
import { config } from "../../wagmi";
import { WalletClient, parseAbi, zeroAddress } from "viem";
import type { SafeInfo } from "@safe-global/safe-apps-sdk";
import { Transaction } from "../../types/transaction";

const publicClient = getPublicClient(config);

export async function getSafeInfo(
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
    operation: Number(tx["operation"] ?? "1"),
    safeTxGas: BigInt(tx["safeTxGas"] ?? "0"),
    baseGas: BigInt(tx["baseGas"] ?? "0"),
    gasPrice: BigInt(tx["gasPrice"] ?? "0"),
    gasToken: (tx["gasToken"] as `0x${string}`) ?? zeroAddress,
    refundReceiver: (tx["refundReceiver"] as `0x${string}`) ?? zeroAddress,
    nonce: BigInt(tx["nonce"] ?? nonce),
  };
}

export async function signProposal({
  safuAddress,
  proposerAddress,
  transaction,
  walletClient,
}: {
  proposerAddress: `0x${string}`;
  safuAddress: `0x${string}`;
  walletClient: WalletClient;
  transaction: Transaction;
}) {
  const tx_hash = await publicClient.readContract({
    abi: parseAbi([
      "function getTransactionHash(address to, uint256 value, bytes data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 nonce) public view returns (bytes32)",
    ]),
    functionName: "getTransactionHash",
    address: safuAddress,
    args: [
      transaction.to,
      transaction.value,
      transaction.data,
      transaction.operation,
      transaction.safeTxGas,
      transaction.baseGas,
      transaction.gasPrice,
      transaction.gasToken,
      transaction.refundReceiver,
      transaction.nonce,
    ],
  });

  const raw_signature = await walletClient.signMessage({
    account: proposerAddress,
    message: { raw: tx_hash },
  });

  const signature = raw_signature
    .replace(/1c$/, "20")
    .replace(/1b$/, "1f") as `0x${string}`;

  return { signature, tx_hash };
}
