import { useState } from "react";
import applications from "../../dapp-catalog.json";
import { Application } from "./types";
import Browser from "./Browser";
import { useWalletClient } from "wagmi";

export default function DappCatalog({
  multisigAddress
}:{
  multisigAddress: `0x${string}`
}) {
  const [selectedApp, setSelectedApp] = useState<Application | null>(
    applications[0]
  );



  const { data: client } = useWalletClient();

  return (
    <div className="flex grow flex-col gap-2">
      <div className="flex gap-4">
        {applications.map((app, idx) => {
          return (
            <button onClick={() => setSelectedApp(app)} key={idx}>
              test {app.name}
            </button>
          );
        })}
      </div>

      {client ? (
        selectedApp && <Browser multisigAddress={multisigAddress} client={client} app={selectedApp} />
      ) : (
        <div>Connect your wallet</div>
      )}
    </div>
  );
}
