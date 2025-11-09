import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOutletContext } from "react-router";
import * as S from "./style";
import { useState } from "react";
const abnormalPatterns = [
    "Fan-in",
    "Fan-out",
    "Wash Trading",
    "Mixing",
    "Peeling",
];
const tokens = ["ETH", "USDT", "USDC", "BTC", "DAI"];
const dummyData = Array.from({ length: 50 }, (_, i) => ({
    id: (i + 1).toString().padStart(5, "0"),
    from: "0x1a...e2b",
    to: "0x9f...d41",
    amount: `${(Math.random() * 10000 + 1000).toFixed(0)}`,
    token: tokens[i % tokens.length],
    timestamp: `0${(i % 9) + 1} Sep 2019`,
    pattern: abnormalPatterns[i % abnormalPatterns.length],
    risk: ["위험", "경고", "안전"][i % 3],
    score: [0.85, 0.72, 0.33][i % 3],
}));
export default function LivePage() {
    const { title, intro } = useOutletContext();
    const [page, setPage] = useState(1);
    const [selectedChain, setSelectedChain] = useState("전체");
    const [selectedType, setSelectedType] = useState("전체");
    const [selectedRisk, setSelectedRisk] = useState("전체");
    const [openMenu, setOpenMenu] = useState(null);
    const itemsPerPage = 10;
    const filteredData = dummyData.filter((tx) => {
        const chainMatch = selectedChain === "전체" || tx.token === selectedChain;
        const typeMatch = selectedType === "전체" || tx.pattern === selectedType;
        const riskMatch = selectedRisk === "전체" || tx.risk === selectedRisk;
        return chainMatch && typeMatch && riskMatch;
    });
    const startIdx = (page - 1) * itemsPerPage;
    const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const handleSelect = (menu, value) => {
        if (menu === "chain")
            setSelectedChain(value);
        if (menu === "type")
            setSelectedType(value);
        if (menu === "risk")
            setSelectedRisk(value);
        setOpenMenu(null);
    };
    return (_jsxs(S.Root, { children: [_jsxs(S.HeaderSection, { children: [_jsx(S.Title, { children: title }), _jsx(S.Intro, { children: intro })] }), _jsxs(S.FilterBar, { children: [_jsxs(S.FilterGroup, { children: [_jsxs(S.FilterByButton, { children: [_jsx("div", { children: "Img" }), _jsx("span", { children: "Filter By" })] }), _jsx(S.Divider, {}), _jsxs(S.DropdownWrapper, { children: [_jsxs(S.FilterSelect, { onClick: () => setOpenMenu(openMenu === "chain" ? null : "chain"), children: ["\uD1A0\uD070 (", selectedChain, ") \u25BC"] }), openMenu === "chain" && (_jsx(S.DropdownMenu, { children: ["전체", "ETH", "USDT", "USDC", "BTC", "DAI"].map((c) => (_jsx("li", { onClick: () => handleSelect("chain", c), children: c }, c))) }))] }), _jsx(S.Divider, {}), _jsxs(S.DropdownWrapper, { children: [_jsxs(S.FilterSelect, { onClick: () => setOpenMenu(openMenu === "type" ? null : "type"), children: ["\uC774\uC0C1 \uD328\uD134 (", selectedType, ") \u25BC"] }), openMenu === "type" && (_jsx(S.DropdownMenu, { children: ["전체", ...abnormalPatterns].map((t) => (_jsx("li", { onClick: () => handleSelect("type", t), children: t }, t))) }))] }), _jsx(S.Divider, {}), _jsxs(S.DropdownWrapper, { children: [_jsxs(S.FilterSelect, { onClick: () => setOpenMenu(openMenu === "risk" ? null : "risk"), children: ["\uB9AC\uC2A4\uD06C (", selectedRisk, ") \u25BC"] }), openMenu === "risk" && (_jsx(S.DropdownMenu, { children: ["전체", "위험", "경고", "안전"].map((r) => (_jsx("li", { onClick: () => handleSelect("risk", r), children: r }, r))) }))] })] }), _jsx(S.RefreshButton, { children: "\uD0D0\uC9C0 \uC2DC\uC791" })] }), _jsxs(S.Table, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx("th", { children: "TxHash" }), _jsx("th", { children: "From" }), _jsx("th", { children: "To" }), _jsx("th", { children: "Amount" }), _jsx("th", { children: "Token" }), _jsx("th", { children: "TimeStamp" }), _jsx("th", { children: "Pattern" }), _jsx("th", { children: "Risk" })] }) }), _jsx("tbody", { children: currentData.map((tx) => (_jsxs(S.TableRow, { "$risk": tx.risk, children: [_jsx("td", { children: tx.id }), _jsx("td", { children: tx.from }), _jsx("td", { children: tx.to }), _jsx("td", { children: tx.amount }), _jsx("td", { children: tx.token }), _jsx("td", { children: tx.timestamp }), _jsx("td", { children: tx.pattern }), _jsx("td", { children: _jsxs(S.RiskTag, { "$level": tx.risk === "위험"
                                            ? "high"
                                            : tx.risk === "경고"
                                                ? "mid"
                                                : "low", children: [tx.risk, " ", _jsx("span", { children: tx.score.toFixed(2) })] }) })] }, tx.id))) })] }), _jsx(S.Pagination, { children: Array.from({ length: totalPages }).map((_, i) => (_jsx(S.PageButton, { "$active": page === i + 1, onClick: () => setPage(i + 1), children: i + 1 }, i))) })] }));
}
