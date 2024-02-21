import { test, describe, before, afterEach } from "node:test";
import { deepStrictEqual, equal } from "node:assert";
import { eq } from "drizzle-orm";

import { ProductsRepository } from "repository/products.js";
import { db } from "database/client.js";
import { saveMockProduct, deleteMockProducts, generateMockProduct } from "tests/mock.js";
import { productsTable } from "database/schema.js";
import "database/migrate.js";

describe("Products Repository", () => {
  let productsRepository: ProductsRepository;
  before(() => {
    productsRepository = new ProductsRepository(db);
  });

  afterEach(async () => {
    await deleteMockProducts();
  });

  describe("create", () => {
    test("should create a product", async () => {
      const createdProduct = await productsRepository.create(generateMockProduct());

      const foundProduct = (await db.select().from(productsTable).where(eq(productsTable.id, createdProduct.id)))[0];

      deepStrictEqual(createdProduct, foundProduct);
    });
  });

  describe("findById", () => {
    test("should return a product by id", async () => {
      const savedProduct = await saveMockProduct();

      const product = await productsRepository.findById(savedProduct.id);

      deepStrictEqual(product, savedProduct);
    });
  });

  describe("findAll", () => {
    test("should return all products", async () => {
      const savedProducts = [await saveMockProduct(), await saveMockProduct(), await saveMockProduct()];

      const foundProducts = await productsRepository.findAll();

      deepStrictEqual(foundProducts, savedProducts);
    });
  });

  describe("update", () => {
    test("should update a product", async () => {
      const product = await saveMockProduct();

      product.name = "Updated Product";
      await productsRepository.update(product.id, product);
      const updatedProduct = (await db.select().from(productsTable).where(eq(productsTable.id, product.id)))[0];

      equal(updatedProduct.name, "Updated Product");
    });
  });

  describe("delete", () => {
    test("should delete a product", async () => {
      const product = await saveMockProduct();

      await productsRepository.delete(product.id);
      const foundProduct = (await db.select().from(productsTable).where(eq(productsTable.id, product.id)))[0];

      equal(foundProduct, undefined);
    });
  });
});
