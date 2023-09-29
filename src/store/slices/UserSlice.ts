import { UserSliceState } from "@models/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserSliceState = {
  userData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.userData = payload;
    },
    removeUser(state) {
      state.userData = null;
    },
  },
});

export default userSlice.reducer;
