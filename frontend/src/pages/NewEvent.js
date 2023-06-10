import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

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

  if (!response.ok) {
    throw json({ message: "Could not save event.." }, { status: 500 });
  }

  return redirect("/events");
}
