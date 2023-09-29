"use server";

import { INVALID_USER_CREDENTIALS } from "@consts/messages";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { COOKIES_APP_STATE } from "@consts/common";
import { RootState } from "@lib/utils/store";

export const getCookiesUser = () => {
  const appState = JSON.parse(
    cookies().get(COOKIES_APP_STATE)?.value || "{}"
  ) as RootState;

  if (!appState.user.userData) {
    NextResponse.json({ message: INVALID_USER_CREDENTIALS }, { status: 401 });
    return null;
  }

  return appState.user.userData;
};
