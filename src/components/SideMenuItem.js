import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as S from "./style/sideMenu";
export function SideMenuItem({ title, icon, activeIcon, path, }) {
    return (_jsx(S.MenuItem, { to: path, end: true, children: ({ isActive }) => (_jsxs(_Fragment, { children: [_jsx(S.MenuIcon, { src: isActive ? activeIcon : icon, alt: title }), _jsx("div", { children: title })] })) }));
}
