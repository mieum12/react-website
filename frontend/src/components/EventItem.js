import { Link, useRouteLoaderData, useSubmit } from "react-router-dom";
import classes from "./EventItem.module.css";

function EventItem({ event }) {
  const token = useRouteLoaderData("root");
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm("정말 삭제하시겠습니까?");

    if (proceed) {
      //게시글 삭제
      //데이터는 자동으로 폼데이터 객체로 감싸짐 / 근데 여기서는 제출할 데이터는 없으므로 null
      submit(null, { method: "delete" });
    }
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      {token && (
        <menu className={classes.actions}>
          <Link to="edit">Edit</Link>
          <button onClick={startDeleteHandler}>Delete</button>
        </menu>
      )}
    </article>
  );
}

export default EventItem;
