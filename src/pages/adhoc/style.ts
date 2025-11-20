import styled from "styled-components";

export const Root = styled.div`
  padding: 18px 50px; // CasePage와 동일
  width: 100%;
  height: 100vh;
  position: relative;
`;

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between; // 좌-우 배치!
  align-items: flex-start; // 제목 쪽은 위 기준 정렬
  padding: 18px 50px;
  width: 100%;
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

export const CenterBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;
