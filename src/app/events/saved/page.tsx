import EventList from "@components/events/EventList/EventList";
import Pagination from "@components/pagination/Pagination";
import {
  LIMIT_QUERY,
  PAGE_QUERY,
  PROJECT_NAME,
  SAVED_EVENTS_TITLE,
} from "@consts/common";
import { Metadata } from "next";
import { getSavedEvents } from "@/requests";
import { EVENTS_PER_PAGE } from "@consts/api";
import { SearchParams } from "@models/index";
import { getCookiesUser } from "@lib/auth/getCookiesUser";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | ${SAVED_EVENTS_TITLE}`,
  description: "This is a page with saved events",
};

const SavedEventsPage = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const page = Number(searchParams?.[PAGE_QUERY] || 1);
  const limit = Number(searchParams?.[LIMIT_QUERY] || EVENTS_PER_PAGE);

  const user = getCookiesUser();
  const email = user?.email || "";
  const { events, total, currentPage } = await getSavedEvents(
    page,
    limit,
    email
  );

  return (
    <>
      <EventList events={events} title={SAVED_EVENTS_TITLE} />
      <Pagination
        allCount={total}
        currentPage={currentPage}
        show={!!events.length}
      />
    </>
  );
};

export default SavedEventsPage;
