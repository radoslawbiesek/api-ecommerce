import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

import { productsTable } from "../../database/schema.js";

export const ordersTable = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  status: text("status").notNull(),
  userId: text("user_id"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const orderItemsTable = sqliteTable(
  "order_items",
  {
    id: integer("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => ordersTable.id),
    productId: integer("product_id")
      .notNull()
      .references(() => productsTable.id),
    quantity: integer("quantity").notNull(),
    variant: text("variant"),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    unique: unique().on(table.orderId, table.productId, table.variant),
  }),
);

export type Order = typeof ordersTable.$inferSelect;
export type NewOrder = typeof ordersTable.$inferInsert;
export type OrderItem = typeof orderItemsTable.$inferSelect;
export type NewOrderItem = typeof orderItemsTable.$inferInsert;
