"use server";

import {
  INVALID_EMAIL_MESSAGE,
  INVALID_PASSWORD_MESSAGE,
  ALREADY_EXIST_USER,
  SUCCESS_SIGNUP_MESSAGE,
} from "@consts/messages";
import { validateEmail } from "@consts/regexs";
import { isUserExisted, signup } from "@lib/mongo/auth";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  try {
    const { email, password, fullName } = await req.json();

    if (!email?.match(validateEmail)) {
      return NextResponse.json(
        { message: INVALID_EMAIL_MESSAGE },
        { status: 422 }
      );
    }

    if (!password || password.trim().length < 7) {
      return NextResponse.json(
        { message: INVALID_PASSWORD_MESSAGE },
        { status: 422 }
      );
    }

    const { existedUser, error } = await isUserExisted(email);
    if (existedUser) {
      return NextResponse.json(
        { message: ALREADY_EXIST_USER },
        { status: 400 }
      );
    } else if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }

    const { user: createdUser } = await signup({
      email,
      password,
      fullName,
    });

    return NextResponse.json(
      { message: SUCCESS_SIGNUP_MESSAGE, createdUser },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as POST };
