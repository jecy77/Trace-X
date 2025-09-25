import styled from "styled-components";

export const Root = styled.div`
  width: 100%;
  padding: 28px;
  display: flex;
  justify-content: space-between;
  border-radius: 4px;
  background: #161831;
  box-shadow: 4px 4px 8px 2px #2e304b;
`;

export const SearchInput = styled.input`
  color: white;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.4px;
  &::placeholder {
    color: #373a5e;
  }
`;
