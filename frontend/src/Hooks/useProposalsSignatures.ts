import { useQuery, useMutation } from "@tanstack/react-query";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { post } from "aleph-sdk-ts/dist/messages";
import { ApiServer, ID } from "../config";
import { AlephMessage } from "../types/aleph";
import { Proposal } from "../types/proposal";

export interface GetProposalsQueryParams {
  addr: string;
  tx_hash: string;
}

export const getProposalSignatures = async ({
  addr,
  tx_hash,
}: {
  addr: string;
  tx_hash: string;
}): Promise<AlephMessage[]> =>
  post
    .Get({
      channels: [`${ID}/multisig/${addr}/proposal/${tx_hash}`],
      types: "proposalSignatures",
      APIServer: ApiServer,
    })
    .then((res) => res.posts as AlephMessage[]);

export const createProposalSignature = async ({
  msg,
  tx_hash,
  safe,
}: {
  msg: string;
  tx_hash: string;
  safe: ETHAccount;
}) =>
  post.Publish({
    account: safe,
    postType: "proposalSignatures",
    content: { body: msg },
    channel: `${ID}/multisig/${safe.address}/proposal/${tx_hash}`,
  });

export default function useProposalsSignatures(proposal: AlephMessage) {
  console.log(proposal.content.body);

  const proposalMessage = proposal.content.body as Proposal;

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
}
