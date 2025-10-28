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
          <S.LeftChartSection>
            <S.LeftHeader>
              <div>
                <S.LeftTitle>고위험거래 추이</S.LeftTitle>
                <S.LeftValue>$240.8K</S.LeftValue>
              </div>
              <S.LegendWrapper>
                <S.LegendDot color="#D42649" />
                <S.LegendText>고위험</S.LegendText>
                <S.LegendDot color="#5CC8F8" />
                <S.LegendText>전체</S.LegendText>
                <S.DateRange>Jan 2024 - Dec 2024 ▼</S.DateRange>
              </S.LegendWrapper>
            </S.LeftHeader>

            <S.ChartPlaceholder>Line Chart</S.ChartPlaceholder>
          </S.LeftChartSection>

          {/* 오른쪽 섹션 */}
          <S.RightPanel>
            <S.RightTop>
              <S.RightHeader>
                <S.RightTitle>체인별 고위험거래</S.RightTitle>
              </S.RightHeader>
              <S.ChartPlaceholder>
                <div>Bar Chart</div>
                <S.ChainLegendWrapper>
                  <S.LegendWrapper>
                    <S.LegendDot color="#D42649" />
                    <S.LegendText>Chain1</S.LegendText>
                  </S.LegendWrapper>
                  <S.LegendWrapper>
                    <S.LegendDot color="#5CC8F8" />
                    <S.LegendText>Chain2</S.LegendText>
                  </S.LegendWrapper>
                </S.ChainLegendWrapper>
              </S.ChartPlaceholder>
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
              <S.ChartPlaceholder>Line Chart</S.ChartPlaceholder>
            </S.RightBottom>
          </S.RightPanel>
        </S.MainContainer>
      </S.ContentSection>
      <S.HeaderSection>
        <S.Title>이상 패턴 및 거래 모니터링</S.Title>
      </S.HeaderSection>
    </S.Root>
  );
}
