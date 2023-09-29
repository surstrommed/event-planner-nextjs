import { CSSProperties } from "react";

export const styles: {
  [style: string]: CSSProperties | undefined;
} = {
  form: { maxWidth: 600 },
  descriptionTextarea: { resize: "none" },
  uploadText: { marginTop: 8 },
  manageEventBtn: { width: "100%" },
  imageUploadContainer: { width: 400 },
  removeImageBtnContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "2rem",
  },
};
