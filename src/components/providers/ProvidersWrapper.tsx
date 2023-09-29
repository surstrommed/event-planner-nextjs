"use client";

import { PropsWithChildren, useLayoutEffect } from "react";
import CheckRouter from "@components/checkrouter/CheckRouter";
import Header from "@components/header/Header";
import { ConfigProvider, theme } from "antd";
import { useAppSelector } from "hooks/redux";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { getTheme } from "store/selectors/theme";
import { styles } from ".";
import { getCurrentTheme } from "@lib/utils";

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

const ProvidersWrapper = ({ children }: PropsWithChildren) => {
  const theme = useAppSelector(getTheme);
  const currentTheme = getCurrentTheme(theme);

  return (
    <SessionProvider>
      <CheckRouter>
        <SnackbarProvider preventDuplicate>
          <ConfigProvider theme={currentTheme}>
            <ComponentsWrapper>{children}</ComponentsWrapper>
          </ConfigProvider>
        </SnackbarProvider>
      </CheckRouter>
    </SessionProvider>
  );
};

export default ProvidersWrapper;
