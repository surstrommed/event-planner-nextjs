"use client";

import { IEventSummary } from "@models/events";
import { Space } from "antd";
import { styles } from ".";
import Title from "@components/ui/Title/Title";

const EventSummary = (props: IEventSummary) => {
  const { title } = props;

  return (
    <Space style={styles.container}>
      <Title level={2} style={styles.title}>
        {title}
      </Title>
    </Space>
  );
};

export default EventSummary;
