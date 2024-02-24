import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { WalletClient } from "viem";
import useProposals from "../../Hooks/useProposals";

export default function TxList({
  ethAccount,
  multisigAddress,
  walletClient,
}: {
  ethAccount: ETHAccount;
  multisigAddress: `0x${string}`;
  walletClient: WalletClient;
}) {
  const { proposals } = useProposals(ethAccount);

  console.log(proposals);

  return (
    <div>
      {proposals?.map((proposal) => {
        return (
        //   <div key={proposal.content.body}>
        //     <p>{proposal.transaction}</p>
        //   </div>
        );
      }) ?? (
        <div>
          <p>No proposals found</p>
        </div>
      )}
    </div>
  );
}
