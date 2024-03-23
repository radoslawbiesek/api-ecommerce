import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { CollectionsRepository } from "./collections.repository.js";

const collection: IFieldResolver<Record<string, never>, MercuriusContext, { slug: string }> = async (
  _parent,
  args,
  context,
) => {
  const collectionsRepository = new CollectionsRepository(context.app.db);

  return collectionsRepository.findBySlug(args.slug);
};

const collections: IFieldResolver<Record<string, never>, MercuriusContext, Record<string, never>> = async (
  _parent,
  _args,
  context,
) => {
  const collectionsRepository = new CollectionsRepository(context.app.db);
  const data = await collectionsRepository.findAll();

  return { data };
};

const products: IFieldResolver<{ id: number }, MercuriusContext, { take?: number; skip?: number }> = async (
  parent,
  args,
  context,
) => {
  const collectionsRepository = new CollectionsRepository(context.app.db);

  const data = await collectionsRepository.findAllProducts(parent.id, args);
  const total = await collectionsRepository.countAllProducts(parent.id);

  return {
    data,
    meta: {
      total,
    },
  };
};

export const collectionsQuery = {
  collection,
  collections,
};

export const Collection = {
  products,
};
