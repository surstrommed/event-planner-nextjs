export const PUBLIC_ROUTES = {
  auth: "/auth",
  main: "/",
  events: "/events",
  session: "/session",
};

export const PROTECTED_ROUTES = {
  api: "/api",
  newsletter: "/newsletter",
  profile: "/profile",
  changePassword: "/changePassword",
  changeAvatar: "/changeAvatar",
  eventsYears: "/eventsYears",
  comments: "/comments",
  eventCreate: "/events/create",
  eventEdit: "/events/edit",
  savedEvents: "/events/saved",
  myEvents: "/events/my",
};

const API_ROUTES = {
  apiEvents: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}`,
  apiSavedEvents: `${PROTECTED_ROUTES.api}${PROTECTED_ROUTES.savedEvents}`,
  apiNewsletter: `${PROTECTED_ROUTES.api}${PROTECTED_ROUTES.newsletter}`,
  apiComments: `${PROTECTED_ROUTES.api}${PROTECTED_ROUTES.comments}`,
  apiSignUp: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.auth}/signup`,
  apiChangePassword: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.auth}${PROTECTED_ROUTES.changePassword}`,
  apiEventsYears: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}${PROTECTED_ROUTES.eventsYears}`,
  apiEventCreate: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}/create`,
  apiEventEdit: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}/edit`,
  apiEventDelete: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}/delete`,
  apiChangeAvatar: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.auth}${PROTECTED_ROUTES.changeAvatar}`,
  apiEventSave: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.events}/save`,
  apiUserSession: `${PROTECTED_ROUTES.api}${PUBLIC_ROUTES.session}`,
  apiMyEvents: `${PROTECTED_ROUTES.api}${PROTECTED_ROUTES.myEvents}`,
};

export const ROUTES = {
  ...PUBLIC_ROUTES,
  ...PROTECTED_ROUTES,
  ...API_ROUTES,
};

export const COLLECTIONS = {
  subscribers: "subscribers",
  events: "events",
  comments: "comments",
  users: "users",
};

export const EVENTS_PER_PAGE = 3;
