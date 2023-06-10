import { Outlet, useNavigation } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";

function RootLayout() {
  // const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {/* 라우터 이동 로딩 중인지 상태를 알려 줌
        {navigation.state === "loading" && <p> Loading... </p>} */}
        {/* 자녀 라우트의 콘텐츠를 렌더링 하는 곳을 정의함 */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
