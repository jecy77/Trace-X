// components/Graph.tsx
import { useEffect, useRef } from "react";
import * as d3 from "d3";

type NodeType = {
  address: string;
  label: string;
  chain: string;
  type: string;
  isWarning: boolean;
  description?: string;
};

type EdgeType = {
  source: string;
  target: string;
  type: string;
  asset: string;
  amount: string;
  txHash: string;
  timeStamp: string;
};

type GraphData = {
  nodes: NodeType[];
  edges: EdgeType[];
};

export default function Graph({ data }: { data: GraphData }) {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    const width = 800;
    const height = 600;

    // 초기화
    svg.selectAll("*").remove();

    // 시뮬레이션
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        "link",
        d3
          .forceLink(data.edges)
          .id((d: any) => d.address)
          .distance(200)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2));

    // 툴팁
    const tooltip = d3
      .select("body")
      .append("div")
      .style("position", "absolute")
      .style("padding", "6px")
      .style("background", "rgba(0,0,0,0.7)")
      .style("color", "white")
      .style("border-radius", "4px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0);

    // 링크 (얇은 선)
    const link = svg
      .append("g")
      .selectAll("line")
      .data(data.edges)
      .enter()
      .append("line")
      .attr("stroke", "#aaa")
      .attr("stroke-width", 2);

    // 이벤트 전용 hitbox (투명한 굵은 선)
    const linkOverlay = svg
      .append("g")
      .selectAll("line")
      .data(data.edges)
      .enter()
      .append("line")
      .attr("stroke", "transparent") // 보이지 않음
      .attr("stroke-width", 15) // 마우스 이벤트 영역은 큼
      .on("mouseover", (event, d: any) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`TxHash: ${d.txHash}<br/>Time: ${d.timeStamp}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", event.pageX + 10 + "px");
        tooltip.style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // 링크 라벨 (자산 + 수량)
    const edgeLabel = svg
      .append("g")
      .selectAll("text")
      .data(data.edges)
      .enter()
      .append("text")
      .text((d) => `${d.amount} ${d.asset}`)
      .style("fill", "white")
      .style("font-size", "12px")
      .style("pointer-events", "all") // 텍스트에도 마우스 이벤트 허용
      .on("mouseover", (event, d: any) => {
        tooltip.transition().duration(200).style("opacity", 1);
        tooltip.html(`TxHash: ${d.txHash}<br/>Time: ${d.timeStamp}`);
      })
      .on("mousemove", (event) => {
        tooltip.style("left", event.pageX + 10 + "px");
        tooltip.style("top", event.pageY - 20 + "px");
      })
      .on("mouseout", () => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    // gradient 정의
    const defs = svg.append("defs");

    const transferGradient = defs
      .append("linearGradient")
      .attr("id", "transferGradient")
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%");

    transferGradient
      .append("stop")
      .attr("offset", "0%")
      .attr("stop-color", "#FACD49");

    transferGradient
      .append("stop")
      .attr("offset", "30.77%")
      .attr("stop-color", "#E2BA43");

    transferGradient
      .append("stop")
      .attr("offset", "100%")
      .attr("stop-color", "#947A2B");

    // 노드 색상 함수
    const getNodeColor = (d: NodeType) => {
      if (d.label === "transfer") return "url(#transferGradient)";
      if (d.label === "bridge") return "blue";
      if (d.label === "swap") return "orange";
      return "gray";
    };

    // 노드
    const node = svg
      .append("g")
      .selectAll("circle")
      .data(data.nodes)
      .enter()
      .append("circle")
      .attr("r", 30)
      .attr("fill", (d) => getNodeColor(d))
      .attr("stroke", (d) => (d.isWarning ? "red" : "none"))
      .attr("stroke-width", (d) => (d.isWarning ? 3 : 0))
      .call(
        d3
          .drag<SVGCircleElement, NodeType>()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    // 노드 라벨 (주소)
    const nodeLabel = svg
      .append("g")
      .selectAll("text")
      .data(data.nodes)
      .enter()
      .append("text")
      .text((d) => d.address)
      .style("fill", "white")
      .style("font-size", "10px")
      .attr("text-anchor", "middle")
      .attr("dy", 45)
      .style("pointer-events", "all");

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      linkOverlay
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      edgeLabel
        .attr("x", (d: any) => (d.source.x + d.target.x) / 2)
        .attr("y", (d: any) => (d.source.y + d.target.y) / 2);

      node.attr("cx", (d: any) => d.x).attr("cy", (d: any) => d.y);

      nodeLabel.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y);
    });
  }, [data]);

  return <svg ref={svgRef} width="100%" height="100%"></svg>;
}
