import { ResponsiveLine } from "@nivo/line";

interface MeanRiskScoreProps {
  data?: Record<string, number>;
}

export default function MeanRiskScore({ data }: MeanRiskScoreProps) {
  // 00 → "12 AM", 14 → "2 PM"
  function formatHour(hh: number) {
    const hour = hh % 24;
    const isPM = hour >= 12;

    const displayHour =
      hour === 0 ? 12 : hour === 12 ? 12 : hour > 12 ? hour - 12 : hour;

    return `${displayHour}${isPM ? "PM" : "AM"}`; // ← 공백 제거!
  }

  // backend → nivo
  const chartData = [
    {
      id: "Mean Risk Score",
      color: "#D42649",
      data: data
        ? Object.entries(data)
            .map(([hh, score]) => ({
              x: Number(hh), // 정렬용 숫자
              y: score,
              xFormatted: formatHour(Number(hh)),
              yFormatted: score.toString(),
            }))
            .sort((a, b) => a.x - b.x) // 시간 순 정렬
        : [
            { x: 0, y: 2.1, xFormatted: "12AM", yFormatted: "2.1" },
            { x: 2, y: 2.5, xFormatted: "2AM", yFormatted: "2.5" },
            { x: 4, y: 1.8, xFormatted: "4AM", yFormatted: "1.8" },
            { x: 6, y: 2.2, xFormatted: "6AM", yFormatted: "2.2" },
            { x: 8, y: 1.9, xFormatted: "8AM", yFormatted: "1.9" },
            { x: 10, y: 2.3, xFormatted: "10AM", yFormatted: "2.3" },
            { x: 12, y: 3.4, xFormatted: "12PM", yFormatted: "3.4" },
            { x: 14, y: 2.8, xFormatted: "2PM", yFormatted: "2.8" },
            { x: 16, y: 3.9, xFormatted: "4PM", yFormatted: "3.9" },
            { x: 18, y: 2.7, xFormatted: "6PM", yFormatted: "2.7" },
            { x: 20, y: 3.2, xFormatted: "8PM", yFormatted: "3.2" },
            { x: 22, y: 2.4, xFormatted: "10PM", yFormatted: "2.4" },
          ],
    },
  ];

  return (
    <div style={{ width: "100%", height: "120px" }}>
      <ResponsiveLine
        data={chartData}
        useMesh={true}
        margin={{ top: 10, right: 20, bottom: 30, left: 20 }}
        xScale={{ type: "linear" }}
        yScale={{ type: "linear", min: "auto", max: "auto" }}
        axisLeft={null}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 0,
          tickPadding: 8,
          tickRotation: 0,
          format: (v) => formatHour(v as number),
          tickValues: [0, 8, 16, 22],
        }}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        colors={["#D42649"]}
        lineWidth={2}
        curve="monotoneX"
        theme={{
          axis: {
            ticks: {
              text: {
                fill: "#AEB9E1",
                fontSize: 11,
                fontFamily: "Pretendard",
              },
            },
          },
          tooltip: {
            container: {
              background: "rgba(10,15,35,0.9)",
              border: "1px solid #2a3042",
              padding: "8px 12px",
              borderRadius: "8px",
              color: "#fff",
              fontFamily: "Pretendard",
              fontSize: 12,
              boxShadow: "0 2px 6px rgba(0,0,0,0.25)",
            },
          },
        }}
        tooltip={({ point }) => (
          <div>
            <strong>{formatHour(point.data.x as number)}</strong>
            <div style={{ color: "#D42649", marginTop: 4 }}>{point.data.y}</div>
          </div>
        )}
      />
    </div>
  );
}
