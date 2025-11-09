import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ResponsivePie } from "@nivo/pie";
export default function DetectedPatternGauge() {
    // 📊 더미 데이터 (게이지 섹션별 값)
    const data = [
        { id: "high", label: "High Risk", value: 60, color: "#D42649" },
        { id: "medium", label: "Medium", value: 25, color: "#3845F7" },
        { id: "low", label: "Low", value: 15, color: "#5CC8F8" },
    ];
    return (_jsxs("div", { style: {
            width: "100%",
            height: "200px",
            position: "relative",
            transform: "translateY(20%)",
        }, children: [_jsx(ResponsivePie, { data: data, startAngle: -90, endAngle: 90, sortByValue: true, padAngle: 2, innerRadius: 0.9, cornerRadius: 0, activeOuterRadiusOffset: 0, enableArcLinkLabels: false, enableArcLabels: false, colors: ({ data }) => data.color, borderWidth: 0, animate: true, motionConfig: "gentle", theme: {
                    background: "transparent",
                } }), _jsxs("div", { style: {
                    position: "absolute",
                    top: "60%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    color: "#FFFFFF",
                    fontFamily: "Pretendard",
                }, children: [_jsx("div", { style: { fontSize: "28px", fontWeight: 600 }, children: "23,648" }), _jsx("div", { style: { fontSize: "13px", color: "#AEB9E1", marginTop: "4px" }, children: "\uD0D0\uC9C0\uB41C \uC774\uC0C1 \uD328\uD134 \uC218" })] })] }));
}
