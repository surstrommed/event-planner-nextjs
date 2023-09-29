"use server";

import {
  INVALID_PASSWORD_MESSAGE,
  INVALID_USER_CREDENTIALS,
  NOT_EXIST_USER,
} from "@consts/messages";
import { allowCors } from "@lib/utils/api";
import { isUserExisted, verifyPassword, changePassword } from "@lib/mongo/auth";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  try {
    const { email, oldPassword, newPassword } = await req.json();

    const { existedUser, error } = await isUserExisted(email);
    if (!existedUser) {
      return NextResponse.json({ message: NOT_EXIST_USER }, { status: 400 });
    } else if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }

    const isValid = await verifyPassword(oldPassword, existedUser.password);

    if (!isValid) {
      return NextResponse.json(
        { message: INVALID_USER_CREDENTIALS },
        { status: 403 }
      );
    }

    if (!newPassword || newPassword.trim().length < 7) {
      return NextResponse.json(
        { message: INVALID_PASSWORD_MESSAGE },
        { status: 422 }
      );
    }

    const result = await changePassword(existedUser.email, newPassword);
    if (result?.error) {
      throw new Error(result.error);
    }

    return NextResponse.json({ message: result.message }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as PATCH };
