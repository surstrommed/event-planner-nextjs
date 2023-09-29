"use server";

import { deleteEvent } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const eventCreateData = await req.json();

  try {
    const { deleted, error } = await deleteEvent(eventCreateData);
    if (error) throw new Error(error);

    return NextResponse.json({ deleted }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as POST };
