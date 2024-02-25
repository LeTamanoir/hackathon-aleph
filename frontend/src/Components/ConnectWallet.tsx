import { Outlet } from "react-router-dom";
import { useAccount as useWagmiAccount, useConnect } from "wagmi";
import { injected } from "wagmi/connectors";

export default function ConnectWallet({
  safuAddress,
}: {
  safuAddress: string | "none";
}) {
  const { address } = useWagmiAccount();

  const { connect } = useConnect();

  if (address && safuAddress !== "none") {
    return <Outlet />;
  }

  if (safuAddress === "none") {
    return (
      <div className="flex flex-col grow items-center gap-20 justify-center">
        <p className="text-white font-xl">
          You need to select a SAFU {"{wallet}"} to use this app.
        </p>
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
