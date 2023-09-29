import { RootState } from "@lib/utils/store";

export const getUser = (state: RootState) => state.user.userData;
