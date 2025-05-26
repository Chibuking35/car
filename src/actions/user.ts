// "use server";

// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import { redirect } from "next/navigation";

// export async function register(formdata: FormData) {
//   const data = Object.fromEntries(formdata);







//   // if (
//   //   !data.name ||
//   //   !data.email ||
//   //   !data.password
//   // ) {
//   //   throw new Error("All fields are required");
//   // }

//   // if (data.password !== data.confirmpassword) {
//   //   throw new Error("Passwords do not match");
//   // }






//   const hashedPassword = await bcrypt.hash(data.password as string, 10);

//   const user = {
//     name: data.name as string,
//     email: data.email as string,
//     password: hashedPassword,
//   };

//   try {
//     await db.insert(usersTable).values(user);
//   } catch (error) {
//     console.error("Database Error:", error);
//   }
//   redirect("/");
// }
// export async function deleteUser(id: number) {
//   return await db.delete(usersTable).where(eq(usersTable.id, id));
// }





"use server";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type RegisterInput = {
  name: string;
  email: string;
  password: string;
};

export async function register(data: RegisterInput) {
  const { name, email, password } = data;

  // Check if user already exists
  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await db.insert(usersTable).values({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Something went wrong while creating user");
  }

  // Redirect or return success
  redirect("/login");
}

export async function deleteUser(id: number) {
  return await db.delete(usersTable).where(eq(usersTable.id, id));
}
