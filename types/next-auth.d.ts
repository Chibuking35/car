// // types/next-auth.d.ts
// import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
// import type { Role } from "./roles"; // adjust the path as needed

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       role: Role;
//     } & DefaultSession["user"];
//   }

//   interface User extends DefaultUser {
//     id: string;
//     role: Role;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     id: string;
//     role: Role;
//   }
// }

// types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      role?: string;
    };
  }

  interface User {
    id: string;
    name?: string;
    email?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
  }
}
