import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

function RootLayout() {
  // const navigation = useNavigation();

  //자동로그아웃 : 가장 기본이 되는 root인 이곳에서 관리
  //이미 root라우터에 의해 랜더링 되는 컴포넌트이기 때문에 useRouteLoaderData('root')쓸 필요없음
  const token = useLoaderData();
  const submit = useSubmit();

  //token이 변할때마다 useEffect실행
  useEffect(() => {
    //token이 없다면 할게없음, 아무것도 리턴하지않음
    if (!token) {
      return;
    }

    //토큰 만료시 로그아웃 -> 타이머 없이 바로 리턴
    if (token === "EXPIRED") {
      submit(null, { action: "logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);

    //token이 있으면 1시간 타이머를 설정 -> 자동로그아웃
    setTimeout(() => {
      // Main nav로 로그아웃 라우트를 트리거해서, 로그아웃 요청 전송
      submit(null, { action: "logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

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
