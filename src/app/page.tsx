import EventList from "@components/events/EventList/EventList";
import NewsletterRegistration from "@components/newsletter/NewsLetterRegistration/NewsLetterRegistration";
import { Metadata } from "next";
import { getEvents } from "./requests";
import ShowAllEventsButton from "@components/events/ShowAllEventsButton/ShowAllEventsButton";
import { LAST_EVENTS_TITLE, PROJECT_NAME } from "@consts/common";
import { EVENTS_PER_PAGE } from "@consts/api";

export const metadata: Metadata = {
  title: PROJECT_NAME,
  viewport: "initial-scale=1.0, width=device-width",
  description: "This is a home page",
};

const HomePage = async () => {
  const { events, total } = await getEvents(undefined, { createDate: "DESC" });

  return (
    <div>
      <NewsletterRegistration />
      <EventList
        events={events}
        title={LAST_EVENTS_TITLE}
        showAllEventsBtn={false}
      />
      {total > EVENTS_PER_PAGE && <ShowAllEventsButton />}
    </div>
  );
};

export default HomePage;
