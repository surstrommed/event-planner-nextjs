"use server";

import { getCommentsByEventId } from "@lib/mongo/comments";
import { allowCors } from "@lib/utils/api";
import { NextRequest, NextResponse } from "next/server";

const handler = allowCors(async (req: NextRequest) => {
  const eventId = req.nextUrl.pathname.split("/")[3];

  try {
    const { comments: allComments, error } = await getCommentsByEventId(
      eventId
    );
    if (error) throw new Error(error);

    return NextResponse.json({ comments: allComments }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as GET };
