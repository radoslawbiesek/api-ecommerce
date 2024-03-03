import { count, eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { DEFAULT_SKIP, DEFAULT_TAKE } from "database/common/constants.js";
import { type ProductWithVariants, parseVariants } from "database/products/products.repository.js";
import {
  type Product,
  productsTable,
  type Collection,
  type NewCollection,
  collectionsTable,
  productsToCollectionsTable,
} from "database/schema.js";
import { type ListParams } from "database/common/types.js";

export class CollectionsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async create(collection: NewCollection): Promise<Collection> {
    const result = await this.db.insert(collectionsTable).values(collection).returning();

    return result[0];
  }

  async findAll(): Promise<Collection[]> {
    return this.db.select().from(collectionsTable);
  }

  async findById(id: number): Promise<Collection | undefined> {
    const result = await this.db.select().from(collectionsTable).where(eq(collectionsTable.id, id));

    return result[0];
  }

  async findBySlug(slug: string): Promise<Collection | undefined> {
    const result = await this.db.select().from(collectionsTable).where(eq(collectionsTable.slug, slug));

    return result[0];
  }

  async findAllProducts(
    collectionId: number,
    { take = DEFAULT_TAKE, skip = DEFAULT_SKIP }: ListParams,
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId))
      .leftJoin(productsTable, eq(productsToCollectionsTable.productId, productsTable.id))
      .limit(take)
      .offset(skip);

    return result
      .map((r) => r.products)
      .filter((v): v is Product => !!v)
      .map(parseVariants);
  }

  async countAllProducts(collectionId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId));

    return result[0].value;
  }

  async update(id: number, collection: NewCollection): Promise<Collection> {
    const result = await this.db
      .update(collectionsTable)
      .set(collection)
      .where(eq(collectionsTable.id, id))
      .returning();

    return result[0];
  }

  async delete(id: number): Promise<Collection> {
    const result = await this.db.delete(collectionsTable).where(eq(collectionsTable.id, id)).returning();

    return result[0];
  }
}
