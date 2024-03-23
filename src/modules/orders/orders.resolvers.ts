import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { OrdersRepository } from "./orders.repository.js";

const orders: IFieldResolver<Record<string, never>, MercuriusContext, { userId: string }> = async (
  parent,
  args,
  context,
) => {
  const ordersRepository = new OrdersRepository(context.app.db);

  return ordersRepository.findAll(args.userId);
};

const order: IFieldResolver<Record<string, never>, MercuriusContext, { id: number; userId: string }> = async (
  parent,
  args,
  context,
) => {
  const ordersRepository = new OrdersRepository(context.app.db);

  return ordersRepository.findById(args.id);
};

const orderUpdate: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { id: number; input: { status: string; userId: string } }
> = async (_parent, args, context) => {
  const ordersRepository = new OrdersRepository(context.app.db);

  return ordersRepository.update(args.id, { status: args.input.status, userId: args.input.userId });
};

export const ordersQuery = {
  orders,
  order,
};

export const ordersMutation = { orderUpdate };
