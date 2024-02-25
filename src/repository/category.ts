import { eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { type NewCategory, type Category, categoriesTable, productsToCategoriesTable } from "database/schema.js";

export class CategoriesRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async create(product: NewCategory): Promise<Category> {
    const result = await this.db.insert(categoriesTable).values(product).returning();

    return result[0];
  }

  async findAll(): Promise<Category[]> {
    return this.db.select().from(categoriesTable);
  }

  async findById(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categoriesTable).where(eq(categoriesTable.id, id));

    return result[0];
  }

  async findBySlug(slug: string): Promise<Category | undefined> {
    const result = await this.db.select().from(categoriesTable).where(eq(categoriesTable.slug, slug));

    return result[0];
  }

  async findAllByProductId(productId: number): Promise<Category[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .leftJoin(categoriesTable, eq(categoriesTable.id, productsToCategoriesTable.categoryId))
      .where(eq(productsToCategoriesTable.productId, productId));

    return result.map((r) => r.categories).filter((v): v is Category => !!v);
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
