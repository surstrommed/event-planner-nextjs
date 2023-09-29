"use client";

import { IEventList } from "@models/events";
import EventCard from "../EventCard/EventCard";
import { Space } from "antd";
import { styles } from ".";
import EventsConfigurator from "../EventsConfigurator/EventsConfigurator";
import NoEventsBanner from "../NoEventsBanner/NoEventsBanner";
import Title from "@components/ui/Title/Title";

const EventList = (props: IEventList) => {
  const {
    events = [],
    title,
    showAllEventsBtn = true,
    showConfigureBtn = false,
    eventsYears = [],
  } = props;

  if (!events.length) {
    return <NoEventsBanner showAllEventsBtn={showAllEventsBtn} />;
  }

  return (
    <Space style={styles.eventsContainer}>
      <Title level={2}>{title}</Title>
      {showConfigureBtn && <EventsConfigurator eventsYears={eventsYears} />}
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </Space>
  );
};

export default EventList;
