import { RootState } from "@lib/utils/store";

export const getTheme = (state: RootState) => state.theme.themeVariant;
