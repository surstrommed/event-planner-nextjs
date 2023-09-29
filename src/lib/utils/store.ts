import { AnyAction, ThunkAction, ThunkDispatch } from "@reduxjs/toolkit";
import { setupStore, rootReducer } from "store/store";

const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;

export type AppStore = ReturnType<typeof setupStore>;

export type GetState = ReturnType<typeof store.getState>;

export type AppDispatch = AppStore["dispatch"];

export type DispatchType = ThunkDispatch<RootState, unknown, AnyAction>;

export type TypedThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;
