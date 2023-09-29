import { CSSProperties } from "react";

export const styles: {
  [style: string]: CSSProperties | undefined;
} = {
  imageDisplayContainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 250,
    gap: "1rem",
    alignItems: "center",
  },
  imageUploadContainer: { width: 400 },
  buttonsWrapper: { display: "flex", justifyContent: "center", gap: "1rem" },
  avatar: { border: "1px solid lightgrey", borderRadius: "20px" },
  avatarButton: { width: "100%" },
};
