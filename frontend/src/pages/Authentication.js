import AuthForm from "../components/AuthForm";
import { json, redirect } from "react-router-dom";

function AuthenticationPage() {
  return <AuthForm />;
}

export default AuthenticationPage;

//AuthForm이 전송 될 때마다 아래 함수가 실행, 왜냐면 AuthForm이 있는 라우트와 동일한 것이기 때문
// 전송된 데이터에 접근할 수 있어야한다. 이를 위해 리액트 라우터에 으ㅏ해 실행되는 요청 객체 활용
export async function action({ request }) {
  //쿼리파라미터를 보고 로그인인지 회원가입인지 구분하기
  //인스턴스화 된 URL객체의 searchParams객체에 접근
  //일부 기본 브라우저 기능으로 백엔드에서 searchParams를 구할 수 있다
  const searchParams = new URL(request.url).searchParams;
  //get을 호출해 mode를 얻음(mode가 없다면 디폴트로 로그인으로)
  const mode = searchParams.get("mode") || "login";
  //혹시 모를 오류 (사용자가 접근할수도 있는)
  if (mode !== "login" && mode !== "signup") {
    throw json(
      { message: "지원하지 않는 형식의 제출입니다!" },
      { status: 422 }
    );
  }

  // 사용자가 입력한 이메일, 비번을 검색할 때 사용할 데이터 객체를 준다
  const data = await request.formData();

  //데이터 얻기!
  // 이메일을 가져올 수 있는 authData객체 생성, get은 폼데이터가 리턴하는 데이터 객체에 있다
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  //일단 로그인, 회원가입 모두 post요청
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  //만약 백엔드에서 오류코드를 받을 경우 응답을 일단 그대로 리턴하기
  if (response.status === 422 || response.status === 401) {
    return response;
  }
  //또다른 오류가 있다면
  if (!response.ok) {
    throw json({ message: "인증된 사용자가 아닙니다!" }, { status: 500 });
  }
  //모든게 지나면 사용자 생성 혹은 가입에 성공!!
  //백엔드에서 주는 token을 여기서 관리해야한다
  const resData = await response.json();
  const token = resData.token;

  //해당 토큰을 브라우저 저장소에 저장, key를 부여하고 추출한 토큰을 여기에 저장
  //이제 필요할 때마다 꺼내 쓸 수 있다
  localStorage.setItem("token", token);
  //일단 홈으로 가게함
  return redirect("/");
}
