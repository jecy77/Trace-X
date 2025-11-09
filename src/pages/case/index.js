import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useOutletContext } from "react-router";
import * as S from "./style";
export default function CasePage() {
    const { title, intro } = useOutletContext();
    return (_jsx(S.Root, { children: _jsxs(S.HeaderSection, { children: [_jsx(S.Title, { children: title }), _jsx(S.Intro, { children: intro })] }) }));
}
