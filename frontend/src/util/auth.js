import { redirect } from "react-router-dom";

//토큰의 만료시간 계산하는 함수
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();

  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}
//토큰 추출함수
export function getAuthToken() {
  const token = localStorage.getItem("token");

  if (!token) {
    return null;
  }
  const tokenDuration = getTokenDuration();

  //음수면 이미 만료된 시간
  if (tokenDuration < 0) {
    return "EXPIRED";
  }
  return token;
}

//root 라우터레 loader를 추가해 토큰의 유무를 한번에 재평가 가능하게 함
export function tokenLoader() {
  return getAuthToken();
}

//로그인 없이 그냥 url에서 http://localhost:3000/events/edit이런식의 라우터 접근이 불가능하도록 보호해주기
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}
