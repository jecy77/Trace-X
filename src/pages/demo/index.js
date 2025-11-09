import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Header from "@/components/layout/DemoHeader";
import * as S from "./styles";
import SendIcon from "@/assets/icon_send.svg";
import { useState } from "react";
import ReportSheet from "@/components/ReportSheet";
import DownloadIcon from "@/assets/icon_download.svg";
export default function DemoPage() {
    // state
    const [isCardOpened, setIsCardOpened] = useState(false);
    const [isChecked, setIsChecked] = useState(false);
    const [isDetailOpened, setIsDetailOpened] = useState(false);
    //handler
    function handleCheck() {
        setIsCardOpened((prev) => !prev);
        setIsChecked(true);
    }
    function handleDetailBtn() {
        setIsDetailOpened(true);
        setIsCardOpened(false);
    }
    return (_jsx(_Fragment, { children: _jsxs(S.Home, { children: [_jsx(Header, {}), _jsx(S.FormSection, { children: _jsxs(S.Body, { children: [_jsxs(S.ToWrapper, { children: [_jsx("img", { src: SendIcon, alt: "\uBCF4\uB0B4\uAE30\uC544\uC774\uCF58" }), _jsx(S.To, { children: "TO" })] }), _jsxs(S.FormSection, { children: [_jsxs(S.FormItem, { children: [_jsx(S.Label, { children: "\uB124\uD2B8\uC6CC\uD06C" }), _jsx(S.Input, { placeholder: "\uC120\uD0DD" })] }), _jsxs(S.FormItem, { children: [_jsx(S.Label, { children: "\uC8FC\uC18C" }), _jsx(S.Input, { placeholder: "\uC8FC\uC18C\uB97C \uC785\uB825\uD574\uC8FC\uC138\uC694." })] }), _jsxs(S.FormItem, { children: [_jsx(S.Label, { children: "\uAE08\uC561" }), _jsx(S.Input, { placeholder: "\uAE08\uC561\uC744 \uC785\uB825\uD574\uC8FC\uC138\uC694." })] })] }), _jsx(S.CheckButton, { "$isChecked": isChecked, onClick: handleCheck, children: isChecked ? "검사 완료" : "검사" }), _jsx(S.SendButton, { "$isChecked": isChecked, children: "\uC1A1\uAE08\uD558\uAE30" })] }) }), _jsx(S.Overlay, { "$isOpen": isCardOpened, onMouseDown: () => setIsCardOpened(false) }), _jsxs(S.Card, { "$isOpen": isCardOpened, role: "dialog", "aria-modal": "true", children: [_jsx(S.CardHeader, { children: "\uAC80\uC0AC \uACB0\uACFC" }), _jsxs(S.CardRow, { children: [_jsx(S.RedDot, {}), _jsx("span", { children: "\uC704\uD5D8" })] }), _jsxs("div", { style: { display: "flex", gap: "10px", flexDirection: "column" }, children: [_jsx(S.CardBody, { children: "BRIDGE_TO_MIXER" }), _jsxs("div", { style: {
                                        display: "flex",
                                        justifyContent: "space-between",
                                        flexDirection: "column",
                                    }, children: [_jsxs(S.CardBody, { children: [_jsx("div", { style: { color: "black", fontSize: "15px" }, children: "\uD649 \uC218" }), " ", _jsx("div", { children: "2" })] }), _jsxs(S.CardBody, { children: [_jsx("span", { style: { color: "black", fontSize: "15px" }, children: "\uC2DC\uAC04 \uAC04\uACA9" }), " ", _jsx("div", { children: "35m" })] }), _jsxs(S.CardBody, { children: [_jsx("span", { style: { color: "black", fontSize: "15px" }, children: "\uAE08\uC561 \uCC28\uC774\uC728" }), " ", _jsx("div", { children: "0.18" })] })] }), _jsx("div", { style: { alignSelf: "flex-end" }, children: _jsx(S.CardBody, { children: "v1.0.0 \u00B7 2025-09-08 14:30" }) })] }), _jsx(S.CardActions, { children: _jsx(S.DetailBtn, { onClick: handleDetailBtn, children: "\uC790\uC138\uD788" }) })] }), _jsx(ReportSheet, { isOpen: isDetailOpened, onClose: () => setIsCardOpened(false), risk: "danger", network: "\uB124\uD2B8\uC6CC\uD06C", address: "\uC8FC\uC18C\uC8FC\uC18C\uC8FC\uC18C\uC8FC\uC18C", time: "2025-09-08 14:30", evidences: ["첫 번째 근거", "두 번째 근거", "세 번째 근거"], onMouseDown: () => setIsDetailOpened(false), DownloadIcon: DownloadIcon })] }) }));
}
