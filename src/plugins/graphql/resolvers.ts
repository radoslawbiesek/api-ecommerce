import { type IResolvers } from "mercurius";

import { ProductsRepository } from "database/products/products.repository.js";
import { CategoriesRepository } from "database/categories/categories.repository.js";
import { CollectionsRepository } from "database/collections/collections.repository.js";
import { OrdersRepository } from "database/orders/orders.repository.js";
import { ReviewsRepository } from "database/reviews/reviews.repository.js";

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

      const data = productsRepository.findAllRecommended(args.productId, args);

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
      const ordersRepository = new OrdersRepository(context.app.db);

      return ordersRepository.findById(args.id);
    },

    reviews: async function reviews(_parent, args: { productId: number }, context) {
      const reviewsRepository = new ReviewsRepository(context.app.db);

      return reviewsRepository.findAll(args.productId);
    },
  },

  Category: {
    products: async function products(parent: { id: number }, args: { take?: number; skip?: number }, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);

      const data = await categoriesRepository.findAllProducts(parent.id, args);
      const total = await categoriesRepository.countAllProducts(parent.id);

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
      const collectionsRepository = new CollectionsRepository(context.app.db);

      const data = await collectionsRepository.findAllProducts(parent.id, args);
      const total = await collectionsRepository.countAllProducts(parent.id);

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
      const productsRepository = new ProductsRepository(context.app.db);

      return productsRepository.findImages(parent.id);
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
      const ordersRepository = new OrdersRepository(context.app.db);

      return ordersRepository.addItem({ ...args.input, orderId: args.cartId });
    },

    cartRemoveItem: async function cartRemoveItem(_parent, args: { cartItemId: number }, context) {
      const ordersRepository = new OrdersRepository(context.app.db);

      return ordersRepository.deleteItem(args.cartItemId);
    },

    cartUpdateItemQuantity: async function cartUpdateItemQuantity(
      _parent,
      args: { cartItemId: number; quantity: number },
      context,
    ) {
      const ordersRepository = new OrdersRepository(context.app.db);

      return ordersRepository.updateItem({ id: args.cartItemId, quantity: args.quantity });
    },

    cartFindOrCreate: async function cartFindOrCreate(
      _parent,
      args: { id: number; input?: { productId: number; quantity: number } },
      context,
    ) {
      const ordersRepository = new OrdersRepository(context.app.db);

      let cart = await ordersRepository.findById(args.id);
      if (!cart) {
        cart = await ordersRepository.create();
      }

      if (args.input) {
        const item = await ordersRepository.addItem({ ...args.input, orderId: cart.id });
        cart.items.push(item);
      }

      return cart;
    },

    addReview: async function addReview(
      _parent,
      args: {
        input: { productId: number; rating: number; content: string; headline: string; name: string; email: string };
      },
      context,
    ) {
      const reviewsRepository = new ReviewsRepository(context.app.db);

      return reviewsRepository.create(args.input);
    },
  },
};
