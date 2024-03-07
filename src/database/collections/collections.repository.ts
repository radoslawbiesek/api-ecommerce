import { count, eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { DEFAULT_SKIP, DEFAULT_TAKE } from "database/common/constants.js";
import { type ProductWithVariants, parseVariants, getOrdering } from "database/products/products.helpers.js";
import {
  productsTable,
  type Collection,
  type NewCollection,
  collectionsTable,
  productsToCollectionsTable,
} from "database/schema.js";
import { type ListParams } from "database/common/types.js";

export class CollectionsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findAll(): Promise<Collection[]> {
    return this.db.select().from(collectionsTable);
  }

  async findBySlug(slug: string): Promise<Collection | undefined> {
    const result = await this.db.select().from(collectionsTable).where(eq(collectionsTable.slug, slug));

    return result[0];
  }

  async findAllProducts(
    collectionId: number,
    { take = DEFAULT_TAKE, skip = DEFAULT_SKIP, ordering }: ListParams,
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId))
      .innerJoin(productsTable, eq(productsToCollectionsTable.productId, productsTable.id))
      .orderBy(getOrdering(ordering))
      .limit(take)
      .offset(skip);

    return result.map((r) => parseVariants(r.products));
  }

  async countAllProducts(collectionId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId));

    if (!result[0]) {
      throw new Error("Failed to count products");
    }

    return result[0].value;
  }

  async create(collection: NewCollection): Promise<Collection> {
    const result = await this.db.insert(collectionsTable).values(collection).returning();

    if (!result[0]) {
      throw new Error("Failed to create collection");
    }

    return result[0];
  }
}
