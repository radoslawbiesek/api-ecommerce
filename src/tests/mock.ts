import { faker } from "@faker-js/faker";

import {
  type Category,
  type NewCategory,
  type Product,
  type NewProduct,
  type NewCollection,
  type NewProductImage,
  type Collection,
  type ProductImage,
  categoriesTable,
  productsTable,
  productImagesTable,
  collectionsTable,
} from "database/schema.js";
import { db } from "database/client.js";

export function generateMockProduct(overrides: Partial<NewProduct> = {}): NewProduct {
  const name = overrides.name || faker.commerce.productName();

  return {
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    description: faker.commerce.productDescription(),
    price: parseInt(faker.commerce.price({ min: 100, max: 1000 })),
    rating: faker.number.int({ min: 1, max: 5 }),
    variants: JSON.stringify(Array.from({ length: 3 }, () => faker.commerce.productMaterial())),
    inStock: faker.number.int({ min: 0, max: 100 }),
    ...overrides,
  };
}

export async function saveMockProduct(overrides: Partial<NewProduct> = {}): Promise<Product> {
  const product = generateMockProduct(overrides);
  const result = await db.insert(productsTable).values(product).returning();

  return result[0];
}

export async function deleteMockProducts(): Promise<void> {
  await db.delete(productsTable);
}

export function generateMockCategory(overrides: Partial<NewCategory> = {}): NewCategory {
  const name = overrides.name || faker.commerce.department();

  return {
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    ...overrides,
  };
}

export async function saveMockCategory(overrides: Partial<NewCategory> = {}): Promise<Category> {
  const category = generateMockCategory(overrides);
  const result = await db.insert(categoriesTable).values(category).returning();

  return result[0];
}

export async function deleteMockCategories(): Promise<void> {
  await db.delete(categoriesTable);
}

export function generateMockCollection(overrides: Partial<NewCollection> = {}): NewCollection {
  const name = overrides.name || faker.commerce.department();
  return {
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    imageUrl: faker.internet.url(),
    ...overrides,
  };
}

export async function saveMockCollection(overrides: Partial<NewCollection> = {}): Promise<Collection> {
  const collection = generateMockCollection(overrides);
  const result = await db.insert(collectionsTable).values(collection).returning();

  return result[0];
}

export async function deleteMockCollections(): Promise<void> {
  await db.delete(collectionsTable);
}

export function generateMockProductImage(overrides: Partial<NewProductImage> = {}): NewProductImage {
  return {
    url: faker.image.url(),
    alt: faker.commerce.productName(),
    height: faker.number.int({ min: 100, max: 1000 }),
    width: faker.number.int({ min: 100, max: 1000 }),
    ...overrides,
  };
}

export async function saveMockProductImage(overrides: Partial<NewProductImage> = {}): Promise<ProductImage> {
  const image = generateMockProductImage(overrides);
  const result = await db.insert(productImagesTable).values(image).returning();

  return result[0];
}
