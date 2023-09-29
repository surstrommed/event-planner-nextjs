import { PUBLIC_ROUTES } from "./api";

export const validateEmail = /^[^\s@<>()?]+@[^\s@<>()?]+\.[^\s@<>()]{2,}$/i;

export const getValidateEventSearch = () => {
  const formattedEvents = PUBLIC_ROUTES.events.replace(
    /[-\/\\^$*+?.()|[\]{}]/g,
    "\\$&"
  );

  return new RegExp(
    `^(.*${formattedEvents}(\\?[^/]+)?|.*${formattedEvents}/\\d+/\\d+(\\?[^/]+)?)$`
  );
};
