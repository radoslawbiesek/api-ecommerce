import "dotenv/config";

import { generateMockCategory, generateMockProduct } from "tests/mock.js";

import { db, sqlite } from "./client.js";
import { type Category, products, categories, productsToCategories } from "./schema.js";

const createdCategories: Category[] = [];
for (let i = 0; i < 10; i++) {
  const category = generateMockCategory();
  const result = await db.insert(categories).values(category).returning();
  const id = result[0].id;
  createdCategories.push(result[0]);

  console.log(`Created category (id: ${id}, name: ${category.name})`);
}

for (let i = 0; i < 100; i++) {
  const product = generateMockProduct();
  const result = await db.insert(products).values(product).returning();
  const id = result[0].id;

  await db.insert(productsToCategories).values([
    { productId: id, categoryId: createdCategories[i % 10].id },
    { productId: id, categoryId: createdCategories[(i + 1) % 10].id },
    { productId: id, categoryId: createdCategories[(i + 2) % 10].id },
  ]);

  console.log(`Created product (id: ${id}, name: ${product.name})`);
}

sqlite.close();
