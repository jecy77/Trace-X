import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { ResponsiveBar } from "@nivo/bar";
import * as S from "./style/highRiskByEachChain";
export default function HighRiskByEachChain({ data, }) {
    // 더미 데이터 (월별 체인별 거래량)
    const dummyData = [
        { month: "Jan", Chain1: 80, Chain2: 70, Chain3: 65, Chain4: 55 },
        { month: "Feb", Chain1: 60, Chain2: 50, Chain3: 45, Chain4: 35 },
        { month: "Mar", Chain1: 90, Chain2: 75, Chain3: 70, Chain4: 60 },
        { month: "Apr", Chain1: 70, Chain2: 85, Chain3: 50, Chain4: 40 },
        { month: "May", Chain1: 100, Chain2: 95, Chain3: 80, Chain4: 75 },
        { month: "Jun", Chain1: 85, Chain2: 60, Chain3: 55, Chain4: 50 },
    ];
    const chartData = data || dummyData;
    const colors = ["#D64A4A", "#5CC8F8", "#ffe641", "#d5a2ff"];
    return (_jsxs(_Fragment, { children: [_jsx(S.Container, { children: _jsx(ResponsiveBar, { data: chartData, keys: ["Chain1", "Chain2", "Chain3", "Chain4"], indexBy: "month", margin: { top: 20, right: 30, bottom: 70, left: 50 }, padding: 0.3, groupMode: "grouped", colors: colors, enableLabel: false, borderRadius: 2, axisLeft: null, axisBottom: {
                        tickSize: 0,
                        tickPadding: 10,
                        tickRotation: 0,
                    }, 
                    //   axisLeft={{
                    //     tickSize: 0,
                    //     tickPadding: 10,
                    //     tickRotation: 0,
                    //   }}
                    theme: {
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
                        tooltip: {
                            container: {
                                background: "rgba(10,15,35,0.9)",
                                color: "#fff",
                                fontSize: 13,
                                borderRadius: 8,
                                border: "1px solid #2a3042",
                                fontFamily: "Pretendard",
                            },
                        },
                    }, tooltip: ({ id, value, indexValue }) => (_jsxs("div", { style: {
                            padding: "8px 12px",
                            background: "rgba(10,15,35,0.9)",
                            borderRadius: "8px",
                            border: "1px solid #2a3042",
                        }, children: [_jsxs("strong", { style: { color: "#fff" }, children: [id, ": $", value, "K"] }), _jsxs("div", { style: { color: "#AEB9E1", fontSize: 11, marginTop: 4 }, children: [indexValue, ", 2024"] })] })) }) }), _jsxs(S.ChainLegendWrapper, { children: [_jsxs(S.LegendWrapper, { children: [_jsx(S.LegendDot, { color: "#D42649" }), _jsx(S.LegendText, { children: "Chain1" })] }), _jsxs(S.LegendWrapper, { children: [_jsx(S.LegendDot, { color: "#5CC8F8" }), _jsx(S.LegendText, { children: "Chain2" })] }), _jsxs(S.LegendWrapper, { children: [_jsx(S.LegendDot, { color: "#ffe641" }), _jsx(S.LegendText, { children: "Chain3" })] }), _jsxs(S.LegendWrapper, { children: [_jsx(S.LegendDot, { color: "#d5a2ff" }), _jsx(S.LegendText, { children: "Chain4" })] })] })] }));
}
