import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { post } from "aleph-sdk-ts/dist/messages";
import { APIServer, AlephMessage, id } from "../type";

export interface GetProposalsQueryParams {
  addr: string;
  tx_hash: string;
}

export interface CreateProposalSignatureDto {
  msg: string;
  tx_hash: string;
  safe: ETHAccount;
}

const proposalSignaturesChannelId = ({
  addr,
  tx_hash,
}: GetProposalsQueryParams): string =>
  `${id}/multisig/${addr}/proposal/${tx_hash}`;

export const getProposalSignatures = async (
  params: GetProposalsQueryParams
): Promise<AlephMessage[]> =>
  post
    .Get({
      channels: [proposalSignaturesChannelId(params)],
      types: "proposalSignatures",
      APIServer,
    })
    .then((res) => res.posts) as Promise<AlephMessage[]>;

export const createProposalSignature = async ({
  msg,
  tx_hash,
  safe,
}: CreateProposalSignatureDto) =>
  post.Publish({
    account: safe,
    postType: "proposalSignatures",
    content: { body: msg },
    channel: proposalSignaturesChannelId({ addr: safe.address, tx_hash }),
  });
