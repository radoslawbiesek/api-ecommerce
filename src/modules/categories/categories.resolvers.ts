import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { CategoriesRepository } from "./categories.repository.js";

const category: IFieldResolver<Record<string, never>, MercuriusContext, { slug: string }> = async (
  _parent,
  args,
  context,
) => {
  const categoriesRepository = new CategoriesRepository(context.app.db);

  return categoriesRepository.findBySlug(args.slug);
};

const categories: IFieldResolver<Record<string, never>, MercuriusContext, Record<string, never>> = async (
  _parent,
  _args,
  context,
) => {
  const categoriesRepository = new CategoriesRepository(context.app.db);
  const data = await categoriesRepository.findAll();

  return { data };
};

const products: IFieldResolver<{ id: number }, MercuriusContext, { take?: number; skip?: number }> = async (
  parent,
  args,
  context,
) => {
  const categoriesRepository = new CategoriesRepository(context.app.db);

  const data = await categoriesRepository.findAllProducts(parent.id, args);
  const total = await categoriesRepository.countAllProducts(parent.id);

  return {
    data,
    meta: {
      total,
    },
  };
};

export const categoriesQuery = {
  category,
  categories,
};

export const Category = {
  products,
};
