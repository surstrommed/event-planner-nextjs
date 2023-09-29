import { ThemeSliceState } from "@models/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ThemeSliceState = {
  themeVariant: "light",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    set(state, { payload }) {
      state.themeVariant = payload;
    },
  },
});

export default themeSlice.reducer;
