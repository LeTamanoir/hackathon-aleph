"use client";

import { useAccount, useWalletClient } from "wagmi";
import { ETH_ALEPH_CONTRACT } from "../config";
import { parseAbi } from "viem";
import { useState } from "react";

function App() {
  const account = useAccount();

  const [message, setMessage] = useState("");

  const { data: walletClient } = useWalletClient();

  async function onSendMessage() {
    if (!walletClient) return;

    const tx_hash = await walletClient.writeContract({
      abi: parseAbi([
        "function doMessage(string msgtype, string msgcontent) public",
      ]),
      address: ETH_ALEPH_CONTRACT,
      functionName: "doMessage",
      args: ["POST", message],
    });

    return tx_hash;
  }

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={onSendMessage}>Send message</button>
      </div>
    </>
  );
}

export default App;
