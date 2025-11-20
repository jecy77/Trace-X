import { ResponsiveLine } from "@nivo/line";
import * as S from "./style/highRiskChart";

type TrendMap = Record<string, number>;

interface HighRiskChartProps {
  data?: TrendMap;
}

export default function HighRiskChart({ data }: HighRiskChartProps) {
  // 월 → "Jan" 변환
  const monthMap = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  /** 더미 12개월 데이터 */
  const fallbackDummy = [
    { x: "Jan", y: 5 },
    { x: "Feb", y: 12 },
    { x: "Mar", y: 18 },
    { x: "Apr", y: 22 },
    { x: "May", y: 31 },
    { x: "Jun", y: 27 },
    { x: "Jul", y: 35 },
    { x: "Aug", y: 49 },
    { x: "Sep", y: 40 },
    { x: "Oct", y: 33 },
    { x: "Nov", y: 22 },
    { x: "Dec", y: 15 },
  ];

  /** 백엔드 데이터를 nivo 형식으로 변환 */
  const trendData = data
    ? Object.entries(data)
        .map(([ym, value]) => {
          const [, month] = ym.split("-");
          return {
            x: monthMap[Number(month) - 1], // "2025-03" → "Mar"
            y: value,
          };
        })
        .sort((a, b) => {
          const aIdx = monthMap.indexOf(a.x);
          const bIdx = monthMap.indexOf(b.x);
          return aIdx - bIdx;
        })
    : fallbackDummy;

  /** nivo data 구조 */
  const chartData = [
    {
      id: "고위험",
      color: "#D42649",
      data: trendData,
    },
  ];

  return (
    <S.LeftChartSection>
      <S.LeftHeader>
        <div>
          <S.LeftTitle>고위험거래 추이</S.LeftTitle>
        </div>

        <S.LegendWrapper>
          <S.LegendDot color="#D42649" />
          <S.LegendText>고위험</S.LegendText>
        </S.LegendWrapper>
      </S.LeftHeader>

      <div style={{ height: "360px", marginTop: "20px" }}>
        <ResponsiveLine
          data={chartData}
          colors={(d) => d.color}
          margin={{ top: 30, right: 40, bottom: 50, left: 50 }}
          xScale={{ type: "point" }}
          yScale={{ type: "linear", min: 0, max: "auto" }}
          curve="monotoneX"
          enablePoints={false}
          enableArea
          areaOpacity={0.1}
          lineWidth={3}
          enableGridX={false}
          enableGridY
          axisBottom={{
            tickSize: 0,
            tickPadding: 10,
          }}
          axisLeft={{
            tickSize: 0,
            tickPadding: 10,
          }}
          useMesh
          enableSlices="x"
          sliceTooltip={({ slice }) => {
            const high = slice.points[0];

            return (
              <div
                style={{
                  background: "rgba(10, 15, 35, 0.9)",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  border: "1px solid #2a3042",
                  color: "#fff",
                  fontFamily: "Pretendard",
                  fontSize: "13px",
                }}
              >
                {/* 월 */}
                <div style={{ marginBottom: 6, fontWeight: 500 }}>
                  {high.data.x}
                </div>

                {/* 값만 표시 */}
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
                      flexShrink: 0,
                    }}
                  />
                  <strong style={{ color: "#D42649" }}>{high.data.y}</strong>
                </div>
              </div>
            );
          }}
          theme={{
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
              line: { stroke: "#2a3042", strokeWidth: 0.5 },
            },
          }}
        />
      </div>
    </S.LeftChartSection>
  );
}
