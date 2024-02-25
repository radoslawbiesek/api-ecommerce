import { faker } from "@faker-js/faker";

import { saveMockCategory, saveMockCollection, saveMockProduct, saveMockProductImage } from "tests/mock.js";

import { db, sqlite } from "./client.js";
import { imagesToProductsTable, productsToCategoriesTable, productsToCollectionsTable } from "./schema.js";

const generated = new Set<string>();

function generateUnique(): string {
  const name = faker.commerce.department();
  if (generated.has(name)) {
    return generateUnique();
  }
  generated.add(name);

  return name;
}

const createdCategories: number[] = [];
for (let i = 0; i <= 2; i++) {
  const category = await saveMockCategory({ name: generateUnique() });
  createdCategories.push(category.id);

  console.log(`Created category (id: ${category.id}, name: ${category.name})`);
}

const createdCollections: number[] = [];
for (let i = 0; i <= 3; i++) {
  const response = await fetch("https://picsum.photos/500");
  const url = response.url;
  const collection = await saveMockCollection({ name: generateUnique(), imageUrl: url });
  createdCollections.push(collection.id);

  console.log(`Created collection (id: ${collection.id}, name: ${collection.name})`);
}

for (let i = 0; i < 100; i++) {
  const product = await saveMockProduct();

  const productImagesIds: number[] = [];
  for (let i = 0; i < 3; i++) {
    const response = await fetch("https://picsum.photos/500");
    const url = response.url;
    const productImage = await saveMockProductImage({ url, productId: product.id });
    productImagesIds.push(productImage.id);
    console.log(`Created product image (id: ${productImage.id}, url: ${productImage.url})`);
  }

  await db.insert(imagesToProductsTable).values(productImagesIds.map((id) => ({ productId: product.id, imageId: id })));
  await db.insert(productsToCategoriesTable).values({ productId: product.id, categoryId: createdCategories[i % 3] });
  await db
    .insert(productsToCollectionsTable)
    .values({ productId: product.id, collectionId: createdCollections[i % 3] });

  console.log(`Created product (id: ${product.id}, name: ${product.name})`);
}

sqlite.close();
process.exit(0);
