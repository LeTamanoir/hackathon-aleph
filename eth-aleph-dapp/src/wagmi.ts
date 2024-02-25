import { http, createConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { safe } from "wagmi/connectors";

export const config = createConfig({
  chains: [sepolia],
  connectors: [safe()],
  ssr: true,
  transports: {
    [sepolia.id]: http(
      "https://sepolia.infura.io/v3/3e52871716db4e138a89863489b59c63"
    ),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
