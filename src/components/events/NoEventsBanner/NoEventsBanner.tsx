"use client";

import { NO_EVENTS_FOUND_MESSAGE } from "@consts/messages";
import { Space, Alert } from "antd";
import ShowAllEventsButton from "../ShowAllEventsButton/ShowAllEventsButton";
import { styles } from ".";
import { INoEventsBanner } from "@models/events";

const NoEventsBanner = ({ showAllEventsBtn = true }: INoEventsBanner) => {
  return (
    <Space style={styles.errorAlert}>
      <Alert message={NO_EVENTS_FOUND_MESSAGE} type="error" />
      {showAllEventsBtn && <ShowAllEventsButton />}
    </Space>
  );
};

export default NoEventsBanner;
