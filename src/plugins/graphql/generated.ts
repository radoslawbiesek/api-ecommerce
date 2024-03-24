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
) =>
  | Promise<import("mercurius-codegen").DeepPartial<TResult>>
  | import("mercurius-codegen").DeepPartial<TResult>;
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
  cart?: Maybe<Cart>;
  reviews: Array<Review>;
  orders: Array<OrderListItem>;
  order?: Maybe<Order>;
};

export type QueryproductArgs = {
  slug: Scalars["String"];
};

export type QueryproductsArgs = {
  take?: InputMaybe<Scalars["Int"]>;
  skip?: InputMaybe<Scalars["Int"]>;
  search?: InputMaybe<Scalars["String"]>;
  ordering?: InputMaybe<Scalars["String"]>;
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

export type QuerycartArgs = {
  id: Scalars["Int"];
};

export type QueryreviewsArgs = {
  productId: Scalars["Int"];
};

export type QueryordersArgs = {
  userId: Scalars["String"];
};

export type QueryorderArgs = {
  id: Scalars["Int"];
  userId: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  cartAddItem: Cart;
  cartRemoveItem: CartItem;
  cartUpdateItemQuantity: CartItem;
  cartFindOrCreate: Cart;
  orderUpdate?: Maybe<Order>;
  addReview: Review;
  productCreate: Product;
};

export type MutationcartAddItemArgs = {
  cartId: Scalars["Int"];
  item: CardItemInput;
};

export type MutationcartRemoveItemArgs = {
  cartItemId: Scalars["Int"];
};

export type MutationcartUpdateItemQuantityArgs = {
  cartItemId: Scalars["Int"];
  quantity: Scalars["Int"];
};

export type MutationcartFindOrCreateArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  input?: InputMaybe<CardItemInput>;
};

export type MutationorderUpdateArgs = {
  id?: InputMaybe<Scalars["Int"]>;
  input?: InputMaybe<OrderUpdateInput>;
};

export type MutationaddReviewArgs = {
  input: ReviewInput;
};

export type MutationproductCreateArgs = {
  input: ProductInput;
};

export type Product = {
  __typename?: "Product";
  id: Scalars["Int"];
  name: Scalars["String"];
  slug: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Int"];
  rating?: Maybe<Scalars["Float"]>;
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
  ordering?: InputMaybe<Scalars["String"]>;
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
  ordering?: InputMaybe<Scalars["String"]>;
};

export type Collections = {
  __typename?: "Collections";
  data: Array<CollectionListItem>;
};

export type Meta = {
  __typename?: "Meta";
  total: Scalars["Int"];
};

export type Cart = {
  __typename?: "Cart";
  id: Scalars["Int"];
  items: Array<CartItem>;
};

export type CartItem = {
  __typename?: "CartItem";
  id: Scalars["Int"];
  quantity: Scalars["Int"];
  price?: Maybe<Scalars["Int"]>;
  productId: Scalars["Int"];
  variant: Scalars["String"];
  product: Product;
};

export type CardItemInput = {
  productId: Scalars["Int"];
  quantity: Scalars["Int"];
  variant: Scalars["String"];
};

export type OrderListItem = {
  __typename?: "OrderListItem";
  id: Scalars["Int"];
  userId?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
};

export type Order = {
  __typename?: "Order";
  id: Scalars["Int"];
  userId?: Maybe<Scalars["String"]>;
  status?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["String"]>;
  items: Array<CartItem>;
};

export type Review = {
  __typename?: "Review";
  id: Scalars["Int"];
  productId: Scalars["Int"];
  rating: Scalars["Int"];
  headline: Scalars["String"];
  content: Scalars["String"];
  name: Scalars["String"];
  email: Scalars["String"];
  createdAt: Scalars["String"];
};

export type ReviewInput = {
  productId: Scalars["Int"];
  rating: Scalars["Int"];
  headline: Scalars["String"];
  content: Scalars["String"];
  name: Scalars["String"];
  email: Scalars["String"];
};

