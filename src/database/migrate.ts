import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

import { products } from "./schema.js";

const sqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(sqlite, { schema: { products } });

migrate(db, { migrationsFolder: "drizzle" });
sqlite.close();
