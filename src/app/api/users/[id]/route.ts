import { db } from "@/db";
import { usersTable } from "@/db/schema";

import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const userId = Number(params.id);

  if (isNaN(userId)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }

  try {
    await db.delete(usersTable).where(eq(usersTable.id, userId)); // ✅ use imported table

    return NextResponse.json({ message: "User deleted" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete user:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
