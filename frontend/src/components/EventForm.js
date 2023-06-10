import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
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
    <Form method="post" className={classes.form}>
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
