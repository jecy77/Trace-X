// MainLayout.tsx
import { Outlet, useLocation } from "react-router";
import * as S from "./mainLayout.style";
import SideBar from "@/components/layout/SideBar";
import { menu } from "@/data/menu";

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // 현재 경로와 일치하는 메뉴 객체 찾기
  const currentMenu = menu.find((m) => m.path === currentPath);

  const contextValue = {
    title: currentMenu?.engTitle ?? "",
    intro: currentMenu?.intro ?? "",
  };

  return (
    <S.Root>
      <S.Content>
        <SideBar />
        <Outlet context={contextValue} />
      </S.Content>
    </S.Root>
  );
}
