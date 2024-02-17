import { eq } from "drizzle-orm";

import { type Db } from "database/client.js";
import { type NewCategory, type Category, categories } from "database/schema.js";

export class CategoriesRepository {
  constructor(private readonly db: Db) {}

  async create(product: NewCategory): Promise<Category> {
    const result = await this.db.insert(categories).values(product).returning();

    return result[0];
  }

  async findAll(): Promise<Category[]> {
    return this.db.select().from(categories);
  }

  async findById(id: number): Promise<Category | undefined> {
    const result = await this.db.select().from(categories).where(eq(categories.id, id));

    return result[0];
  }

  async update(id: number, product: NewCategory): Promise<Category> {
    const result = await this.db.update(categories).set(product).where(eq(categories.id, id)).returning();

    return result[0];
  }

  async delete(id: number): Promise<Category> {
    const result = await this.db.delete(categories).where(eq(categories.id, id)).returning();

    return result[0];
  }
}
