import { useLoaderData } from "react-router-dom";
import EventsList from "../components/EventsList";

function EventsPage() {
  const data = useLoaderData();

  //에러가 났을때 내보내는 것
  // if (data.isError) {
  //   <p>{data.message}</p>;
  // }
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

//loader() 사용하기!!
//우리가 그 페이지로 이동하기 시작할 때, 실제로 가기 전에 호출되는 함수이다, 페이지 컴포넌트가 랜더링 된 다음이 아님!!
//백엔드 코드같지만 서버 코드가 아닌 클라이언트 코드
//모든 브라우져 API도 접근 가능 (localStorage, cookies ...)
//근데 react hook은 사용 불가(useState...), 리액트 컴포넌트 안에서만 사용 가능하기 때문, loader 함수는 리액트 컴포넌트가 아님
export async function loader() {
  const response = await fetch("http://localhost:8080/events");

  //위에서 받은 response 응답을 loader에서 리턴하는 것이다
  //response에서 수작업으로 데이터를 추출할 필요 없이
  //response의 일부인 데이터를 자동으로 가져다준다
  if (!response.ok) {
    //오류가ㅏ 있다는걸 표시하는 데이터를 리턴
    // return { isError: true, message: "could not fetch events!" };
    throw new Response(
      JSON.stringify({ message: "could not fetch events!" }, { status: 500 })
    );
  } else {
    return response;
  }
}
