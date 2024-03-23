import { type SQL, and, count, eq, like, or, not, desc } from "drizzle-orm";

import { type ListParams } from "../common/types.js";
import { DEFAULT_SKIP, DEFAULT_TAKE } from "../common/constants.js";
import { type ProductImage, productImagesTable, productsTable, type NewProductImage } from "../../database/schema.js";
import { type Db } from "../../database/client.js";
import {
  parseVariants,
  getOrdering,
  type ProductWithVariants,
  type NewProductWithVariants,
} from "./products.helpers.js";

export class ProductsRepository {
  constructor(private readonly db: Db) {}

  async findById(id: number): Promise<ProductWithVariants | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.id, id));

    return result.map(parseVariants)[0];
  }

  async findBySlug(slug: string): Promise<ProductWithVariants | undefined> {
    const result = await this.db.select().from(productsTable).where(eq(productsTable.slug, slug));

    return result.map(parseVariants)[0];
  }

  #getFilters(search?: string): SQL[] {
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

  async findAll({ take = DEFAULT_TAKE, skip = DEFAULT_SKIP, search, ordering }: ListParams = {}): Promise<
    ProductWithVariants[]
  > {
    const result = await this.db
      .select()
      .from(productsTable)
      .where(and(...this.#getFilters(search)))
      .orderBy(getOrdering(ordering))
      .limit(take)
      .offset(skip);

    return result.map(parseVariants);
  }

  async countAll({ search }: Pick<ListParams, "search"> = {}): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsTable)
      .where(and(...this.#getFilters(search)));

    if (!result[0]) {
      throw new Error("Failed to count products");
    }

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
    return this.db.select().from(productImagesTable).where(eq(productImagesTable.productId, productId));
  }

  async addImage(productId: number, image: NewProductImage): Promise<ProductImage> {
    const result = await this.db
      .insert(productImagesTable)
      .values({ ...image, productId })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to add image");
    }

    return result[0];
  }

  async create(product: NewProductWithVariants): Promise<ProductWithVariants> {
    const result = await this.db
      .insert(productsTable)
      .values({ ...product, variants: JSON.stringify(product.variants) })
      .returning();

    if (!result[0]) {
      throw new Error("Failed to create product");
    }

    return parseVariants(result[0]);
  }
}
