import { sql } from "drizzle-orm";
import { sqliteTable, integer, text, primaryKey, unique, real } from "drizzle-orm/sqlite-core";

export const productsTable = sqliteTable("products", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull(),
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

export const ordersTable = sqliteTable("orders", {
  id: integer("id").primaryKey(),
  status: text("status").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const orderItemsTable = sqliteTable(
  "order_items",
  {
    id: integer("id").primaryKey(),
    orderId: integer("order_id")
      .notNull()
      .references(() => ordersTable.id),
    productId: integer("product_id")
      .notNull()
      .references(() => productsTable.id),
    quantity: integer("quantity").notNull(),
    variant: text("variant"),
    createdAt: text("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => ({
    unique: unique().on(table.orderId, table.productId, table.variant),
  }),
);

export const reviewsTable = sqliteTable("reviews", {
  id: integer("id").primaryKey(),
  productId: integer("product_id")
    .references(() => productsTable.id)
    .notNull(),
  headline: text("title").notNull(),
  content: text("content").notNull(),
  rating: real("rating").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type Product = typeof productsTable.$inferSelect;
export type NewProduct = typeof productsTable.$inferInsert;
export type Category = typeof categoriesTable.$inferSelect;
export type NewCategory = typeof categoriesTable.$inferInsert;
export type ProductImage = typeof productImagesTable.$inferSelect;
export type NewProductImage = typeof productImagesTable.$inferInsert;
export type Collection = typeof collectionsTable.$inferSelect;
export type NewCollection = typeof collectionsTable.$inferInsert;
export type Order = typeof ordersTable.$inferSelect;
export type NewOrder = typeof ordersTable.$inferInsert;
export type OrderItem = typeof orderItemsTable.$inferSelect;
export type NewOrderItem = typeof orderItemsTable.$inferInsert;
export type Review = typeof reviewsTable.$inferSelect;
export type NewReview = typeof reviewsTable.$inferInsert;
