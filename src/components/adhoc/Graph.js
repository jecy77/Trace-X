import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from "react";
import ReactFlow, { Handle, MarkerType, Position } from "reactflow";
import "reactflow/dist/style.css";
import dagre from "dagre";
// ====== Custom Node 컴포넌트 ======
const CustomNode = ({ data }) => {
    return (_jsxs("div", { style: {
            padding: "10px 14px",
            borderRadius: "8px",
            border: data.isWarning ? "2px solid #ff4d4f" : "1px solid #3a3f58",
            background: "#0f1629",
            color: "#fff",
            fontSize: "12px",
            boxShadow: data.isWarning ? "0 0 10px rgba(255,77,79,0.5)" : "none",
            position: "relative",
        }, children: [_jsx(Handle, { type: "source", position: Position.Right }), _jsx(Handle, { type: "target", position: Position.Left }), _jsx("div", { children: data.address }), _jsxs("div", { style: { fontSize: "11px", opacity: 0.7 }, children: [data.label, " \u00B7 ", data.chain, " \u00B7 ", data.type] })] }));
};
// ====== DAGRE 레이아웃 ======
const getLayoutedElements = (nodes, edges) => {
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
export function Graph({ data }) {
    // 노드 변환
    const nodes = useMemo(() => data.nodes.map((n) => ({
        id: n.address,
        type: "customNode",
        data: n,
        position: { x: 0, y: 0 },
    })), [data]);
    // 엣지 변환
    const edges = useMemo(() => data.edges.map((e, i) => ({
        id: `edge-${i}`,
        source: e.source,
        target: e.target,
        type: "default",
        animated: false,
        style: { stroke: "#ffffff", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "#ffffff" },
    })), [data]);
    // DAGRE 레이아웃 적용
    const layouted = useMemo(() => getLayoutedElements(nodes, edges), [nodes, edges]);
    return (_jsx("div", { style: {
            width: "100%",
            height: "80vh",
            marginTop: 30,
            borderRadius: 12,
        }, children: _jsx(ReactFlow, { nodes: layouted.nodes, edges: layouted.edges, nodeTypes: { customNode: CustomNode }, fitView: true, proOptions: { hideAttribution: true }, style: { background: "transparent" } }) }));
}
export default Graph;
