import { PROJECT_NAME } from "@consts/common";
import { Metadata } from "next";
import EventManageForm from "@components/events/EventManage/EventManageForm";
import { styles } from ".";
import { getEventById } from "@/requests";
import NoEventsBanner from "@components/events/NoEventsBanner/NoEventsBanner";
import { ROUTES } from "@consts/api";
import { redirect } from "next/navigation";
import { getCookiesUser } from "@lib/auth/getCookiesUser";
import Title from "@components/ui/Title/Title";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Edit an event`,
  description: "This is a page for event editing",
};

const EventEdit = async ({
  params: { eventId },
}: {
  params: { eventId: string };
}) => {
  const event = await getEventById(eventId);
  const user = getCookiesUser();
  const email = user?.email;

  if (!event) {
    return <NoEventsBanner />;
  }

  if (!email || (event && email !== event.creator)) {
    redirect(ROUTES.main);
  }

  return (
    <div style={styles.container}>
      <Title level={1}>Edit an event</Title>
      <EventManageForm type="edit" event={event} />
    </div>
  );
};

export default EventEdit;
