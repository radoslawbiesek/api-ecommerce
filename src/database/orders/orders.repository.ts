import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq, sql } from "drizzle-orm";

import { type Order, ordersTable, type NewOrderItem, type OrderItem, orderItemsTable } from "database/schema.js";

type OrderWithItems = Order & { items: OrderItem[] };

export class OrdersRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findById(id: number): Promise<OrderWithItems | undefined> {
    const result = await this.db
      .select()
      .from(ordersTable)
      .leftJoin(orderItemsTable, eq(ordersTable.id, orderItemsTable.orderId))
      .where(eq(ordersTable.id, id));

    if (result.length === 0) {
      return undefined;
    }

    return {
      ...result[0].orders,
      items: result.map((r) => r.order_items).filter((v): v is OrderItem => !!v),
    };
  }

  async create(): Promise<OrderWithItems> {
    const result = await this.db.insert(ordersTable).values({ status: "draft" }).returning();

    return {
      ...result[0],
      items: [],
    };
  }

  async addItem(input: NewOrderItem): Promise<OrderItem> {
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

  async updateItem(orderItem: Pick<OrderItem, "id" | "quantity">): Promise<OrderItem> {
    if (orderItem.quantity === 0) {
      return this.deleteItem(orderItem.id);
    }

    const result = await this.db
      .update(orderItemsTable)
      .set(orderItem)
      .where(eq(orderItemsTable.id, orderItem.id))
      .returning();

    return result[0];
  }

  async deleteItem(orderItemId: number): Promise<OrderItem> {
    const result = await this.db.delete(orderItemsTable).where(eq(orderItemsTable.id, orderItemId)).returning();

    return result[0];
  }
}
