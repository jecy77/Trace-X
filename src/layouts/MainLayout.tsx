import { Outlet } from "react-router";

export default function MainLayout() {
  return (
    <>
      <div>
        가나다
        <Outlet />
      </div>
    </>
  );
}
