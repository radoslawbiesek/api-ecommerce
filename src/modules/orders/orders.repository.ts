import { eq, ne, and } from "drizzle-orm";

import { type Db } from "../../database/client.js";
import { type Order, ordersTable, type OrderItem, orderItemsTable } from "./orders.schema.js";

type OrderWithItems = Order & { items: OrderItem[] };

export class OrdersRepository {
  constructor(private readonly db: Db) {}

  async findById(id: number): Promise<OrderWithItems | undefined> {
    const result = await this.db
      .select()
      .from(ordersTable)
      .innerJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
      .where(eq(ordersTable.id, id));

    if (!result[0]) {
      return undefined;
    }

    return {
      ...result[0].orders,
      items: result.map((r) => r.order_items),
    };
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.db
      .select()
      .from(ordersTable)
      .where(and(eq(ordersTable.userId, userId), ne(ordersTable.status, "draft")));
  }

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const result = await this.db.update(ordersTable).set(order).where(eq(ordersTable.id, id)).returning();

    if (!result[0]) {
      throw new Error("Failed to update order");
    }

    return result[0];
  }
}
