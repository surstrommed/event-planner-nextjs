"use server";

import {
  INVALID_EMAIL_MESSAGE,
  INVALID_NAME_MESSAGE,
  INVALID_TEXT_MESSAGE,
  CREATED_COMMENT_MESSAGE,
} from "@consts/messages";
import { validateEmail } from "@consts/regexs";
import { createComment } from "@lib/mongo/comments";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  try {
    const { email, creator, text, eventId } = await req.json();

    if (!email.match(validateEmail)) {
      return NextResponse.json(
        { message: INVALID_EMAIL_MESSAGE },
        { status: 422 }
      );
    }
    if (!creator?.trim()) {
      return NextResponse.json(
        { message: INVALID_NAME_MESSAGE },
        { status: 422 }
      );
    }
    if (!text?.trim()) {
      return NextResponse.json(
        { message: INVALID_TEXT_MESSAGE },
        { status: 422 }
      );
    }

    const comment = {
      email,
      creator,
      text,
      eventId,
    };

    const { comment: createdComment, error } = await createComment(comment);
    if (error) throw new Error(error);

    return NextResponse.json(
      {
        message: CREATED_COMMENT_MESSAGE,
        comment: createdComment,
      },
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
