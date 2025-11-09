import { jsx as _jsx } from "react/jsx-runtime";
import * as S from "./searchBar.style";
export default function SearchBar({ value, onChange }) {
    return (_jsx(S.Root, { children: _jsx(S.SearchInput, { placeholder: "\uC8FC\uC18C\uB97C \uAC80\uC0C9\uD558\uC138\uC694.", value: value, onChange: (e) => onChange(e.target.value) }) }));
}
