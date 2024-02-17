import { faker } from "@faker-js/faker";

import {
  type Category,
  type NewCategory,
  type Product,
  type NewProduct,
  categories,
  products,
} from "database/schema.js";
import { db } from "database/client.js";

export function generateMockProduct(overrides: Partial<NewProduct> = {}): NewProduct {
  const name = overrides.name || faker.commerce.productName();

  return {
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    description: faker.commerce.productDescription(),
    price: parseInt(faker.commerce.price({ min: 100, max: 1000 })),
    ...overrides,
  };
}

export async function mockProduct(overrides: Partial<NewProduct> = {}): Promise<Product> {
  const product = generateMockProduct(overrides);
  const result = await db.insert(products).values(product).returning();

  return result[0];
}

export async function deleteMockProducts(): Promise<void> {
  await db.delete(products);
}

export function generateMockCategory(overrides: Partial<NewCategory> = {}): NewCategory {
  const name = overrides.name || faker.commerce.department();

  return {
    name,
    slug: faker.helpers.slugify(name).toLowerCase(),
    ...overrides,
  };
}

export async function mockCategory(overrides: Partial<NewCategory> = {}): Promise<Category> {
  const category = generateMockCategory(overrides);
  const result = await db.insert(categories).values(category).returning();

  return result[0];
}

export async function deleteMockCategories(): Promise<void> {
  await db.delete(categories);
}
