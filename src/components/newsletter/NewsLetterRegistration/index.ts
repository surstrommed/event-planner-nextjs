import { CSSProperties } from "react";

export const styles: {
  [style: string]: CSSProperties | undefined;
} = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  submitBtn: { width: "100%" },
};
