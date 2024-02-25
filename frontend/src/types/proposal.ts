import { Transaction } from "./transaction";

export type Proposal = {
  tx_hash: `0x${string}`;
  transaction: Transaction;
  submitted_tx_hash?: `0x${string}`; // present only if the proposal has been executed
};
