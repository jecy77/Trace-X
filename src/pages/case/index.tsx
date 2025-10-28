import { useOutletContext } from "react-router";
import * as S from "./style";

type LayoutContext = {
  title: string;
  intro: string;
};

export default function CasePage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>
    </S.Root>
  );
}
