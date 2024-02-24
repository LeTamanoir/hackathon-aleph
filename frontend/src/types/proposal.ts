import { Transaction } from "./transaction";

export type Proposal = {
  tx_hash: `0x${string}`;
  transaction: Transaction;
};
