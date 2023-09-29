"use server";

import { getEventById } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const eventId = req.nextUrl.pathname.split("/")[3];

  try {
    const { event, error } = await getEventById(eventId);
    if (error) throw new Error(error);

    return NextResponse.json({ event }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as GET };
