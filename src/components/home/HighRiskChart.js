import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsiveLine } from "@nivo/line";
import * as S from "./style/highRiskChart";
import { useState } from "react";
export default function HighRiskChart({ data }) {
    // K 단위 포맷
    const formatK = (num) => num >= 1000 ? `${(num / 1000).toFixed(1)}k` : `${num}`;
    // 선택 연도
    const [selectedYear, setSelectedYear] = useState(2024);
    // 더미 데이터
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
    return (_jsxs(S.LeftChartSection, { children: [_jsxs(S.LeftHeader, { children: [_jsxs("div", { children: [_jsx(S.LeftTitle, { children: "\uACE0\uC704\uD5D8\uAC70\uB798 \uCD94\uC774" }), _jsx(S.LeftValue, { children: "$240.8K" })] }), _jsxs(S.LegendWrapper, { children: [_jsx(S.LegendDot, { color: "#D42649" }), _jsx(S.LegendText, { children: "\uACE0\uC704\uD5D8" }), _jsx(S.LegendDot, { color: "#5CC8F8" }), _jsx(S.LegendText, { children: "\uC804\uCCB4" }), _jsx(S.YearSelect, { value: selectedYear, onChange: (e) => setSelectedYear(Number(e.target.value)), children: [2022, 2023, 2024, 2025].map((year) => (_jsx("option", { value: year, children: year }, year))) })] })] }), _jsx("div", { style: { height: "360px", marginTop: "20px" }, children: _jsx(ResponsiveLine, { data: chartData, colors: (d) => d.color, margin: { top: 30, right: 40, bottom: 50, left: 60 }, xScale: { type: "point" }, yScale: { type: "linear", min: 0, max: 250000 }, curve: "basis", enablePoints: false, enableArea: true, areaOpacity: 0.1, lineWidth: 3, enableGridX: false, enableGridY: true, gridYValues: [0, 50000, 100000, 150000, 200000, 250000], axisBottom: {
                        tickSize: 0,
                        tickPadding: 10,
                        format: (v) => v,
                    }, axisLeft: {
                        tickSize: 0,
                        tickPadding: 10,
                        tickValues: [0, 50000, 100000, 150000, 200000, 250000],
                        format: (v) => `${v / 1000}K`,
                    }, useMesh: true, enableSlices: "x", sliceTooltip: ({ slice }) => {
                        const high = slice.points.find((p) => p.id.includes("고위험"));
                        const total = slice.points.find((p) => p.id.includes("전체"));
                        return (_jsxs("div", { style: {
                                background: "rgba(10, 15, 35, 0.9)",
                                padding: "10px 14px",
                                borderRadius: "8px",
                                border: "1px solid #2a3042",
                                minWidth: "140px",
                                color: "#fff",
                                fontFamily: "Pretendard",
                                fontSize: "13px",
                            }, children: [_jsx("div", { style: { marginBottom: 6, fontWeight: 500 }, children: "June 21, 2023" }), high && (_jsxs("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }, children: [_jsx("div", { style: {
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#D42649",
                                            } }), _jsx("span", { children: "\uACE0\uC704\uD5D8:" }), _jsxs("strong", { style: { color: "#D42649" }, children: ["$", formatK(high.data.y)] })] })), total && (_jsxs("div", { style: {
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "6px",
                                    }, children: [_jsx("div", { style: {
                                                width: 8,
                                                height: 8,
                                                borderRadius: "50%",
                                                background: "#5CC8F8",
                                            } }), _jsx("span", { children: "\uC804\uCCB4:" }), _jsxs("strong", { style: { color: "#5CC8F8" }, children: ["$", formatK(total.data.y)] })] }))] }));
                    }, theme: {
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
                    } }) })] }));
}
