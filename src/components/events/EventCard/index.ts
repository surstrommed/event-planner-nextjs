import { GlobalToken } from "antd";
import { CSSProperties } from "react";

export const styles: (themeToken: GlobalToken) => {
  [style: string]: CSSProperties | undefined;
} = (themeToken) => ({
  rowContainer: { flex: "1 1 100%" },
  colContainer: {
    display: "flex",
    alignItems: "center",
    backgroundColor: themeToken.colorPrimaryBg,
    minWidth: 600,
    minHeight: 200,
    margin: "1rem 0",
    borderRadius: "10px",
  },
  imageContainer: { margin: "0 1rem" },
  card: {
    width: 300,
    borderRadius: "0 10px 10px 0",
    border: `1px solid ${themeToken.colorPrimaryBg}`,
  },
  infoWithIcon: { display: "flex", marginBottom: "1rem" },
  icon: { marginRight: "1rem" },
  button: { display: "flex", justifyContent: "flex-end" },
  titleContainer: { display: "flex", justifyContent: "space-between" },
  manageButtonsContainer: { display: "flex", gap: "1rem" },
});
