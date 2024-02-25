import type { GraphQLResolveInfo } from "graphql";
import type { MercuriusContext } from "mercurius";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<import("mercurius-codegen").DeepPartial<TResult>> | import("mercurius-codegen").DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  _FieldSet: any;
};

export type Query = {
  __typename?: "Query";
  product?: Maybe<Product>;
  products?: Maybe<Products>;
  recommended_products?: Maybe<Products>;
  category?: Maybe<Category>;
  categories?: Maybe<Categories>;
  collection?: Maybe<Collection>;
  collections?: Maybe<Collections>;
};

export type QueryproductArgs = {
  slug: Scalars["String"];
};

export type QueryproductsArgs = {
  take?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
};

export type Queryrecommended_productsArgs = {
  productId: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
};

export type QuerycategoryArgs = {
  slug: Scalars["String"];
};

export type QuerycollectionArgs = {
  slug: Scalars["String"];
};

export type Product = {
  __typename?: "Product";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Int"];
  rating: Scalars["Int"];
  inStock: Scalars["Int"];
  variants: Array<Scalars["String"]>;
  images: Array<Image>;
  categories: Array<Category>;
};

export type Image = {
  __typename?: "Image";
  id: Scalars["Int"];
  url: Scalars["String"];
  alt?: Maybe<Scalars["String"]>;
  height: Scalars["Int"];
  width: Scalars["Int"];
};

export type Products = {
  __typename?: "Products";
  data: Array<Product>;
  meta: Meta;
};

export type CategoryListItem = {
  __typename?: "CategoryListItem";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
};

export type Category = {
  __typename?: "Category";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  products: Products;
};

