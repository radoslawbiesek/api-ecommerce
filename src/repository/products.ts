import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { count, eq } from "drizzle-orm";

import {
  type NewProduct,
  type Product,
  type ProductImage,
  productsTable,
  productImagesTable,
  productsToCollectionsTable,
  productsToCategoriesTable,
} from "database/schema.js";

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

  async findAll({ take, skip }: Params): Promise<Product[]> {
    const result = await this.db.select().from(productsTable).limit(take).offset(skip);

    return result;
  }

  async findAllCount(): Promise<number> {
    const result = await this.db.select({ value: count() }).from(productsTable);

    return result[0].value;
  }

  async findAllByCategory(categoryId: number, { take, skip }: Params): Promise<Product[]> {
    const result = await this.db
      .select()
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId))
      .leftJoin(productsTable, eq(productsToCategoriesTable.productId, productsTable.id))
      .limit(take)
      .offset(skip);

    return result.map((r) => r.products).filter((v): v is Product => !!v);
  }

  async findAllByCategoryCount(categoryId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId));

    return result[0].value;
  }

  async findAllByCollection(collectionId: number, { take, skip }: Params): Promise<Product[]> {
    const result = await this.db
      .select()
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId))
      .leftJoin(productsTable, eq(productsToCollectionsTable.productId, productsTable.id))
      .limit(take)
      .offset(skip);

    return result.map((r) => r.products).filter((v): v is Product => !!v);
  }

  async findAllByCollectionCount(collectionId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId));

    return result[0].value;
  }

  async findById(id: number): Promise<Product | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.id, id));

    return result[0];
  }

  async findImages(productId: number): Promise<ProductImage[]> {
    const result = await this.db.select().from(productImagesTable).where(eq(productImagesTable.productId, productId));

    return result;
  }

  async findBySlug(slug: string): Promise<Product | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.slug, slug));

    return result[0];
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
