import Header from "@/components/layout/Header";
import { Outlet } from "react-router";
import * as S from "./mainLayout.style";
import SideBar from "@/components/layout/SideBar";

export default function MainLayout() {
  return (
    <>
      <S.Root>
        <Header />
        <S.Content>
          <SideBar />
          <Outlet />
        </S.Content>
      </S.Root>
    </>
  );
}
