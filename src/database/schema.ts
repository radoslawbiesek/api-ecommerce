import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, primaryKey } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: integer("rating"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
});

export const categoriesTable = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
  description: text("description"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
});

export const productImagesTable = sqliteTable("product_images", {
  id: integer("id").primaryKey(),
  alt: text("alt").notNull(),
  url: text("url").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
});

export const collectionsTable = sqliteTable("collections", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  slug: text("slug").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
});

export const imagesToProductsTable = sqliteTable(
  "images_to_products",
  {
    imageId: integer("image_id").references(() => productImagesTable.id),
    productId: integer("product_id").references(() => productsTable.id),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: text("updated_at"),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.imageId, table.productId] }),
  }),
);

export const productsToCategoriesTable = sqliteTable(
  "products_to_categories",
  {
    productId: integer("product_id").references(() => productsTable.id),
    categoryId: integer("category_id").references(() => categoriesTable.id),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.categoryId] }),
  }),
);

export const productsToCollectionsTable = sqliteTable(
  "products_to_collections",
  {
    productId: integer("product_id").references(() => productsTable.id),
    collectionId: integer("collection_id").references(() => collectionsTable.id),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.productId, table.collectionId] }),
  }),
);

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
export type ProductImage = typeof productImagesTable.$inferSelect;
export type NewProductImage = typeof productImagesTable.$inferInsert;
export type Collection = typeof collectionsTable.$inferSelect;
export type NewCollection = typeof collectionsTable.$inferInsert;
