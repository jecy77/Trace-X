import { useOutletContext } from "react-router";
import * as S from "./style";
import ArrowUp from "@/assets/icon_arrow_up.svg";

import icon_amount from "@/assets/icon_total_amount.svg";
import icon_num from "@/assets/icon_total_num.svg";
import icon_danger from "@/assets/icon_danger.svg";
import icon_warning from "@/assets/icon_warning.svg";

import StatCard from "@/components/home/StatCard";
import HighRiskChart from "@/components/home/HighRiskChart";
import HighRiskByEachChain from "@/components/home/HighRiskByEachChain";
import MeanRiskScore from "@/components/home/MeanRiskScore";
import DetectedPatternGauge from "@/components/home/DetectedPatternGauge";

import { useEffect, useState } from "react";
import { getMonitoring } from "@/api/getMonitoring";
import { getDashboardSummary } from "@/api/getDashboard";

type LayoutContext = {
  title: string;
  intro: string;
};

export default function HomePage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  const shorten = (value: string, left = 6, right = 4) => {
    if (!value) return "";
    if (value.length <= left + right) return value;
    return `${value.slice(0, left)}...${value.slice(-right)}`;
  };

  // 대시보드 상태 - 기본값으로 안전한 구조 설정
  const [summary, setSummary] = useState<any>({
    totalVolume: { value: 0, changeRate: "0" },
    totalTransactions: { value: 0, changeRate: "0" },
    highRiskTransactions: { value: 0, changeRate: "0" },
    warningTransactions: { value: 0, changeRate: "0" },
    highRiskTransactionTrend: {},
    highRiskTransactionsByChain: {},
    averageRiskScore: {},
  });

  // 모니터링 테이블 상태
  const dummyMonitoring = [
    { txHash: "#1532", timestamp: "Dec 30, 10:06 AM", value: "$329.40" },
    { txHash: "#1531", timestamp: "Dec 29, 2:59 AM", value: "$117.24" },
    { txHash: "#1530", timestamp: "Dec 29, 1:54 AM", value: "$82.16" },
  ];

  const [monitoring, setMonitoring] = useState(dummyMonitoring);

  /* -----------------------------------------------
      📌 대시보드 요약 데이터 호출
  ------------------------------------------------- */
  useEffect(() => {
    async function loadSummary() {
      try {
        const res = await getDashboardSummary();
        // 안전 체크: res가 유효한 객체인지 확인
        if (res && typeof res === "object") {
          setSummary(res);
        } else {
          // 기본값 설정
          setSummary({
            totalVolume: { value: 0, changeRate: "0" },
            totalTransactions: { value: 0, changeRate: "0" },
            highRiskTransactions: { value: 0, changeRate: "0" },
            warningTransactions: { value: 0, changeRate: "0" },
            highRiskTransactionTrend: {},
            highRiskTransactionsByChain: {},
            averageRiskScore: {},
          });
        }
      } catch (err) {
        console.error("Dashboard summary error:", err);
        // 에러 발생 시 기본값 설정
        setSummary({
          totalVolume: { value: 0, changeRate: "0" },
          totalTransactions: { value: 0, changeRate: "0" },
          highRiskTransactions: { value: 0, changeRate: "0" },
          warningTransactions: { value: 0, changeRate: "0" },
          highRiskTransactionTrend: {},
          highRiskTransactionsByChain: {},
          averageRiskScore: {},
        });
      }
    }
    loadSummary();
  }, []);

  /* -----------------------------------------------
      📌 최근 고액 거래
  ------------------------------------------------- */
  useEffect(() => {
    async function loadMonitoring() {
      try {
        const res = await getMonitoring();
        if (res?.RecentHighValueTransfers?.length > 0) {
          setMonitoring(res.RecentHighValueTransfers);
        } else {
          setMonitoring(dummyMonitoring);
        }
      } catch {
        setMonitoring(dummyMonitoring);
      }
    }
    loadMonitoring();
  }, []);

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>

      {/* ============================
          STAT CARDS
      ============================ */}
      <S.ContentSection>
        <S.StatCardContainer>
          {summary &&
          summary.totalVolume &&
          summary.totalVolume.value !== undefined &&
          summary.totalVolume.value !== null ? (
            <>
              <StatCard
                title="총 거래량"
                value={String(summary.totalVolume?.value || 0).toLocaleString()}
                diff={parseFloat(
                  String(summary.totalVolume?.changeRate || "0")
                )}
                isUp={String(summary.totalVolume?.changeRate || "").startsWith(
                  "+"
                )}
                icon={icon_amount}
              />
              <StatCard
                title="총 거래수"
                value={String(
                  summary.totalTransactions?.value || 0
                ).toLocaleString()}
                diff={parseFloat(
                  String(summary.totalTransactions?.changeRate || "0")
                )}
                isUp={String(
                  summary.totalTransactions?.changeRate || ""
                ).startsWith("+")}
                icon={icon_num}
              />
              <StatCard
                title="고위험 거래수"
                value={String(
                  summary.highRiskTransactions?.value || 0
                ).toLocaleString()}
                diff={parseFloat(
                  String(summary.highRiskTransactions?.changeRate || "0")
                )}
                isUp={String(
                  summary.highRiskTransactions?.changeRate || ""
                ).startsWith("+")}
                icon={icon_danger}
              />
              <StatCard
                title="경고 거래수"
                value={String(
                  summary.warningTransactions?.value || 0
                ).toLocaleString()}
                diff={parseFloat(
                  String(summary.warningTransactions?.changeRate || "0")
                )}
                isUp={String(
                  summary.warningTransactions?.changeRate || ""
                ).startsWith("+")}
                icon={icon_warning}
              />
            </>
          ) : (
            <>
              <StatCard
                title="총 거래량"
                value="0"
                diff={0}
                isUp={false}
                icon={icon_amount}
              />
              <StatCard
                title="총 거래수"
                value="0"
                diff={0}
                isUp={false}
                icon={icon_num}
              />
              <StatCard
                title="고위험 거래수"
                value="0"
                diff={0}
                isUp={false}
                icon={icon_danger}
              />
              <StatCard
                title="경고 거래수"
                value="0"
                diff={0}
                isUp={false}
                icon={icon_warning}
              />
            </>
          )}
        </S.StatCardContainer>

        {/* ============================
            MAIN GRAPHS
        ============================ */}
        <S.MainContainer>
          {/* 왼쪽: 고위험 거래 추이 */}
          <HighRiskChart data={summary?.highRiskTransactionTrend} />

          {/* 오른쪽 패널 */}
          <S.RightPanel>
            <S.RightTop>
              <S.RightHeader>
                <S.RightTitle>월별 체인 고위험거래</S.RightTitle>
              </S.RightHeader>

              <HighRiskByEachChain
                data={summary?.highRiskTransactionsByChain}
              />
            </S.RightTop>

            <S.RightBottom>
              <S.RightHeader>
                <S.RightTitle>평균 리스크 점수</S.RightTitle>
              </S.RightHeader>

              <S.RiskValueRow>
                <S.RiskValue>
                  {summary && summary.averageRiskScore
                    ? (() => {
                        const arr = Object.values(
                          summary.averageRiskScore
                        ) as number[];
                        if (arr.length === 0) return "3.2";
                        const avg = arr.reduce((a, b) => a + b, 0) / arr.length;
                        return isNaN(avg) ? "3.2" : avg.toFixed(2);
                      })()
                    : "3.2"}
                </S.RiskValue>

                <S.RiskDiff $isUp>
                  <div>3.1%</div>
                  <S.ArrowIcon src={ArrowUp} alt="상승" />
                </S.RiskDiff>
              </S.RiskValueRow>

              <S.ChartPlaceholder>
                <MeanRiskScore data={summary?.averageRiskScore} />
              </S.ChartPlaceholder>
            </S.RightBottom>
          </S.RightPanel>
        </S.MainContainer>
      </S.ContentSection>

      {/* ============================
          ANOMALY SECTION
      ============================ */}
      <S.HeaderSection>
        <S.Title>이상 패턴 및 거래 모니터링</S.Title>
      </S.HeaderSection>

      <S.AnomalySection>
        {/* 왼쪽: 패턴 */}
        <S.AnomalyLeft>
          <S.AnomalyCard>
            <S.AnomalyHeader>
              <S.LeftTitle>탐지된 이상 패턴 수</S.LeftTitle>
            </S.AnomalyHeader>

            <S.GaugePlaceholder>
              <S.GaugeContainer>
                <DetectedPatternGauge />
              </S.GaugeContainer>
            </S.GaugePlaceholder>

            <S.PatternList>
              <S.PatternItem>
                <S.LegendDot color="#D42649" />
                <S.PatternText>Fan-in</S.PatternText>
                <S.PatternValue>15,624</S.PatternValue>
              </S.PatternItem>

              <S.PatternItem>
                <S.LegendDot color="#5CC8F8" />
                <S.PatternText>Peel Chain</S.PatternText>
                <S.PatternValue>5,546</S.PatternValue>
              </S.PatternItem>

              <S.PatternItem>
                <S.LegendDot color="#847AFF" />
                <S.PatternText>Scatter Gather</S.PatternText>
                <S.PatternValue>2,478</S.PatternValue>
              </S.PatternItem>
            </S.PatternList>
          </S.AnomalyCard>
        </S.AnomalyLeft>

        {/* 오른쪽: 최근 고액 거래 */}
        <S.AnomalyRight>
          <S.AnomalyCard>
            <S.AnomalyHeader>
              <S.LeftTitle>최근 고액 거래</S.LeftTitle>
            </S.AnomalyHeader>

            <S.Table>
              <thead>
                <tr>
                  <th>TxHash</th>
                  <th>날짜</th>
                  <th>거래량</th>
                </tr>
              </thead>

              <tbody>
                {monitoring.map((item, idx) => (
                  <S.TableRow key={item.txHash + idx}>
                    <td title={item.txHash}>{shorten(item.txHash)}</td>

                    <td>{item.timestamp}</td>
                    <td>{item.value}</td>
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </S.AnomalyCard>
        </S.AnomalyRight>
      </S.AnomalySection>
    </S.Root>
  );
}
