import { faker } from "@faker-js/faker";

import { type NewProduct, type Product, products } from "database/schema.js";
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
