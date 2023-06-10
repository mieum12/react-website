import { Outlet } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  return (
    <>
      <MainNavigation />
      <main>
        {/* 자녀 라우트의 콘텐츠를 렌더링 하는 곳을 정의함 */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
