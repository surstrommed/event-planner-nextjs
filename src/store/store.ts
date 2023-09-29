import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { GetState } from "@lib/utils/store";
import themeReducer from "./slices/ThemeSlice";
import userReducer from "./slices/UserSlice";
import { getCookie, setCookie } from "cookies-next";
import { COOKIES_APP_STATE } from "@consts/common";

export const loadCookiesState = () => {
  try {
    const cookiesState = getCookie(COOKIES_APP_STATE) || "{}";
    const serializedState = JSON.parse(cookiesState);
    if (!serializedState) return {};
    return serializedState;
  } catch {
    return {};
  }
};

export const saveCookiesState = async (state: GetState) => {
  try {
    const serializedState = JSON.stringify(state);
    setCookie(COOKIES_APP_STATE, serializedState);
  } catch {
    return undefined;
  }
};

export const rootReducer = combineReducers({
  theme: themeReducer,
  user: userReducer,
});

export const setupStore = () => {
  return configureStore({
    devTools: true,
    reducer: rootReducer,
    preloadedState: loadCookiesState(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
  });
};
