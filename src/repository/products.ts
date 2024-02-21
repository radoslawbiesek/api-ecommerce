import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { eq, sql } from "drizzle-orm";

import { categoriesTable, type Category, type NewProduct, type Product, productsTable } from "database/schema.js";

const allColumns = {
  id: productsTable.id,
  name: productsTable.name,
  slug: productsTable.slug,
  description: productsTable.description,
  price: productsTable.price,
  rating: productsTable.rating,
  createdAt: productsTable.createdAt,
  updatedAt: productsTable.updatedAt,
};

type Params = {
  take: number;
  skip: number;
};

export class ProductsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async create(product: NewProduct): Promise<Product> {
    const result = await this.db.insert(productsTable).values(product).returning();

    return result[0];
  }

  async findAll({ take, skip }: Params): Promise<(Product & { count: number })[]> {
    const result = await this.db
      .select({
        ...allColumns,
        count: sql<number>`(select count(*) from products) as count`,
      })
      .from(productsTable)
      .limit(take)
      .offset(skip);

    return result;
  }

  async findAllByCategory(categoryId: number, { take, skip }: Params): Promise<Product[]> {
    const result = await this.db
      .select()
      .from(productsTable)
      .leftJoin(categoriesTable, eq(categoriesTable.id, categoryId))
      .limit(take)
      .offset(skip);

    // to do - fix count

    return result.map((r) => r.products);
  }

  async findAllByCollection(collectionId: number, { take, skip }: Params): Promise<Product[]> {
    const result = await this.db
      .select()
      .from(productsTable)
      .leftJoin(categoriesTable, eq(categoriesTable.id, collectionId))
      .limit(take)
      .offset(skip);

    // to do - fix count

    return result.map((r) => r.products);
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
