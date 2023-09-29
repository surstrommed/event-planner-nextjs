import { EVENTS_PER_PAGE, PUBLIC_ROUTES, ROUTES } from "@consts/api";
import { FAILED_SIGNIN } from "@consts/messages";
import { http } from "@lib/utils/api";
import { AppDispatch } from "@lib/utils/store";
import { IAddCommentData, IComment } from "@models/comments";
import {
  IEvent,
  IEventManageData,
  IFilterEventsRequestData,
  ISortEventsRequestData,
} from "@models/events";
import { UserSession } from "@models/index";
import { ISignupData, IUser } from "@models/user";
import { signIn } from "next-auth/react";
import { setUser } from "store/actions/user";

export const getUserSession = async () => {
  try {
    const session = await http.get<UserSession>(ROUTES.apiUserSession);

    return session;
  } catch {
    return { authenticated: false, session: null };
  }
};

export const getEvents = async (
  filters: IFilterEventsRequestData = { page: 1, limit: EVENTS_PER_PAGE },
  sort?: ISortEventsRequestData
) => {
  try {
    const {
      events = [],
      total = 0,
      currentPage,
    } = await http.post<
      { events: IEvent[]; total: number; currentPage: number },
      { filters: IFilterEventsRequestData; sort?: ISortEventsRequestData }
    >(ROUTES.apiEvents, { filters, sort });

    return { events, total, currentPage };
  } catch {
    return { events: [], total: 0, currentPage: 1 };
  }
};

export const getEventsYears = async () => {
  try {
    const { years = [] } = await http.get<{ years: string[] }>(
      ROUTES.apiEventsYears,
      { next: { revalidate: 60 } }
    );

    return years;
  } catch {
    return [];
  }
};

export const getEventById = async (eventId: string) => {
  try {
    const { event } = await http.get<{ event: IEvent }>(
      `${ROUTES.apiEvents}/${eventId}`,
      {
        next: {
          revalidate: 30,
        },
      }
    );

    return event;
  } catch {
    return null;
  }
};

export const signin = async (
  email: string,
  password: string,
  dispatch: AppDispatch
) => {
  const response = await signIn("credentials", {
    email,
    password,
    redirect: false,
    callbackUrl: PUBLIC_ROUTES.main,
  });

  if (response?.ok) {
    const { session } = await getUserSession();
    if (session?.user) {
      dispatch(setUser(session.user));
    }
  }

  if (response?.error) {
    throw new Error(FAILED_SIGNIN);
  }
};

export const getSavedEvents = async (
  page: number,
  limit: number,
  email: string
) => {
  try {
    const {
      events = [],
      total = 0,
      currentPage,
    } = await http.get<{
      events: IEvent[];
      total: number;
      currentPage: number;
    }>(`${ROUTES.apiSavedEvents}?page=${page}&limit=${limit}&email=${email}`, {
      next: { revalidate: 60 },
    });

    return { events, total, currentPage };
  } catch {
    return { events: [], total: 0, currentPage: 1 };
  }
};

export const getMyEvents = async (
  page: number,
  limit: number,
  email: string
) => {
  try {
    const {
      events = [],
      total = 0,
      currentPage,
    } = await http.get<{
      events: IEvent[];
      total: number;
      currentPage: number;
    }>(`${ROUTES.apiMyEvents}?page=${page}&limit=${limit}&email=${email}`, {
      next: { revalidate: 60 },
    });

    return { events, total, currentPage };
  } catch {
    return { events: [], total: 0, currentPage: 1 };
  }
};

export const createEvent = async (
  { title, description, location, startDate, endDate, image }: IEventManageData,
  email: string
) => {
  await http.post(ROUTES.apiEventCreate, {
    event: {
      title,
      description,
      location,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      image,
    },
    email,
  });
};

export const editEvent = async (
  { title, description, location, startDate, endDate, image }: IEventManageData,
  email: string,
  eventId: string
) => {
  await http.post(ROUTES.apiEventEdit, {
    event: {
      title,
      description,
      location,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      image,
    },
    email,
    eventId,
  });
};

export const saveEvent = async (eventId: string, email: string) => {
  return await http.post<
    { saved: boolean },
    { eventId: string; email: string }
  >(ROUTES.apiEventSave, {
    eventId,
    email,
  });
};

export const deleteEvent = async (eventId: string, email: string) => {
  return await http.post<
    { deleted: boolean },
    { eventId: string; email: string }
  >(ROUTES.apiEventDelete, {
    eventId,
    email,
  });
};

export const signup = async ({ email, password, fullName }: ISignupData) => {
  return await http.post<
    { message: string; createdUser: IUser },
    { email: string; password: string; fullName: string }
  >(ROUTES.apiSignUp, {
    email,
    password,
    fullName,
  });
};

export const getEventComments = async (eventId: string) => {
  return await http.get<{ comments: IComment[] }>(
    `${ROUTES.apiComments}/${eventId}`
  );
};

export const addEventComment = async (commentData: IAddCommentData) => {
  await http.post(ROUTES.apiComments, commentData);
};

export const subscribeNewsletter = async (email: string) => {
  await http.post(ROUTES.apiNewsletter, { email });
};

export const changeAvatar = async (email: string, avatarUrl: string | null) => {
  await http.patch(ROUTES.apiChangeAvatar, {
    email,
    avatarUrl,
  });
};

export const changePassword = async (
  email: string,
  oldPassword: string,
  newPassword: string
) => {
  await http.patch(ROUTES.apiChangePassword, {
    email,
    oldPassword,
    newPassword,
  });
};
