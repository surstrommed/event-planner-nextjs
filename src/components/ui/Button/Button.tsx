"use client";

import { Button as StyledButton } from "antd";
import { IButton } from "@models/ui";
import { styles } from ".";
import { useAppSelector } from "hooks/redux";
import { getTheme } from "store/selectors/theme";

const Button = (props: IButton) => {
  const { children, ...rest } = props;

  const theme = useAppSelector(getTheme);
  const type = theme === "dark" ? "primary" : undefined;

  return (
    <StyledButton type={type} style={styles.button} {...rest}>
      {children}
    </StyledButton>
  );
};

export default Button;
