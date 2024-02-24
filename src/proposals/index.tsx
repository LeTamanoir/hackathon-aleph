import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { AlephMessage } from "../type";
import useProposals from "./useProposals";

const IndexProposals = ({
  safe,
  onChangeProposal,
}: {
  safe: ETHAccount;
  onChangeProposal: (value: AlephMessage) => void;
}) => {
  const { uploadProposal, proposals, isFetching } = useProposals(safe);

  return (
    <div>
      <button onClick={() => uploadProposal({ msg: "Hello world", safe })}>
        Create Proposal
      </button>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          {proposals?.map((post) => (
            <button onClick={() => onChangeProposal(post)}>
              {/* @ts-ignore */}
              {post.content.body.tx_hash}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default IndexProposals;
