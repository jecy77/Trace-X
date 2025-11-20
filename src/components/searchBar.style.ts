import styled from "styled-components";

export const Container = styled.div`
  width: 500px; // 중앙 검색바 적당한 폭
`;

export const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  background: #111827;
  border: 1px solid #1f2937;
  border-radius: 12px;
  padding: 6px;
  gap: 6px;
  /* box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35); */
`;

export const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 0 14px;
  background: transparent;
  border: none;
  outline: none;
  color: #e5e7eb;
  font-size: 14px;
  font-family: Pretendard;

  &::placeholder {
    color: #6b7280;
  }
`;

export const SearchButton = styled.button`
  background: #343b4f;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 18px;
  border-radius: 10px;
  border: none;
  cursor: pointer;

  &:hover {
    background: #1e3a8a;
  }
`;
