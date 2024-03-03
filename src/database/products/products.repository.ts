import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { type SQL, and, count, eq, like, or, not, desc } from "drizzle-orm";

import { type ListParams } from "database/common/types.js";
import { DEFAULT_SKIP, DEFAULT_TAKE } from "database/common/constants.js";
import {
  type NewProduct,
  type Product,
  type ProductImage,
  productImagesTable,
  productsTable,
  NewProductImage,
} from "database/schema.js";

export type ProductWithVariants = Omit<Product, "variants"> & { variants: string[] };

export function parseVariants(product: Product): ProductWithVariants {
  let variants: string[] = [];
  if (product.variants) {
    try {
      variants = JSON.parse(product.variants) as string[];
    } catch {}
  }

  return {
    ...product,
    variants,
  };
}

export class ProductsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findById(id: number): Promise<ProductWithVariants | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.id, id));

    return result.map(parseVariants)[0];
  }

  async findBySlug(slug: string): Promise<ProductWithVariants | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.slug, slug));

    return result.map(parseVariants)[0];
  }

  #getFilters({ search }: { search?: string }): SQL[] {
    const filters: SQL[] = [];
    if (search) {
      const searchTerm = `%${search.toLowerCase()}%`;
      const filter = or(like(productsTable.name, searchTerm), like(productsTable.description, searchTerm));
      if (filter) {
        filters.push(filter);
      }
    }

    return filters;
  }

  async findAll({ take = DEFAULT_TAKE, skip = DEFAULT_SKIP, search }: ListParams = {}): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsTable)
      .where(and(...this.#getFilters({ search })))
      .limit(take)
      .offset(skip);

    return result.map(parseVariants);
  }

  async countAll({ search }: Pick<ListParams, "search"> = {}): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsTable)
      .where(and(...this.#getFilters({ search })));

    return result[0].value;
  }

  async findAllRecommended(
    productId: number,
    { take = DEFAULT_TAKE }: { take?: number },
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsTable)
      .where(not(eq(productsTable.id, productId)))
      .orderBy(desc(productsTable.rating))
      .limit(take);

    return result.map(parseVariants);
  }

  async findImages(productId: number): Promise<ProductImage[]> {
    const result = await this.db.select().from(productImagesTable).where(eq(productImagesTable.productId, productId));

    return result;
  }

  async addImage(productId: number, image: NewProductImage): Promise<ProductImage> {
    const result = await this.db
      .insert(productImagesTable)
      .values({ ...image, productId })
      .returning();

    return result[0];
  }

  async create(product: NewProduct): Promise<Product> {
    const result = await this.db.insert(productsTable).values(product).returning();

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
