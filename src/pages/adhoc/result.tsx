import { useSearchParams, useNavigate } from "react-router";
import { useState } from "react";
import * as S from "./style";
import SearchBar from "@/components/SearchBar";

// import { dummyGraphData } from "@/data/dummyGraphData";
import Graph from "@/components/adhoc/Graph";

export default function AdhocResultPage() {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(params.get("tx") || "");

  const handleSearch = () => {
    if (!value) return;
    navigate(`/adhoc/result?tx=${value}`);
  };

  //   const tx = params.get("tx");

  return (
    <S.Root>
      <S.HeaderSection>
        {/* 왼쪽: Title & Intro */}
        <S.TitleWrapper>
          <S.Title>Ad-hoc 분석 결과</S.Title>
          <S.Intro>입력하신 트랜잭션의 흐름을 분석합니다.</S.Intro>
        </S.TitleWrapper>

        {/* 오른쪽: SearchBar */}
        <SearchBar value={value} onChange={setValue} onSearch={handleSearch} />
      </S.HeaderSection>

      {/* 그래프 */}
      <Graph />
    </S.Root>
  );
}
