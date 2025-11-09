import { useOutletContext } from "react-router";
import * as S from "./style";
import { useState } from "react";

type LayoutContext = {
  title: string;
  intro: string;
};

type TxData = {
  id: string;
  from: string;
  to: string;
  amount: string;
  token: string;
  timestamp: string;
  pattern: string;
  risk: string;
  score: number;
};

const abnormalPatterns = [
  "Fan-in",
  "Fan-out",
  "Wash Trading",
  "Mixing",
  "Peeling",
];
const tokens = ["ETH", "USDT", "USDC", "BTC", "DAI"];

const dummyData: TxData[] = Array.from({ length: 50 }, (_, i) => ({
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
  const { title, intro } = useOutletContext<LayoutContext>();
  const [page, setPage] = useState(1);
  const [selectedChain, setSelectedChain] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedRisk, setSelectedRisk] = useState("전체");
  const [openMenu, setOpenMenu] = useState<null | "chain" | "type" | "risk">(
    null
  );

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

  const handleSelect = (menu: "chain" | "type" | "risk", value: string) => {
    if (menu === "chain") setSelectedChain(value);
    if (menu === "type") setSelectedType(value);
    if (menu === "risk") setSelectedRisk(value);
    setOpenMenu(null);
  };

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>

      {/* 필터 바 */}
      <S.FilterBar>
        <S.FilterGroup>
          <S.FilterByButton>
            <div>Img</div>
            <span>Filter By</span>
          </S.FilterByButton>

          <S.Divider />

          {/* 토큰 필터 */}
          <S.DropdownWrapper>
            <S.FilterSelect
              onClick={() => setOpenMenu(openMenu === "chain" ? null : "chain")}
            >
              토큰 ({selectedChain}) ▼
            </S.FilterSelect>
            {openMenu === "chain" && (
              <S.DropdownMenu>
                {["전체", "ETH", "USDT", "USDC", "BTC", "DAI"].map((c) => (
                  <li key={c} onClick={() => handleSelect("chain", c)}>
                    {c}
                  </li>
                ))}
              </S.DropdownMenu>
            )}
          </S.DropdownWrapper>

          <S.Divider />

          {/* 이상 패턴 필터 */}
          <S.DropdownWrapper>
            <S.FilterSelect
              onClick={() => setOpenMenu(openMenu === "type" ? null : "type")}
            >
              이상 패턴 ({selectedType}) ▼
            </S.FilterSelect>
            {openMenu === "type" && (
              <S.DropdownMenu>
                {["전체", ...abnormalPatterns].map((t) => (
                  <li key={t} onClick={() => handleSelect("type", t)}>
                    {t}
                  </li>
                ))}
              </S.DropdownMenu>
            )}
          </S.DropdownWrapper>

          <S.Divider />

          {/* 리스크 필터 */}
          <S.DropdownWrapper>
            <S.FilterSelect
              onClick={() => setOpenMenu(openMenu === "risk" ? null : "risk")}
            >
              리스크 ({selectedRisk}) ▼
            </S.FilterSelect>
            {openMenu === "risk" && (
              <S.DropdownMenu>
                {["전체", "위험", "경고", "안전"].map((r) => (
                  <li key={r} onClick={() => handleSelect("risk", r)}>
                    {r}
                  </li>
                ))}
              </S.DropdownMenu>
            )}
          </S.DropdownWrapper>
        </S.FilterGroup>

        <S.RefreshButton>탐지 시작</S.RefreshButton>
      </S.FilterBar>

      {/* 테이블 */}
      <S.Table>
        <thead>
          <tr>
            <th>TxHash</th>
            <th>From</th>
            <th>To</th>
            <th>Amount</th>
            <th>Token</th>
            <th>TimeStamp</th>
            <th>Pattern</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((tx) => (
            <S.TableRow key={tx.id} $risk={tx.risk}>
              <td>{tx.id}</td>
              <td>{tx.from}</td>
              <td>{tx.to}</td>
              <td>{tx.amount}</td>
              <td>{tx.token}</td>
              <td>{tx.timestamp}</td>
              <td>{tx.pattern}</td>
              <td>
                <S.RiskTag
                  $level={
                    tx.risk === "위험"
                      ? "high"
                      : tx.risk === "경고"
                      ? "mid"
                      : "low"
                  }
                >
                  {tx.risk} <span>{tx.score.toFixed(2)}</span>
                </S.RiskTag>
              </td>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      {/* 페이지네이션 */}
      <S.Pagination>
        {Array.from({ length: totalPages }).map((_, i) => (
          <S.PageButton
            key={i}
            $active={page === i + 1}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </S.PageButton>
        ))}
      </S.Pagination>
    </S.Root>
  );
}
