import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlephMessage } from "../types/aleph";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { CHANNEL_ID } from "../config";
import { post, forget } from "aleph-sdk-ts/dist/messages";
import { Proposal } from "../types/proposal";
import { wait } from "../utils";
import { getSafuWalletInfo } from "../utils/walletInfo";
import { isAddressEqual } from "viem";

async function _getProposals({
  safuAddress,
}: {
  safuAddress: `0x${string}`;
}): Promise<AlephMessage<Proposal>[]> {
  const proposals = (
    await post.Get({
      channels: [
        `${CHANNEL_ID}/multisig/${safuAddress.toLowerCase()}/proposals`,
      ],
      types: "proposal",
    })
  ).posts as AlephMessage<Proposal>[];

  const { owners } = await getSafuWalletInfo(safuAddress);

  return proposals.filter((proposal) => {
    return !!owners.find((e) =>
      isAddressEqual(e as `0x${string}`, proposal.sender as `0x${string}`)
    );
  });
}

function _deleteProposal({
  message,
  safuAddress,
  account,
}: {
  safuAddress: `0x${string}`;
  account: ETHAccount;
  message: AlephMessage<Proposal>;
}) {
  return forget.Publish({
    account,
    hashes: [message.item_hash],
    channel: `${CHANNEL_ID}/multisig/${safuAddress.toLowerCase()}/proposals`,
  });
}

export async function getSignatures({
  proposal,
  safuAddress,
}: {
  proposal: Proposal;
  safuAddress: `0x${string}`;
}): Promise<AlephMessage<`0x${string}`>[]> {
  const signatures = (
    await post.Get({
      channels: [
        `${CHANNEL_ID}/multisig/${safuAddress}/proposal/${proposal.tx_hash}`,
      ],
      types: "signature",
    })
  ).posts as AlephMessage<`0x${string}`>[];

  const { owners } = await getSafuWalletInfo(safuAddress);

  return signatures.filter((signature) => {
    return !!owners.find((e) =>
      isAddressEqual(e as `0x${string}`, signature.sender as `0x${string}`)
    );
  });
}

function _updateProposal({
  proposal,
  safuAddress,
  message,
  account,
}: {
  proposal: Proposal;
  safuAddress: `0x${string}`;
  message: AlephMessage<Proposal>;
  account: ETHAccount;
}) {
  return post.Publish({
    account,
    postType: "amend",
    ref: message.item_hash,
    content: { body: proposal },
    channel: `${CHANNEL_ID}/multisig/${safuAddress.toLowerCase()}/proposals`,
  });
}

function _createProposal({
  proposal,
  safuAddress,
  account,
}: {
  proposal: Proposal;
  safuAddress: `0x${string}`;
  account: ETHAccount;
}) {
  return post.Publish({
    account,
    postType: "proposal",
    content: { body: proposal },
    channel: `${CHANNEL_ID}/multisig/${safuAddress.toLowerCase()}/proposals`,
  });
}

function _createSignature({
  proposal,
  signature,
  safuAddress,
  account,
}: {
  proposal: Proposal;
  signature: `0x${string}`;
  safuAddress: `0x${string}`;
  account: ETHAccount;
}) {
  return post.Publish({
    account,
    postType: "signature",
    content: { body: signature },
    channel: `${CHANNEL_ID}/multisig/${safuAddress.toLowerCase()}/proposal/${proposal.tx_hash}`,
  });
}

export default function useProposals({
  safuAddress,
}: {
  safuAddress: `0x${string}`;
}) {
  const queryClient = useQueryClient();

  const { data: proposals } = useQuery({
    queryKey: ["proposals", safuAddress],
    queryFn: () => _getProposals({ safuAddress }),
  });

  const { mutateAsync: deleteProposal } = useMutation({
    mutationFn: (body: {
      message: AlephMessage<Proposal>;
      account: ETHAccount;
      safuAddress: `0x${string}`;
    }) => _deleteProposal(body),
    onSuccess: async () => {
      await wait(500);
      queryClient.invalidateQueries({ queryKey: ["proposals", safuAddress] });
    },
  });

  const { mutateAsync: uploadProposal } = useMutation({
    mutationFn: (body: {
      proposal: Proposal;
      account: ETHAccount;
      safuAddress: `0x${string}`;
    }) => _createProposal(body),
    onSuccess: async () => {
      await wait(500);
      queryClient.invalidateQueries({ queryKey: ["proposals", safuAddress] });
    },
  });

  const { mutateAsync: uploadSignature } = useMutation({
    mutationFn: (body: {
      proposal: Proposal;
      signature: `0x${string}`;
      account: ETHAccount;
      safuAddress: `0x${string}`;
    }) => _createSignature(body),
    onSuccess: async () => {
      await wait(500);
      queryClient.invalidateQueries({ queryKey: ["signatures", safuAddress] });
    },
  });

  const { mutateAsync: updateProposal } = useMutation({
    mutationFn: (body: {
      proposal: Proposal;
      safuAddress: `0x${string}`;
      message: AlephMessage<Proposal>;
      account: ETHAccount;
    }) => _updateProposal(body),
    onSuccess: async () => {
      await wait(500);
      queryClient.invalidateQueries({ queryKey: ["proposals", safuAddress] });
    },
  });

  return {
    uploadProposal,
    updateProposal,
    deleteProposal,
    uploadSignature,
    proposals,
  };
}
