import { useEffect, useRef } from "react";
import { Application, Transaction } from "./types";
import { Methods } from "@safe-global/safe-apps-sdk";
import { WalletClient, parseAbi, zeroAddress, zeroHash } from "viem";
import Transport from "./Transport";
import { usePublicClient } from "wagmi";

export default function Browser({
  multisigAddress,
  client,
  app,
}: {
  multisigAddress: `0x${string}`;
  client: WalletClient;
  app: Application;
}) {
  const ref = useRef<HTMLIFrameElement>(null);

  const publicClient = usePublicClient();

  useEffect(() => {
    const transport = new Transport(ref);

    transport.on(Methods.getTxBySafeTxHash, () => {
      throw new Error("getTxBySafeTxHash not implemented");
    });
    transport.on(Methods.getEnvironmentInfo, () => {
      throw new Error("getEnvironmentInfo not implemented");
    });
    transport.on(Methods.getSafeInfo, () => {
      return {
        chainId: 17000,
        isReadOnly: false,
        safeAddress: multisigAddress,
        owners: ["0x0"],
        threshold: 100,
      };
    });
    transport.on(Methods.getSafeBalances, () => {
      throw new Error("getSafeBalances not implemented");
    });
    transport.on(Methods.rpcCall, () => {
      throw new Error("rpcCall not implemented");
    });
    transport.on(Methods.sendTransactions, async (msg) => {
      const tx = (msg.data.params as any).txs[0];

      const transaction: Transaction = {
        to: tx["to"] ?? zeroAddress,
        value: BigInt(tx["value"] ?? "0"),
        data: tx["data"],
        operation: Number(tx["operation"] ?? "0"),
        safeTxGas: BigInt(tx["safeTxGas"] ?? "0"),
        baseGas: BigInt(tx["baseGas"] ?? "0"),
        gasPrice: BigInt(tx["gasPrice"] ?? "0"),
        gasToken: tx["gasToken"] ?? zeroAddress,
        refundReceiver: tx["refundReceiver"] ?? zeroAddress,
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

      const signature = await client.signMessage({
        account: client.account!,
        message: tx_hash,
      });

      console.log(signature, transaction);

      return zeroHash;
    });
    transport.on(Methods.signMessage, () => {
      throw new Error("signMessage not implemented");
    });
    transport.on(Methods.getOffChainSignature, () => {
      throw new Error("getOffChainSignature not implemented");
    });
    transport.on(Methods.signTypedMessage, () => {
      throw new Error("signTypedMessage not implemented");
    });
    transport.on(Methods.getChainInfo, () => {
      throw new Error("getChainInfo not implemented");
    });
    transport.on(Methods.wallet_getPermissions, () => {
      throw new Error("wallet_getPermissions not implemented");
    });
    transport.on(Methods.wallet_requestPermissions, () => {
      throw new Error("wallet_requestPermissions not implemented");
    });
    transport.on(Methods.requestAddressBook, () => {
      throw new Error("requestAddressBook not implemented");
    });
  }, [multisigAddress, client]);

  return (
    <div className="w-full flex grow p-4 bg-gray-50 border">
      <iframe
        ref={ref}
        allow="clipboard-read; clipboard-write"
        className="w-full grow rounded-md"
        src={app.url}
      />
    </div>
  );
}
