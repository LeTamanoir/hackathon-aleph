import { useQuery } from "@tanstack/react-query";
import { GetAccountFromProvider } from "aleph-sdk-ts/dist/accounts/ethereum";
import { holesky } from "viem/chains";

export default function useAccount() {
  const { data: account } = useQuery({
    queryKey: ["GetAccountFromProvider"],
    queryFn: () =>
      GetAccountFromProvider(window.ethereum, {
        chainId: holesky.id.toString(),
        blockExplorerUrls: [holesky.blockExplorers.default.url],
        chainName: holesky.name,
        nativeCurrency: holesky.nativeCurrency,
        rpcUrls: [holesky.rpcUrls.default.http[0]],
      }),
  });

  return { account };
}
