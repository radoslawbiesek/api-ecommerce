import { eq, and, sql } from "drizzle-orm";
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

  async update(OrderItem: NewOrderItem): Promise<OrderItem> {
    const result = await this.db
      .update(orderItemsTable)
      .set(OrderItem)
      .where(
        and(eq(orderItemsTable.productId, OrderItem.productId), eq(orderItemsTable.productId, OrderItem.productId)),
      )
      .returning();

    return result[0];
  }

  async delete(cartId: number, productId: number): Promise<OrderItem> {
    const result = await this.db
      .delete(orderItemsTable)
      .where(and(eq(orderItemsTable.productId, cartId), eq(orderItemsTable.productId, productId)))
      .returning();

    return result[0];
  }
}
