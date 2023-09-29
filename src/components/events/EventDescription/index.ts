import { CSSProperties } from "react";

export const styles: { [style: string]: CSSProperties | undefined } = {
  container: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    minWidth: 600,
    margin: "1rem 0",
    borderRadius: "10px",
  },
  imageContainer: { margin: "0 1rem" },
  image: { borderRadius: "10px" },
  infoWithIcon: { display: "flex", alignContent: "center", margin: "2rem 0" },
  icon: { margin: 0, padding: 0, marginRight: "1rem", fontSize: "16px" },
  info: { margin: 0 },
  description: { margin: 0, maxWidth: 400 },
  manageButtonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "1rem",
  },
};
