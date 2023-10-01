import { PropsWithChildren, ReactNode } from "react";
import { z } from "zod";
import { SORT_TYPES, SearchParams } from ".";
import {
  CREATE_DATE_SORT,
  END_MONTH_FILTER,
  END_YEAR_FILTER,
  START_MONTH_FILTER,
  START_YEAR_FILTER,
  TITLE_SORT,
} from "@consts/common";

const Event = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  image: z.string(),
  saves: z.string().array(),
  createdAt: z.string(),
  updatedAt: z.string(),
  creator: z.string(),
});
export type IEvent = z.infer<typeof Event>;

const EventCard = Event.extend({});
export type IEventCard = z.infer<typeof EventCard>;

const EventList = z.object({
  events: Event.array(),
  title: z.string(),
  showAllEventsBtn: z.boolean().optional(),
  showConfigureBtn: z.boolean().optional(),
  eventsYears: z.string().array().optional(),
});
export type IEventList = z.infer<typeof EventList>;

const EventListInfinityScroll = z.object({
  searchParams: SearchParams,
  initialEvents: Event.array(),
  title: z.string(),
  showAllEventsBtn: z.boolean().optional(),
});
export type IEventListInfinityScroll = z.infer<typeof EventListInfinityScroll>;

export type IEventContent = {
  children: ReactNode;
};

const EventDescription = z.object({
  eventId: z.string(),
  date: z.array(z.string(), z.string()),
  address: z.string(),
  image: z.string(),
  imageAlt: z.string(),
  description: z.string(),
  creator: z.string(),
  saves: z.string().array(),
});
export type IEventDescription = z.infer<typeof EventDescription>;

export type IEventDescriptionItem = {
  icon: ReactNode;
  children: ReactNode;
};

const EventSummary = z.object({
  title: z.string(),
});
export type IEventSummary = z.infer<typeof EventSummary>;

const EventsFilter = z.object({
  eventsYears: z.string().array(),
  handleFilterChange: z
    .function()
    .args(
      z.object({
        startMonth: z.string().optional(),
        endMonth: z.string().optional(),
        startYear: z.string().optional(),
        endYear: z.string().optional(),
      })
    )
    .returns(z.void()),
});
export type IEventsFilter = z.infer<typeof EventsFilter>;

const EventResultsTitle = z.object({
  date: z.string(),
});
export type IEventResultsTitle = z.infer<typeof EventResultsTitle>;

const EventManageData = z.object({
  title: z.string(),
  description: z.string(),
  location: z.string(),
  image: z.string(),
  startDate: z.date(),
  endDate: z.date(),
});
export type IEventManageData = z.infer<typeof EventManageData>;

const EventFilterData = z.object({
  [START_MONTH_FILTER]: z.string().optional(),
  [END_MONTH_FILTER]: z.string().optional(),
  [START_YEAR_FILTER]: z.string().optional(),
  [END_YEAR_FILTER]: z.string().optional(),
});
export type IEventFilterData = z.infer<typeof EventFilterData>;

const EventSortFormData = z.object({
  sortParameter: z.string().optional(),
});
export type IEventSortFormData = z.infer<typeof EventSortFormData>;

const EventSortData = z.object({
  [TITLE_SORT]: z.string().optional(),
  [CREATE_DATE_SORT]: z.string().optional(),
});
export type IEventSortData = z.infer<typeof EventSortData>;

const EventSort = z.object({
  handleSortChange: z
    .function()
    .args(
      z.object({
        [TITLE_SORT]: z.string().optional(),
        [CREATE_DATE_SORT]: z.string().optional(),
      })
    )
    .returns(z.void()),
});
export type IEventSort = z.infer<typeof EventSort>;

const FilterEventsRequestData = EventFilterData.extend({
  searchQuery: z.string().optional(),
  page: z.number(),
  limit: z.number(),
});
export type IFilterEventsRequestData = z.infer<typeof FilterEventsRequestData>;

const SortEventsRequestData = z.object({
  createDate: SORT_TYPES.optional(),
  title: SORT_TYPES.optional(),
});
export type ISortEventsRequestData = z.infer<typeof SortEventsRequestData>;

export type IEventProvider = PropsWithChildren<object>;

const EventsConfigurator = z.object({
  eventsYears: z.string().array(),
});
export type IEventsConfigurator = z.infer<typeof EventsConfigurator>;

const ManageEventButton = z.object({
  eventId: z.string(),
});
export type IManageEventButton = z.infer<typeof ManageEventButton>;

export type INoEventsBanner = {
  showAllEventsBtn?: boolean;
};

const EventManageFormType = z.union([z.literal("create"), z.literal("edit")]);
export type IEventManageFormType = z.infer<typeof EventManageFormType>;

export type IEventManageForm = {
  type: IEventManageFormType;
  event?: IEvent;
};
