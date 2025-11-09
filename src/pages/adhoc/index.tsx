import { useOutletContext } from "react-router";
import * as S from "./style";
import { dummyGraphData } from "@/data/dummyGraphData";
import { Graph } from "@/components/adhoc/Graph";

type LayoutContext = {
  title: string;
  intro: string;
};

export default function AdhocPage() {
  const { title, intro } = useOutletContext<LayoutContext>();

  return (
    <S.Root>
      <S.HeaderSection>
        <S.Title>{title}</S.Title>
        <S.Intro>{intro}</S.Intro>
      </S.HeaderSection>
      <Graph data={dummyGraphData} />
    </S.Root>
  );
}
