import { NextResponse } from "next/server";

import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/db";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { role } = await req.json();

  // Optional: validate role string is valid, e.g. user/editor/admin

  await db.update(usersTable)
    .set({ role })
    .where(eq(usersTable.id, Number(params.id)));

  return NextResponse.json({ success: true });
}
