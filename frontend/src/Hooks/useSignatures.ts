import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlephMessage } from "../types/aleph";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { ApiServer, ID } from "../config";
import { post, forget } from "aleph-sdk-ts/dist/messages";
import { Proposal } from "../types/proposal";
import { getSafeInfo } from "../Components/AppCatalog/safe";
import { wait } from "../utils";

function forgetSignature({
  message,
  safuAddress,
  account,
}: {
  safuAddress: `0x${string}`;
  account: ETHAccount;
  message: AlephMessage<Proposal>;
}) {
  const proposal = message.content.body;

  return forget.Publish({
    account,
    hashes: [message.item_hash],
    channel: `${ID}/multisig/${safuAddress}/proposal/${proposal.tx_hash}`,
  });
}

export async function getSignatures({
  proposal,
  safuAddress,
}: {
  proposal: Proposal;
  safuAddress: `0x${string}`;
}): Promise<AlephMessage<Proposal>[]> {
  const signatures = (
    await post.Get({
      channels: [`${ID}/multisig/${safuAddress}/proposal/${proposal.tx_hash}`],
      types: "signature",
      APIServer: ApiServer,
    })
  ).posts as AlephMessage<Proposal>[];

  const { owners } = await getSafeInfo(safuAddress);

  return signatures.filter((signature) => {
    return owners.includes(signature.sender);
  });
}

export default function useSignatures({
  proposal,
  safuAddress,
}: {
  proposal: Proposal;
  safuAddress: `0x${string}`;
}) {
  const queryClient = useQueryClient();

  const { data: signatures } = useQuery({
    queryKey: ["signatures", safuAddress],
    queryFn: () => getSignatures({ safuAddress, proposal }),
  });

  const { mutateAsync: deleteSignature } = useMutation({
    mutationFn: (body: {
      safuAddress: `0x${string}`;
      account: ETHAccount;
      message: AlephMessage<Proposal>;
    }) => forgetSignature(body),
    onSuccess: async () => {
      await wait(500);
      queryClient.invalidateQueries({ queryKey: ["signatures", safuAddress] });
    },
  });

  return { signatures, deleteSignature };
}
