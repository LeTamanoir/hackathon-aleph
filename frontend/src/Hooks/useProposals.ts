import { useMutation, useQuery } from "@tanstack/react-query";
import { AlephMessage } from "../types/aleph";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { ApiServer, ID } from "../config";
import { post } from "aleph-sdk-ts/dist/messages";
import { Proposal } from "../types/proposal";

async function getProposals({
  address,
}: {
  address: string;
}): Promise<AlephMessage[]> {
  return post
    .Get({
      channels: [`${ID}/multisig/${address}/proposals`],
      types: "proposals",
      APIServer: ApiServer,
    })
    .then((res) => res.posts as AlephMessage[]);
}

function createProposal({
  proposal,
  safe,
}: {
  proposal: Proposal;
  safe: ETHAccount;
}) {
  return post.Publish({
    account: safe,
    postType: "proposals",
    content: { body: proposal },
    channel: `${ID}/multisig/${safe.address}/proposals`,
  });
}

function createSignature({
  proposal,
  signature,
  safe,
}: {
  proposal: Proposal;
  signature: `0x${string}`;
  safe: ETHAccount;
}) {
  return post.Publish({
    account: safe,
    postType: "proposalSignatures",
    content: { body: signature },
    channel: `${ID}/multisig/${safe.address}/proposal/${proposal.tx_hash}`,
  });
}

export default function useProposals(safe: ETHAccount) {
  const { data: proposals, isFetching } = useQuery({
    queryKey: ["proposals", safe.address],
    queryFn: () => getProposals({ address: safe.address }),
  });

  const { mutateAsync: uploadProposal, isPending } = useMutation({
    mutationKey: ["proposals", safe.address],
    mutationFn: (body: { proposal: Proposal; safe: ETHAccount }) =>
      createProposal(body),
  });

  const { mutateAsync: uploadSignature } = useMutation({
    mutationKey: ["signatures", safe.address],
    mutationFn: (body: {
      proposal: Proposal;
      signature: `0x${string}`;
      safe: ETHAccount;
    }) => createSignature(body),
  });

  return { uploadProposal, uploadSignature, proposals, isFetching, isPending };
}
