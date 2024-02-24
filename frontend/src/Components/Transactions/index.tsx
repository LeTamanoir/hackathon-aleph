import { useWalletClient } from "wagmi";
import useAccount from "../../Hooks/useAccount";
import TxList from "./TxList";

export default function Transactions({
  multisigAddress,
}: {
  multisigAddress: `0x${string}`;
}) {
  const { data: walletClient } = useWalletClient();

  const { ethAccount } = useAccount();

  if (!walletClient || !ethAccount) {
    return <div>Connect your wallet</div>;
  }

  return (
    <div className="flex grow flex-col gap-10 my-10 px-28">
      <header>
        <h2 className="text-white font-neue text-2xl">Transactions</h2>
        <p className="text-white">
          Review the latest proposals of your SAFU wallet or browser passed
          transactions.
        </p>
      </header>

      {walletClient && ethAccount && (
        <TxList
          ethAccount={ethAccount}
          multisigAddress={multisigAddress}
          walletClient={walletClient}
        />
      )}
    </div>
  );
}
