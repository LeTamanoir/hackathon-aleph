import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { AlephMessage } from "../type";
import useProposalSignatures from "./useProposalSignatures";

const IndexProposalSignatures = ({
  safe,
  proposal,
}: {
  safe: ETHAccount;
  proposal: AlephMessage;
}) => {
  const { uploadProposalSignature, proposalSignatures, isFetching } =
    useProposalSignatures(proposal);
  return (
    <div>
      <button
        onClick={() => uploadProposalSignature({ msg: "Hello world", safe })}
      >
        Create Proposal Signature
      </button>
      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <div>
          {proposalSignatures?.map((post) => JSON.stringify(post.content))}
        </div>
      )}
    </div>
  );
};

export default IndexProposalSignatures;
