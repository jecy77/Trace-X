// src/data/dummyGraphData.ts

export type NodeType = {
  address: string;
  label: "swap" | "bridge" | "transfer" | string;
  chain: string;
  type: "EOA" | "CA" | string;
  isWarning: boolean;
  description?: string;
};

export type EdgeType = {
  source: string;
  target: string;
  type: "transfer" | "swap" | "bridge" | string;
  asset: string;
  amount: string;
  txHash: string;
  timeStamp: string;
};

export type GraphData = {
  nodes: NodeType[];
  edges: EdgeType[];
};

export const dummyGraphData: GraphData = {
  nodes: [
    {
      address: "0xAAA",
      label: "transfer",
      chain: "ETH",
      type: "EOA",
      isWarning: true,
      description: "",
    },
    {
      address: "0xBBB",
      label: "transfer",
      chain: "ETH",
      type: "EOA",
      isWarning: false,
      description: "",
    },
    {
      address: "0xUNI",
      label: "transfer",
      chain: "ETH",
      type: "CA",
      isWarning: true,
      description: "개 위험함!!!!!",
    },
    {
      address: "0xBRIDGE",
      label: "bridge",
      chain: "ETH",
      type: "CA",
      isWarning: false,
      description: "",
    },
    {
      address: "0xCCC",
      label: "swap",
      chain: "TRON",
      type: "CA",
      isWarning: true,
      description: "",
    },
  ],
  edges: [
    {
      source: "0xAAA",
      target: "0xUNI",
      type: "swap",
      asset: "ETH",
      amount: "10",
      txHash: "0x111...",
      timeStamp: "2023-10-01T12:00:00Z",
    },
    {
      source: "0xUNI",
      target: "0xBBB",
      type: "transfer",
      asset: "USDC",
      amount: "1500",
      txHash: "0x111...",
      timeStamp: "2023-10-01T12:00:00Z",
    },
    {
      source: "0xBBB",
      target: "0xBRIDGE",
      type: "bridge",
      asset: "USDC",
      amount: "500",
      txHash: "0x222...",
      timeStamp: "2023-10-01T12:00:00Z",
    },
    {
      source: "0xBRIDGE",
      target: "0xCCC",
      type: "transfer",
      asset: "USDC",
      amount: "500",
      txHash: "0x222...",
      timeStamp: "2023-10-01T12:00:00Z",
    },
  ],
};
