import { CSSProperties } from "react";

export const styles: { [style: string]: CSSProperties | undefined } = {
  container: { minWidth: 600 },
  commentTextarea: { resize: "none" },
  sendBtn: {
    display: "flex",
    justifyContent: "flex-end",
  },
};
