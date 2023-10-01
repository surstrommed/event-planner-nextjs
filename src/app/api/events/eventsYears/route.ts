"use server";

import { getEventsYears } from "@lib/mongo/events";
import { allowCors } from "@lib/utils/api";
import { NextResponse } from "next/server";

const handler = allowCors(async () => {
  try {
    const { years = [], error } = await getEventsYears();
    if (error) throw new Error(error);

    return NextResponse.json({ years }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
});

export { handler as GET };
