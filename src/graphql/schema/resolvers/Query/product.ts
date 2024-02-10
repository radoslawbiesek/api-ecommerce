import type { QueryResolvers } from "@/graphql/types.generated";
import * as productsRepository from "@/repository/products";

export const product: NonNullable<QueryResolvers["product"]> = async (_parent, arg, _ctx) => {
  return productsRepository.findById(arg.id);
};
