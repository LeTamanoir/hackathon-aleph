import { useQuery } from "@tanstack/react-query";
import { GetAccountFromProvider } from "aleph-sdk-ts/dist/accounts/ethereum";

export default function useAccount() {
  const { data: ethAccount } = useQuery({
    queryKey: ["ethAccount"],
    queryFn: () => GetAccountFromProvider(window.ethereum),
  });

  return { ethAccount };
}
