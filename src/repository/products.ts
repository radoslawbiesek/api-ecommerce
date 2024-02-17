import { eq } from "drizzle-orm";

import { type Db } from "database/client.js";
import { categories, Category, type NewProduct, type Product, products } from "database/schema.js";

export class ProductsRepository {
  constructor(private readonly db: Db) {}

  async create(product: NewProduct): Promise<Product> {
    const result = await this.db.insert(products).values(product).returning();

    return result[0];
  }

  async findAll(): Promise<Product[]> {
    return this.db.select().from(products);
  }

  async findById(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(products).where(eq(products.id, id));

    return result[0];
  }

  async findCategories(id: number): Promise<Category[]> {
    return this.db.select().from(categories).where(eq(categories.id, id));
  }

  async update(id: number, product: NewProduct): Promise<Product> {
    const result = await this.db.update(products).set(product).where(eq(products.id, id)).returning();

    return result[0];
  }

  async delete(id: number): Promise<Product> {
    const result = await this.db.delete(products).where(eq(products.id, id)).returning();

    return result[0];
  }
}
