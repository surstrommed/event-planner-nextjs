"use server";

import { getEventsByFilterAndSort } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const eventRequestBody = await req.json();

  try {
    const { events, total, currentPage, error } =
      await getEventsByFilterAndSort(eventRequestBody);
    if (error) throw new Error(error);

    return NextResponse.json({ events, total, currentPage }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as POST };
