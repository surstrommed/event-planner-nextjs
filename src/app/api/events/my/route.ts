"use server";

import { LIMIT_QUERY, PAGE_QUERY } from "@consts/common";
import { getMyEvents } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const { searchParams } = req.nextUrl;

  const page = Number(searchParams.get(PAGE_QUERY));
  const limit = Number(searchParams.get(LIMIT_QUERY));
  const email = searchParams.get("email");

  try {
    const { error, ...data } = await getMyEvents(email, page, limit);
    if (error) throw new Error(error);

    return NextResponse.json({ ...data }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as GET };
