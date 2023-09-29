"use client";

import { ROUTES } from "@consts/api";
import { useRouter } from "next/navigation";
import { styles } from ".";
import Button from "@components/ui/Button/Button";

const ShowAllEventsButton = () => {
  const { push } = useRouter();

  const goToAllEvents = () => {
    push(ROUTES.events);
  };

  return (
    <div style={styles.container}>
      <Button onClick={goToAllEvents}>Show all events</Button>
    </div>
  );
};

export default ShowAllEventsButton;
