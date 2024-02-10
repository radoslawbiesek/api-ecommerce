import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";
import Database from "better-sqlite3";

const betterSqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(betterSqlite);

migrate(db, { migrationsFolder: "drizzle" });
betterSqlite.close();
