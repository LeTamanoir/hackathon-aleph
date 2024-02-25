export enum OperationType {
  Call, // 0
  DelegateCall, // 1
}

export type Transaction = {
  to: `0x${string}`;
  value: bigint;
  data: `0x${string}`;
  operation: OperationType;
  safeTxGas: bigint;
  baseGas: bigint;
  gasPrice: bigint;
  gasToken: `0x${string}`;
  refundReceiver: `0x${string}`;
  nonce: bigint;
};
