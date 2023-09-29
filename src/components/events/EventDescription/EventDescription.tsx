"use client";

import Image from "next/image";
import { formattedEventDate, formattedEventLocation } from "@lib/utils";
import { IEventDescription } from "@models/events";
import {
  CalendarOutlined,
  HomeOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { styles } from ".";
import { Col, Row } from "antd";
import { myImageLoader } from "@/utils";
import { IMAGE_NOT_FOUND_ROUTE } from "@consts/common";
import SaveEventButton from "@components/events/SaveEventButton/SaveEventButton";
import ManageEventButton from "@components/events/ManageEventButton/ManageEventButton";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { saveEvent } from "@/requests";
import useSnackBar from "@components/snackbar/Snackbar";
import {
  SUCCESS_EVENT_UNSAVE,
  SUCCESS_EVENT_SAVE,
  FAILED_EVENT_UNSAVE,
  FAILED_EVENT_SAVE,
} from "@consts/messages";
import Title from "@components/ui/Title/Title";

const EventDescription = (props: IEventDescription) => {
  const {
    eventId,
    date: [startDate, endDate],
    address,
    image,
    imageAlt,
    description,
    creator,
    saves,
  } = props;

  const { data } = useSession();
  const { refresh } = useRouter();
  const { showSnackbar } = useSnackBar();

  const email = data?.user?.email || "";

  const isSaved = saves.includes(email);
  const isMine = creator === email;

  const handleEventSave = async () => {
    try {
      const { saved } = await saveEvent(eventId, email);

      showSnackbar({
        message: isSaved ? SUCCESS_EVENT_UNSAVE : SUCCESS_EVENT_SAVE,
      });

      if (saved) {
        refresh();
      }
    } catch {
      showSnackbar({
        message: isSaved ? FAILED_EVENT_UNSAVE : FAILED_EVENT_SAVE,
        variant: "error",
      });
    }
  };

  return (
    <Row>
      <Col span={24} style={styles.container}>
        <div style={styles.imageContainer}>
          <Image
            src={image || IMAGE_NOT_FOUND_ROUTE}
            alt={imageAlt}
            width={400}
            height={400}
            style={styles.image}
            loading="lazy"
            loader={myImageLoader}
          />
        </div>
        <div>
          <div style={styles.manageButtonsContainer}>
            <SaveEventButton saved={isSaved} onClick={handleEventSave} />
            {isMine && <ManageEventButton eventId={eventId} />}
          </div>
          <div style={styles.infoWithIcon}>
            <CalendarOutlined style={styles.icon} />
            <Title level={4} style={styles.info}>
              Start: {formattedEventDate(startDate)}
              <br />
              End: {formattedEventDate(endDate)}
            </Title>
          </div>
          <div style={styles.infoWithIcon}>
            <HomeOutlined style={styles.icon} />
            <Title level={4} style={styles.info}>
              {formattedEventLocation(address)}
            </Title>
          </div>
          <div style={styles.infoWithIcon}>
            <InfoCircleOutlined style={styles.icon} />
            <Title level={5} style={styles.description}>
              {description}
            </Title>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default EventDescription;
