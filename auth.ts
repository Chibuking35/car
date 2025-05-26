// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import bcrypt from  "bcryptjs"
// import { eq } from "drizzle-orm";
// import NextAuth, { User } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null;
//         const [newUser] = await db
//           .select()
//           .from(usersTable)
//           .where(eq(usersTable.email, credentials?.email as string));
//         if (!newUser || !newUser.id) {
//           throw new Error("Invalid credentials");
//         }
//         user = {
//           name: newUser.name,
//           email: newUser.email,
//           id: newUser.id + "",
//         };

//         const pwHash = bcrypt.compareSync(
//           credentials?.password as string,
//           newUser?.password
//         );
//         if (!pwHash) {
//           throw new Error("Invalid Chibueze");
//         }
//         // return user object with their profile data
//         return user;
//       },
//     }),
//   ],
// });

// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import NextAuth, { User } from "next-auth";
// import Credentials from "next-auth/providers/credentials";

// export const { handlers, auth } = NextAuth({
//   providers: [
//     Credentials({
//       // You can specify which fields should be submitted, by adding keys to the `credentials` object.
//       // e.g. domain, username, password, 2FA token, etc.
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         let user = null;
//         const [newUser] = await db
//           .select()
//           .from(usersTable)
//           .where(eq(usersTable.email, credentials?.email as string));
//         if (!newUser || !newUser.id) {
//           throw new Error("Invalid credentials");
//         }
//         user = {
//           name: newUser.name,
//           email: newUser.email,
//           id: newUser.id + "",
//           role: "user" as "user" | "editor" | "admin",
//         };

//         const pwHash = bcrypt.compareSync(
//           credentials?.password as string,
//           newUser?.password
//         );
//         if (!pwHash) {
//           throw new Error("Invalid Chibueze");
//         }
//         // return user object with their profile data
//         return user;
//       },
//     }),
//   ],
// });

// import { db } from "@/db";
// import { usersTable } from "@/db/schema";
// import bcrypt from "bcryptjs";
// import { eq } from "drizzle-orm";
// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { Role } from "./types/roles";

// export const { handlers, auth } = NextAuth({
//   providers: [
//     Credentials({
//       credentials: {
//         email: {},
//         password: {},
//       },
//       authorize: async (credentials) => {
//         const [user] = await db
//           .select()
//           .from(usersTable)
//           .where(eq(usersTable.email, credentials?.email as string));

//         if (!user || !user.id) {
//           throw new Error("Invalid credentials");
//         }

//         const passwordMatch = bcrypt.compareSync(
//           credentials?.password as string,
//           user.password
//         );

//         if (!passwordMatch) {
//           throw new Error("Invalid password");
//         }

//         return {
//           id: user.id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role as Role, // ✅ Cast role to your Role type
//         };
//       },
//     }),
//   ],
//   callbacks: {
//   async jwt({ token, user }) {
//     if (user) {
//       console.log("JWT callback user:", user);  // Check user from authorize
//       token.id = user.id;
//       token.role = (user as any).role as Role;
//       console.log("JWT callback token:", token); // Check token after assignment
//     }
//     return token;
//   },
//   async session({ session, token }) {
//     console.log("Session callback token:", token); // See token on session creation
//     if (session.user && token) {
//       session.user.id = token.id as string;
//       session.user.role = token.role as Role;
//     }
//     console.log("Session callback session:", session); // Final session object
//     return session;
//   },
// },

// });

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Role } from "./types/roles";

export const { handlers, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const [user] = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, credentials?.email as string));

        if (!user || !user.id) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = bcrypt.compareSync(
          credentials?.password as string,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          role: user.role as Role, // ✅ Ensure role is passed through
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role as Role; // ✅ Ensure token includes role
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role; // ✅ Make role available in session.user
      }
      return session;
    },
  },
  session: {
    strategy: "jwt", // ✅ Required for custom token values like role
  },
  pages: {
    signIn: "/login", // Optional: custom login page
  },
});
