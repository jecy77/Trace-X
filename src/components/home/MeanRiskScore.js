import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveLine } from "@nivo/line";
export default function MeanRiskScore() {
    // 📊 더미 데이터 (시간대별 평균 점수)
    const data = [
        {
            id: "Mean Risk Score",
            color: "#D42649",
            data: [
                { x: "12 AM", y: 2.1 },
                { x: "2 AM", y: 2.5 },
                { x: "4 AM", y: 1.8 },
                { x: "6 AM", y: 2.2 },
                { x: "8 AM", y: 1.9 },
                { x: "10 AM", y: 2.3 },
                { x: "12 PM", y: 3.4 },
                { x: "2 PM", y: 2.8 },
                { x: "4 PM", y: 3.9 },
                { x: "6 PM", y: 2.7 },
                { x: "8 PM", y: 3.2 },
                { x: "10 PM", y: 2.4 },
                { x: "11 PM", y: 2.0 },
            ],
        },
    ];
    return (_jsx("div", { style: { width: "100%", height: "120px" }, children: _jsx(ResponsiveLine, { data: data, margin: { top: 10, right: 20, bottom: 30, left: 20 }, xScale: { type: "point" }, yScale: { type: "linear", min: "auto", max: "auto" }, curve: "monotoneX", axisLeft: null, axisTop: null, axisRight: null, axisBottom: {
                tickSize: 0,
                tickPadding: 10,
                tickRotation: 0,
                tickValues: ["12 AM", "8 AM", "4 PM", "11 PM"],
                format: (v) => v,
            }, enableGridX: false, enableGridY: false, colors: ["#D42649"], lineWidth: 2, enablePoints: false, useMesh: true, tooltip: ({ point }) => (_jsxs("div", { style: {
                    background: "rgba(10,15,35,0.9)",
                    border: "1px solid #2a3042",
                    padding: "6px 10px",
                    borderRadius: "8px",
                    color: "#fff",
                    fontFamily: "Pretendard",
                    fontSize: 12,
                }, children: [_jsx("strong", { children: point.data.xFormatted }), _jsx("div", { style: { color: "#D42649" }, children: point.data.yFormatted })] })), theme: {
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
                    line: { stroke: "#2a3042", strokeWidth: 0.5 },
                },
            } }) }));
}
