import { WalletClient, parseAbi } from "viem";
import { Transaction } from "../types/transaction";
import { getPublicClient } from "wagmi/actions";
import { config } from "../wagmi";

const publicClient = getPublicClient(config);

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