export type ProductInput = {
  name: Scalars["String"];
  description: Scalars["String"];
  price: Scalars["Int"];
  inStock: Scalars["Int"];
  variants: Array<Scalars["String"]>;
  categories: Array<Scalars["Int"]>;
};

export type OrderUpdateInput = {
  status: Scalars["String"];
  userId: Scalars["String"];
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

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
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

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
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
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  Image: ResolverTypeWrapper<Image>;
  Products: ResolverTypeWrapper<Products>;
  CategoryListItem: ResolverTypeWrapper<CategoryListItem>;
  Category: ResolverTypeWrapper<Category>;
  Categories: ResolverTypeWrapper<Categories>;
  CollectionListItem: ResolverTypeWrapper<CollectionListItem>;
  Collection: ResolverTypeWrapper<Collection>;
  Collections: ResolverTypeWrapper<Collections>;
  Meta: ResolverTypeWrapper<Meta>;
  Cart: ResolverTypeWrapper<Cart>;
  CartItem: ResolverTypeWrapper<CartItem>;
  CardItemInput: CardItemInput;
  OrderListItem: ResolverTypeWrapper<OrderListItem>;
  Order: ResolverTypeWrapper<Order>;
  Review: ResolverTypeWrapper<Review>;
  ReviewInput: ReviewInput;
  ProductInput: ProductInput;
  OrderUpdateInput: OrderUpdateInput;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  Int: Scalars["Int"];
  Mutation: {};
  Product: Product;
  Float: Scalars["Float"];
  Image: Image;
  Products: Products;
  CategoryListItem: CategoryListItem;
  Category: Category;
  Categories: Categories;
  CollectionListItem: CollectionListItem;
  Collection: Collection;
  Collections: Collections;
  Meta: Meta;
  Cart: Cart;
  CartItem: CartItem;
  CardItemInput: CardItemInput;
  OrderListItem: OrderListItem;
  Order: Order;
  Review: Review;
  ReviewInput: ReviewInput;
  ProductInput: ProductInput;
  OrderUpdateInput: OrderUpdateInput;
  Boolean: Scalars["Boolean"];
};

export type QueryResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  product?: Resolver<
    Maybe<ResolversTypes["Product"]>,
    ParentType,
    ContextType,
    RequireFields<QueryproductArgs, "slug">
  >;
  products?: Resolver<
    Maybe<ResolversTypes["Products"]>,
    ParentType,
    ContextType,
    Partial<QueryproductsArgs>
  >;
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
  categories?: Resolver<
    Maybe<ResolversTypes["Categories"]>,
    ParentType,
    ContextType
  >;
  collection?: Resolver<
    Maybe<ResolversTypes["Collection"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycollectionArgs, "slug">
  >;
  collections?: Resolver<
    Maybe<ResolversTypes["Collections"]>,
    ParentType,
    ContextType
  >;
  cart?: Resolver<
    Maybe<ResolversTypes["Cart"]>,
    ParentType,
    ContextType,
    RequireFields<QuerycartArgs, "id">
  >;
  reviews?: Resolver<
    Array<ResolversTypes["Review"]>,
    ParentType,
    ContextType,
    RequireFields<QueryreviewsArgs, "productId">
  >;
  orders?: Resolver<
    Array<ResolversTypes["OrderListItem"]>,
    ParentType,
    ContextType,
    RequireFields<QueryordersArgs, "userId">
  >;
  order?: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    RequireFields<QueryorderArgs, "id" | "userId">
  >;
};

