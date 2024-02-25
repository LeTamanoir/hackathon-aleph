"use client";

import { useAccount, useWalletClient } from "wagmi";
import { ETH_ALEPH_CONTRACT } from "../config";
import { parseAbi } from "viem";
import { useCallback, useState } from "react";
import AlephIcon from "./logo";
import Loader from "./Loader";
import Send from "./Send";
import { useMutation, useQuery } from "@tanstack/react-query";

function App() {
  const account = useAccount();

  const [message, setMessage] = useState("");

  const { data: walletClient } = useWalletClient();

  const onSendMessage = useCallback(async () => {
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
  }, [walletClient, message]);

  const { data, isPending, mutate } = useMutation({
    mutationKey: ["sendMessage"],
    mutationFn: () => onSendMessage(),
  });

  return (
    <>
      <div className="w-full p-10">
        <div className="hover:scale-110 duration-500">
          <AlephIcon className="w-20 h-20 mx-auto" />
          <h2 className="text-center text-3xl font-bold text-blue-500 drop-shadow-lg select-none">
            Ethereum Aleph Dapp
          </h2>
        </div>
        <div className="h-10" />
        <div className="w-96 m-auto">
          {account && (
            <div>
              <h3 className="text-xl font-bold text-gray-300 text-center">
                Account
              </h3>
              <p>{account.chainId}</p>
            </div>
          )}
          {!account && <Loader />}
          <br />
        </div>

        <div>
          <div className="flex items-center justify-center">
            <div className="w-6"></div>
            <input
              placeholder="Message"
              className="rounded w-1/4 p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div
              onClick={() => {
                mutate();
              }}
              className="hover:scale-125 duration-200 cursor-pointer"
            >
              {isPending ? <Loader /> : <Send />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
