import { useQuery, useMutation } from "@tanstack/react-query";
import { AlephMessage } from "../type";
import {
  getProposalSignatures,
  createProposalSignature,
} from "./proposalSignatures";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";

const useProposalSignatures = (proposal: AlephMessage) => {
  const proposalMessage: { tx_hash: string } = JSON.parse(
    proposal.content.body
  );

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
