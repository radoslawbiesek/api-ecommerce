import { gql } from "mercurius-codegen";

export const schema = gql`
  type Query {
    product(slug: String!): Product
    products(take: Int, skip: Int, search: String, ordering: String): Products
    recommended_products(productId: Int!, take: Int): Products
    category(slug: String!): Category
    categories: Categories
    collection(slug: String!): Collection
    collections: Collections
    cart(id: Int!): Cart
    reviews(productId: Int!): [Review!]!
    orders(userId: String!): [OrderListItem!]!
    order(id: Int!, userId: String!): Order
  }

  type Mutation {
    cartAddItem(cartId: Int!, item: CardItemInput!): Cart!
    cartRemoveItem(cartItemId: Int!): CartItem!
    cartUpdateItemQuantity(cartItemId: Int!, quantity: Int!): CartItem!
    cartFindOrCreate(id: Int, input: CardItemInput): Cart!

    orderUpdate(id: Int, input: OrderUpdateInput): Order

    addReview(input: ReviewInput!): Review!

    productCreate(input: ProductInput!): Product!
  }

  type Product {
    id: Int!
    name: String!
    slug: String!
    description: String!
    price: Int!
    rating: Float
    inStock: Int!
    variants: [String!]!
    images: [Image!]!
    categories: [Category!]!
  }

  type Image {
    id: Int!
    url: String!
    alt: String
    height: Int!
    width: Int!
  }

  type Products {
    data: [Product!]!
    meta: Meta!
  }

  type CategoryListItem {
    id: Int!
    name: String!
    slug: String!
    description: String
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    description: String
    products(take: Int, skip: Int, ordering: String): Products!
  }

  type Categories {
    data: [CategoryListItem!]!
  }

  type CollectionListItem {
    id: Int!
    name: String!
    slug: String!
    description: String
  }

  type Collection {
    id: Int!
    name: String!
    slug: String!
    description: String
    products(take: Int, skip: Int, ordering: String): Products!
  }

  type Collections {
    data: [CollectionListItem!]!
  }

  type Meta {
    total: Int!
  }

  type Cart {
    id: Int!
    items: [CartItem!]!
  }

  type CartItem {
    id: Int!
    quantity: Int!
    price: Int
    productId: Int!
    variant: String!
    product: Product!
  }

  input CardItemInput {
    productId: Int!
    quantity: Int!
    variant: String!
  }

  type OrderListItem {
    id: Int!
    userId: String
    status: String
    createdAt: String
  }

  type Order {
    id: Int!
    userId: String
    status: String
    createdAt: String
    items: [CartItem!]!
  }

  type Review {
    id: Int!
    productId: Int!
    rating: Int!
    headline: String!
    content: String!
    name: String!
    email: String!
    createdAt: String!
  }

  input ReviewInput {
    productId: Int!
    rating: Int!
    headline: String!
    content: String!
    name: String!
    email: String!
  }

  input ProductInput {
    name: String!
    description: String!
    price: Int!
    inStock: Int!
    variants: [String!]!
    categories: [Int!]!
  }

  input OrderUpdateInput {
    status: String!
    userId: String!
  }
`;