export type CategoryproductsArgs = {
  take?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type Categories = {
  __typename?: "Categories";
  data: Array<CategoryListItem>;
};

export type CollectionListItem = {
  __typename?: "CollectionListItem";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  imageUrl: Scalars["String"];
};

export type Collection = {
  __typename?: "Collection";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description?: Maybe<Scalars["String"]>;
  products: Products;
};

export type CollectionproductsArgs = {
  take?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
};

export type Collections = {
  __typename?: "Collections";
  data: Array<CollectionListItem>;
};

export type Meta = {
  __typename?: "Meta";
  total: Scalars["Int"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  Product: ResolverTypeWrapper<Product>;
  Image: ResolverTypeWrapper<Image>;
  Products: ResolverTypeWrapper<Products>;
  CategoryListItem: ResolverTypeWrapper<CategoryListItem>;
  Category: ResolverTypeWrapper<Category>;
  Categories: ResolverTypeWrapper<Categories>;
  CollectionListItem: ResolverTypeWrapper<CollectionListItem>;
  Collection: ResolverTypeWrapper<Collection>;
  Collections: ResolverTypeWrapper<Collections>;
  Meta: ResolverTypeWrapper<Meta>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  Int: Scalars["Int"];
  Product: Product;
  Image: Image;
  Products: Products;
  CategoryListItem: CategoryListItem;
  Category: Category;
  Categories: Categories;
  CollectionListItem: CollectionListItem;
  Collection: Collection;
  Collections: Collections;
  Meta: Meta;
  Boolean: Scalars["Boolean"];
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  product?: Resolver<
    Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QueryproductArgs, "slug">
  >;
  products?: Resolver<Maybe<ResolversTypes["Products"]>, ParentType, ContextType, Partial<QueryproductsArgs>>;
  recommended_products?: Resolver<
    Maybe<ResolversTypes["Products"]>,
    ParentType,
    ContextType,
    RequireFields<Queryrecommended_productsArgs, "productId">
  >;
  category?: Resolver<
    Maybe<ResolversTypes["Category"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycategoryArgs, "slug">
  >;
  categories?: Resolver<Maybe<ResolversTypes["Categories"]>, ParentType, ContextType>;
  collection?: Resolver<
    Maybe<ResolversTypes["Collection"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycollectionArgs, "slug">
  >;
  collections?: Resolver<Maybe<ResolversTypes["Collections"]>, ParentType, ContextType>;
};

export type ProductResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Product"] = ResolversParentTypes["Product"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  variants?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  categories?: Resolver<Array<ResolversTypes["Category"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  url?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  alt?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  height?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  width?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Products"] = ResolversParentTypes["Products"],
> = {
  data?: Resolver<Array<ResolversTypes["Product"]>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes["Meta"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryListItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["CategoryListItem"] = ResolversParentTypes["CategoryListItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Category"] = ResolversParentTypes["Category"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  products?: Resolver<ResolversTypes["Products"], ParentType, ContextType, Partial<CategoryproductsArgs>>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoriesResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Categories"] = ResolversParentTypes["Categories"],
> = {
  data?: Resolver<Array<ResolversTypes["CategoryListItem"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionListItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["CollectionListItem"] = ResolversParentTypes["CollectionListItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  imageUrl?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Collection"] = ResolversParentTypes["Collection"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  products?: Resolver<ResolversTypes["Products"], ParentType, ContextType, Partial<CollectionproductsArgs>>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionsResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Collections"] = ResolversParentTypes["Collections"],
> = {
  data?: Resolver<Array<ResolversTypes["CollectionListItem"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<
  ContextType = MercuriusContext,
  ParentType extends ResolversParentTypes["Meta"] = ResolversParentTypes["Meta"],
> = {
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Query?: QueryResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Products?: ProductsResolvers<ContextType>;
  CategoryListItem?: CategoryListItemResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  Categories?: CategoriesResolvers<ContextType>;
  CollectionListItem?: CollectionListItemResolvers<ContextType>;
  Collection?: CollectionResolvers<ContextType>;
  Collections?: CollectionsResolvers<ContextType>;
  Meta?: MetaResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
  queries: Array<{
    obj: TObj;
    params: TParams;
  }>,
  context: TContext & {
    reply: import("fastify").FastifyReply;
  },
) => Promise<Array<import("mercurius-codegen").DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
  | Loader<TReturn, TObj, TParams, TContext>
  | {
      loader: Loader<TReturn, TObj, TParams, TContext>;
      opts?: {
        cache?: boolean;
      };
    };
export interface Loaders<
  TContext = import("mercurius").MercuriusContext & {
    reply: import("fastify").FastifyReply;
  },
> {
  Product?: {
    id?: LoaderResolver<Scalars["Int"], Product, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Product, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Product, {}, TContext>;
    description?: LoaderResolver<Scalars["String"], Product, {}, TContext>;
    price?: LoaderResolver<Scalars["Int"], Product, {}, TContext>;
    rating?: LoaderResolver<Scalars["Int"], Product, {}, TContext>;
    inStock?: LoaderResolver<Scalars["Int"], Product, {}, TContext>;
    variants?: LoaderResolver<Array<Scalars["String"]>, Product, {}, TContext>;
    images?: LoaderResolver<Array<Image>, Product, {}, TContext>;
    categories?: LoaderResolver<Array<Category>, Product, {}, TContext>;
  };

  Image?: {
    id?: LoaderResolver<Scalars["Int"], Image, {}, TContext>;
    url?: LoaderResolver<Scalars["String"], Image, {}, TContext>;
    alt?: LoaderResolver<Maybe<Scalars["String"]>, Image, {}, TContext>;
    height?: LoaderResolver<Scalars["Int"], Image, {}, TContext>;
    width?: LoaderResolver<Scalars["Int"], Image, {}, TContext>;
  };

  Products?: {
    data?: LoaderResolver<Array<Product>, Products, {}, TContext>;
    meta?: LoaderResolver<Meta, Products, {}, TContext>;
  };

  CategoryListItem?: {
    id?: LoaderResolver<Scalars["Int"], CategoryListItem, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], CategoryListItem, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], CategoryListItem, {}, TContext>;
    description?: LoaderResolver<Maybe<Scalars["String"]>, CategoryListItem, {}, TContext>;
  };

  Category?: {
    id?: LoaderResolver<Scalars["Int"], Category, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Category, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Category, {}, TContext>;
    description?: LoaderResolver<Maybe<Scalars["String"]>, Category, {}, TContext>;
    products?: LoaderResolver<Products, Category, CategoryproductsArgs, TContext>;
  };

  Categories?: {
    data?: LoaderResolver<Array<CategoryListItem>, Categories, {}, TContext>;
  };

  CollectionListItem?: {
    id?: LoaderResolver<Scalars["Int"], CollectionListItem, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], CollectionListItem, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], CollectionListItem, {}, TContext>;
    description?: LoaderResolver<Maybe<Scalars["String"]>, CollectionListItem, {}, TContext>;
    imageUrl?: LoaderResolver<Scalars["String"], CollectionListItem, {}, TContext>;
  };

  Collection?: {
    id?: LoaderResolver<Scalars["Int"], Collection, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Collection, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Collection, {}, TContext>;
    description?: LoaderResolver<Maybe<Scalars["String"]>, Collection, {}, TContext>;
    products?: LoaderResolver<Products, Collection, CollectionproductsArgs, TContext>;
  };

  Collections?: {
    data?: LoaderResolver<Array<CollectionListItem>, Collections, {}, TContext>;
  };

  Meta?: {
    total?: LoaderResolver<Scalars["Int"], Meta, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
