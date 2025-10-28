import SearchBar from "@/components/SearchBar";
import * as S from "../styles/detail.style";
import TransactionIcon from "@/assets/icon_transaction.svg";
import { useState } from "react";
import Graph from "@/components/Graph";
import { dummyGraphData } from "@/data/dummyGraphData";

export default function TransactionDetail() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <S.Root>
        <S.HeaderSection>
          <S.HeaderTitleContainer>
            <img src={TransactionIcon} alt="헤더 이름" />
            <div>지갑</div>
          </S.HeaderTitleContainer>
          <S.TxHashBox>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649</S.TxHashBox>
        </S.HeaderSection>
        <SearchBar value={searchValue} onChange={setSearchValue} />
        <S.MainSection>
          <Graph data={dummyGraphData} />
        </S.MainSection>
      </S.Root>
    </>
  );
}
