import * as S from "./style/sideMenu";

type SideMenuItemProps = {
  title: string;
  icon: string;
  activeIcon: string;
  path: string;
};

export function SideMenuItem({
  title,
  icon,
  activeIcon,
  path,
}: SideMenuItemProps) {
  return (
    <S.MenuItem to={path} end>
      {({ isActive }: { isActive: boolean }) => (
        <>
          <S.MenuIcon src={isActive ? activeIcon : icon} alt={title} />
          <div>{title}</div>
        </>
      )}
    </S.MenuItem>
  );
}
