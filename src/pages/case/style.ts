import styled from "styled-components";

export const Root = styled.div`
  padding: 18px 50px;
  width: 100%;
`;

export const HeaderSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const Title = styled.div`
  color: var(--white, #fff);
  font-family: "Mona Sans";
  font-size: 24px;
  font-style: normal;
  font-weight: 600;
  line-height: 32px;
`;

export const Intro = styled.div`
  color: var(--primary400, #aeb9e1);
  font-family: "Mona Sans";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
`;
