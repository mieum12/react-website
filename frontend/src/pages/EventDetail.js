import {
  json,
  redirect,
  useRouteLoaderData,
  defer,
  Await,
} from "react-router-dom";
import EventItem from "../components/EventItem";
import EventsList from "../components/EventsList";
import { Suspense } from "react";
import { getAuthToken } from "../util/auth";

function EventDetailPage() {
  //useParams는 현재 활성 중인 라우트 파라미터에 접근 가능하다, URL에 인코딩된 값들에 접근해서 다이나믹 라우터 사용 가능
  // const params = useParams();

  //routeId를 인자로 받는 리액트 훅
  //연기된 요청 2개
  const { event, events } = useRouteLoaderData("event-detail");

  return (
    <>
      {/* 2개의 요청을 Await에서 기다린다 */}
      {/* Suspense로 감싸준다 두Await가 완료될 떄까지 기다리지 않고 표시부터 하는 역할 */}
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading item...</p>}
      >
        <Await resolve={event}>
          {/* 데이터가 도착하면 EventItem출력 */}
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense
        fallback={<p style={{ textAlign: "center" }}>Loading Lists...</p>}
      >
        <Await resolve={events}>
          {(loadedEvents) => <EventsList events={loadedEvents} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EventDetailPage;

async function loadEvent(id) {
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json({ message: "게시글을 가져올 수 없습니다!" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.event;
  }
}

async function loadEvents() {
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    return json(
      { message: "게시글 목록을 가져올 수 없습니다!" },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

//위의 두가지 헬퍼 함수를 여기 로더에서 사용할 것
export async function loader({ request, params }) {
  const id = params.eventId;

  // 2개의 요청을 한다
  return defer({
    //await가 있으면 데이터가 로딩될 때까지 기다렸다가 페이지 컴포넌트 로딩, 이동
    event: await loadEvent(id),
    //이건 페이지가 이동된 후에 데이터를 로딩하게 된다
    events: loadEvents(),
  });
}

export async function action({ params, request }) {
  const eventId = params.eventId;
  //토큰 추출함수를 불러서 변수에 저장하기
  const token = getAuthToken();

  const response = await fetch("http://localhost:8080/events/" + eventId, {
    //클라이언트 측에서 요청에 사용된 메서드(delete)와 같다고 말해줌
    method: request.method,
    headers: {
      //로그인 시 토큰을 저장하게 되고, 삭제 요청시 토큰을 보낸다
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    throw json({ message: "게시글을 삭제할 수 없습니다!" }, { status: 500 });
  }

  return redirect("/events");
}
