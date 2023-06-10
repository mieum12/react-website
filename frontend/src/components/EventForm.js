import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
  json,
  redirect,
} from "react-router-dom";

import classes from "./EventForm.module.css";

function EventForm({ method, event }) {
  //가까운 action(NewEvent에 있음)이 리턴한 데이터에 접근할 수 있게 해줌
  //거기서 오류를 response로 리턴
  const data = useActionData();

  const navigate = useNavigate();
  const navigation = useNavigation();

  //데이터를 제출하고있는 상태라는걸 알려준다
  //제출중이면 저장 버튼 비활성화하는데 사용
  const isSubmitting = navigation.state === "submitting";

  function cancelHandler() {
    navigate("..");
  }

  return (
    <Form method={method} className={classes.form}>
      {/* action이 준 data를 확인하고 폼을 제출했다면 리턴 */}
      {data && data.errors && (
        <ul>
          {/* error 객체 안의 모든 키를 반복하게 하고 데이터를 매핑, 에러 메세지 출력
          즉, 백엔드에서 받을 수 있는 검증 오류 메세지 출력 */}
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <p>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          type="text"
          name="title"
          required
          defaultValue={event ? event.title : ""}
        />
      </p>
      <p>
        <label htmlFor="image">Image</label>
        <input
          id="image"
          type="url"
          name="image"
          required
          defaultValue={event ? event.image : ""}
        />
      </p>
      <p>
        <label htmlFor="date">Date</label>
        <input
          id="date"
          type="date"
          name="date"
          required
          defaultValue={event ? event.date : ""}
        />
      </p>
      <p>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ""}
        />
      </p>
      <div className={classes.actions}>
        <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
          Cancel
        </button>
        <button disabled={isSubmitting}>
          {isSubmitting ? "저장중.." : "Save"}
        </button>
      </div>
    </Form>
  );
}

export default EventForm;

//
//
//  <다른 method으로 동일한 폼 사용 가능하게>
//
//
//데이터를 백엔드로 제출하는 것을 해주는 action() 함수
//제출된 폼 데이터를 추출한다
export async function action({ request, params }) {
  const method = request.method;
  console.log(request);
  const data = await request.formData();

  //get()으로 가져오는 것은 input form에서의 name이 된다
  // const enteredTitle = data.get('title') 이렇게 각각 할수도 있지만
  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    const eventId = params.eventId;
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
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
