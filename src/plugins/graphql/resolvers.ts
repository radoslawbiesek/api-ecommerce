import { type IResolvers } from "mercurius";

import { ProductsRepository } from "repository/products.js";
import { CategoriesRepository } from "repository/category.js";
import { CollectionsRepository } from "repository/collections.js";
import { ProductImagesRepository } from "repository/product-images.js";
import { OrdersRepository } from "repository/orders.js";
import { OrderItemsRepository } from "repository/order-items.js";

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

    cart: async function cart(_parent, args: { id: number }, context) {
      const orderItemsRepository = new OrderItemsRepository(context.app.db);

      const items = await orderItemsRepository.findAll(args.id);

      return {
        id: args.id,
        items,
      };
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

  CartItem: {
    product: async function product(parent: { productId: number }, _args, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      return productsRepository.findById(parent.productId);
    },
  },

  Mutation: {
    cartAddItem: async function cartAddItem(
      _parent,
      args: { cartId: number; input: { productId: number; quantity: number } },
      context,
    ) {
      const orderItemsRepository = new OrderItemsRepository(context.app.db);

      return orderItemsRepository.addOrUpdate({ ...args.input, orderId: args.cartId });
    },

    cartRemoveItem: async function cartRemoveItem(_parent, args: { cartItemId: number }, context) {
      const orderItemsRepository = new OrderItemsRepository(context.app.db);

      return orderItemsRepository.delete(args.cartItemId);
    },

    cartUpdateItemQuantity: async function cartUpdateItemQuantity(
      _parent,
      args: { cartItemId: number; quantity: number },
      context,
    ) {
      const orderItemsRepository = new OrderItemsRepository(context.app.db);

      return orderItemsRepository.update(args.cartItemId, { quantity: args.quantity });
    },

    cartFindOrCreate: async function cartFindOrCreate(
      _parent,
      args: { id: number; input?: { productId: number; quantity: number } },
      context,
    ) {
      const ordersRepository = new OrdersRepository(context.app.db);
      const orderItemsRepository = new OrderItemsRepository(context.app.db);

      const order = await ordersRepository.findOrCreate(args.id);
      if (args.input) {
        await orderItemsRepository.addOrUpdate({ ...args.input, orderId: order.id });
      }
      const items = await orderItemsRepository.findAll(order.id);

      return {
        id: order.id,
        items,
      };
    },
  },
};
