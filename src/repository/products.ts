import { eq } from "drizzle-orm";

import { type Db } from "database/client.js";
import { categoriesTable, type Category, type NewProduct, type Product, productsTable } from "database/schema.js";

export class ProductsRepository {
  constructor(private readonly db: Db) {}

  async create(product: NewProduct): Promise<Product> {
    const result = await this.db.insert(productsTable).values(product).returning();

    return result[0];
  }

  async findAll(): Promise<Product[]> {
    return this.db.select().from(productsTable);
  }

  async findById(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.id, id));

    return result[0];
  }

  async findCategories(id: number): Promise<Category[]> {
    return this.db.select().from(categoriesTable).where(eq(categoriesTable.id, id));
  }

  async update(id: number, product: NewProduct): Promise<Product> {
    const result = await this.db.update(productsTable).set(product).where(eq(productsTable.id, id)).returning();

    return result[0];
  }

  async delete(id: number): Promise<Product> {
    const result = await this.db.delete(productsTable).where(eq(productsTable.id, id)).returning();

    return result[0];
  }
}
