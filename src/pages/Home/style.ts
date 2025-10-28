import styled from "styled-components";

export const Root = styled.div`
  padding: 18px 50px;
  width: 100%;
  overflow-y: scroll;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.div`
  color: var(--white, #fff);
  font-family: "Mona Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const Intro = styled.div`
  color: var(--primary400, #aeb9e1);
  font-family: "Mona Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;

export const ContentSection = styled.div`
  padding-top: 30px;
  padding-bottom: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

export const StatCardContainer = styled.div`
  display: flex;
  gap: 16px;
`;

// export const MainContainer = styled.div`
//   width: 100%;
//   height: 550px;

//   border-radius: 8px;
//   border: 1px solid var(--secondary200, #343b4f);
//   background: var(--secondary, #1c2c59);

//   padding: 40px;
// `;
export const MainContainer = styled.div`
  width: 100%;
  height: 550px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 16px;
  border-radius: 8px;
  border: 1px solid var(--secondary200, #343b4f);
  background: var(--secondary, #1c2c59);
  padding: 40px;
`;

/* -------------------- 왼쪽 섹션 -------------------- */
export const LeftChartSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-right: 20px;
`;

export const LeftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LeftTitle = styled.div`
  color: var(--primary400, #aeb9e1);
  font-size: 13px;
  font-weight: 500;
`;

export const LeftValue = styled.div`
  color: var(--white, #fff);
  font-size: 24px;
  font-weight: 600;
  margin-top: 4px;
`;

export const LegendWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ChainLegendWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const LegendDot = styled.div<{ color: string }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${({ color }) => color};
`;

export const LegendText = styled.span`
  color: var(--primary400, #aeb9e1);
  font-size: 12px;
`;

export const DateRange = styled.div`
  background: #0a1330;
  color: #aeb9e1;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 11px;
  margin-left: 8px;
`;

export const ChartPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin-top: 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aeb9e1;
  font-size: 13px;
`;

/* -------------------- 오른쪽 섹션 -------------------- */
export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const RightTop = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const RightBottom = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const RightHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const RightTitle = styled.div`
  color: var(--primary400, #aeb9e1);
  font-size: 13px;
  font-weight: 500;
`;

export const RiskValueRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 6px;
  margin-left: 4px;
`;

export const RiskValue = styled.div`
  color: var(--white, #fff);
  font-family: "Mona Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const RiskDiff = styled.div<{ $isUp: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;

  font-family: "Mona Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 14px;
  color: ${({ $isUp }) =>
    $isUp ? "var(--red300, #FF5A65)" : "var(--skyblue300, #00D4FF)"};
  background-color: ${({ $isUp }) =>
    $isUp
      ? "var(--red20, rgba(255, 90, 101, 0.20))"
      : " var(--skyblue20, rgba(0, 212, 255, 0.20))"};
  border: ${({ $isUp }) =>
    $isUp
      ? "1px solid var(--red20, rgba(255, 90, 101, 0.20))"
      : "1px solid var(--skyblue20, rgba(0, 212, 255, 0.20))"};
  border-radius: 2px;
`;

export const ArrowIcon = styled.img`
  width: 8px;
  height: 8px;
`;
