import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

//데이터가 도착하기 전 이 컴포넌트를 로딩, 렌더링하고 데이터가 오기 전까지 폴백을 표시할 것
function EventsPage() {
  const { events } = useLoaderData(); //여기에 아래에서 설정한 events key가 있음

  //Await은 데이터가 올때까지 기다리고, 데이터가 도착하면 즉, promise가 resolving되고 그 데이터가 도착하면 리액트 라우터가 실행 할 함수가 됨
  return (
    // Suspense는 다른 데이터가 도착하길 기다리는 동안 폴백을 보여주는 상황에서 사용
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={events}>
        {/* 이 함수는 데이터가 도착하면 리액트 라우터에 의해 호츌*/}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

export async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  //위에서 받은 response 응답을 loader에서 리턴하는 것이다
  //response에서 수작업으로 데이터를 추출할 필요 없이
  //response의 일부인 데이터를 자동으로 가져다준다
  if (!response.ok) {
    //오류가ㅏ 있다는걸 표시하는 데이터를 리턴
    // return { isError: true, message: "could not fetch events!" };
    // throw new Response(
    //   JSON.stringify({ message: "could not fetch events!" }, { status: 500 })
    // );

    //json()은 json형식의 데이터가 포함된 파일에서 response 객체를 생성하는 함수이다
    //이 안에 response에 포함 될 데이터를 넣어준다
    //response 데이터를 쓰는 곳에서 수동으로 .parse() 즉 파싱해줄 필요없다
    return json(
      { message: "게시글 목록을 가져올 수 없습니다!" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

//loader() 사용하기!!
//우리가 그 페이지로 이동하기 시작할 때, 실제로 가기 전에 호출되는 함수이다, 페이지 컴포넌트가 랜더링 된 다음이 아님!!
//백엔드 코드같지만 서버 코드가 아닌 클라이언트 코드
//모든 브라우져 API도 접근 가능 (localStorage, cookies ...)
//근데 react hook은 사용 불가(useState...), 리액트 컴포넌트 안에서만 사용 가능하기 때문, loader 함수는 리액트 컴포넌트가 아님
export function loader() {
  return defer({
    // loadEvents는 promise를 리턴, 그것을 events key에 저장
    // promise가 있어야 defer(=연기)가능
    events: loadEvents(),
  });
}
