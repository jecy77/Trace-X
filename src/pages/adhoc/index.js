import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOutletContext } from "react-router";
import * as S from "./style";
import { dummyGraphData } from "@/data/dummyGraphData";
import { Graph } from "@/components/adhoc/Graph";
export default function AdhocPage() {
    const { title, intro } = useOutletContext();
    return (_jsxs(S.Root, { children: [_jsxs(S.HeaderSection, { children: [_jsx(S.Title, { children: title }), _jsx(S.Intro, { children: intro })] }), _jsx(Graph, { data: dummyGraphData })] }));
}
