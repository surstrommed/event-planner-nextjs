import { PROJECT_NAME } from "@consts/common";
import { Metadata } from "next";
import EventManageForm from "@components/events/EventManage/EventManageForm";
import { styles } from ".";
import Title from "@components/ui/Title/Title";

export const metadata: Metadata = {
  title: `${PROJECT_NAME} | Create an event`,
  description: "This is a page for event creating",
};

const EventCreate = () => {
  return (
    <div style={styles.container}>
      <Title level={1}>Create an event</Title>
      <EventManageForm type="create" />
    </div>
  );
};

export default EventCreate;
