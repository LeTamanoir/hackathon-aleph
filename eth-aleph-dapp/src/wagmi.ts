import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [safe()],
  ssr: true,
  transports: {
    [sepolia.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
