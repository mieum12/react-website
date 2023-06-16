//토큰 추출함수
export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

//root 라우터레 loader를 추가해 토큰의 유무를 한번에 재평가 가능하게 함
export function tokenLoader() {
  return getAuthToken();
}
