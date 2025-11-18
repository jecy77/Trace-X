import { useMemo, useState } from "react";
import ReactFlow, {
  Handle,
  MarkerType,
  Position,
  Node,
  Edge,
} from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";

// ====== 타입 정의 ======
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
  timestamp?: string;
};

export type GraphData = {
  nodes: GraphNodeData[];
  edges: GraphEdgeData[];
};

// ====== 연결 주소 Popup ======
const AddressPopup = ({
  x,
  y,
  addresses,
  onSelect,
  nodeId,
}: {
  x: number;
  y: number;
  addresses: string[];
  nodeId: string;
  onSelect: (addr: string) => void;
}) => (
  <div
    style={{
      position: "fixed",
      top: y,
      left: x,
      background: "#1C2C59",
      padding: "12px",
      borderRadius: 8,
      boxShadow: "0 0 10px rgba(0,0,0,0.5)",
      color: "white",
      fontSize: 13,
      zIndex: 9999,
      minWidth: 180,
      border: "2px solid #0B1739"
  
    }}
  >
    <div style={{ fontWeight: "bold", marginBottom: 10 }}>
    <div style={{ fontWeight: "bold", marginBottom: 10 }}>관련 주소</div>
    <div style={{ fontSize: 10, fontWeight: "500", color: "#AEB9E1"}}>{addresses.length}개</div>
    </div>

    {addresses.map((addr) => (
      <div
        key={addr}
        onClick={() => onSelect(addr)}
        style={{
          padding: "6px 4px",
          cursor: "pointer",
          borderRadius: 4,
          color: "#AEB9E1"
        }}
      >
        {addr}
      </div>
    ))}
  </div>
);

// ====== Custom Node ======
type CustomNodeProps = {
  data: GraphNodeData;
};

const CustomNode = ({ data }: CustomNodeProps) => (
  <div
    style={{
      padding: "10px 14px",
      borderRadius: 8,
      border: data.isWarning ? "2px solid #ff4d4f" : "1px solid #3a3f58",
      background: "#0f1629",
      color: "#fff",
      fontSize: 12,
      cursor: "pointer",
    }}
  >
    <Handle type="source" position={Position.Right} />
    <Handle type="target" position={Position.Left} />

    <div>{data.address}</div>
    <div style={{ fontSize: 11, opacity: 0.7 }}>
      {data.label} · {data.chain} · {data.type}
    </div>
  </div>
);

// ====== DAGRE Layout ======
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

// ====== Main Component ======
export function Graph({ data }: { data: GraphData }) {
  const [popup, setPopup] = useState<any>(null);

  // ----- 노드 변환 -----
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

  // ----- 엣지 변환 + timestamp 포함 라벨 -----
  const edges = useMemo<Edge[]>(
    () =>
      data.edges.map((e, i) => ({
        id: `edge-${i}`,
        source: e.source,
        target: e.target,
        type: "default",
        animated: false,
        style: {
          stroke: "#ffffff",
          strokeWidth: 2,
        },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff" },

        // timestamp + asset + amount
        label: `⏱ ${e.timestamp ?? "20251114T1224"} | ${e.asset} · ${e.amount}`,
        labelStyle: { fill: "#fff", fontSize: 10 },
        labelBgStyle: {
          fill: "rgba(0,0,0,0.6)",
          color: "#fff",
          borderRadius: 4,
        },
        labelBgPadding: [6, 3],
      })),
    [data]
  );

  // Layout 적용
  const layouted = useMemo(
    () => getLayoutedElements(nodes, edges),
    [nodes, edges]
  );

  // 클릭하면 연결 주소 팝업
  const handleNodeClick = (event: any, node: Node) => {
    // 동일 노드 클릭 시 팝업 닫기
    if (popup && popup.nodeId === node.id) {
      setPopup(null);
      return;
    }
  
    const relatedEdges = data.edges.filter(
      (e) => e.source === node.id || e.target === node.id
    );
  
    const connectedAddresses = relatedEdges.map((e) =>
      e.source === node.id ? e.target : e.source
    );
                                              
    // 새로운 노드면 팝업 새로 열기
    setPopup({
      x: event.clientX,
      y: event.clientY,
      addresses: connectedAddresses,
      nodeId: node.id,
    });
  };
  

  return (
    <div style={{ width: "100%", height: "80vh", marginTop: 30 }}>
      <ReactFlow
        nodes={layouted.nodes}
        edges={layouted.edges}
        nodeTypes={{ customNode: CustomNode }}
        fitView
        proOptions={{ hideAttribution: true }}
        onNodeClick={handleNodeClick}
        style={{ background: "transparent" }}
      />

      {/* Node 클릭 시 팝업 */}
      {popup && (
        <AddressPopup
          x={popup.x}
          y={popup.y}
          addresses={popup.addresses}
          nodeId={popup.nodeId}
          onSelect={(addr) => {
            console.log("선택된 주소:", addr);
            // TODO: 그래프 확장 로직 실행
            setPopup(null);
          }}
        />
      )}
    </div>
  );
}

export default Graph;
