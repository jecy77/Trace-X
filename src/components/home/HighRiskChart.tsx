import { ResponsiveLine } from "@nivo/line";
import * as S from "./style/highRiskChart";

type DataPoint = { x: string; y: number };

interface HighRiskChartProps {
  data?: {
    highRisk: DataPoint[];
    total: DataPoint[];
  };
}

export default function HighRiskChart({ data }: HighRiskChartProps) {
  // 🔹 K 단위 포맷
  const formatK = (num: number) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : `${num}`;

  // 🔹 더미 데이터
  const dummyData = {
    highRisk: [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 20000 },
      { x: "Mar", y: 60000 },
      { x: "Apr", y: 100000 },
      { x: "May", y: 120000 },
      { x: "Jun", y: 125000 },
      { x: "Jul", y: 140000 },
      { x: "Aug", y: 170000 },
      { x: "Sep", y: 200000 },
      { x: "Oct", y: 220000 },
      { x: "Nov", y: 230000 },
      { x: "Dec", y: 240000 },
    ],
    total: [
      { x: "Jan", y: 30000 },
      { x: "Feb", y: 15000 },
      { x: "Mar", y: 40000 },
      { x: "Apr", y: 60000 },
      { x: "May", y: 85000 },
      { x: "Jun", y: 100000 },
      { x: "Jul", y: 120000 },
      { x: "Aug", y: 160000 },
      { x: "Sep", y: 130000 },
      { x: "Oct", y: 90000 },
      { x: "Nov", y: 110000 },
      { x: "Dec", y: 130000 },
    ],
  };

  const chartData = [
    {
      id: "고위험",
      color: "#D42649",
      data: data?.highRisk || dummyData.highRisk,
    },
    {
      id: "전체",
      color: "#5CC8F8",
      data: data?.total || dummyData.total,
    },
  ];

  return (
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

      <div style={{ height: "360px", marginTop: "20px" }}>
        <ResponsiveLine
          data={chartData}
          colors={(d) => d.color}
          margin={{ top: 30, right: 40, bottom: 50, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: 250000 }}
          curve="basis"
          enablePoints={false}
          enableArea
          areaOpacity={0.1}
          lineWidth={3}
          enableGridX={false}
          enableGridY
          gridYValues={[0, 50000, 100000, 150000, 200000, 250000]}
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
            format: (v) => v,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
            tickValues: [0, 50000, 100000, 150000, 200000, 250000],
            format: (v) => `${v / 1000}K`,
          }}
          useMesh
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            const high = slice.points.find((p) => p.id.includes("고위험"));
            const total = slice.points.find((p) => p.id.includes("전체"));

            return (
              <div
                style={{
                  background: "rgba(10, 15, 35, 0.9)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #2a3042",
                  minWidth: "140px",
                  color: "#fff",
                  fontFamily: "Pretendard",
                  fontSize: "13px",
                }}
              >
                <div style={{ marginBottom: 6, fontWeight: 500 }}>
                  June 21, 2023
                </div>
                {high && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#D42649",
                      }}
                    />
                    <span>고위험:</span>
                    <strong style={{ color: "#D42649" }}>
                      ${formatK(high.data.y as number)}
                    </strong>
                  </div>
                )}
                {total && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                    }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#5CC8F8",
                      }}
                    />
                    <span>전체:</span>
                    <strong style={{ color: "#5CC8F8" }}>
                      ${formatK(total.data.y as number)}
                    </strong>
                  </div>
                )}
              </div>
            );
          }}
          theme={{
            background: "transparent",
            axis: {
              ticks: {
                text: {
                  fill: "#AEB9E1",
                  fontSize: 12,
                  fontFamily: "Pretendard",
                },
              },
            },
            grid: {
              line: {
                stroke: "#2a3042",
                strokeWidth: 0.5,
              },
            },
          }}
        />
      </div>
    </S.LeftChartSection>
  );
}
