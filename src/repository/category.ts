import { eq } from "drizzle-orm";

import { type Db } from "database/client.js";
import { type NewCategory, type Category, categoriesTable } from "database/schema.js";

export class CategoriesRepository {
  constructor(private readonly db: Db) {}

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

  async update(id: number, product: NewCategory): Promise<Category> {
    const result = await this.db.update(categoriesTable).set(product).where(eq(categoriesTable.id, id)).returning();

    return result[0];
  }

  async delete(id: number): Promise<Category> {
    const result = await this.db.delete(categoriesTable).where(eq(categoriesTable.id, id)).returning();

    return result[0];
  }
}
