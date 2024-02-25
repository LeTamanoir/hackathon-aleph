import { http, createConfig } from "wagmi";
import { holesky } from "wagmi/chains";
import { safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [holesky],
  connectors: [safe()],
  ssr: true,
  transports: {
    [holesky.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
