import { eq, sql } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { type OrderItem, type NewOrderItem, orderItemsTable } from "database/schema.js";

export class OrderItemsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async addOrUpdate(input: NewOrderItem): Promise<OrderItem> {
    const result = await this.db
      .insert(orderItemsTable)
      .values(input)
      .onConflictDoUpdate({
        target: [orderItemsTable.productId, orderItemsTable.orderId, orderItemsTable.variant],
        set: { quantity: sql`${orderItemsTable.quantity} + ${input.quantity}` },
      })
      .returning();

    return result[0];
  }

  async findAll(orderId: number): Promise<OrderItem[]> {
    return this.db.select().from(orderItemsTable).where(eq(orderItemsTable.orderId, orderId));
  }

  async update(orderItemId: number, orderItem: Partial<NewOrderItem>): Promise<OrderItem> {
    const result = await this.db
      .update(orderItemsTable)
      .set(orderItem)
      .where(eq(orderItemsTable.id, orderItemId))
      .returning();

    return result[0];
  }

  async delete(orderItemId: number): Promise<OrderItem> {
    const result = await this.db.delete(orderItemsTable).where(eq(orderItemsTable.id, orderItemId)).returning();

    return result[0];
  }
}
