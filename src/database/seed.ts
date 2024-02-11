import { faker } from "@faker-js/faker";
import "dotenv/config";

import { products } from "./schema.js";
import { db, sqlite } from "./client.js";

for (let i = 0; i < 100; i++) {
  const name = faker.commerce.productName();
  const result = await db
    .insert(products)
    .values({
      name: name,
      slug: faker.helpers.slugify(name).toLowerCase(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price({ min: 100, max: 1000 })),
    })
    .returning();
  const id = result[0].id;

  console.log(`Created product (id: ${id}, name: ${name})`);
}

sqlite.close();
