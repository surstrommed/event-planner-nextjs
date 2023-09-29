import { CSSProperties } from "react";

export const styles: { [style: string]: CSSProperties | undefined } = {
  container: {
    width: "100%",
    height: "20vh",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
  },
  title: {
    textShadow: "0 3px 10px rgba(0, 0, 0, 0.5)",
    fontSize: "3rem",
    textAlign: "center",
  },
};
