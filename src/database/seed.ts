import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
import "dotenv/config";

import { products } from "@/database/schema";

const betterSqlite = new Database(process.env.DATABASE_URL);
const db = drizzle(betterSqlite);

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

betterSqlite.close();
