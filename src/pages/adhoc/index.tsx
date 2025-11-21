import { useState, useMemo } from "react";
import * as S from "./style";
import SearchBar from "@/components/SearchBar";
import Graph, { GraphData, GraphNodeData } from "@/components/adhoc/Graph";
import {
  getFundFlow,
  getFundFlowByTxHash,
  analyzeAddressViaBackend,
} from "@/services/backend";
import type { AddressAnalysisResponse } from "@/types/api";

// 체인 정보
const CHAINS = [
  { id: 1, name: "Ethereum" },
  { id: 56, name: "BSC" },
  { id: 137, name: "Polygon" },
];

export default function AdhocPage() {
  // 페이지 정보 (직접 정의)
  const title = "수동 탐지";
  const intro = "주소 또는 트랜잭션을 분석하여 위험도를 평가합니다.";

  const [address, setAddress] = useState("");
  const [chainId, setChainId] = useState(1);
  const [analysisMode, setAnalysisMode] = useState<"address" | "transaction">(
    "address"
  );

  // 그래프 데이터
  const [graphData, setGraphData] = useState<GraphData | null>(null);
  const [currentHops, setCurrentHops] = useState(1); // 현재 표시 중인 홉 수
  const [currentMaxAddresses, setCurrentMaxAddresses] = useState(5); // 현재 주소 제한
  const [isInitialLoad, setIsInitialLoad] = useState(true); // 초기 로드 여부

  // 선택된 노드의 상세 정보
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [nodeDetails, setNodeDetails] =
    useState<AddressAnalysisResponse | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 체인 이름 가져오기
  const getChainName = (chainId: number): string => {
    const chain = CHAINS.find((c) => c.id === chainId);
    return chain?.name || "Unknown";
  };

  // 1. 주소/트랜잭션 입력 → 그래프 데이터 가져오기
  const handleAnalyze = async () => {
    if (!address.trim()) {
      setError(
        analysisMode === "address"
          ? "주소를 입력해주세요."
          : "트랜잭션 해시를 입력해주세요."
      );
      return;
    }

    setError(null);
    setLoading(true);
    setGraphData(null);
    setSelectedNode(null);
    setNodeDetails(null);

    // 초기 로드 시 홉 수와 주소 제한 리셋
    setCurrentHops(1);
    setCurrentMaxAddresses(5);
    setIsInitialLoad(true); // 초기 로드 상태로 설정

    try {
      let fundFlowData;

      if (analysisMode === "address") {
        // 주소 기반 분석 (노드 수 제한)
        fundFlowData = await getFundFlow(
          address.trim(),
          chainId,
          1, // max_hops: 1홉만
          5 // max_addresses: 방향당 5개만
        );
      } else {
        // 트랜잭션 해시 기반 분석
        fundFlowData = await getFundFlowByTxHash(
          address.trim(),
          chainId,
          1, // max_hops: 1홉만
          5 // max_addresses: 방향당 5개만
        );
      }

      // GraphData 형식으로 변환
      const searchedAddress = address.trim().toLowerCase(); // 검색한 타겟 주소

      const graphData: GraphData = {
        nodes: fundFlowData.nodes.map((node: any) => {
          let nodeAddress = node.address || node.id;
          if (nodeAddress && nodeAddress.includes("-")) {
            nodeAddress = nodeAddress.split("-")[1];
          }

          const isTargetNode = nodeAddress.toLowerCase() === searchedAddress;

          return {
            address: nodeAddress,
            label: node.label || "Unknown",
            chain: getChainName(node.chain_id || node.chain || chainId),
            type: node.type || "unknown",
            isWarning: node.isWarning || node.is_warning || false,
            isTarget: isTargetNode, // 타겟 주소 마킹!
          };
        }),
        edges: fundFlowData.edges.map((edge: any) => {
          let fromAddr = edge.from_address || "";
          let toAddr = edge.to_address || "";

          if (fromAddr.includes("-")) {
            fromAddr = fromAddr.split("-")[1];
          }
          if (toAddr.includes("-")) {
            toAddr = toAddr.split("-")[1];
          }

          return {
            source: fromAddr,
            target: toAddr,
            type: edge.tx_type || "transfer",
            asset: edge.token_symbol || "ETH",
            amount: edge.amount || "0",
            timestamp: edge.timestamp
              ? new Date(Number(edge.timestamp) * 1000).toISOString()
              : undefined,
          };
        }),
      };

      setGraphData(graphData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "그래프 데이터를 가져오는 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 2. 노드 클릭 → 상세 정보 가져오기
  const handleNodeClick = async (nodeAddress: string) => {
    if (selectedNode === nodeAddress) {
      // 같은 노드 다시 클릭하면 닫기
      setSelectedNode(null);
      setNodeDetails(null);
      return;
    }

    setSelectedNode(nodeAddress);
    setLoadingDetails(true);
    setNodeDetails(null);

    try {
      // 해당 노드의 리스크 스코어링 요청
      const result = await analyzeAddressViaBackend({
        address: nodeAddress,
        chain_id: chainId,
        max_hops: 1,
        analysis_type: "basic",
      });

      setNodeDetails(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "리스크 분석 중 오류가 발생했습니다."
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  // 3. 그래프 확장 (더 많은 노드 로드)
  const handleExpandGraph = async (level: "more" | "all") => {
    if (!address.trim()) return;

    setLoading(true);
    setError(null);
    setIsInitialLoad(false); // 확장 시에는 초기 로드 상태 아님

    try {
      let newHops = currentHops;
      let newMaxAddresses = currentMaxAddresses;

      if (level === "more") {
        // "더보기" → 1단계 확장
        newHops = Math.min(currentHops + 1, 3); // 최대 3홉
        newMaxAddresses = Math.min(currentMaxAddresses + 5, 15); // 최대 15개
      } else {
        // "전체 보기" → 최대 확장
        newHops = 3;
        newMaxAddresses = 20;
      }

      setCurrentHops(newHops);
      setCurrentMaxAddresses(newMaxAddresses);

      // 그래프 재로드
      let fundFlowData;
      if (analysisMode === "address") {
        fundFlowData = await getFundFlow(
          address.trim(),
          chainId,
          newHops,
          newMaxAddresses
        );
      } else {
        fundFlowData = await getFundFlowByTxHash(
          address.trim(),
          chainId,
          newHops,
          newMaxAddresses
        );
      }

      // GraphData 형식으로 변환
      const searchedAddress = address.trim().toLowerCase(); // 검색한 타겟 주소

      const graphData: GraphData = {
        nodes: fundFlowData.nodes.map((node: any) => {
          let nodeAddress = node.address || node.id;
          if (nodeAddress && nodeAddress.includes("-")) {
            nodeAddress = nodeAddress.split("-")[1];
          }

          const isTargetNode = nodeAddress.toLowerCase() === searchedAddress;

          return {
            address: nodeAddress,
            label: node.label || "Unknown",
            chain: getChainName(node.chain_id || node.chain || chainId),
            type: node.type || "unknown",
            isWarning: node.isWarning || node.is_warning || false,
            isTarget: isTargetNode, // 타겟 주소 마킹!
          };
        }),
        edges: fundFlowData.edges.map((edge: any) => {
          let fromAddr = edge.from_address || "";
          let toAddr = edge.to_address || "";

          if (fromAddr.includes("-")) {
            fromAddr = fromAddr.split("-")[1];
          }
          if (toAddr.includes("-")) {
            toAddr = toAddr.split("-")[1];
          }

          return {
            source: fromAddr,
            target: toAddr,
            type: edge.tx_type || "transfer",
            asset: edge.token_symbol || "ETH",
            amount: edge.amount || "0",
            timestamp: edge.timestamp
              ? new Date(Number(edge.timestamp) * 1000).toISOString()
              : undefined,
          };
        }),
      };

      setGraphData(graphData);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "그래프 확장 중 오류가 발생했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  // 리스크 레벨 색상
  const getRiskColor = (level: string) => {
    switch (level) {
      case "critical":
        return "#dc2626";
      case "high":
        return "#ea580c";
      case "medium":
        return "#eab308";
      case "low":
        return "#22c55e";
      default:
        return "#6b7280";
    }
  };

  return (
    <S.Root>
      {/* 헤더 */}
      <S.HeaderSection>
        <div>
          <S.Title>{title}</S.Title>
          <S.Intro>{intro}</S.Intro>
        </div>
      </S.HeaderSection>

      {/* 검색 영역 */}
      <S.SearchSection>
        {/* 분석 모드 선택 */}
        <S.ModeSelector>
          <S.ModeButton
            active={analysisMode === "address"}
            onClick={() => setAnalysisMode("address")}
          >
            주소 분석
          </S.ModeButton>
          <S.ModeButton
            active={analysisMode === "transaction"}
            onClick={() => setAnalysisMode("transaction")}
          >
            트랜잭션 분석
          </S.ModeButton>
        </S.ModeSelector>

        {/* 체인 선택 + 검색바 + 분석 버튼 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            width: "100%",
          }}
        >
          <S.ChainSelect
            value={chainId}
            onChange={(e) => setChainId(Number(e.target.value))}
          >
            {CHAINS.map((chain) => (
              <option key={chain.id} value={chain.id}>
                {chain.name}
              </option>
            ))}
          </S.ChainSelect>

          <SearchBar
            value={address}
            onChange={setAddress}
            onSearch={handleAnalyze}
            placeholder={
              analysisMode === "address"
                ? "주소를 입력하세요 (0x...)"
                : "트랜잭션 해시를 입력하세요 (0x...)"
            }
          />

          <S.AnalyzeButton onClick={handleAnalyze} disabled={loading}>
            {loading ? "분석 중..." : "분석하기"}
          </S.AnalyzeButton>
        </div>

        {/* 테스트 주소 예시 */}
        <S.TestAddressHint>
          <span style={{ color: "#9ca3af" }}>테스트 주소:</span>
          <button
            onClick={() => {
              setAddress("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
              setAnalysisMode("address");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#60a5fa",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "13px",
            }}
          >
            Vitalik Buterin
          </button>
          <button
            onClick={() => {
              setAddress("0x28C6c06298d514Db089934071355E5743bf21d60");
              setAnalysisMode("address");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#60a5fa",
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "13px",
            }}
          >
            Binance Hot Wallet
          </button>
        </S.TestAddressHint>
      </S.SearchSection>

      {/* 에러 메시지 */}
      {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

      {/* 그래프 + 사이드바 레이아웃 */}
      {graphData && (
        <S.ContentLayout>
          {/* 왼쪽: 그래프 */}
          <S.GraphSection hasDetails={!!selectedNode}>
            <Graph
              data={graphData}
              onNodeClick={handleNodeClick}
              fitViewOnMount={isInitialLoad}
            />

            {/* 그래프 확장 버튼 */}
            <S.GraphControlBar>
              <S.GraphInfo>
                현재: {currentHops}홉, 방향당 {currentMaxAddresses}개 주소
              </S.GraphInfo>
              <S.GraphButtonGroup>
                <S.ExpandButton
                  onClick={() => handleExpandGraph("more")}
                  disabled={loading || currentHops >= 3}
                >
                  더보기
                  <S.ButtonHint>+1홉씩 점진적 확장</S.ButtonHint>
                </S.ExpandButton>
                <S.ExpandButton
                  onClick={() => handleExpandGraph("all")}
                  disabled={loading || currentHops >= 3}
                  primary
                >
                  전체 보기
                  <S.ButtonHint>3홉 최대 확장</S.ButtonHint>
                </S.ExpandButton>
              </S.GraphButtonGroup>
            </S.GraphControlBar>
          </S.GraphSection>

          {/* 오른쪽: 노드 상세 정보 (선택 시에만 표시) */}
          {selectedNode && (
            <S.DetailsSidebar>
              <S.SidebarHeader>
                <S.SidebarTitle>리스크 분석 결과</S.SidebarTitle>
                <S.CloseButton onClick={() => setSelectedNode(null)}>
                  ✕
                </S.CloseButton>
              </S.SidebarHeader>

              {loadingDetails ? (
                <S.LoadingMessage>분석 중...</S.LoadingMessage>
              ) : nodeDetails ? (
                <>
                  {/* 주소 */}
                  <S.DetailSection>
                    <S.DetailLabel>주소</S.DetailLabel>
                    <S.DetailValue
                      style={{
                        fontFamily: "monospace",
                        fontSize: "13px",
                        wordBreak: "break-all",
                      }}
                    >
                      {nodeDetails.target_address}
                    </S.DetailValue>
                  </S.DetailSection>

                  {/* 리스크 점수 */}
                  <S.DetailSection>
                    <S.DetailLabel>리스크 점수</S.DetailLabel>
                    <S.RiskScore
                      style={{
                        color: getRiskColor(nodeDetails.risk_level),
                      }}
                    >
                      {nodeDetails.risk_score.toFixed(2)} / 100
                    </S.RiskScore>
                    <S.RiskLevel
                      style={{
                        background: `${getRiskColor(nodeDetails.risk_level)}20`,
                        color: getRiskColor(nodeDetails.risk_level),
                      }}
                    >
                      {nodeDetails.risk_level.toUpperCase()}
                    </S.RiskLevel>
                  </S.DetailSection>

                  {/* 리스크 태그 */}
                  {nodeDetails.risk_tags &&
                    nodeDetails.risk_tags.length > 0 && (
                      <S.DetailSection>
                        <S.DetailLabel>리스크 태그</S.DetailLabel>
                        <S.TagContainer>
                          {nodeDetails.risk_tags.map((tag, idx) => (
                            <S.RiskTag key={idx}>{tag}</S.RiskTag>
                          ))}
                        </S.TagContainer>
                      </S.DetailSection>
                    )}

                  {/* 발동된 룰 */}
                  {nodeDetails.fired_rules &&
                    nodeDetails.fired_rules.length > 0 && (
                      <S.DetailSection>
                        <S.DetailLabel>발동된 룰</S.DetailLabel>
                        <S.RuleList>
                          {nodeDetails.fired_rules.map((rule, idx) => (
                            <S.RuleItem key={idx}>
                              <span style={{ fontWeight: 600 }}>
                                {rule.rule_id}
                              </span>
                              <span style={{ color: "#9ca3af" }}>
                                +{rule.score.toFixed(1)}점
                              </span>
                            </S.RuleItem>
                          ))}
                        </S.RuleList>
                      </S.DetailSection>
                    )}

                  {/* 설명 */}
                  {nodeDetails.explanation && (
                    <S.DetailSection>
                      <S.DetailLabel>상세 설명</S.DetailLabel>
                      <S.DetailValue>{nodeDetails.explanation}</S.DetailValue>
                    </S.DetailSection>
                  )}
                </>
              ) : (
                <S.ErrorMessage>
                  리스크 분석 결과를 가져올 수 없습니다.
                </S.ErrorMessage>
              )}
            </S.DetailsSidebar>
          )}
        </S.ContentLayout>
      )}

      {/* 데이터가 없을 때 메시지 */}
      {!loading && !graphData && !error && (
        <S.EmptyMessage>
          주소 또는 트랜잭션 해시를 입력하고 "분석하기" 버튼을 클릭하세요.
        </S.EmptyMessage>
      )}
    </S.Root>
  );
}
