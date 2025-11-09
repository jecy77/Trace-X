import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from "styled-components";
import ArrowUp from "@/assets/icon_arrow_up.svg";
import ArrowDown from "@/assets/icon_arrow_down.svg";
export default function StatCard({ title, value, diff, isUp, icon, }) {
    return (_jsxs(Card, { children: [_jsxs(Header, { children: [_jsx(Icon, { src: icon, alt: title }), _jsx(Title, { children: title })] }), _jsxs(Body, { children: [_jsx(Value, { children: value }), _jsxs(Diff, { "$isUp": isUp, children: [_jsxs("div", { children: [diff, "%"] }), _jsx(ArrowIcon, { src: isUp ? ArrowUp : ArrowDown, alt: isUp ? "상승" : "하락" })] })] })] }));
}
// ---------- styled ----------
const Card = styled.div `
  width: 100%;
  height: 100px;
  border-radius: 8px;
  border: 0.6px solid var(--secondary200, #343b4f);
  background: var(--neutral800, #060a1d);
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Header = styled.div `
  display: flex;
  align-items: center;
  gap: 6px;
  color: #aeb9e1;
`;
const Icon = styled.img `
  width: 14px;
  height: 14px;
`;
const Title = styled.span `
  color: var(--primary400, #aeb9e1);
  font-family: "Mona Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px;
`;
const Body = styled.div `
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Value = styled.div `
  color: var(--white, #fff);
  font-family: "Mona Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;
const Diff = styled.div `
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 2px 6px;

  font-family: "Mona Sans";
  font-size: 11px;
  font-style: normal;
  font-weight: 300;
  line-height: 14px;
  color: ${({ $isUp }) => $isUp ? "var(--red300, #FF5A65)" : "var(--skyblue300, #00D4FF)"};
  background-color: ${({ $isUp }) => $isUp
    ? "var(--red20, rgba(255, 90, 101, 0.20))"
    : " var(--skyblue20, rgba(0, 212, 255, 0.20))"};
  border: ${({ $isUp }) => $isUp
    ? "1px solid var(--red20, rgba(255, 90, 101, 0.20))"
    : "1px solid var(--skyblue20, rgba(0, 212, 255, 0.20))"};
  border-radius: 2px;
`;
const ArrowIcon = styled.img `
  width: 8px;
  height: 8px;
`;
