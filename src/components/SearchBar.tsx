import * as S from "./searchBar.style";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <S.Root>
      <S.SearchInput
        placeholder="주소를 검색하세요."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </S.Root>
  );
}
