import { useParams } from "react-router-dom";

function EventDetailPage() {
  //useParams는 현재 활성 중인 라우트 파라미터에 접근 가능하다, URL에 인코딩된 값들에 접근해서 다이나믹 라우터 사용 가능

  const params = useParams();
  return (
    <>
      <h1>Event Detail page!</h1>
      <p>Event ID :{params.eventId}</p>
    </>
  );
}

export default EventDetailPage;
