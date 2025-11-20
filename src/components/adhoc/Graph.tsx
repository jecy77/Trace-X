import { useMemo } from "react";
import ReactFlow, { Handle, MarkerType, Position, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

/* =========================================================
   타입 정의
========================================================= */

export type BackendNode = {
  id: string;
  address: string;
  label?: string;
  isContract?: boolean;
  chain_id?: number;
  risk?: any;
};

export type BackendEdge = {
  from_address: string;
  to_address: string;
  amount: string;
  timestamp?: number | string;
  token_symbol?: string;
  tx_type?: string;
};

export type GraphData = {
  nodes: BackendNode[];
  edges: BackendEdge[];
};

/* =========================================================
   더미 데이터 (fallback)
========================================================= */

const fallbackDummy: GraphData = {
  nodes: [
    { id: "root", address: "0xROOT", label: "Root EOA", isContract: false },
    { id: "bridgeA", address: "0xBRIDGE_A", label: "LayerZero Bridge" },
    { id: "bridgeB", address: "0xBRIDGE_B", label: "Polygon Bridge" },
    { id: "child1", address: "0xC1", label: "EOA User C1" },
    {
      id: "child2",
      address: "0xC2",
      label: "Smart Contract C2",
      isContract: true,
    },
    { id: "child3", address: "0xC3", label: "EOA Wallet C3" },
    { id: "child4", address: "0xC4", label: "EOA Wallet C4" },
    {
      id: "child5",
      address: "0xC5",
      label: "Contract Worker C5",
      isContract: true,
    },
  ],

  edges: [
    {
      from_address: "0xROOT",
      to_address: "0xBRIDGE_A",
      amount: "1400",
      timestamp: 1761821111,
      token_symbol: "USDT",
      tx_type: "bridge_transfer",
    },
    {
      from_address: "0xROOT",
      to_address: "0xBRIDGE_B",
      amount: "900",
      timestamp: 1761822222,
      token_symbol: "USDC",
      tx_type: "layerzero_bridge",
    },
    {
      from_address: "0xBRIDGE_A",
      to_address: "0xC1",
      amount: "700",
      timestamp: 1761823333,
      token_symbol: "ETH",
      tx_type: "erc20_transfer",
    },
    {
      from_address: "0xC1",
      to_address: "0xC2",
      amount: "350",
      timestamp: 1761824444,
      token_symbol: "ETH",
      tx_type: "contract_call",
    },
    {
      from_address: "0xC1",
      to_address: "0xC3",
      amount: "200",
      timestamp: 1761825555,
      token_symbol: "DAI",
      tx_type: "erc20_transfer",
    },
    {
      from_address: "0xBRIDGE_B",
      to_address: "0xC4",
      amount: "450",
      timestamp: 1761826666,
      token_symbol: "MATIC",
      tx_type: "erc20_transfer",
    },
    {
      from_address: "0xC4",
      to_address: "0xC5",
      amount: "220",
      timestamp: 1761827777,
      token_symbol: "USDT",
      tx_type: "contract_call",
    },
  ],
};

/* =========================================================
   브릿지 감지
========================================================= */

const isBridgeNode = (node: BackendNode, edges: BackendEdge[]) => {
  const low = (v?: string) => (v ? v.toLowerCase() : "");

  if (low(node.label).includes("bridge")) return true;
  if (low(node.address).includes("bridge")) return true;

  const connected = edges.filter(
    (e) => e.from_address === node.address || e.to_address === node.address
  );
  return connected.some((e) => low(e.tx_type).includes("bridge"));
};

/* =========================================================
   Custom Node
========================================================= */

const CustomNode = ({ data }: any) => (
  <div
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: data.isWarning ? "2px solid #ff4d4f" : "1px solid #3a3f58",
      background: "#0f1629",
      color: "#fff",
      fontSize: 12,
    }}
  >
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />
    <div>{data.address}</div>
    <div style={{ fontSize: 11, opacity: 0.7 }}>
      {data.label} · {data.type}
    </div>
  </div>
);

/* =========================================================
   Dagre Layout
========================================================= */

const layout = (nodes: Node[], edges: Edge[]) => {
  const g = new dagre.graphlib.Graph();
  g.setDefaultEdgeLabel(() => ({}));
  g.setGraph({
    rankdir: "LR",
    ranksep: 120,
    nodesep: 80,
    edgesep: 30,
  });

  nodes.forEach((n) => g.setNode(n.id, { width: 200, height: 50 }));
  edges.forEach((e) => g.setEdge(e.source, e.target));

  dagre.layout(g);

  return {
    nodes: nodes.map((n) => {
      const pos = g.node(n.id);
      return {
        ...n,
        position: { x: pos.x, y: pos.y },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
    }),
    edges,
  };
};

/* =========================================================
   MAIN (백엔드 호출 제거)
========================================================= */

export default function Graph({ data }: { data?: GraphData | null }) {
  const graph = data && data.nodes?.length ? data : fallbackDummy;

  /* ---------- 노드 ---------- */
  const nodes = useMemo<Node[]>(() => {
    return graph.nodes.map((n) => {
      const bridge = isBridgeNode(n, graph.edges);

      return {
        id: n.id,
        type: "customNode",
        data: {
          address: n.address,
          label: n.label ?? "Unknown",
          type: bridge ? "Bridge" : n.isContract ? "Contract" : "EOA",
          isWarning: bridge,
        },
        position: { x: 0, y: 0 },
      };
    });
  }, [graph]);

  /* ---------- 엣지 ---------- */
  const edges = useMemo<Edge[]>(() => {
    const formatTS = (ts: any) => {
      if (!ts) return "";
      const d = new Date(typeof ts === "number" ? ts * 1000 : ts);
      return d.toISOString().replace("T", " ").substring(0, 19);
    };

    return graph.edges.map((e, i) => ({
      id: `edge-${i}`,
      source: graph.nodes.find((n) => n.address === e.from_address)?.id ?? "",
      target: graph.nodes.find((n) => n.address === e.to_address)?.id ?? "",
      style: { stroke: "#767676", strokeWidth: 2 },
      markerEnd: { type: MarkerType.Arrow, color: "#767676" },
      label: `⏱ ${formatTS(e.timestamp)} | ${e.token_symbol ?? ""} · ${
        e.amount
      }`,
      labelStyle: { fill: "#fff", fontSize: 10 },
      labelBgStyle: { fill: "rgba(89, 89, 89, 0.32)", borderRadius: 4 },
      labelBgPadding: [6, 4],
    }));
  }, [graph]);

  const layouted = useMemo(() => layout(nodes, edges), [nodes, edges]);

  const bridgeNodes = nodes.filter((n) => n.data.type === "Bridge");

  return (
    <div
      style={{
        width: "100%",
        height: "85vh",
        marginTop: 30,
        position: "relative",
      }}
    >
      <ReactFlow
        nodes={layouted.nodes}
        edges={layouted.edges}
        nodeTypes={{ customNode: CustomNode }}
        fitView
        proOptions={{ hideAttribution: true }}
        style={{ background: "transparent" }}
      />

      {/* 브릿지 버튼 출력 */}
      <div
        style={{
          position: "absolute",
          right: 20,
          bottom: 40,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {bridgeNodes.map((b) => (
          <button
            key={b.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 14px",
              borderRadius: "8px",
              background: "#233157",
              border: "1px solid #0B1739",
              color: "#FFFFFF",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
            onClick={() => console.log("브릿지 탐색:", b.data.address)}
          >
            <span style={{ color: "#7e9eff" }}>
              {b.data.label || b.data.address} 탐색하기
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
