import { faker } from "@faker-js/faker";

import { generateMockCategory, generateMockCollection, generateMockProduct, generateMockReview } from "tests/mock.js";

import { db, sqlite } from "./client.js";
import { CategoriesRepository } from "./categories/categories.repository.js";
import { CollectionsRepository } from "./collections/collections.repository.js";
import { ProductsRepository } from "./products/products.repository.js";
import { productsToCategoriesTable, productsToCollectionsTable } from "./schema.js";
import { ReviewsRepository } from "./reviews/reviews.repository.js";

const categoriesRepository = new CategoriesRepository(db);
const collectionsRepository = new CollectionsRepository(db);
const productsRepository = new ProductsRepository(db);
const reviewsRepository = new ReviewsRepository(db);

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
  const category = await categoriesRepository.create(generateMockCategory({ name: generateUnique() }));
  createdCategories.push(category.id);

  console.log(`Created category (id: ${category.id}, name: ${category.name})`);
}

const createdCollections: number[] = [];
for (let i = 0; i <= 3; i++) {
  let url = "https://picsum.photos/500";
  try {
    const response = await fetch("https://picsum.photos/500");
    url = response.url;
  } catch {}

  const collection = await collectionsRepository.create(
    generateMockCollection({ name: generateUnique(), imageUrl: url }),
  );
  createdCollections.push(collection.id);

  console.log(`Created collection (id: ${collection.id}, name: ${collection.name})`);
}

for (let i = 0; i < 40; i++) {
  const product = await productsRepository.create(generateMockProduct({ name: faker.commerce.productName() }));
  let productUrl = "https://picsum.photos/500";
  try {
    const response = await fetch("https://picsum.photos/500");
    productUrl = response.url;
  } catch (err) {}

  const productImage = await productsRepository.addImage(product.id, {
    url: productUrl,
    width: 500,
    height: 500,
    alt: "",
  });
  console.log(`Created product image (id: ${productImage.id}, url: ${productImage.url})`);

  await db.insert(productsToCategoriesTable).values({ productId: product.id, categoryId: createdCategories[i % 3] });
  await db
    .insert(productsToCollectionsTable)
    .values({ productId: product.id, collectionId: createdCollections[i % 3] });

  console.log(`Created product (id: ${product.id}, name: ${product.name})`);

  for (let j = 0; j < 5; j++) {
    const review = await reviewsRepository.create(generateMockReview({ productId: product.id }));
    console.log(`Created review (id: ${review.id}, productId: ${review.productId})`);
  }
}

sqlite.close();
process.exit(0);
