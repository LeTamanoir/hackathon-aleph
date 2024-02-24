import { http, createConfig } from "wagmi";
import { holesky } from "wagmi/chains";
import { injected } from "wagmi/connectors";

export const config = createConfig({
  chains: [holesky],
  connectors: [injected()],
  transports: {
    [holesky.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
