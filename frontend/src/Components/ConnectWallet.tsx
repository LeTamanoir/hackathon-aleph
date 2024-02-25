import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useAccount as useWagmiAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";
import useAccount from "../Hooks/useAccount";
import { LoadingIcon } from "./Icons";

export default function ConnectWallet({
  safuAddress,
  onSetSafuAddress,
}: {
  safuAddress: string | "none";
  onSetSafuAddress: (w: string) => void;
}) {
  const { address } = useWagmiAccount();
  const { deploySafuWallet, isSafuWalletDeployPending } = useAccount();
  const { connect } = useConnect();

  const [owners, setOwners] = useState("");
  const [threshold, setThreshold] = useState(1);

  async function onCreateSafuWallet(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const wallet = await deploySafuWallet({ owners, threshold });

    onSetSafuAddress(await wallet.getAddress());
  }

  if (address && safuAddress !== "none") {
    return <Outlet />;
  }

  if (safuAddress === "none") {
    return (
      <div className="flex flex-col grow items-center gap-20 justify-center">
        <p className="text-white font-xl">
          You need to select a SAFU {"{wallet}"} to use this app.
        </p>

        <form
          className="flex flex-col w-full gap-6 max-w-lg p-5 bg-dark-light rounded-lg"
          onSubmit={onCreateSafuWallet}
        >
          <p className="text-xl text-white">Create a new SAFU {"{wallet}"}</p>

          <div className="flex flex-col gap-2">
            <label htmlFor="owners" className="text-white">
              List of owners:{" "}
              <span className="text-xs text-gray-300">
                {"("}coma separated{")"}
              </span>
            </label>
            <input
              value={owners}
              onChange={(e) => setOwners(e.target.value)}
              id="owners"
              name="owners"
              type="text"
              className="p-2 rounded-lg border border-dark bg-white"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="threshold" className="text-white">
              Threshold:{" "}
              <span className="text-xs text-gray-300">
                {"(" + threshold + ")"}
              </span>
            </label>
            <input
              id="threshold"
              name="threshold"
              type="range"
              min={1}
              max={owners.split(",").length}
              value={threshold}
              onChange={(e) => setThreshold(parseInt(e.target.value))}
            />
          </div>

          {isSafuWalletDeployPending ? (
            <div className="flex justify-center items-center gap-3 text-lg text-gray-200">
              <LoadingIcon className="size-5" />
              Creating SAFU {"{wallet}"}
            </div>
          ) : (
            <input
              id="owners"
              name="owners"
              type="submit"
              value="Create SAFU {wallet}"
              className="text-lg self-center cursor-pointer bg-blue-600 rounded-lg px-2 py-1 hover:bg-blue-700 transition-colors"
            />
          )}
        </form>
      </div>
    );
  }

  return (
    <div className="flex flex-col grow items-center gap-5 justify-center">
      <button
        className="text-xl bg-blue-600 rounded-lg p-3 hover:bg-blue-700 transition-colors"
        onClick={() => connect({ connector: injected() })}
      >
        Connect Wallet
      </button>

      <p className="text-white font-xl">
        You need to connect your wallet to use this app.
      </p>
    </div>
  );
}
