import { CSSProperties } from "react";

export const styles: {
  [style: string]: CSSProperties | undefined;
} = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  profileContainer: {
    display: "flex",
    justifyContent: "space-around",
    gap: "8rem",
    marginTop: "2rem",
  },
  operationsMenu: { backgroundColor: "transparent" },
};
