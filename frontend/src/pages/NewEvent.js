import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

//
//데이터를 백엔드로 제출하는 것을 해주는 action() 함수
//제출된 폼 데이터를 추출한다
export async function action({ request, params }) {
  const data = await request.formData();

  //get()으로 가져오는 것은 input form에서의 name이 된다
  // const enteredTitle = data.get('title') 이렇게 각각 할수도 있지만
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  const response = await fetch("http://localhost:8080/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  //백엔드에서 검증오류에 대응하기: 백엔드에서 설정한 검증 상태 코드 = 422 오류코드임을 확인
  //error 페이지를 따로 표시하지 않으려 할때 이렇게 response를 리턴한다.
  //에러페이지로 가게되면 사용자의 글이 전부 날아가기때문에 사용자 경험에 큰 문제를 야기함
  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not save event.." }, { status: 500 });
  }

  return redirect("/events");
}
