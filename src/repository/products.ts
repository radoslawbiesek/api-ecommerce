import { eq } from "drizzle-orm";

import { type Db } from "database/client.js";
import { products } from "database/schema.js";

export class ProductsRepository {
  constructor(private readonly db: Db) {}

  async findById(id: number): Promise<typeof products.$inferSelect | undefined> {
    const results = await this.db.select().from(products).where(eq(products.id, id));

    return results[0];
  }
}
