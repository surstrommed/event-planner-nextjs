"use client";

import Button from "@components/ui/Button/Button";
import { useAppSelector } from "hooks/redux";
import { getTheme } from "store/selectors/theme";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  const theme = useAppSelector(getTheme);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexFlow: "row wrap",
        marginTop: "10%",
      }}
    >
      <h2 style={{ flex: "1 100%", textAlign: "center" }}>
        Something went wrong!
      </h2>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
};

export default Error;
