import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { ProductsRepository } from "../products/products.repository.js";
import { CartsRepository } from "./carts.repository.js";

const cart: IFieldResolver<Record<string, never>, MercuriusContext, { id: number }> = async (
  _parent,
  args,
  context,
) => {
  const cartsRepository = new CartsRepository(context.app.db);

  return cartsRepository.findById(args.id);
};

const product: IFieldResolver<{ productId: number }, MercuriusContext, Record<string, never>> = async (
  parent,
  _args,
  context,
) => {
  const productsRepository = new ProductsRepository(context.app.db);

  return productsRepository.findById(parent.productId);
};

const cartAddItem: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { cartId: number; input: { productId: number; quantity: number } }
> = async (_parent, args, context) => {
  const cartsRepository = new CartsRepository(context.app.db);

  return cartsRepository.addItem({ ...args.input, orderId: args.cartId });
};

const cartRemoveItem: IFieldResolver<Record<string, never>, MercuriusContext, { cartItemId: number }> = async (
  _parent,
  args,
  context,
) => {
  const cartsRepository = new CartsRepository(context.app.db);

  return cartsRepository.deleteItem(args.cartItemId);
};

const cartUpdateItemQuantity: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { cartItemId: number; quantity: number }
> = async (_parent, args, context) => {
  const cartsRepository = new CartsRepository(context.app.db);

  return cartsRepository.updateItem({ id: args.cartItemId, quantity: args.quantity });
};

const cartFindOrCreate: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { id: number; input?: { productId: number; quantity: number } }
> = async (_parent, args, context) => {
  const cartsRepository = new CartsRepository(context.app.db);

  let cart = await cartsRepository.findById(args.id);
  if (!cart) {
    cart = await cartsRepository.create();
  }

  if (args.input) {
    const item = await cartsRepository.addItem({ ...args.input, orderId: cart.id });
    cart.items.push(item);
  }

  return cart;
};

export const cartQuery = {
  cart,
};
export const CartItem = {
  product,
};

export const cartMutation = {
  cartAddItem,
  cartRemoveItem,
  cartUpdateItemQuantity,
  cartFindOrCreate,
};
