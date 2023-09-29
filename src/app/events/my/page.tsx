import {
  LIMIT_QUERY,
  MY_EVENTS_TITLE,
  PAGE_QUERY,
  PROJECT_NAME,
} from "@consts/common";
import { Metadata } from "next";
import { getMyEvents } from "@/requests";
import { EVENTS_PER_PAGE } from "@consts/api";
import { SearchParams } from "@models/index";
import { getCookiesUser } from "@lib/auth/getCookiesUser";
import EventListInfinityScroll from "@components/comments/EventListInfinityScroll/EventListInfinityScroll";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | ${MY_EVENTS_TITLE}`,
  description: "This is a page with my events",
};

const MyEventsPage = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const page = Number(searchParams?.[PAGE_QUERY] || 1);
  const limit = Number(searchParams?.[LIMIT_QUERY] || EVENTS_PER_PAGE);

  const user = getCookiesUser();
  const email = user?.email || "";
  const { events } = await getMyEvents(page, limit, email);

  return (
    <>
      <EventListInfinityScroll
        searchParams={searchParams}
        initialEvents={events}
        title={MY_EVENTS_TITLE}
        showAllEventsBtn={false}
      />
    </>
  );
};

export default MyEventsPage;
