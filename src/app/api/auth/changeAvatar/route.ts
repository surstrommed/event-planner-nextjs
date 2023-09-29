"use server";

import { INVALID_AVATAR_MESSAGE, NOT_EXIST_USER } from "@consts/messages";
import { allowCors } from "@lib/utils/api";
import { isUserExisted, changeAvatar } from "@lib/mongo/auth";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  try {
    const { email, avatarUrl } = await req.json();

    const { existedUser, error } = await isUserExisted(email);
    if (!existedUser) {
      return NextResponse.json({ message: NOT_EXIST_USER }, { status: 400 });
    } else if (error) {
      return NextResponse.json({ message: error }, { status: 500 });
    }

    if (avatarUrl !== null && !avatarUrl) {
      return NextResponse.json(
        { message: INVALID_AVATAR_MESSAGE },
        { status: 422 }
      );
    }

    const result = await changeAvatar(existedUser.email, avatarUrl || "");
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
