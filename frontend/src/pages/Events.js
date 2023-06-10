import { Link } from "react-router-dom";

const DUMMY_EVENTS = [
  {
    id: "e1",
    title: "1번 테스트",
  },
  {
    id: "e2",
    title: "2번 테스트",
  },
  {
    id: "e3",
    title: "3번 테스트",
  },
];

function EventsPage() {
  return (
    <>
      <h1>Events page!</h1>
      <ul>
        {DUMMY_EVENTS.map((event) => (
          <li key={event.id}>
            <Link to={event.id}>{event.title}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default EventsPage;
