"use client";

import { formattedEventDate } from "@lib/utils";
import { IEventResultsTitle } from "@models/events";
import ShowAllEventsButton from "../ShowAllEventsButton/ShowAllEventsButton";
import { Space } from "antd";
import { styles } from ".";
import Title from "@components/ui/Title/Title";

const EventResultsTitle = (props: IEventResultsTitle) => {
  const { date } = props;

  return (
    <Space style={styles.container}>
      <Title level={1}>Events in {formattedEventDate(date, true)}</Title>
      <ShowAllEventsButton />
    </Space>
  );
};

export default EventResultsTitle;
