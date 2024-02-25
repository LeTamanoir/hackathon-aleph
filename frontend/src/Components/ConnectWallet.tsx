import { useConnect } from "wagmi";
import { getPublicClient } from "wagmi/actions";
import { config } from "../wagmi";

const publicClient = getPublicClient(config);

export default function ConnectWallet() {
  const { connectAsync, connectors } = useConnect();

  return (
    <div className="flex flex-col grow items-center gap-5 justify-center">
      <button
        className="text-xl bg-blue-600 rounded-lg p-3 hover:bg-blue-700 transition-colors"
        onCanPlay={() =>
          connectAsync({
            connector: connectors[0],
            chainId: publicClient.chain.id,
          })
        }
      >
        Connect Wallet
      </button>

      <p className="text-white font-xl">
        You need to connect your wallet to use this app.
      </p>
    </div>
  );
}
