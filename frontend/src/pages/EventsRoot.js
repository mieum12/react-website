import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";

function EventsRootLayout() {
  return (
    <>
      <EventsNavigation />
      {/* 이 페이지를 다른 페이지들의 래퍼로 사용하려고 */}
      <Outlet />
    </>
  );
}

export default EventsRootLayout;
