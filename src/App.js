import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router";
import DemoPage from "./pages/demo";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/home";
import AdhocPage from "./pages/adhoc";
import LivePage from "./pages/live";
import ReportPage from "./pages/report";
import CasePage from "./pages/case";
function App() {
    return (_jsx(_Fragment, { children: _jsxs(Routes, { children: [_jsxs(Route, { element: _jsx(MainLayout, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: "live-detection", element: _jsx(LivePage, {}) }), _jsx(Route, { path: "adhoc", element: _jsx(AdhocPage, {}) }), _jsx(Route, { path: "report", element: _jsx(ReportPage, {}) }), _jsx(Route, { path: "case", element: _jsx(CasePage, {}) })] }), _jsx(Route, { path: "demo", element: _jsx(DemoPage, {}) })] }) }));
}
export default App;
