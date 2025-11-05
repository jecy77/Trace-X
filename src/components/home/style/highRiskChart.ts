import styled from "styled-components";

export const LeftChartSection = styled.div`
  padding: 40px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 40px;
  border-right: 1px solid var(--secondary200, #343b4f);
`;

export const LeftHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const LeftTitle = styled.div`
  color: var(--primary400, #aeb9e1);
  font-size: 14px;
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
