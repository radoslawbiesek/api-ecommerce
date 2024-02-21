import { type Config } from "drizzle-kit";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("DB_URL is required");
}

export default {
  schema: "./src/database/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url,
  },
} satisfies Config;
