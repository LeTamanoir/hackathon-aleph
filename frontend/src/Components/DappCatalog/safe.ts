import { getPublicClient } from "wagmi/actions";
import { config } from "../../wagmi";
import { WalletClient, parseAbi, zeroAddress } from "viem";
import type { SafeInfo } from "@safe-global/safe-apps-sdk";
import { Transaction } from "../../types/transaction";

const publicClient = getPublicClient(config);

export async function getSafeInfo(
  multisigAddress: `0x${string}`
): Promise<SafeInfo> {
  const owners = await publicClient.readContract({
    abi: parseAbi(["function getOwners() public view returns (address[])"]),
    functionName: "getOwners",
    address: multisigAddress,
  });

  const threshold = await publicClient.readContract({
    abi: parseAbi(["function getThreshold() public view returns (uint256)"]),
    functionName: "getThreshold",
    address: multisigAddress,
  });

  return {
    chainId: publicClient.chain.id,
    isReadOnly: false,
    safeAddress: multisigAddress,
    owners: owners as string[],
    threshold: Number(threshold),
  };
}

export async function signProposal({
  multisigAddress,
  proposerAddress,
  tx,
  walletClient,
}: {
  proposerAddress: `0x${string}`;
  multisigAddress: `0x${string}`;
  walletClient: WalletClient;
  tx: Record<string, string>;
}) {
  const transaction: Transaction = {
    to: (tx["to"] as `0x${string}`) ?? zeroAddress,
    value: BigInt(tx["value"] ?? "0"),
    data: tx["data"] as `0x${string}`,
    operation: Number(tx["operation"] ?? "0"),
    safeTxGas: BigInt(tx["safeTxGas"] ?? "0"),
    baseGas: BigInt(tx["baseGas"] ?? "0"),
    gasPrice: BigInt(tx["gasPrice"] ?? "0"),
    gasToken: (tx["gasToken"] as `0x${string}`) ?? zeroAddress,
    refundReceiver: (tx["refundReceiver"] as `0x${string}`) ?? zeroAddress,
    nonce: BigInt(tx["nonce"] ?? "0"),
  };

  const tx_hash = await publicClient.readContract({
    abi: parseAbi([
      "function getTransactionHash(address to, uint256 value, bytes calldata data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, uint256 _nonce) public view returns (bytes32)",
    ]),
    functionName: "getTransactionHash",
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
    address: multisigAddress,
  });

  const signature = await walletClient.signMessage({
    account: proposerAddress,
    message: tx_hash,
  });

  return { signature, tx_hash, transaction };
}
