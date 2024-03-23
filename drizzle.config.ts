import { type Config } from "drizzle-kit";

const url = process.env.DATABASE_URL;
const authToken = process.env.DATABASE_AUTH_TOKEN;
if (!url) {
  throw new Error("DB_URL is required");
}

export default {
  schema: "./dist/database/schema.js",
  out: "./drizzle",
  driver: "turso",
  dbCredentials: {
    url,
    authToken,
  },
} satisfies Config;
