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
   확장된 더미 데이터
========================================================= */

const dummyData: GraphData = {
  nodes: [
    { id: "root", address: "0xROOT", label: "Root EOA", isContract: false },

    // ─────────────── BRIDGE NODES (2개만) ───────────────
    {
      id: "bridgeA",
      address: "0xBRIDGE_A",
      label: "LayerZero Bridge",
      isContract: false,
    },
    {
      id: "bridgeB",
      address: "0xBRIDGE_B",
      label: "Polygon Bridge",
      isContract: false,
    },

    // ─────────────── CHILD NODES ───────────────
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
    // root → bridges
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

    // Bridge A Layer
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

    // Bridge B Layer
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
   브릿지 감지 강화
========================================================= */

const isBridgeNode = (node: BackendNode, edges: BackendEdge[]) => {
  const low = (v?: string) => (v ? v.toLowerCase() : "");

  // 1) label 기반
  if (low(node.label).includes("bridge")) return true;

  // 2) address 기반
  if (low(node.address).includes("bridge")) return true;

  // 3) tx_type 기반
  const connected = edges.filter(
    (e) => e.from_address === node.address || e.to_address === node.address
  );

  if (connected.some((e) => low(e.tx_type).includes("bridge"))) return true;

  return false;
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
    align: "UL",

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
   MAIN COMPONENT
========================================================= */

export default function Graph({ data }: { data?: GraphData }) {
  const graph = data && data.nodes?.length > 0 ? data : dummyData;

  /* ---------------- 노드 ---------------- */
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

  /* ---------------- 엣지 ---------------- */
  const edges = useMemo<Edge[]>(() => {
    // 타임스탬프 포맷 함수 추가
    const formatTS = (ts: number | string | undefined) => {
      if (!ts) return "";

      const date = typeof ts === "number" ? new Date(ts * 1000) : new Date(ts);

      // yyyy-MM-dd HH:mm:ss 형태로 변환
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hour = String(date.getHours()).padStart(2, "0");
      const min = String(date.getMinutes()).padStart(2, "0");
      const sec = String(date.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    };

    return graph.edges.map((e, i) => {
      const ts = formatTS(e.timestamp);

      return {
        id: `edge-${i}`,
        source: graph.nodes.find((n) => n.address === e.from_address)?.id ?? "",
        target: graph.nodes.find((n) => n.address === e.to_address)?.id ?? "",
        style: { stroke: "#767676", strokeWidth: 2, zIndex: 10 },
        markerEnd: { type: MarkerType.Arrow, color: "#767676" },
        label: `⏱ ${ts} | ${e.token_symbol ?? ""} · ${e.amount}`,
        labelStyle: { fill: "#fff", fontSize: 10 },
        labelBgStyle: {
          fill: "rgba(89, 89, 89, 0.323)",
          borderRadius: 4,
        },
        labelBgPadding: [6, 4],
      };
    });
  }, [graph]);

  /* ---------------- Layout 적용 ---------------- */
  const layouted = useMemo(() => layout(nodes, edges), [nodes, edges]);

  /* ---------------- 브릿지 노드 리스트 ---------------- */
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

      {/* 브릿지별 버튼 출력 */}
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

              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",

              cursor: "pointer",
              transition: "all 0.15s ease-in-out",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#263A7A";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#1C2C59";
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
