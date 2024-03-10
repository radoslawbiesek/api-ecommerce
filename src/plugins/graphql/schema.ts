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
    imageUrl: String!
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

  type Order {
    id: Int!
    items: [CartItem!]!
    status: String
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

  type Mutation {
    cartAddItem(cartId: Int!, item: CardItemInput!): Cart!

    cartRemoveItem(cartItemId: Int!): CartItem!

    cartUpdateItemQuantity(cartItemId: Int!, quantity: Int!): CartItem!

    cartFindOrCreate(id: Int, input: CardItemInput): Cart!

    orderUpdateStatus(id: Int, status: String): Order

    addReview(input: ReviewInput!): Review!
  }
`;
