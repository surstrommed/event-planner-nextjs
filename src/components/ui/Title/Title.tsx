"use client";

import { ITitle } from "@models/ui";
import { Typography } from "antd";

const Title = ({ children, ...rest }: ITitle) => {
  return <Typography.Title {...rest}>{children}</Typography.Title>;
};

export default Title;
