import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";

import { type Order, ordersTable } from "database/schema.js";

export class OrdersRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findById(id: number): Promise<Order | undefined> {
    const result = await this.db.select().from(ordersTable).where(eq(ordersTable.id, id));

    return result[0];
  }

  async findOrCreate(orderId: number): Promise<Order> {
    const existingCart = await this.findById(orderId);
    if (existingCart) {
      return existingCart;
    }

    return this.create();
  }

  async create(): Promise<Order> {
    const result = await this.db.insert(ordersTable).values({ status: "draft" }).returning();

    return result[0];
  }
}