export type MutationResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  cartAddItem?: Resolver<
    ResolversTypes["Cart"],
    ParentType,
    ContextType,
    RequireFields<MutationcartAddItemArgs, "cartId" | "item">
  >;
  cartRemoveItem?: Resolver<
    ResolversTypes["CartItem"],
    ParentType,
    ContextType,
    RequireFields<MutationcartRemoveItemArgs, "cartItemId">
  >;
  cartUpdateItemQuantity?: Resolver<
    ResolversTypes["CartItem"],
    ParentType,
    ContextType,
    RequireFields<MutationcartUpdateItemQuantityArgs, "cartItemId" | "quantity">
  >;
  cartFindOrCreate?: Resolver<
    ResolversTypes["Cart"],
    ParentType,
    ContextType,
    Partial<MutationcartFindOrCreateArgs>
  >;
  orderUpdate?: Resolver<
    Maybe<ResolversTypes["Order"]>,
    ParentType,
    ContextType,
    Partial<MutationorderUpdateArgs>
  >;
  addReview?: Resolver<
    ResolversTypes["Review"],
    ParentType,
    ContextType,
    RequireFields<MutationaddReviewArgs, "input">
  >;
  productCreate?: Resolver<
    ResolversTypes["Product"],
    ParentType,
    ContextType,
    RequireFields<MutationproductCreateArgs, "input">
  >;
};

