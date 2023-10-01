"use client";

import { useEffect, useState } from "react";
import { IEventListInfinityScroll } from "@models/events";
import Title from "@components/ui/Title/Title";
import { useInView } from "react-intersection-observer";
import { LIMIT_QUERY, PAGE_QUERY } from "@consts/common";
import { Loader } from "@components/loader/Loader";
import { getMyEvents } from "@/requests";
import NoEventsBanner from "@components/events/NoEventsBanner/NoEventsBanner";
import { styles } from ".";
import { Space } from "antd";
import EventCard from "@components/events/EventCard/EventCard";
import { EVENTS_PER_PAGE } from "@consts/api";
import { useSession } from "next-auth/react";

const EventListInfinityScroll = (props: IEventListInfinityScroll) => {
  const {
    searchParams,
    initialEvents = [],
    title,
    showAllEventsBtn = true,
  } = props;

  const limit = Number(searchParams?.[LIMIT_QUERY] || EVENTS_PER_PAGE);
  const initialPage = Number(searchParams?.[PAGE_QUERY] || 1);

  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState<number | null>(null);
  const [ref, inView] = useInView();
  const { data } = useSession();
  const email = data?.user?.email || "";

  useEffect(() => {
    if (inView) {
      (async () => {
        await loadMoreEvents();
      })();
    }
  }, [inView]);

  if (!events.length) {
    return <NoEventsBanner showAllEventsBtn={showAllEventsBtn} />;
  }

  const loadMoreEvents = async () => {
    const nextPage = page + 1;

    const { events, currentPage, total } = await getMyEvents(
      nextPage,
      limit,
      email
    );

    if (events.length) {
      setPage(currentPage);
      setEvents((prev) => [...prev, ...events]);
      setTotal(total);
    }
  };

  return (
    <Space style={styles.eventsContainer}>
      <Title level={2}>{title}</Title>
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
      {((total === null && events.length >= limit) ||
        (!!total && events.length >= total)) && <Loader ref={ref} />}
    </Space>
  );
};

export default EventListInfinityScroll;
