// import { NextResponse } from "next/server";
// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import { eq } from "drizzle-orm";
// import { z } from "zod";

// // Validation schema for query parameters
// const verifySchema = z.object({
//   email: z.string().email(),
//   // Optionally, you could verify a token here for security
// });

// export async function GET(request: Request) {
//   try {
//     const url = new URL(request.url);
//     const email = url.searchParams.get("email");

//     const parseResult = verifySchema.safeParse({ email });
//     if (!parseResult.success) {
//       return NextResponse.json({ error: "Invalid email" }, { status: 400 });
//     }

//     // Update user's emailVerified to current datetime
//     const result = await db
//       .update(usersTable)
//       .set({ emailVerified: new Date() })
//       .where(eq(usersTable.email, email!));

//     const existingUser = await db.query.usersTable.findFirst({
//   where: eq(usersTable.email, email),
// });

// if (!existingUser) {
//   return NextResponse.json({ error: "User not found" }, { status: 404 });
// }


//     return NextResponse.json({ message: "Email verified successfully" });
//   } catch (error) {
//     console.error("Verification error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }




import { db } from "@/db";
import { usersTable, verificationTokens } from "@/db/schema";
import { eq, and, lt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    // Check if token exists and is not expired
    const [tokenRecord] = await db
      .select()
      .from(verificationTokens)
      .where(
        and(
          eq(verificationTokens.token, token),
          lt(verificationTokens.expiresAt, new Date(Date.now() + 1000 * 60 * 60)) // still valid
        )
      );

    if (!tokenRecord) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 400 });
    }

    const email = tokenRecord.email;

    if (!email) {
      return NextResponse.json({ error: "Email not found in token" }, { status: 400 });
    }

    // Update user to mark email as verified
    await db
      .update(usersTable)
      .set({ emailVerified: new Date() })
      .where(eq(usersTable.email, email));

    // Optionally delete the token after use
    await db
      .delete(verificationTokens)
      .where(eq(verificationTokens.token, token));

    return NextResponse.json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

