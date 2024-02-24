import { useQuery, useMutation } from "@tanstack/react-query";
import { ETHAccount } from "aleph-sdk-ts/dist/accounts/ethereum";
import { getProposals, createProposal } from "./proposals";

const useProposals = (safe: ETHAccount) => {
  const { data: proposals, isFetching } = useQuery({
    queryKey: ["proposals", safe.address],
    queryFn: () => getProposals({ addr: safe.address }),
  });

  const { mutate: uploadProposal, isPending } = useMutation({
    mutationKey: ["proposal", safe.address],
    mutationFn: (body: { msg: string; safe: ETHAccount }) =>
      createProposal(body),
  });

  return { uploadProposal, proposals, isFetching, isPending };
};

export default useProposals;