export type ProductResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Product"] = ResolversParentTypes["Product"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  price?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  inStock?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  variants?: Resolver<Array<ResolversTypes["String"]>, ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes["Image"]>, ParentType, ContextType>;
  categories?: Resolver<
    Array<ResolversTypes["Category"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Image"] = ResolversParentTypes["Image"],
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
  ParentType extends
    ResolversParentTypes["Products"] = ResolversParentTypes["Products"],
> = {
  data?: Resolver<Array<ResolversTypes["Product"]>, ParentType, ContextType>;
  meta?: Resolver<ResolversTypes["Meta"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryListItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CategoryListItem"] = ResolversParentTypes["CategoryListItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Category"] = ResolversParentTypes["Category"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  products?: Resolver<
    ResolversTypes["Products"],
    ParentType,
    ContextType,
    Partial<CategoryproductsArgs>
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoriesResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Categories"] = ResolversParentTypes["Categories"],
> = {
  data?: Resolver<
    Array<ResolversTypes["CategoryListItem"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionListItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CollectionListItem"] = ResolversParentTypes["CollectionListItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Collection"] = ResolversParentTypes["Collection"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  slug?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  products?: Resolver<
    ResolversTypes["Products"],
    ParentType,
    ContextType,
    Partial<CollectionproductsArgs>
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CollectionsResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Collections"] = ResolversParentTypes["Collections"],
> = {
  data?: Resolver<
    Array<ResolversTypes["CollectionListItem"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MetaResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Meta"] = ResolversParentTypes["Meta"],
> = {
  total?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Cart"] = ResolversParentTypes["Cart"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  items?: Resolver<Array<ResolversTypes["CartItem"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CartItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["CartItem"] = ResolversParentTypes["CartItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  price?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  variant?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  product?: Resolver<ResolversTypes["Product"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderListItemResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["OrderListItem"] = ResolversParentTypes["OrderListItem"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Order"] = ResolversParentTypes["Order"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  status?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  createdAt?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  items?: Resolver<Array<ResolversTypes["CartItem"]>, ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ReviewResolvers<
  ContextType = MercuriusContext,
  ParentType extends
    ResolversParentTypes["Review"] = ResolversParentTypes["Review"],
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  productId?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  rating?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  headline?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = MercuriusContext> = {
  Query?: QueryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
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
  Cart?: CartResolvers<ContextType>;
  CartItem?: CartItemResolvers<ContextType>;
  OrderListItem?: OrderListItemResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
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
    rating?: LoaderResolver<Maybe<Scalars["Float"]>, Product, {}, TContext>;
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
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      CategoryListItem,
      {},
      TContext
    >;
  };

  Category?: {
    id?: LoaderResolver<Scalars["Int"], Category, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Category, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Category, {}, TContext>;
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Category,
      {},
      TContext
    >;
    products?: LoaderResolver<
      Products,
      Category,
      CategoryproductsArgs,
      TContext
    >;
  };

  Categories?: {
    data?: LoaderResolver<Array<CategoryListItem>, Categories, {}, TContext>;
  };

  CollectionListItem?: {
    id?: LoaderResolver<Scalars["Int"], CollectionListItem, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], CollectionListItem, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], CollectionListItem, {}, TContext>;
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      CollectionListItem,
      {},
      TContext
    >;
  };

  Collection?: {
    id?: LoaderResolver<Scalars["Int"], Collection, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Collection, {}, TContext>;
    slug?: LoaderResolver<Scalars["String"], Collection, {}, TContext>;
    description?: LoaderResolver<
      Maybe<Scalars["String"]>,
      Collection,
      {},
      TContext
    >;
    products?: LoaderResolver<
      Products,
      Collection,
      CollectionproductsArgs,
      TContext
    >;
  };

  Collections?: {
    data?: LoaderResolver<Array<CollectionListItem>, Collections, {}, TContext>;
  };

  Meta?: {
    total?: LoaderResolver<Scalars["Int"], Meta, {}, TContext>;
  };

  Cart?: {
    id?: LoaderResolver<Scalars["Int"], Cart, {}, TContext>;
    items?: LoaderResolver<Array<CartItem>, Cart, {}, TContext>;
  };

  CartItem?: {
    id?: LoaderResolver<Scalars["Int"], CartItem, {}, TContext>;
    quantity?: LoaderResolver<Scalars["Int"], CartItem, {}, TContext>;
    price?: LoaderResolver<Maybe<Scalars["Int"]>, CartItem, {}, TContext>;
    productId?: LoaderResolver<Scalars["Int"], CartItem, {}, TContext>;
    variant?: LoaderResolver<Scalars["String"], CartItem, {}, TContext>;
    product?: LoaderResolver<Product, CartItem, {}, TContext>;
  };

  OrderListItem?: {
    id?: LoaderResolver<Scalars["Int"], OrderListItem, {}, TContext>;
    userId?: LoaderResolver<
      Maybe<Scalars["String"]>,
      OrderListItem,
      {},
      TContext
    >;
    status?: LoaderResolver<
      Maybe<Scalars["String"]>,
      OrderListItem,
      {},
      TContext
    >;
    createdAt?: LoaderResolver<
      Maybe<Scalars["String"]>,
      OrderListItem,
      {},
      TContext
    >;
  };

  Order?: {
    id?: LoaderResolver<Scalars["Int"], Order, {}, TContext>;
    userId?: LoaderResolver<Maybe<Scalars["String"]>, Order, {}, TContext>;
    status?: LoaderResolver<Maybe<Scalars["String"]>, Order, {}, TContext>;
    createdAt?: LoaderResolver<Maybe<Scalars["String"]>, Order, {}, TContext>;
    items?: LoaderResolver<Array<CartItem>, Order, {}, TContext>;
  };

  Review?: {
    id?: LoaderResolver<Scalars["Int"], Review, {}, TContext>;
    productId?: LoaderResolver<Scalars["Int"], Review, {}, TContext>;
    rating?: LoaderResolver<Scalars["Int"], Review, {}, TContext>;
    headline?: LoaderResolver<Scalars["String"], Review, {}, TContext>;
    content?: LoaderResolver<Scalars["String"], Review, {}, TContext>;
    name?: LoaderResolver<Scalars["String"], Review, {}, TContext>;
    email?: LoaderResolver<Scalars["String"], Review, {}, TContext>;
    createdAt?: LoaderResolver<Scalars["String"], Review, {}, TContext>;
  };
}
declare module "mercurius" {
  interface IResolvers
    extends Resolvers<import("mercurius").MercuriusContext> {}
  interface MercuriusLoaders extends Loaders {}
}
