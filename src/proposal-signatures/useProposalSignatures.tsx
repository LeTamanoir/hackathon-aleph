import { useQuery, useMutation } from "@tanstack/react-query";
import { AlephMessage } from "../type";
import {
  getProposalSignatures,
  createProposalSignature,
} from "./proposalSignatures";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";

const useProposalSignatures = (proposal: AlephMessage) => {
  console.log(proposal.content.body);
  // @ts-ignore - this is a hack to get the tx_hash from the proposal message, must type it with a proper type containing the other infos
  const proposalMessage: { tx_hash: string } = proposal.content.body;

  const { data: proposalSignatures, isFetching } = useQuery({
    queryKey: ["proposalSignatures", proposal.sender, proposalMessage.tx_hash],
    queryFn: () =>
      getProposalSignatures({
        addr: proposal.sender,
        tx_hash: proposalMessage.tx_hash,
      }),
  });

  const { mutate: uploadProposalSignature, isPending } = useMutation({
    mutationKey: [
      "proposalSignature",
      proposal.sender,
      proposalMessage.tx_hash,
    ],
    mutationFn: ({ safe, msg }: { msg: string; safe: ETHAccount }) =>
      createProposalSignature({ safe, msg, tx_hash: proposalMessage.tx_hash }),
  });

  return { uploadProposalSignature, proposalSignatures, isFetching, isPending };
};

export default useProposalSignatures;
