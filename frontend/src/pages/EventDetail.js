import { json, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";

function EventDetailPage() {
  //useParams는 현재 활성 중인 라우트 파라미터에 접근 가능하다, URL에 인코딩된 값들에 접근해서 다이나믹 라우터 사용 가능
  // const params = useParams();

  //routeId를 인자로 받는 리액트 훅
  const data = useRouteLoaderData("event-detail");

  return <EventItem event={data.event} />;
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;

  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    throw json(
      { message: "could not fetch details for selected event!" },
      { status: 500 }
    );
  } else {
    return response;
  }
}
