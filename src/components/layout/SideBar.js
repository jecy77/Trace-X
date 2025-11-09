import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { menu } from "@/data/menu";
import { SideMenuItem } from "../SideMenuItem";
import * as S from "./sideBar.style";
export default function SideBar() {
    return (_jsxs(S.SideBar, { children: [_jsx(S.LogoContainer, { children: "Trace - X" }), _jsx(S.SideMenuContainer, { children: menu.map((m) => (_jsx(SideMenuItem, { title: m.title, icon: m.svgPath, activeIcon: m.activeSvgPath, path: m.path }, m.title))) })] }));
}
