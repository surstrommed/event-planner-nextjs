import { forwardRef } from "react";
import { ColorRing } from "react-loader-spinner";
import { styles } from ".";

export const Loader = forwardRef<HTMLDivElement>((_, ref) => (
  <div ref={ref} style={styles.container}>
    <ColorRing
      visible={true}
      height="100"
      width="100"
      ariaLabel="blocks-loading"
      colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
    />
  </div>
));

Loader.displayName = "Loader";
