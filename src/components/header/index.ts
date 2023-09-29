import { GlobalToken } from "antd";
import { CSSProperties } from "react";

export const styles: (themeToken: GlobalToken) => {
  [style: string]: CSSProperties | undefined;
} = (themeToken) => ({
  header: {
    width: "100%",
    top: 0,
    position: "sticky",
    zIndex: 1000,
    backgroundColor: themeToken.colorPrimaryBg,
  },
  rowContainer: {
    display: "flex",
    justifyContent: "space-around",
    alignContent: "center",
  },
  logo: {
    fontSize: "1.5rem",
    fontFamily: "'Fira', sans-serif",
    color: themeToken.colorPrimary,
  },
  logout: {
    fontSize: "1.3rem",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
  desktopListContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
  },
  mobileListContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    alignContent: "center",
  },
  headerItemContainer: { display: "flex", justifyContent: "center" },
  desktopForm: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    gap: "1rem",
  },
  mobileForm: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "1rem 0 0 0",
  },
  mobileFormItem: {
    flex: "1 1 100%",
    display: "flex",
    justifyContent: "center",
  },
  mobileFormButtons: { display: "flex", gap: "1rem" },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    alignContent: "center",
    margin: "0 1rem 0 0",
  },
  desktopSearch: {
    width: 200,
  },
  mobileSearch: {
    width: 300,
  },
  searchBtn: { marginRight: "0.5rem" },
});
