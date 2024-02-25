import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { type SQL, and, count, eq, like, or } from "drizzle-orm";

import {
  type NewProduct,
  type Product,
  productsTable,
  productsToCollectionsTable,
  productsToCategoriesTable,
} from "database/schema.js";

const DEFAULT_TAKE = 10;
const DEFAULT_SKIP = 0;

type ListParams = {
  take?: number;
  skip?: number;
  search?: string;
};

type ProductWithVariants = Omit<Product, "variants"> & { variants: string[] };

function parseVariants(product: Product): ProductWithVariants {
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

  async findAllByCategoryId(
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

  async countAllByCategoryId(categoryId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCategoriesTable)
      .where(eq(productsToCategoriesTable.categoryId, categoryId));

    return result[0].value;
  }

  async findAllByCollectionId(
    collectionId: number,
    { take = DEFAULT_TAKE, skip = DEFAULT_SKIP }: ListParams,
  ): Promise<ProductWithVariants[]> {
    const result = await this.db
      .select()
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId))
      .leftJoin(productsTable, eq(productsToCollectionsTable.productId, productsTable.id))
      .limit(take)
      .offset(skip);

    return result
      .map((r) => r.products)
      .filter((v): v is Product => !!v)
      .map(parseVariants);
  }

  async countAllByCollectionId(collectionId: number): Promise<number> {
    const result = await this.db
      .select({ value: count() })
      .from(productsToCollectionsTable)
      .where(eq(productsToCollectionsTable.collectionId, collectionId));

    return result[0].value;
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
