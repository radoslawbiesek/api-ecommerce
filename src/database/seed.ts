import "dotenv/config";

import { generateMockProduct } from "tests/mock.js";

import { db, sqlite } from "./client.js";
import { products } from "./schema.js";

for (let i = 0; i < 100; i++) {
  const product = generateMockProduct();
  const result = await db.insert(products).values(product).returning();
  const id = result[0].id;

  console.log(`Created product (id: ${id}, name: ${product.name})`);
}

sqlite.close();
