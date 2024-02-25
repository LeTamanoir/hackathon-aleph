import { useQuery } from "@tanstack/react-query";
import { GetAccountFromProvider } from "aleph-sdk-ts/dist/accounts/ethereum";
import { holesky } from "viem/chains";
import { useAccount as useWagmiAccount } from "wagmi";
import { config } from "../wagmi";
import { getPublicClient } from "wagmi/actions";
import { isAddressEqual, parseAbi } from "viem";
import { SAFU_PROXY_ADDRESS } from "../config";

const publicClient = getPublicClient(config);

async function getDeployments(execAddress: `0x${string}`) {
  const blockNumber = await publicClient.getBlockNumber();

  const eventFilter = await publicClient.createContractEventFilter({
    abi: parseAbi(["event ProxyCreation(address proxy, address singleton)"]),
    address: SAFU_PROXY_ADDRESS,
    eventName: "ProxyCreation",
    fromBlock: blockNumber - 10_000n,
    toBlock: "latest",
  });

  const logs = await publicClient.getFilterLogs({ filter: eventFilter });

  const safuWallets = logs.map((log) => {
    return log.topics[1]?.replace(/^0x000000000000000000000000/, "0x")!;
  }) as `0x${string}`[];

  const queue = safuWallets.map(async (safuAddress) => {
    return await publicClient.readContract({
      abi: parseAbi(["function getOwners() public view returns (address[])"]),
      functionName: "getOwners",
      address: safuAddress,
    });
  });

  const owners = await Promise.all(queue);

  return safuWallets.filter((_, idx) => {
    return !!owners[idx].find((e) => isAddressEqual(e, execAddress));
  });
}
export default function useAccount() {
  const { address: execAccount } = useWagmiAccount();

  const { data: account } = useQuery({
    queryKey: ["GetAccountFromProvider", execAccount],
    queryFn: () =>
      GetAccountFromProvider(window.ethereum, {
        chainId: holesky.id.toString(),
        blockExplorerUrls: [holesky.blockExplorers.default.url],
        chainName: holesky.name,
        nativeCurrency: holesky.nativeCurrency,
        rpcUrls: [holesky.rpcUrls.default.http[0]],
      }),
  });

  const { data: availableSafuWallets } = useQuery({
    queryKey: ["GetDeployments", execAccount],
    queryFn: () => getDeployments(execAccount!),
    enabled: !!execAccount,
  });

  return { account, availableSafuWallets };
}
