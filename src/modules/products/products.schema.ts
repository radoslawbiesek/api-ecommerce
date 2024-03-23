import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, primaryKey, real } from "drizzle-orm/sqlite-core";

import { collectionsTable } from "../collections/collections.schema.js";
import { categoriesTable } from "../categories/categories.schema.js";

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  rating: real("rating"),
  variants: text("variants"),
  inStock: integer("in_stock").default(1).notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: text("updated_at"),
});

export const productImagesTable = sqliteTable("product_images", {
  id: integer("id").primaryKey(),
  productId: integer("product_id").references(() => productsTable.id),
  alt: text("alt").notNull(),
  url: text("url").notNull(),
  height: integer("height").notNull(),
  width: integer("width").notNull(),
});

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
export type ProductImage = typeof productImagesTable.$inferSelect;
export type NewProductImage = typeof productImagesTable.$inferInsert;
