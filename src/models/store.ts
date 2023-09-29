import { IThemeType } from ".";
import { IStoredUser } from "./user";

export type ThemeSliceState = {
  themeVariant: IThemeType;
};

export type UserSliceState = {
  userData: IStoredUser;
};
