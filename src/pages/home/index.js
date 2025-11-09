import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOutletContext } from "react-router";
import * as S from "./style";
import ArrowUp from "@/assets/icon_arrow_up.svg";
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
    const { title, intro } = useOutletContext();
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
    return (_jsxs(S.Root, { children: [_jsxs(S.HeaderSection, { children: [_jsx(S.Title, { children: title }), _jsx(S.Intro, { children: intro })] }), _jsxs(S.ContentSection, { children: [_jsx(S.StatCardContainer, { children: stats.map((stat) => (_jsx(StatCard, { ...stat }, stat.title))) }), _jsxs(S.MainContainer, { children: [_jsx(HighRiskChart, {}), _jsxs(S.RightPanel, { children: [_jsxs(S.RightTop, { children: [_jsx(S.RightHeader, { children: _jsx(S.RightTitle, { children: "\uCCB4\uC778\uBCC4 \uACE0\uC704\uD5D8\uAC70\uB798" }) }), _jsx(HighRiskByEachChain, {})] }), _jsxs(S.RightBottom, { children: [_jsx(S.RightHeader, { children: _jsx(S.RightTitle, { children: "\uD3C9\uADE0 \uB9AC\uC2A4\uD06C \uC810\uC218" }) }), _jsxs(S.RiskValueRow, { children: [_jsx(S.RiskValue, { children: "0.3" }), _jsxs(S.RiskDiff, { "$isUp": true, children: [_jsx("div", { children: "3.1%" }), _jsx(S.ArrowIcon, { src: ArrowUp, alt: "상승" })] })] }), _jsx(S.ChartPlaceholder, { children: _jsx(MeanRiskScore, {}) })] })] })] })] }), _jsx(S.HeaderSection, { children: _jsx(S.Title, { children: "\uC774\uC0C1 \uD328\uD134 \uBC0F \uAC70\uB798 \uBAA8\uB2C8\uD130\uB9C1" }) }), _jsxs(S.AnomalySection, { children: [_jsx(S.AnomalyLeft, { children: _jsxs(S.AnomalyCard, { children: [_jsx(S.AnomalyHeader, { children: _jsx(S.LeftTitle, { children: "\uD0D0\uC9C0\uB41C \uC774\uC0C1 \uD328\uD134 \uC218" }) }), _jsx(S.GaugePlaceholder, { children: _jsx(S.GaugeContainer, { children: _jsx(DetectedPatternGauge, {}) }) }), _jsxs(S.PatternList, { children: [_jsxs(S.PatternItem, { children: [_jsx(S.LegendDot, { color: "#D42649" }), _jsx(S.PatternText, { children: "Fan-in" }), _jsx(S.PatternValue, { children: "15,624" })] }), _jsxs(S.PatternItem, { children: [_jsx(S.LegendDot, { color: "#5CC8F8" }), _jsx(S.PatternText, { children: "Peel Chain" }), _jsx(S.PatternValue, { children: "5,546" })] }), _jsxs(S.PatternItem, { children: [_jsx(S.LegendDot, { color: "#847AFF" }), _jsx(S.PatternText, { children: "Scatter Gather" }), _jsx(S.PatternValue, { children: "2,478" })] })] })] }) }), _jsx(S.AnomalyRight, { children: _jsxs(S.AnomalyCard, { children: [_jsxs(S.AnomalyHeader, { children: [_jsx(S.LeftTitle, { children: "\uCD5C\uADFC \uACE0\uC561 \uAC70\uB798" }), _jsx(S.FilterButton, { children: "\uAC70\uB798\uB7C9 \uC21C" })] }), _jsxs(S.Table, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "TxHash" }), _jsx("th", { children: "\uB0A0\uC9DC" }), _jsx("th", { children: "\uB9AC\uC2A4\uD06C" }), _jsx("th", { children: "\uAC70\uB798\uB7C9" })] }) }), _jsx("tbody", { children: [
                                                {
                                                    id: "#1532",
                                                    date: "Dec 30, 10:06 AM",
                                                    risk: "위험",
                                                    amount: "$329.40",
                                                },
                                                {
                                                    id: "#1531",
                                                    date: "Dec 29, 2:59 AM",
                                                    risk: "경고",
                                                    amount: "$117.24",
                                                },
                                                {
                                                    id: "#1530",
                                                    date: "Dec 29, 1:54 AM",
                                                    risk: "안전",
                                                    amount: "$82.16",
                                                },
                                                {
                                                    id: "#1531",
                                                    date: "Dec 29, 2:59 AM",
                                                    risk: "경고",
                                                    amount: "$117.24",
                                                },
                                                {
                                                    id: "#1532",
                                                    date: "Dec 30, 10:06 AM",
                                                    risk: "위험",
                                                    amount: "$329.40",
                                                },
                                                {
                                                    id: "#1531",
                                                    date: "Dec 29, 2:59 AM",
                                                    risk: "경고",
                                                    amount: "$117.24",
                                                },
                                                {
                                                    id: "#1531",
                                                    date: "Dec 29, 2:59 AM",
                                                    risk: "경고",
                                                    amount: "$117.24",
                                                },
                                            ].map((tx) => (_jsxs(S.TableRow, { "$risk": tx.risk, children: [_jsx("td", { children: tx.id }), _jsx("td", { children: tx.date }), _jsx("td", { children: _jsx(S.RiskTag, { "$level": tx.risk === "위험"
                                                                ? "high"
                                                                : tx.risk === "경고"
                                                                    ? "mid"
                                                                    : "low", children: tx.risk }) }), _jsx("td", { children: tx.amount })] }, tx.id))) })] })] }) })] })] }));
}
