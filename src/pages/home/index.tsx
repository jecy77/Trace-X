import { useOutletContext } from "react-router";
import * as S from "./style";
import ArrowUp from "@/assets/icon_arrow_up.svg";
// import ArrowDown from "@/assets/icon_arrow_down.svg";

type LayoutContext = {
  title: string;
  intro: string;
};

import icon_amount from "@/assets/icon_total_amount.svg";
import icon_num from "@/assets/icon_total_num.svg";
import icon_danger from "@/assets/icon_danger.svg";
import icon_warning from "@/assets/icon_warning.svg";
import StatCard from "@/components/home/StatCard";
import HighRiskChart from "@/components/home/HighRiskChart";
import HighRiskByEachChain from "@/components/home/HighRiskByEachChain";
import MeanRiskScore from "@/components/home/MeanRiskScore";
import DetectedPatternGauge from "@/components/home/DetectedPatternGauge";

export default function HomePage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  const stats = [
    {
      title: "총 거래량",
      value: "$240.8K",
      diff: 28.4,
      isUp: true,
      icon: icon_amount,
    },
    { title: "총 거래수", value: 206, diff: 12.6, isUp: false, icon: icon_num },
    {
      title: "고위험 거래수",
      value: 25,
      diff: 3.1,
      isUp: true,
      icon: icon_danger,
    },
    {
      title: "경고 거래수",
      value: 73,
      diff: 11.3,
      isUp: true,
      icon: icon_warning,
    },
  ];

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>
      <S.ContentSection>
        <S.StatCardContainer>
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </S.StatCardContainer>
        <S.MainContainer>
          {/* 왼쪽 섹션 */}
          <HighRiskChart />

          {/* 오른쪽 섹션 */}
          <S.RightPanel>
            <S.RightTop>
              <S.RightHeader>
                <S.RightTitle>월별 체인 고위험거래</S.RightTitle>
              </S.RightHeader>

              {/* <div>Bar Chart</div> */}
              <HighRiskByEachChain />
            </S.RightTop>

            <S.RightBottom>
              <S.RightHeader>
                <S.RightTitle>평균 리스크 점수</S.RightTitle>
              </S.RightHeader>
              <S.RiskValueRow>
                <S.RiskValue>0.3</S.RiskValue>
                {/* <S.RiskDiff $isUp={isUp}> */}
                <S.RiskDiff $isUp>
                  <div>3.1%</div>
                  {/* <S.ArrowIcon
            src={isUp ? ArrowUp : ArrowDown}
            alt={isUp ? "상승" : "하락"}
          /> */}
                  <S.ArrowIcon src={ArrowUp} alt={"상승"} />
                </S.RiskDiff>
              </S.RiskValueRow>
              <S.ChartPlaceholder>
                <MeanRiskScore />
              </S.ChartPlaceholder>
            </S.RightBottom>
          </S.RightPanel>
        </S.MainContainer>
      </S.ContentSection>
      <S.HeaderSection>
        <S.Title>이상 패턴 및 거래 모니터링</S.Title>
      </S.HeaderSection>

      <S.AnomalySection>
        {/* 이상 패턴 차트 */}
        <S.AnomalyLeft>
          <S.AnomalyCard>
            <S.AnomalyHeader>
              <S.LeftTitle>탐지된 이상 패턴 수</S.LeftTitle>
            </S.AnomalyHeader>
            <S.GaugePlaceholder>
              <S.GaugeContainer>
                {/* <S.GaugeArc $fanin={15624} $peel={5546} $scatter={2478} />
                <S.GaugeValue>23,648</S.GaugeValue>
                <S.GaugeLabel>탐지된 이상 패턴 수</S.GaugeLabel> */}
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

        {/* 최근 고위험 거래 테이블 */}
        <S.AnomalyRight>
          <S.AnomalyCard>
            <S.AnomalyHeader>
              <S.LeftTitle>최근 고액 거래</S.LeftTitle>
              {/* <S.FilterButton>거래량 순</S.FilterButton> */}
            </S.AnomalyHeader>

            <S.Table>
              <thead>
                <tr>
                  <th>TxHash</th>
                  <th>날짜</th>
                  {/* <th>리스크</th> */}
                  <th>거래량</th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    id: "#1532",
                    date: "Dec 30, 10:06 AM",
                    // risk: "위험",
                    amount: "$329.40",
                  },
                  {
                    id: "#1531",
                    date: "Dec 29, 2:59 AM",
                    // risk: "경고",
                    amount: "$117.24",
                  },
                  {
                    id: "#1530",
                    date: "Dec 29, 1:54 AM",
                    // risk: "안전",
                    amount: "$82.16",
                  },
                  {
                    id: "#1531",
                    date: "Dec 29, 2:59 AM",
                    // risk: "경고",
                    amount: "$117.24",
                  },
                  {
                    id: "#1532",
                    date: "Dec 30, 10:06 AM",
                    // risk: "위험",
                    amount: "$329.40",
                  },
                  {
                    id: "#1531",
                    date: "Dec 29, 2:59 AM",
                    // risk: "경고",
                    amount: "$117.24",
                  },
                  {
                    id: "#1531",
                    date: "Dec 29, 2:59 AM",
                    // risk: "경고",
                    amount: "$117.24",
                  },
                ].map((tx) => (
                  // <S.TableRow key={tx.id} $risk={tx.risk}>
                  <S.TableRow key={tx.id}>
                    <td>{tx.id}</td>
                    <td>{tx.date}</td>
                    {/* <td>
                      <S.RiskTag
                        $level={
                          tx.risk === "위험"
                            ? "high"
                            : tx.risk === "경고"
                            ? "mid"
                            : "low"
                        }
                      >
                        {tx.risk}
                      </S.RiskTag>
                    </td> */}
                    <td>{tx.amount}</td>
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
