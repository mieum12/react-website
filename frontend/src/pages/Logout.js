import { redirect } from "react-router-dom";

//컴포넌트를 만드는게 아니라 토큰을 삭제하는 함수를 내보낸다
//이제 App.js에 작업만 만들고 컴포넌트는 없는 새로운 라우터를 만든다
export function action() {
  localStorage.removeItem("token");
  return redirect("/");
}
