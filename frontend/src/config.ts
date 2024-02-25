import { keccak256 } from "viem";
import { config } from "./wagmi";

export const CHANNEL_ID = keccak256(
  `0x${config.chains[0].name}-aleph-multisig`
);

export const SAFU_PROXY_ADDRESS = "0x4e1DCf7AD4e460CfD30791CCC4F9c8a4f820ec67";

export const GNOSIS_SAFE_SINGLETON =
  "0x29fcB43b46531BcA003ddC8FCB67FFE91900C762";
