import { useNavigate } from "react-router";
import * as S from "./style";
import { useState } from "react";
import SearchBar from "@/components/SearchBar";

export default function AdhocSearchPage() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (!value) return;
    navigate(`/adhoc/result?tx=${encodeURIComponent(value)}`);
  };

  return (
    <S.Root>
      {/* 왼쪽 상단 헤더 */}
      <S.HeaderSection>
        <div>
          <S.Title>Ad-hoc 분석</S.Title>
          <S.Intro style={{ paddingTop: "5px" }}>
            입력하신 트랜잭션의 흐름을 분석합니다.
          </S.Intro>
        </div>
      </S.HeaderSection>

      {/* 화면 중앙 서치바 */}
      <S.CenterBox>
        <SearchBar value={value} onChange={setValue} onSearch={handleSearch} />
      </S.CenterBox>
    </S.Root>
  );
}
