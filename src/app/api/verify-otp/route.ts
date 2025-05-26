import { and, eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db";
import { passwordResetOtps, usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, otp, newPassword } = await req.json();

  const record = await db.query.passwordResetOtps.findFirst({
    where: (r) => and(eq(r.email, email), eq(r.otp, otp)),
  });
  console.log(
    "chibueze",
    new Date(record?.expires as Date).getTime(),
    new Date().getTime(),
    record
  );
  if (!record) {
    return NextResponse.json({ message: "Invalid OTP", status: 404 });
  }

  if (new Date(record.expires).getTime() < new Date().getTime()) {
    return new Response("OTP expired", { status: 400 });
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  await db
    .update(usersTable)
    .set({ password: hashedPassword })
    .where(eq(usersTable.email, email));

  // Delete used OTP
  await db.delete(passwordResetOtps).where(eq(passwordResetOtps.id, record.id));

  return new Response("Password reset successful", { status: 200 });
}
