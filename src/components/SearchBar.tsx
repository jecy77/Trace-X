import * as S from "./searchBar.style";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
}: SearchBarProps) {
  return (
    <S.Container>
      <S.InputWrapper>
        <S.Input
          placeholder="트랜잭션 해시를 입력하세요"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        />

        <S.SearchButton onClick={onSearch}>Search</S.SearchButton>
      </S.InputWrapper>
    </S.Container>
  );
}
