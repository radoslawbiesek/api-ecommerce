import { faker } from "@faker-js/faker";

import { CategoriesRepository } from "../modules/categories/categories.repository.js";
import { ProductsRepository } from "../modules/products/products.repository.js";
import { ReviewsRepository } from "../modules/reviews/reviews.repository.js";
import { CollectionsRepository } from "../modules/collections/collections.repository.js";
import { db, client } from "./client.js";

type ProductsResponse = {
  data: {
    products: {
      data: Product[];
    };
  };
};

type Product = {
  name: string;
  rating: number;
  description: string;
  price: number;
  slug: string;
  images: Image[];
  collections: Collection[];
  categories: Category[];
};

type Image = {
  alt: string;
  width: number;
  height: number;
  url: string;
};

type Category = {
  name: string;
  description: string;
  slug: string;
};

type Collection = Category;

const categoriesRepository = new CategoriesRepository(db);
const productsRepository = new ProductsRepository(db);
const reviewsRepository = new ReviewsRepository(db);
const collectionsRepository = new CollectionsRepository(db);

async function fetchData() {
  const response = await fetch(
    "https://graphql.hyperfunctor.com/graphql?query=query+MyQuery+%7B%0A++products%28take%3A+50%29+%7B%0A++++data+%7B%0A++++++name%0A++++++description%0A++++++price%0A++++++slug%0A++++++images+%7B%0A++++++++alt%0A++++++++width%0A++++++++height%0A++++++++url%0A++++++%7D%0A++++++categories+%7B%0A++++++++name%0A++++++++description%0A++++++++slug%0A++++++%7D%0A++++++collections+%7B%0A++++++++name%0A++++++++description%0A++++++++slug%0A++++++%7D%0A++++%7D%0A++%7D%0A%7D#",
  );
  if (!response.ok) {
    throw new Error("Failed to fetch dummy data");
  }
  const data = await response.json();

  return (data as ProductsResponse).data.products.data;
}

const categoriesMap = new Map<string, number>();
async function getOrCreateCategory(category: Category): Promise<number> {
  const existingCategory = categoriesMap.get(category.slug);
  if (existingCategory) {
    return existingCategory;
  }
  const newCategory = await categoriesRepository.create(category);
  categoriesMap.set(category.slug, newCategory.id);

  return newCategory.id;
}

const collectionsMap = new Map<string, number>();
async function getOrCreateCollection(collection: Collection): Promise<number> {
  const existingCollection = collectionsMap.get(collection.slug);
  if (existingCollection) {
    return existingCollection;
  }
  const newCollection = await collectionsRepository.create(collection);
  collectionsMap.set(collection.slug, newCollection.id);

  return newCollection.id;
}

const products = await fetchData();

for await (const product of products) {
  const variants =
    product.categories[0]?.slug === "t-shirt" || product.categories[0]?.slug === "hoodies"
      ? ["S", "M", "L", "XL"]
      : ["one size"];

  const newProduct = await productsRepository.create({
    name: product.name,
    description: product.description,
    price: product.price,
    slug: product.slug,
    variants,
  });

  for (const image of product.images) {
    await productsRepository.addImage(newProduct.id, image);
  }

  for (const category of product.categories) {
    const categoryId = await getOrCreateCategory(category);
    await categoriesRepository.addProduct(categoryId, newProduct.id);
  }

  for (const collection of product.collections) {
    const collectionId = await getOrCreateCollection(collection);
    await collectionsRepository.addProduct(collectionId, newProduct.id);
  }

  for (let i = 0; i < faker.number.int({ min: 0, max: 10 }); i++) {
    const review = {
      productId: newProduct.id,
      name: faker.person.firstName(),
      email: faker.internet.email(),
      rating: faker.number.int({ min: 1, max: 5 }),
      headline: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      createdAt: faker.date.recent().toISOString(),
    };
    await reviewsRepository.create(review);
  }
}

client.close();
process.exit(0);
