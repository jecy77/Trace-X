import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as S from "./demoHeader.style";
import BackIcon from "@/assets/icon_next_lg.svg";
import AddIcon from "@/assets/icon_add.svg";
export default function Header() {
    return (_jsx(_Fragment, { children: _jsxs(S.Header, { children: [_jsxs(S.IconContainer, { children: [_jsx(S.Icon, { children: _jsx("img", { src: BackIcon, alt: "\uB4A4\uB85C\uAC00\uAE30\uC544\uC774\uCF58" }) }), _jsx(S.Icon, { children: _jsx("img", { src: AddIcon, alt: "\uB4A4\uB85C\uAC00\uAE30\uC544\uC774\uCF58" }) })] }), _jsx(S.Title, { children: "\uC1A1\uAE08" })] }) }));
}
