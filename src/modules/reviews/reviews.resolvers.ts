import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { ReviewsRepository } from "./reviews.repository.js";

const reviews: IFieldResolver<Record<string, never>, MercuriusContext, { productId: number }> = async (
  _parent,
  args,
  context,
) => {
  const reviewsRepository = new ReviewsRepository(context.app.db);

  return reviewsRepository.findAll(args.productId);
};

const addReview: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  {
    input: { productId: number; rating: number; content: string; headline: string; name: string; email: string };
  }
> = async (_parent, args, context) => {
  const reviewsRepository = new ReviewsRepository(context.app.db);

  return reviewsRepository.create(args.input);
};

export const reviewsQuery = {
  reviews,
};

export const reviewsMutation = {
  addReview,
};
