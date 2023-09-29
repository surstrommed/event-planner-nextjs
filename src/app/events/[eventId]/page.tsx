import Comments from "@components/comments/Comments/Comments";
import EventSummary from "@components/events/EventSummary/EventSummary";
import { PROJECT_NAME } from "@consts/common";
import Head from "next/head";
import { getEventById } from "@/requests";
import NoEventsBanner from "@components/events/NoEventsBanner/NoEventsBanner";
import EventDescription from "@components/events/EventDescription/EventDescription";

export const dynamicParams = true;

const EventDetailPage = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const event = await getEventById(eventId);

  if (!event) {
    return <NoEventsBanner />;
  }

  return (
    <>
      <Head>
        <title>
          {PROJECT_NAME} | {event.title}
        </title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventDescription
        eventId={eventId}
        date={[event.startDate, event.endDate]}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
        description={event.description}
        creator={event.creator}
        saves={event.saves}
      />
      <Comments eventId={event.id} />
    </>
  );
};

export default EventDetailPage;
