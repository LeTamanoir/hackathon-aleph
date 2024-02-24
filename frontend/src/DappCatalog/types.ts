export type Application = {
  name: string;
  url: string;
};

export type Transaction = {
  to: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
  operation: number;
  safeTxGas: bigint;
  baseGas: bigint;
  gasPrice: bigint;
  gasToken: `0x${string}`;
  refundReceiver: `0x${string}`;
  nonce: bigint;
};
