import styled from "styled-components";

export const Root = styled.div`
  padding: 18px 50px;
  width: 80%;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.div`
  color: #fff;
  font-family: "Mona Sans";
  font-size: 24px;
  font-weight: 600;
`;

export const Intro = styled.div`
  color: #aeb9e1;
  font-size: 12px;
`;

export const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 16px;
`;

// export const FilterGroup = styled.div`
//   display: flex;
//   gap: 10px;
// `;

export const FilterButton = styled.button`
  background: #0a1330;
  border: none;
  color: #aeb9e1;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
`;

export const RefreshButton = styled.button`
  background: #d42649;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 18px;
  cursor: pointer;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;
  font-size: 13px;
  text-align: left;
  border-radius: 8px;
  overflow: hidden;

  thead {
    background: #111a3a;
    color: #aeb9e1;
  }

  th,
  td {
    padding: 12px 10px;
  }
`;

export const TableRow = styled.tr<{ $risk: string }>`
  background: ${({ $risk }) =>
    $risk === "위험" ? "rgba(126, 39, 57, 0.2)" : "rgba(255,255,255,0.02)"};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  transition: 0.2s;
`;

export const RiskTag = styled.div<{ $level: "high" | "mid" | "low" }>`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 500;
  border: 1px solid
    ${({ $level }) =>
      $level === "high"
        ? "rgba(212,38,73,0.5)"
        : $level === "mid"
        ? "rgba(232,181,76,0.5)"
        : "rgba(82,255,160,0.5)"};
  color: ${({ $level }) =>
    $level === "high" ? "#FF6B7F" : $level === "mid" ? "#E8B54C" : "#52FFA0"};
  background: ${({ $level }) =>
    $level === "high"
      ? "rgba(212,38,73,0.12)"
      : $level === "mid"
      ? "rgba(232,181,76,0.12)"
      : "rgba(82,255,160,0.12)"};
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
`;

export const PageButton = styled.button<{ $active: boolean }>`
  background: ${({ $active }) => ($active ? "#5CC8F8" : "transparent")};
  color: ${({ $active }) => ($active ? "#0A1330" : "#AEB9E1")};
  border: 1px solid #343b4f;
  border-radius: 6px;
  width: 28px;
  height: 28px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #5cc8f8;
    color: #0a1330;
  }
`;

export const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 24px 0 16px;
`;

export const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0; /* gap 대신 선으로 간격 표현 */
  background: #0b1435;
  border: 1px solid #1f294b;
  border-radius: 10px;
  overflow: hidden; /* 라운드 모서리 안에서 선이 잘리도록 */
  max-width: 500px;
`;

/* 공통 버튼 스타일 */
const FilterBase = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: transparent;
  color: #aeb9e1;
  border: none;
  padding: 6px 14px;
  font-size: 12px;
  cursor: pointer;
  height: 100%;
`;

export const FilterByButton = styled(FilterBase)`
  img {
    width: 14px;
    height: 14px;
  }
`;

export const FilterSelect = styled(FilterBase)``;

/* 버튼 사이의 구분선 */
export const Divider = styled.div`
  width: 1px;
  height: 20px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0;
`;

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownMenu = styled.ul`
  position: absolute;
  top: 34px;
  left: 0;
  width: 110px;
  background: #101a3f;
  border: 1px solid #2a355a;
  border-radius: 6px;
  list-style: none;
  padding: 5px 0;
  z-index: 10;

  li {
    color: #aeb9e1;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    transition: background 0.15s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;
