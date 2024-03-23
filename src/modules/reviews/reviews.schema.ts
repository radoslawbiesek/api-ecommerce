import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import { productsTable } from "../../database/schema.js";

export const reviewsTable = sqliteTable("reviews", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  headline: text("title").notNull(),
  content: text("content").notNull(),
  rating: real("rating").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Review = typeof reviewsTable.$inferSelect;
export type NewReview = typeof reviewsTable.$inferInsert;
