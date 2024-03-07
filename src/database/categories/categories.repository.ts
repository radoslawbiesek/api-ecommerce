import { count, eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { DEFAULT_SKIP, DEFAULT_TAKE } from "database/common/constants.js";
import { type ListParams } from "database/common/types.js";
import {
  productsTable,
  type Category,
  type NewCategory,
  categoriesTable,
  productsToCategoriesTable,
} from "database/schema.js";
import { parseVariants, type ProductWithVariants, getOrdering } from "database/products/products.helpers.js";

export class CategoriesRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findAll(): Promise<Category[]> {
    return this.db.select().from(categoriesTable);
  }

  async findAllByProductId(productId: number): Promise<Category[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .innerJoin(categoriesTable, eq(categoriesTable.id, productsToCategoriesTable.categoryId))
      .where(eq(productsToCategoriesTable.productId, productId));

    return result.map((r) => r.categories);
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));

    return result[0];
  }

  async findAllProducts(
    categoryId: number,
    { take = DEFAULT_TAKE, skip = DEFAULT_SKIP, ordering }: ListParams,
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId))
      .innerJoin(productsTable, eq(productsToCategoriesTable.productId, productsTable.id))
      .orderBy(getOrdering(ordering))
      .limit(take)
      .offset(skip);

    return result.map((r) => parseVariants(r.products));
  }

  async countAllProducts(categoryId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId));

    if (!result[0]) {
      throw new Error("Failed to count products");
    }

    return result[0].value;
  }

  async create(product: NewCategory): Promise<Category> {
    const result = await this.db.insert(categoriesTable).values(product).returning();

    if (!result[0]) {
      throw new Error("Failed to create category");
    }

    return result[0];
  }
}
