import * as S from "./searchBar.style";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  placeholder?: string; // 동적 placeholder 추가
};

export default function SearchBar({
  value,
  onChange,
  onSearch,
  placeholder = "검색어를 입력하세요.", // 기본값
}: SearchBarProps) {
  return (
    <S.Container>
      <S.InputWrapper>
        <S.Input
          placeholder={placeholder} // 동적으로 변경 가능
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch?.()}
        />

        <S.SearchButton onClick={onSearch}>Search</S.SearchButton>
      </S.InputWrapper>
    </S.Container>
  );
}
