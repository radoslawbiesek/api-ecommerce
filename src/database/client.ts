import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import { products } from "./schema";

const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle(sqlite, { schema: { products } });
