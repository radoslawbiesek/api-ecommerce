import { count, eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { DEFAULT_SKIP, DEFAULT_TAKE } from "database/common/constants.js";
import { type ListParams } from "database/common/types.js";
import { parseVariants, type ProductWithVariants } from "database/products/products.repository.js";
import {
  type Product,
  productsTable,
  type Category,
  type NewCategory,
  categoriesTable,
  productsToCategoriesTable,
} from "database/schema.js";

export class CategoriesRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findAll(): Promise<Category[]> {
    return this.db.select().from(categoriesTable);
  }

  async findAllByProductId(productId: number): Promise<Category[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .leftJoin(categoriesTable, eq(categoriesTable.id, productsToCategoriesTable.categoryId))
      .where(eq(productsToCategoriesTable.productId, productId));

    return result.map((r) => r.categories).filter((v): v is Category => !!v);
  }

  async findById(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categoriesTable).where(eq(categoriesTable.id, id));

    return result[0];
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));

    return result[0];
  }

  async findAllProducts(
    categoryId: number,
    { take = DEFAULT_TAKE, skip = DEFAULT_SKIP }: ListParams,
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId))
      .leftJoin(productsTable, eq(productsToCategoriesTable.productId, productsTable.id))
      .limit(take)
      .offset(skip);

    return result
      .map((r) => r.products)
      .filter((v): v is Product => !!v)
      .map(parseVariants);
  }

  async countAllProducts(categoryId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId));

    return result[0].value;
  }

  async create(product: NewCategory): Promise<Category> {
    const result = await this.db.insert(categoriesTable).values(product).returning();

    return result[0];
  }

  async update(id: number, product: NewCategory): Promise<Category> {
    const result = await this.db.update(categoriesTable).set(product).where(eq(categoriesTable.id, id)).returning();

    return result[0];
  }

  async delete(id: number): Promise<Category> {
    const result = await this.db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();

    return result[0];
  }
}
