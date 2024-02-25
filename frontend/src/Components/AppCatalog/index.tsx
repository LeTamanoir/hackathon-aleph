import { useState } from "react";
import applications from "../../../dapp-catalog.json";
import { Application } from "../../types/application";
import Browser from "./Browser";
import { useWalletClient } from "wagmi";
import useAccount from "../../Hooks/useAccount";
import ConnectWallet from "../ConnectWallet";

export default function AppCatalog({
  safuAddress,
}: {
  safuAddress: `0x${string}`;
}) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);

  const { data: walletClient } = useWalletClient();

  const { account } = useAccount();

  if (!walletClient || !account) {
    return <ConnectWallet />;
  }

  if (selectedApp && walletClient && account) {
    return (
      <Browser
        account={account}
        safuAddress={safuAddress}
        walletClient={walletClient}
        app={selectedApp}
      />
    );
  }

  return (
    <div className="flex grow flex-col gap-10 my-10 px-28">
      <header>
        <h2 className="text-white font-neue text-2xl">App catalog</h2>
        <p className="text-white">
          Browse the list of available applications and interact with them using
          your SAFU wallet.
        </p>
      </header>

      <div className="grid grid-cols-3">
        {applications.map((app, idx) => {
          return (
            <button
              className="flex flex-col gap-4 p-4 rounded-lg bg-dark border-dark-lighter/20 border hover:bg-dark/70 transition-colors"
              onClick={() => setSelectedApp(app)}
              key={idx}
            >
              <img src={app.icon} alt={app.name} className="size-14" />
              <h3 className="text-white font-neue text-xl">{app.name}</h3>
              <p className="text-left text-gray-100">{app.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
