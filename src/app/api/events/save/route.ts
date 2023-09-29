"use server";

import { INVALID_EMAIL_MESSAGE } from "@consts/messages";
import { saveEvent } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const { eventId, email } = await req.json();

  try {
    if (!email) {
      throw new Error(INVALID_EMAIL_MESSAGE);
    }

    const { error, saved } = await saveEvent(email, eventId);
    if (error) throw new Error(error);

    return NextResponse.json({ saved }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as POST };
