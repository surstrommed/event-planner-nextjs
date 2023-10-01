"use client";

import "@uploadthing/react/styles.css";
import "./globals.css";
import { saveCookiesState, setupStore } from "store/store";
import { debounce } from "debounce";
import { Provider } from "react-redux";
import ProvidersWrapper from "@components/providers/ProvidersWrapper";
import { ILayout } from "@models/index";

export const store = setupStore();

store.subscribe(
  debounce(() => {
    saveCookiesState(store.getState());
  }, 1000)
);

const RootLayout = ({ children }: ILayout) => {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ProvidersWrapper>{children}</ProvidersWrapper>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
