import { useMemo } from "react";
import ReactFlow, { Handle, MarkerType, Position } from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

// ====== 데이터 타입 정의 ======
export type GraphNodeData = {
  address: string;
  label: string;
  chain: string;
  type: string;
  isWarning: boolean;
};

export type GraphEdgeData = {
  source: string;
  target: string;
  type: string;
  asset: string;
  amount: string;
};

export type GraphData = {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
};

// ====== 커스텀 노드 타입 정의 ======
type CustomNodeProps = {
  data: GraphNodeData;
};

// ====== Custom Node 컴포넌트 ======
const CustomNode = ({ data }: CustomNodeProps) => {
  return (
    <div
      style={{
        padding: "10px 14px",
        borderRadius: "8px",
        border: data.isWarning ? "2px solid #ff4d4f" : "1px solid #3a3f58",
        background: "#0f1629",
        color: "#fff",
        fontSize: "12px",
        boxShadow: data.isWarning ? "0 0 10px rgba(255,77,79,0.5)" : "none",
        position: "relative",
      }}
    >
      {/* 출발 핸들 */}
      <Handle type="source" position={Position.Right} />
      {/* 도착 핸들 */}
      <Handle type="target" position={Position.Left} />

      <div>{data.address}</div>
      <div style={{ fontSize: "11px", opacity: 0.7 }}>
        {data.label} · {data.chain} · {data.type}
      </div>
    </div>
  );
};

// ====== DAGRE 레이아웃 ======
const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const dagreGraph = new dagre.graphlib.Graph();
  dagreGraph.setDefaultEdgeLabel(() => ({}));
  dagreGraph.setGraph({ rankdir: "LR", align: "UL" });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: 200, height: 50 });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const pos = dagreGraph.node(node.id);
    return {
      ...node,
      position: { x: pos.x, y: pos.y },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };
  });

  return { nodes: layoutedNodes, edges };
};

// ====== 메인 Graph 컴포넌트 ======
export function Graph({ data }: { data: GraphData }) {
  // 노드 변환
  const nodes = useMemo<Node<GraphNodeData>[]>(
    () =>
      data.nodes.map((n) => ({
        id: n.address,
        type: "customNode",
        data: n,
        position: { x: 0, y: 0 },
      })),
    [data]
  );

  // 엣지 변환
  const edges = useMemo<Edge[]>(
    () =>
      data.edges.map((e, i) => ({
        id: `edge-${i}`,
        source: e.source,
        target: e.target,
        type: "default",
        animated: false,
        style: { stroke: "#ffffff", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff" },
      })),
    [data]
  );

  // DAGRE 레이아웃 적용
  const layouted = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        marginTop: 30,
        borderRadius: 12,
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
    </div>
  );
}

export default Graph;
