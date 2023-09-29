import { CSSProperties } from "react";

export const styles: {
  [el: string]: { [style: string]: CSSProperties | undefined };
} = {
  button: {
    main: {
      width: 200,
      padding: "0 1rem",
      fontSize: 12,
      textAlign: "center",
    },
  },
  containers: {
    filesListContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "1rem",
    },
    filesList: {
      listStyle: "none",
    },
  },
};
