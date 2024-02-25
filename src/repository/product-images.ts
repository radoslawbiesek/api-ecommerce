import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq } from "drizzle-orm";

import { type ProductImage, productImagesTable } from "database/schema.js";

export class ProductImagesRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findAllByProductId(productId: number): Promise<ProductImage[]> {
    const result = await this.db.select().from(productImagesTable).where(eq(productImagesTable.productId, productId));

    return result;
  }
}
