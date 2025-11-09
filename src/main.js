import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import GlobalStyle from "./styles/globalStyle";
import App from "./App";
import { BrowserRouter } from "react-router";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
createRoot(document.getElementById("root")).render(_jsx(StrictMode, { children: _jsxs(ThemeProvider, { theme: theme, children: [_jsx(GlobalStyle, {}), _jsx(BrowserRouter, { children: _jsx(App, {}) })] }) }));
