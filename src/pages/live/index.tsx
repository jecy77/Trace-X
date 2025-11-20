import { useOutletContext } from "react-router";
import * as S from "./style";
import { useEffect, useState } from "react";

/* -------------------- Layout Context -------------------- */

type LayoutContext = {
  title: string;
  intro: string;
};

/* -------------------- 실제 UI에서 사용할 TxData 타입 -------------------- */

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

/* -------------------- 백엔드 타입 정의 -------------------- */

type BackendTx = {
  txHash: string;
  from_address: string;
  to_address: string;
  token: string;
  amount: string;
  timestamp: number;
  pattern: string;
  risk: {
    score: number;
    level: "High" | "Medium" | "Low";
  };
};

/* -------------------- 문자열 축약 함수 추가 -------------------- */
const shorten = (value: string, left = 6, right = 4) => {
  if (!value) return "";
  if (value.length <= left + right) return value;
  return `${value.slice(0, left)}...${value.slice(-right)}`;
};

/* -------------------- 백엔드 → 프론트 매핑 함수 -------------------- */

const mapBackendToTxData = (raw: BackendTx): TxData => {
  const riskMap: Record<string, string> = {
    High: "위험",
    Medium: "경고",
    Low: "안전",
  };

  const riskLevel = raw.risk?.level ?? "Low";
  const riskScore = raw.risk?.score ?? 0;

  const date = new Date(raw.timestamp * 1000);
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return {
    id: raw.txHash,
    from: raw.from_address,
    to: raw.to_address,
    amount: raw.amount,
    token: raw.token,
    timestamp: formattedDate,
    pattern: raw.pattern,
    risk: riskMap[riskLevel] ?? "안전",
    score: riskScore,
  };
};

/* -------------------- 더미 데이터 -------------------- */

const dummyData: TxData[] = Array.from({ length: 20 }, (_, i) => ({
  id: `0xtxhash${i + 1}`,
  from: "0xabc...123",
  to: "0xdef...456",
  amount: (Math.random() * 10000 + 100).toFixed(0),
  token: ["ETH", "USDT", "USDC", "BTC"][i % 4],
  timestamp: `0${(i % 9) + 1} Feb 2025`,
  pattern: ["Fan-in", "Fan-out", "Mixing"][i % 3],
  risk: ["위험", "경고", "안전"][i % 3],
  score: [0.92, 0.63, 0.31][i % 3],
}));

/* -------------------- 필터 옵션 -------------------- */

const tokens = ["ETH", "USDT", "USDC", "BTC", "DAI"];

/* -------------------- LivePage Component -------------------- */

export default function LivePage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  const [data, setData] = useState<TxData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [selectedChain, setSelectedChain] = useState("전체");
  const [selectedType, setSelectedType] = useState("전체");
  const [selectedRisk, setSelectedRisk] = useState("전체");
  const [openMenu, setOpenMenu] = useState<null | "chain" | "type" | "risk">(
    null
  );

  const itemsPerPage = 10;

  /* -------------------- API 요청 -------------------- */
  useEffect(() => {
    async function fetchData() {
      try {
        const params = new URLSearchParams();

        if (selectedChain !== "전체")
          params.append("tokenFilter", selectedChain);
        params.append("pageNo", String(page));

        const url = `${
          import.meta.env.VITE_API_URL
        }/api/live-detection/summary?${params.toString()}`;

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error(`HTTP Error! status: ${res.status}`);
        }

        const json = await res.json();

        if (!json.data || json.data.length === 0) {
          console.warn("No API data. Using dummyData.");
          setData(dummyData);
        } else {
          const mappedData = json.data.map((item: BackendTx) =>
            mapBackendToTxData(item)
          );
          setData(mappedData);
        }
      } catch (error) {
        console.error("API fetch error, using dummyData:", error);
        setData(dummyData);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [selectedChain, page]);

  /* -------------------- 필터링 -------------------- */

  const filteredData = data.filter((tx) => {
    const chainMatch = selectedChain === "전체" || tx.token === selectedChain;
    const typeMatch = selectedType === "전체" || tx.pattern === selectedType;
    const riskMatch = selectedRisk === "전체" || tx.risk === selectedRisk;
    return chainMatch && typeMatch && riskMatch;
  });

  /* -------------------- Pagination -------------------- */

  const startIdx = (page - 1) * itemsPerPage;
  const currentData = filteredData.slice(startIdx, startIdx + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSelect = (menu: "chain" | "type" | "risk", value: string) => {
    if (menu === "chain") setSelectedChain(value);
    if (menu === "type") setSelectedType(value);
    if (menu === "risk") setSelectedRisk(value);
    setOpenMenu(null);
  };

  /* -------------------- 렌더링 -------------------- */

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>

      {/* 필터 바 */}
      <S.FilterBar>
        <S.FilterGroup>
          <S.Divider />

          {/* 체인 필터 */}
          <S.DropdownWrapper>
            <S.FilterSelect
              onClick={() => setOpenMenu(openMenu === "chain" ? null : "chain")}
            >
              토큰 ({selectedChain}) ▼
            </S.FilterSelect>

            {openMenu === "chain" && (
              <S.DropdownMenu>
                {["전체", ...tokens].map((c) => (
                  <li key={c} onClick={() => handleSelect("chain", c)}>
                    {c}
                  </li>
                ))}
              </S.DropdownMenu>
            )}
          </S.DropdownWrapper>
        </S.FilterGroup>
      </S.FilterBar>

      {/* 테이블 */}
      {loading ? (
        <div style={{ color: "white", marginTop: "20px" }}>Loading...</div>
      ) : (
        <S.Table>
          <thead>
            <tr>
              <th>TxHash</th>
              <th>From</th>
              <th>To</th>
              <th>Amount</th>
              <th>Token</th>
              <th>TimeStamp</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((tx) => (
              <S.TableRow key={tx.id} $risk={tx.risk}>
                <td title={tx.id}>{shorten(tx.id)}</td>
                <td title={tx.from}>{shorten(tx.from)}</td>
                <td title={tx.to}>{shorten(tx.to)}</td>
                <td>{tx.amount}</td>
                <td>{tx.token}</td>
                <td>{tx.timestamp}</td>
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
      )}

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
