"use server";

import {
  INVALID_EMAIL_MESSAGE,
  SIGNED_NEWSLETTER_MESSAGE,
} from "@consts/messages";
import { validateEmail } from "@consts/regexs";
import { newsletterSubscribe } from "@lib/mongo/subscribers";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  try {
    const { email } = await req.json();

    if (!email.match(validateEmail)) {
      return NextResponse.json(
        { message: INVALID_EMAIL_MESSAGE },
        { status: 422 }
      );
    }

    const { subscriber, error } = await newsletterSubscribe(email);
    if (error) throw new Error(error);

    return NextResponse.json(
      { message: SIGNED_NEWSLETTER_MESSAGE, subscriber },
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
