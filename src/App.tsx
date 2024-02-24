import { useCallback, useState } from "react";
import {
  ETHAccount,
  GetAccountFromProvider,
} from "aleph-sdk-ts/dist/accounts/ethereum";
import { AlephMessage } from "./type";
import IndexProposals from "./proposals";
import IndexProposalSignatures from "./proposal-signatures";

const useAlephAccount = () => {
  const [account, setAccount] = useState<ETHAccount>();

  const onConnect = useCallback(async () => {
    GetAccountFromProvider(window.ethereum).then((res) => setAccount(res));
  }, []);

  return { account, onConnect };
};

function App() {
  const { account, onConnect } = useAlephAccount();
  const [proposal, setProposal] = useState<AlephMessage>();

  return (
    <>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button style={{ margin: "16px" }} type="button" onClick={onConnect}>
          Connect
        </button>
      </div>
      {account && (
        <IndexProposals safe={account} onChangeProposal={setProposal} />
      )}
      {proposal && account && (
        <IndexProposalSignatures safe={account} proposal={proposal} />
      )}
    </>
  );
}

export default App;
