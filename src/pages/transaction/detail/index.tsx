import SearchBar from "@/components/SearchBar";
import * as S from "../styles/detail.style";
import TransactionIcon from "@/assets/icon_transaction.svg";
import { useState } from "react";

export default function TransactionDetail() {
  const [searchValue, setSearchValue] = useState("");
  return (
    <>
      <S.Root>
        <S.HeaderSection>
          <S.HeaderTitleContainer>
            <img src={TransactionIcon} alt="헤더 이름" />
            <div>트랜잭션</div>
          </S.HeaderTitleContainer>
          <S.TxHashBox>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649</S.TxHashBox>
        </S.HeaderSection>
        <SearchBar value={searchValue} onChange={setSearchValue} />
        <S.MainSection></S.MainSection>
      </S.Root>
    </>
  );
}
