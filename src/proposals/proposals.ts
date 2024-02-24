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
    content: {
      body: {
        tx_hash:
          "0xcaef14016d1c62d32730abe53c8117ae5e5d6179511565e79aec4b5029d3b0b8", // this is a random tx_hash from google used for sampling
      },
    },
    channel: proposalsChannelId(safe.address),
  });
