import { type IResolvers } from "mercurius";

import { cartQuery, CartItem, cartMutation } from "../../modules/carts/carts.resolvers.js";
import { reviewsMutation, reviewsQuery } from "../../modules/reviews/reviews.resolvers.js";
import { ordersMutation, ordersQuery } from "../../modules/orders/orders.resolvers.js";
import { collectionsQuery, Collection } from "../../modules/collections/collections.resolvers.js";
import { categoriesQuery, Category } from "../../modules/categories/categories.resolvers.js";
import { Product, productsMutation, productsQuery } from "../../modules/products/products.resolvers.js";

export const resolvers: IResolvers = {
  Query: {
    ...cartQuery,
    ...reviewsQuery,
    ...ordersQuery,
    ...collectionsQuery,
    ...categoriesQuery,
    ...productsQuery,
  },
  CartItem,
  Collection,
  Category,
  Product,
  Mutation: {
    ...cartMutation,
    ...reviewsMutation,
    ...ordersMutation,
    ...productsMutation,
  },
};
