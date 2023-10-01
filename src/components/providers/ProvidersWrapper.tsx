import { PropsWithChildren } from "react";
import CheckRouter from "@components/checkrouter/CheckRouter";
import { ConfigProvider } from "antd";
import { useAppSelector } from "hooks/redux";
import { SessionProvider } from "next-auth/react";
import { SnackbarProvider } from "notistack";
import { getTheme } from "store/selectors/theme";
import { getCurrentTheme } from "@lib/utils";
import ComponentsWrapper from "./ComponentsWrapper";

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
