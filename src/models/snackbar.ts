import { SnackbarMessage, VariantType } from "notistack";

export type ISnackbar = {
  message: SnackbarMessage;
  variant?: VariantType;
};
