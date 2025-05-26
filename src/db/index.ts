import dotenv from "dotenv";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from "@/db/schema";

dotenv.config(); // Load env variables

const pool = mysql.createPool(process.env.DATABASE_URL!);

export const db = drizzle(pool, { schema, mode: "default"});

async function testConnection() {
  try {
    await pool.getConnection();
    console.log("Database connection successful!");
  } catch (error) {
    console.error("Database connection failed:", error);
  }
}

if (process.env.NODE_ENV === "development") {
  testConnection();
}
