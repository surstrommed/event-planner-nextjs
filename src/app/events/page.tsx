import EventList from "@components/events/EventList/EventList";
import { ALL_EVENTS_TITLE, PROJECT_NAME } from "@consts/common";
import { Metadata } from "next";
import Pagination from "@components/pagination/Pagination";
import { SearchParams } from "@models/index";
import { getEvents, getEventsYears } from "@/requests";
import {
  getEventFiltersFromSearchParams,
  getEventSortFromSearchParams,
} from "@lib/utils";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | ${ALL_EVENTS_TITLE}`,
  description: "This is a page with all events",
};

const EventsPage = async ({
  searchParams,
}: {
  searchParams?: SearchParams;
}) => {
  const { events, total, currentPage } = await getEvents(
    getEventFiltersFromSearchParams(searchParams),
    getEventSortFromSearchParams(searchParams)
  );

  const eventsYears = await getEventsYears();

  return (
    <>
      <EventList
        events={events}
        title={ALL_EVENTS_TITLE}
        showConfigureBtn
        eventsYears={eventsYears}
      />
      <Pagination
        allCount={total}
        currentPage={currentPage}
        show={!!events.length}
      />
    </>
  );
};

export default EventsPage;
