import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { post } from "aleph-sdk-ts/dist/messages";
import { APIServer, AlephMessage, id } from "../type";

const proposalsChannelId = (addr: string): string =>
  `${id}/multisig/${addr}/proposals`;

export interface GetProposalsQueryParams {
  addr: string;
}
export interface CreateProposalDto {
  msg: string;
  safe: ETHAccount;
}

export const getProposals = async ({
  addr,
}: GetProposalsQueryParams): Promise<AlephMessage[]> =>
  post
    .Get({
      channels: [proposalsChannelId(addr)],
      types: "proposals",
      APIServer,
    })
    .then((res) => res.posts) as Promise<AlephMessage[]>;

export const createProposal = async ({ msg, safe }: CreateProposalDto) =>
  post.Publish({
    account: safe,
    postType: "proposals",
    content: { body: msg },
    channel: proposalsChannelId(safe.address),
  });
