export interface AlephMessage {
  chain: string;
  item_hash: string;
  sender: string;
  type: string;
  channel: string;
  confirmed: boolean;
  content: { body: Record<string, unknown> };
  item_content: string;
  item_type: string;
  signature: string;
  size: number;
  time: number;
  original_item_hash: string;
  original_signature: string;
  original_type: string;
  hash: string;
  address: string;
}
