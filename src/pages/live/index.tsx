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
  risk: {
    score: number;
    level: "High" | "Medium" | "Low";
  };
};

/* -------------------- shorten 함수 -------------------- */
const shorten = (value: string, left = 6, right = 4) => {
  if (!value) return "";
  if (value.length <= left + right) return value;
  return `${value.slice(0, left)}...${value.slice(-right)}`;
};

/* -------------------- 매핑 함수 -------------------- */
const mapBackendToTxData = (raw: BackendTx): TxData => {
  const riskMap: Record<string, string> = {
    High: "위험",
    Medium: "경고",
    Low: "안전",
  };

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
    risk: riskMap[raw.risk?.level ?? "Low"],
    score: raw.risk?.score ?? 0,
  };
};

/* -------------------- 토큰 목록 -------------------- */
const tokens = ["ETH", "USDT", "USDC", "BTC", "DAI"];

/* -------------------- LivePage Component -------------------- */
export default function LivePage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  const [data, setData] = useState<TxData[]>([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [selectedChain, setSelectedChain] = useState("전체");
  const [openMenu, setOpenMenu] = useState<null | "chain">(null);

  /* -------------------- API 요청 -------------------- */
  useEffect(() => {
    let isMounted = true; // 🔥 race 방지
    setLoading(true); // 🔥 매 요청마다 테이블 리셋

    async function fetchData() {
      try {
        const params = new URLSearchParams();

        if (selectedChain !== "전체") {
          params.append("tokenFilter", selectedChain);
        }

        params.append("pageNo", String(page));

        const url = `${
          import.meta.env.VITE_API_URL
        }/api/live-detection/summary?${params.toString()}`;

        const res = await fetch(url);
        const json = await res.json();

        console.log("🔥 Raw Backend:", json);

        const mappedData =
          json.data?.map((item: BackendTx) => mapBackendToTxData(item)) ?? [];

        if (isMounted) {
          setData(mappedData);
        }
      } catch (e) {
        console.error("API ERROR:", e);
        if (isMounted) setData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchData();

    return () => {
      isMounted = false; // cleanup
    };
  }, [selectedChain, page]);

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

          <S.DropdownWrapper>
            <S.FilterSelect
              onClick={() => setOpenMenu(openMenu === "chain" ? null : "chain")}
            >
              토큰 ({selectedChain}) ▼
            </S.FilterSelect>

            {openMenu === "chain" && (
              <S.DropdownMenu>
                {["전체", ...tokens].map((c) => (
                  <li
                    key={c}
                    onClick={() => {
                      setSelectedChain(c);
                      setPage(1); // 필터 바꾸면 page 리셋
                      setOpenMenu(null);
                    }}
                  >
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
            {data.map((tx) => (
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
        {Array.from({ length: 10 }).map((_, i) => (
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
