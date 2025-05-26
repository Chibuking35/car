import { db } from "@/db";
import { passwordResetOtps } from "@/db/schema";

import { eq } from "drizzle-orm";
import { generateOtp } from "../../../../lib/otp";
import { resend } from "../../../../lib/resend";
import { NextRequest, NextResponse } from "next/server";

function formatDate(date: Date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // Convert 0 to 12

  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
}
export async function POST(req: NextRequest) {
  const { email } = await req.json();

  const otp = generateOtp();
  const expires = new Date(new Date().getTime() + 60 * 1000).getTime();

  // Delete any existing OTP for this email
  try {
    await db
      .delete(passwordResetOtps)
      .where(eq(passwordResetOtps.email, email));

    // Insert new OTP record
    await db.insert(passwordResetOtps).values({
      email,
      otp,
      expires: new Date(expires),
    });

    // Send OTP email
    const resp = await resend.emails.send({
      from: "Your App <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP for Password Reset",
      html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It expires in ${formatDate(new Date(expires))} minutes.</p>`,
    });

    return NextResponse.json({ ...resp, status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      messge: "Oops something went wrong",
      status: 500,
    });
  }
}
