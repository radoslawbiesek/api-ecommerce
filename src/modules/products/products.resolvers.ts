import { type IFieldResolver, type MercuriusContext } from "mercurius";

import { CategoriesRepository } from "../categories/categories.repository.js";
import { slugify } from "../../helpers/slugify.js";
import { ProductsRepository } from "./products.repository.js";

const product: IFieldResolver<Record<string, never>, MercuriusContext, { slug: string }> = async (
  _parent,
  args,
  context,
) => {
  const productsRepository = new ProductsRepository(context.app.db);

  return productsRepository.findBySlug(args.slug);
};

const products: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { take?: number; skip?: number; search?: string }
> = async (_parent, args, context) => {
  const productsRepository = new ProductsRepository(context.app.db);

  const data = await productsRepository.findAll(args);
  const total = await productsRepository.countAll(args);

  return {
    data,
    meta: {
      total,
    },
  };
};

const recommendedProducts: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  { productId: number; take?: number }
> = async (_parent, args, context) => {
  const productsRepository = new ProductsRepository(context.app.db);

  const data = productsRepository.findAllRecommended(args.productId, args);

  return { data };
};

const images: IFieldResolver<{ id: number }, MercuriusContext, Record<string, never>> = async (
  parent,
  _args,
  context,
) => {
  const productsRepository = new ProductsRepository(context.app.db);

  return productsRepository.findImages(parent.id);
};

const categories: IFieldResolver<{ id: number }, MercuriusContext, Record<string, never>> = async (
  parent,
  _args,
  context,
) => {
  const categoriesRepository = new CategoriesRepository(context.app.db);

  return categoriesRepository.findAllByProductId(parent.id);
};

const productCreate: IFieldResolver<
  Record<string, never>,
  MercuriusContext,
  {
    input: {
      name: string;
      slug?: string;
      description: string;
      price: number;
      inStock: number;
      variants: string[];
      categories: number[];
    };
  }
> = async (_parent, args, context) => {
  const productsRepository = new ProductsRepository(context.app.db);
  const createdProduct = await productsRepository.create({
    ...args.input,
    slug: args.input.slug ?? slugify(args.input.name),
  });
  context.pubsub.publish({ topic: "PRODUCT_CREATED", payload: null });

  return createdProduct;
};

export const productsQuery = {
  product,
  products,
  recommended_products: recommendedProducts,
};

export const Product = {
  images,
  categories,
};

export const productsMutation = {
  productCreate,
};
