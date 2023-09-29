import Button from "@components/ui/Button/Button";
import {
  formattedEventDate,
  formattedEventLocation,
  getEventLink,
} from "@lib/utils";
import { IEventCard } from "@models/events";
import Image from "next/image";
import {
  CalendarOutlined,
  HomeOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, theme } from "antd";
import { styles as themeStyles } from ".";
import { useRouter } from "next/navigation";
import { myImageLoader } from "@/utils";
import { IMAGE_NOT_FOUND_ROUTE } from "@consts/common";
import SaveEventButton from "../SaveEventButton/SaveEventButton";
import useSnackBar from "@components/snackbar/Snackbar";
import {
  FAILED_EVENT_SAVE,
  FAILED_EVENT_UNSAVE,
  SUCCESS_EVENT_SAVE,
  SUCCESS_EVENT_UNSAVE,
} from "@consts/messages";
import { useSession } from "next-auth/react";
import ManageEventButton from "../ManageEventButton/ManageEventButton";
import { saveEvent } from "@/requests";

const EventCard = (props: IEventCard) => {
  const { id, title, location, startDate, endDate, image, saves, creator } =
    props;

  const { push, refresh } = useRouter();
  const { showSnackbar } = useSnackBar();
  const { data } = useSession();
  const { useToken } = theme;
  const { token: themeToken } = useToken();
  const styles = themeStyles(themeToken);

  const email = data?.user?.email || "";

  const isSaved = saves.includes(email);
  const isMine = creator === email;

  const handleEventPage = () => {
    push(getEventLink(id));
  };

  const handleEventSave = async () => {
    try {
      const { saved } = await saveEvent(id, email);

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
    <Row style={styles.rowContainer}>
      <Col span={12} style={styles.colContainer}>
        <div style={styles.imageContainer}>
          <Image
            src={image || IMAGE_NOT_FOUND_ROUTE}
            alt={title}
            width={320}
            height={160}
            loading="lazy"
            loader={myImageLoader}
          />
        </div>
        <div>
          <Card
            title={
              <div style={styles.titleContainer}>
                <div>{title}</div>
                <div style={styles.manageButtonsContainer}>
                  <SaveEventButton saved={isSaved} onClick={handleEventSave} />
                  {isMine && <ManageEventButton eventId={id} />}
                </div>
              </div>
            }
            bordered={false}
            style={styles.card}
          >
            <div style={styles.infoWithIcon}>
              <CalendarOutlined style={styles.icon} />
              <span>
                <b>Start:</b> {formattedEventDate(startDate)}
                <br />
                <b>End:</b> {formattedEventDate(endDate)}
              </span>
            </div>
            <div style={styles.infoWithIcon}>
              <HomeOutlined style={styles.icon} />
              <span>{formattedEventLocation(location)}</span>
            </div>
            <div style={styles.button}>
              <Button onClick={handleEventPage} icon={<ArrowLeftOutlined />}>
                Explore Event
              </Button>
            </div>
          </Card>
        </div>
      </Col>
    </Row>
  );
};

export default EventCard;
