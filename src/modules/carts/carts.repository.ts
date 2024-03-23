import { eq, sql } from "drizzle-orm";

import {
  type Order,
  ordersTable,
  type NewOrderItem,
  type OrderItem,
  orderItemsTable,
} from "../orders/orders.schema.js";
import { type Db } from "../../database/client.js";

type NewCartItem = NewOrderItem;
type CartItem = OrderItem;
type Cart = Order & { items: CartItem[] };

export class CartsRepository {
  constructor(private readonly db: Db) {}

  async findById(id: number): Promise<Cart | undefined> {
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

  async create(): Promise<Cart> {
    const result = await this.db.insert(ordersTable).values({ status: "draft" }).returning();

    if (!result[0]) {
      throw new Error("Failed to create order");
    }

    return {
      ...result[0],
      items: [],
    };
  }

  async addItem(input: NewCartItem): Promise<CartItem> {
    const result = await this.db
      .insert(orderItemsTable)
      .values(input)
      .onConflictDoUpdate({
        target: [orderItemsTable.productId, orderItemsTable.orderId, orderItemsTable.variant],
        set: { quantity: sql`${orderItemsTable.quantity} + ${input.quantity}` },
      })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to add item to order");
    }

    return result[0];
  }

  async updateItem(cartItem: Pick<CartItem, "id" | "quantity">): Promise<CartItem> {
    if (cartItem.quantity === 0) {
      return this.deleteItem(cartItem.id);
    }

    const result = await this.db
      .update(orderItemsTable)
      .set(cartItem)
      .where(eq(orderItemsTable.id, cartItem.id))
      .returning();

    if (!result[0]) {
      throw new Error("Failed to update item");
    }

    return result[0];
  }

  async deleteItem(cartItemId: number): Promise<OrderItem> {
    const result = await this.db.delete(orderItemsTable).where(eq(orderItemsTable.id, cartItemId)).returning();

    if (!result[0]) {
      throw new Error("Failed to delete item");
    }

    return result[0];
  }
}
