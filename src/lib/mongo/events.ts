"use server";

import { COLLECTIONS } from "@consts/api";
import { getEventYears, getFormattedEvent } from "@lib/utils/api";
import {
  IEvent,
  IEventManageData,
  IFilterEventsRequestData,
  ISortEventsRequestData,
} from "@models/events";
import {
  MongoClient,
  Db,
  Collection,
  WithId,
  ObjectId,
  Document,
  Sort,
} from "mongodb";
import clientPromise from ".";
import { isUserExisted } from "./auth";
import {
  INVALID_EMAIL_MESSAGE,
  NOT_EXIST_USER,
  NO_EVENT_FOUND_MESSAGE,
} from "@consts/messages";

let client: MongoClient;
let db: Db;
let events: Collection<Document>;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = client.db(process.env.MONGODB_DATABASE);
    events = db.collection(COLLECTIONS.events);
  } catch (error) {
    throw new Error("Failed to connect to database");
  }
}

(async () => {
  await init();
})();

export async function getEventsByFilterAndSort(eventRequestBody: {
  filters: IFilterEventsRequestData;
  sort?: ISortEventsRequestData;
}) {
  try {
    if (!events) await init();

    const { filters: eventFilters, sort: eventSorts } = eventRequestBody;

    const {
      searchQuery,
      startMonth,
      endMonth,
      startYear,
      endYear,
      page,
      limit,
    } = eventFilters;

    const getSortObj = () => {
      const sortObj: Sort = {};
      if (eventSorts?.createDate) {
        if (eventSorts.createDate === "ASC") {
          sortObj.createdAt = 1;
        } else if (eventSorts.createDate === "DESC") {
          sortObj.createdAt = -1;
        }
      }

      if (eventSorts?.title) {
        if (eventSorts.title === "ASC") {
          sortObj.title = 1;
        } else if (eventSorts.title === "DESC") {
          sortObj.title = -1;
        }
      }

      return sortObj;
    };

    const allEvents =
      eventSorts && Object.keys(eventSorts).length
        ? await events.find().sort(getSortObj()).toArray()
        : await events.find().toArray();

    const filteredEvents = allEvents.filter((event) => {
      const startDate = new Date(event.startDate);
      const endDate = new Date(event.endDate);
      const formattedStartMonth = `${startDate.getMonth() + 1}`;
      const formattedEndMonth = `${endDate.getMonth() + 1}`;
      const formattedStartYear = `${startDate.getFullYear()}`;
      const formattedEndYear = `${endDate.getFullYear()}`;

      return (
        (startMonth ? startMonth === formattedStartMonth : true) &&
        (endMonth ? endMonth === formattedEndMonth : true) &&
        (startYear ? startYear === formattedStartYear : true) &&
        (endYear ? endYear === formattedEndYear : true) &&
        (searchQuery ? new RegExp(searchQuery, "i").test(event.title) : true)
      );
    });

    const total = filteredEvents.length;
    const currentPage = Number(page) || 1;

    const startIndex = (currentPage - 1) * limit;
    const endIndex = startIndex + limit;
    const slicedEvents = filteredEvents
      .map((event) => getFormattedEvent(event as WithId<IEvent>))
      .slice(startIndex, endIndex);

    return { events: slicedEvents, total, currentPage };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getEventById(eventId: string) {
  try {
    if (!events) await init();

    const result = (await events.findOne({
      _id: new ObjectId(eventId),
    })) as WithId<IEvent>;

    const event = getFormattedEvent(result);

    if (!event) {
      throw new Error(NO_EVENT_FOUND_MESSAGE);
    }

    return { event };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getEventsYears() {
  try {
    if (!events) await init();
    const result = await events
      .find()
      .map((event: WithId<Document>) => getEventYears(event as WithId<IEvent>))
      .toArray();

    return {
      years: Array.from(new Set(result.flat())).sort(
        (year1, year2) => year1 - year2
      ),
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function createEvent({
  email,
  event,
}: {
  email: string;
  event: IEventManageData;
}) {
  try {
    if (!events) await init();

    if (!email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const formattedEvent = {
      ...event,
      saves: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      creator: existedUser.email,
    };
    const result = await events
      .insertOne(formattedEvent)
      .then((createdEvent) => ({
        id: createdEvent.insertedId,
        ...formattedEvent,
      }));

    return { event: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function editEvent({
  eventId,
  email,
  event,
}: {
  eventId: string;
  email: string;
  event: IEventManageData;
}) {
  try {
    if (!events) await init();

    if (!email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const formattedEvent = {
      ...event,
      updatedAt: new Date().toISOString(),
    };
    const result = await events
      .updateOne(
        { _id: new ObjectId(eventId) },
        { $set: formattedEvent },
        { upsert: true }
      )
      .then(() => ({
        id: eventId,
        ...formattedEvent,
      }));

    return { event: result };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function deleteEvent({
  email,
  eventId,
}: {
  email: string;
  eventId: string;
}) {
  try {
    if (!events) await init();

    if (!email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const deletedEvent = await events.deleteOne({ _id: new ObjectId(eventId) });

    return { deleted: deletedEvent.deletedCount > 0 ? true : false };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getSavedEvents(
  email: string | null,
  page: number,
  limit: number
) {
  try {
    if (!events) await init();

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;
    const userEvents = await events
      .find({ saves: email })
      .skip(skip)
      .limit(limit)
      .map((event) => getFormattedEvent(event as WithId<IEvent>))
      .toArray();
    const total = (await events.find({ saves: email }).toArray()).length || 0;

    return {
      events: userEvents,
      total,
      currentPage,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function saveEvent(email: string | null, eventId: string) {
  try {
    if (!events) await init();

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const { event } = await getEventById(eventId);

    if (!event) {
      throw new Error(NO_EVENT_FOUND_MESSAGE);
    }

    let updatedEventSaves = [...event.saves].filter(Boolean);

    const index = updatedEventSaves.findIndex((e) => e === email);

    if (index === -1) {
      updatedEventSaves.push(email as string);
    } else {
      updatedEventSaves = updatedEventSaves.filter((e) => e !== email);
    }

    const updatedEvent = await events.findOneAndUpdate(
      { _id: new ObjectId(event.id) },
      { $set: { saves: updatedEventSaves } }
    );

    return {
      saved: updatedEvent.ok ? true : false,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}

export async function getMyEvents(
  email: string | null,
  page: number,
  limit: number
) {
  try {
    if (!events) await init();

    const { existedUser, error } = await isUserExisted(email);

    if (!existedUser) {
      throw new Error(NOT_EXIST_USER);
    } else if (error) {
      throw new Error(error);
    }

    const currentPage = Number(page) || 1;
    const skip = (currentPage - 1) * limit;
    const userEvents = await events
      .find({ creator: email })
      .skip(skip)
      .limit(limit)
      .map((event) => getFormattedEvent(event as WithId<IEvent>))
      .toArray();
    const total = (await events.find({ creator: email }).toArray()).length || 0;

    return {
      events: userEvents,
      total,
      currentPage,
    };
  } catch (error) {
    return { error: (error as Error).message };
  }
}
