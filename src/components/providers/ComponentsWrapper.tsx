import { PropsWithChildren, useLayoutEffect } from "react";
import Header from "@components/header/Header";
import { styles } from ".";
import { theme } from "antd";

const ComponentsWrapper = ({ children }: PropsWithChildren) => {
  const { useToken } = theme;
  const { token } = useToken();

  useLayoutEffect(() => {
    document.body.style.backgroundColor = token.colorBgBase;
  });

  return (
    <>
      <Header />
      <main style={styles.main}>{children}</main>
    </>
  );
};

export default ComponentsWrapper;
