import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import {
  WalletClient,
  bytesToBigInt,
  concat,
  formatEther,
  hexToBigInt,
  parseAbi,
} from "viem";
import useProposals, { getSignatures } from "../../Hooks/useProposals";
import useSignatures from "../../Hooks/useSignatures";
import { Proposal } from "../../types/proposal";
import { AlephMessage } from "../../types/aleph";
import { LoadingIcon } from "../Icons";
import { useTransactionReceipt } from "wagmi";
import { signProposal } from "../../utils/signer";
import { useQuery } from "@tanstack/react-query";
import { getSafuWalletInfo } from "../../utils/walletInfo";

function TxRow({
  message,
  account,
  onSign,
  onDelete,
  safuAddress,
  onExec,
}: {
  account: ETHAccount;
  message: AlephMessage<Proposal>;
  safuAddress: `0x${string}`;
  onDelete: () => void;
  onSign: () => Promise<void>;
  onExec: () => Promise<void>;
}) {
  const proposal = message.content.body;

  const { data: safuInfo } = useQuery({
    queryKey: ["getSafuWalletInfo", safuAddress],
    queryFn: () => getSafuWalletInfo(safuAddress),
  });

  const { signatures, deleteSignature } = useSignatures({
    proposal,
    safuAddress,
  });

  const { data } = useTransactionReceipt({ hash: proposal.submitted_tx_hash });

  const hasAlreadySigned = signatures?.some(
    (s) => s.sender === account.address
  );
  const signatureFromUser = signatures?.find(
    (s) => s.sender === account.address
  );

  const signedTxCount = signatures?.length;

  function onDeleteSignature() {
    if (!signatureFromUser) return;
    deleteSignature({
      account,
      message: signatureFromUser,
      safuAddress,
    });
  }

  const isTxSubmitted = data !== undefined;

  return (
    <div className="bg-dark-lighter p-4 flex flex-col gap-3 rounded-lg border-dark">
      {isTxSubmitted && (
        <div className="flex flex-col gap-0.5 mb-2">
          {data.status === "success" ? (
            <span className="text-blue-700 text-lg">Transaction success</span>
          ) : (
            <span className="text-red-700 text-lg">Transaction reverted</span>
          )}
          <a
            className="hover:underline text-sm"
            target="_blank"
            rel="noreferrer"
            href={`http://holesky.etherscan.io/tx/${proposal.submitted_tx_hash}`}
          >
            {proposal.submitted_tx_hash}
          </a>
        </div>
      )}

      <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-0.5">
        <div className="shrink-0 text-gray-700">Value:</div>
        <div className="truncate text-xl overflow-hidden">
          {Number(formatEther(proposal.transaction.value)).toFixed(4)} ETH
        </div>

        <div className="shrink-0 text-gray-700">Nonce:</div>
        <div>{proposal.transaction.nonce.toString()}</div>

        <div className="shrink-0 text-gray-700">To:</div>
        <div className="truncate overflow-hidden">
          <a
            className="hover:underline"
            target="_blank"
            rel="noreferrer"
            href={`http://holesky.etherscan.io/address/${proposal.transaction.to}`}
          >
            {proposal.transaction.to}
          </a>
        </div>

        <div className="shrink-0 text-gray-700">Transaction hash:</div>
        <div className="truncate overflow-hidden">{proposal.tx_hash}</div>
      </div>

      {!isTxSubmitted && (
        <div className="flex gap-2 items-center">
          {hasAlreadySigned ? (
            <>
              {signedTxCount === safuInfo?.threshold && (
                <button
                  className="px-2 py-1 text-white rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors"
                  onClick={onExec}
                >
                  Exec
                </button>
              )}
              <div className="text-xs">
                {signedTxCount} / {safuInfo?.threshold} signatures
              </div>

              <button
                className="px-1.5 py-0.5 text-sm ml-auto border text-red-600 hover:bg-red-100 transition-colors border-red-500 rounded-lg bg-red-50"
                onClick={onDeleteSignature}
              >
                Delete signature
              </button>
            </>
          ) : (
            <>
              <button
                className="px-2 py-1 text-white rounded-lg bg-dark-light hover:bg-dark/90 transition-colors"
                onClick={onSign}
              >
                Sign
              </button>
              <div className="text-xs mr-auto">
                {signedTxCount} / {safuInfo?.threshold} signatures
              </div>
            </>
          )}

          <button
            className="px-1.5 py-0.5 text-sm border text-red-600 hover:bg-red-100 transition-colors border-red-500 rounded-lg bg-red-50"
            onClick={onDelete}
          >
            Delete proposal
          </button>
        </div>
      )}
    </div>
  );
}

export default function TxList({
  account,
  safuAddress,
  walletClient,
}: {
  account: ETHAccount;
  safuAddress: `0x${string}`;
  walletClient: WalletClient;
}) {
  const { proposals, deleteProposal, updateProposal, uploadSignature } =
    useProposals({
      safuAddress,
    });

  async function onSignProposal(message: AlephMessage<Proposal>) {
    const proposal = message.content.body;

    const { signature } = await signProposal({
      proposerAddress: walletClient.account?.address!,
      safuAddress,
      walletClient,
      transaction: proposal.transaction,
    });

    await uploadSignature({ proposal, signature, account, safuAddress });
  }

  async function onExecTransaction(message: AlephMessage<Proposal>) {
    const proposal = message.content.body;

    const signatures = (await getSignatures({ proposal, safuAddress })).map(
      (e) => e.content.body
    );

    const sortedSignatures = signatures.sort(
      (a, b) => Number(hexToBigInt(a)) - Number(hexToBigInt(b))
    );

    const tx_hash = await walletClient.writeContract({
      abi: parseAbi([
        "function execTransaction(address to, uint256 value, bytes data, uint8 operation, uint256 safeTxGas, uint256 baseGas, uint256 gasPrice, address gasToken, address refundReceiver, bytes signatures) public payable returns (bool success)",
      ]),
      functionName: "execTransaction",
      account: account.address as `0x${string}`,
      args: [
        proposal.transaction.to,
        proposal.transaction.value,
        proposal.transaction.data,
        proposal.transaction.operation,
        proposal.transaction.safeTxGas,
        proposal.transaction.baseGas,
        proposal.transaction.gasPrice,
        proposal.transaction.gasToken,
        proposal.transaction.refundReceiver,
        concat(sortedSignatures),
      ],
      address: safuAddress,
      chain: walletClient.chain,
    });

    await updateProposal({
      account,
      message,
      safuAddress,
      proposal: {
        ...proposal,
        submitted_tx_hash: tx_hash,
      },
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {proposals === undefined ? (
        <div className="flex items-center gap-3 text-lg text-gray-500">
          <LoadingIcon className="size-5" />
          Loading proposals
        </div>
      ) : proposals.length === 0 ? (
        <div className="text-gray-200">
          No active or passed proposals to show.
        </div>
      ) : (
        proposals.map((message, idx) => (
          <TxRow
            account={account}
            onSign={() => onSignProposal(message)}
            onExec={() => onExecTransaction(message)}
            onDelete={() => deleteProposal({ account, message, safuAddress })}
            safuAddress={safuAddress}
            message={message}
            key={idx}
          />
        ))
      )}
    </div>
  );
}
