import { type IResolvers } from "mercurius";

import { ProductsRepository } from "repository/products.js";
import { CategoriesRepository } from "repository/category.js";
import { CollectionsRepository } from "repository/collections.js";
import { ProductImagesRepository } from "repository/product-images.js";

export const resolvers: IResolvers = {
  Query: {
    product: async function product(_parent, args: { slug: string }, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      return productsRepository.findBySlug(args.slug);
    },

    products: async function products(_parent, args: { take?: number; skip?: number; search?: string }, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      const data = await productsRepository.findAll(args);
      const total = await productsRepository.countAll(args);

      return {
        data,
        meta: {
          total,
        },
      };
    },

    recommended_products: async function recommendedProducts(
      _parent,
      args: { productId: number; take?: number },
      context,
    ) {
      const productsRepository = new ProductsRepository(context.app.db);

      const data = productsRepository.findRecommendedProducts(args.productId, args);

      return { data };
    },

    category: async function category(_parent, args: { slug: string }, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);

      return categoriesRepository.findBySlug(args.slug);
    },

    categories: async function categories(_parent, _args, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);
      const data = await categoriesRepository.findAll();

      return { data };
    },

    collection: async function collection(_parent, args: { slug: string }, context) {
      const collectionsRepository = new CollectionsRepository(context.app.db);

      return collectionsRepository.findBySlug(args.slug);
    },

    collections: async function collections(_parent, _args, context) {
      const collectionsRepository = new CollectionsRepository(context.app.db);
      const data = await collectionsRepository.findAll();

      return { data };
    },
  },

  Category: {
    products: async function products(parent: { id: number }, args: { take?: number; skip?: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      const data = await productsRepository.findAllByCategoryId(parent.id, args);
      const total = await productsRepository.countAllByCategoryId(parent.id);

      return {
        data,
        meta: {
          total,
        },
      };
    },
  },

  Collection: {
    products: async function products(parent: { id: number }, args: { take?: number; skip?: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      const data = await productsRepository.findAllByCollectionId(parent.id, args);
      const total = await productsRepository.countAllByCollectionId(parent.id);

      return {
        data,
        meta: {
          total,
        },
      };
    },
  },

  Product: {
    images: async function images(parent: { id: number }, _args, context) {
      const productImagesRepository = new ProductImagesRepository(context.app.db);

      return productImagesRepository.findAllByProductId(parent.id);
    },

    categories: async function categories(parent: { id: number }, _args, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);

      return categoriesRepository.findAllByProductId(parent.id);
    },
  },
};
