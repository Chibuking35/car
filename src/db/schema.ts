import { int, mysqlTable, varchar, datetime } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable("users", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).default("user"),
  emailVerified: datetime("email_verified"), // added for verification status
});

export const paymentTable = mysqlTable("payment", {
  id: int().autoincrement().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
});

export const verificationTokens = mysqlTable("verification_tokens", {
  token: varchar("token", { length: 255 }).primaryKey(),
  email: varchar({ length: 255 }).notNull(),
  expiresAt: datetime("expires_at").notNull(),
});


export const passwordResetOtps = mysqlTable("password_reset_otps", {
  id: int("id").primaryKey().autoincrement(),
  email: varchar("email", { length: 255 }).notNull(),
  otp: varchar("otp", { length: 6 }).notNull(),
  expires: datetime("expires").notNull(),
});