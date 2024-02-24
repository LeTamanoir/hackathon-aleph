import { useEffect, useRef, useState } from "react";
import { Application } from "../../types/application";
import { Methods } from "@safe-global/safe-apps-sdk";
import { WalletClient, zeroHash } from "viem";
import Transport from "./Transport";
import { getSafeInfo, signProposal } from "./safe";
import { LoadingIcon } from "../Icons";
import useProposals from "../../Hooks/useProposals";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { Proposal } from "../../types/proposal";
import AlephIcon from "../Header/AlephIcon";

export default function Browser({
  multisigAddress,
  walletClient,
  ethAccount,
  app,
}: {
  multisigAddress: `0x${string}`;
  walletClient: WalletClient;
  ethAccount: ETHAccount;
  app: Application;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef<HTMLIFrameElement>(null);

  const [status, setStatus] = useState<
    "initial" | "sign_proposal" | "upload_proposal" | "upload_signature"
  >("initial");

  const { uploadProposal, uploadSignature } = useProposals(ethAccount);

  useEffect(() => {
    const transport = new Transport(ref);

    transport.on(Methods.getSafeInfo, async () => {
      return await getSafeInfo(multisigAddress);
    });

    transport.on(Methods.sendTransactions, async (msg) => {
      const tx = (msg.data.params as any).txs[0];

      try {
        // setError(undefined);
        setStatus("sign_proposal");

        const { signature, tx_hash, transaction } = await signProposal({
          proposerAddress: walletClient.account?.address!,
          multisigAddress,
          walletClient,
          tx,
        });

        const proposal: Proposal = { tx_hash, transaction };

        setStatus("upload_proposal");

        await uploadProposal({
          proposal,
          safe: ethAccount,
        });

        setStatus("upload_signature");

        await uploadSignature({
          proposal,
          signature,
          safe: ethAccount,
        });
      } finally {
        setStatus("initial");
      }

      return zeroHash;
    });

    transport.on(Methods.getTxBySafeTxHash, () => void 0);
    transport.on(Methods.getEnvironmentInfo, () => void 0);
    transport.on(Methods.getSafeBalances, () => void 0);
    transport.on(Methods.rpcCall, () => void 0);
    transport.on(Methods.signMessage, () => void 0);
    transport.on(Methods.getOffChainSignature, () => void 0);
    transport.on(Methods.signTypedMessage, () => void 0);
    transport.on(Methods.getChainInfo, () => void 0);
    transport.on(Methods.wallet_getPermissions, () => void 0);
    transport.on(Methods.wallet_requestPermissions, () => void 0);
    transport.on(Methods.requestAddressBook, () => void 0);

    return () => transport.clear();
  }, [multisigAddress]);

  return (
    <div className="w-full flex grow p-2 bg-dark relative">
      {isLoading && (
        <div className="w-full grow flex gap-4 text-white items-center justify-center">
          <LoadingIcon className="size-7" />
          <span className="text-2xl">Loading application</span>
        </div>
      )}
      {status !== "initial" && (
        <div className="absolute left-0 top-0 flex-col w-full h-full backdrop-blur-[2px] bg-dark/20 flex items-center justify-center">
          {status === "sign_proposal" && (
            <div className="bg-dark-light items-center text-lg flex gap-3 p-4 rounded-lg text-white">
              <LoadingIcon className="size-5" /> Signing proposal
            </div>
          )}

          {status === "upload_proposal" && (
            <div className="bg-dark-light items-center text-lg flex gap-3 p-4 rounded-lg text-white">
              <LoadingIcon className="size-5" /> Uploading proposal to
              <div className="flex items-center gap-1">
                <AlephIcon className="size-5" />
                <span className="font-semibold">Aleph.im</span>
              </div>
            </div>
          )}

          {status === "upload_signature" && (
            <div className="bg-dark-light items-center text-lg flex gap-3 p-4 rounded-lg text-white">
              <LoadingIcon className="size-5" /> Uploading proposal signature to
              <div className="flex items-center gap-1">
                <AlephIcon className="size-5" />
                <span className="font-semibold">Aleph.im</span>
              </div>
            </div>
          )}
        </div>
      )}

      <iframe
        onLoad={() => setIsLoading(false)}
        ref={ref}
        allow="clipboard-read; clipboard-write"
        className={`w-full grow rounded-md ${isLoading ? "hidden" : ""}`}
        src={app.url}
      />
    </div>
  );
}
