import { gql } from "mercurius-codegen";

export const schema = gql`
  type Query {
    product(slug: String!): Product
    products(take: Int, skip: Int, search: String): Products
    category(slug: String!): Category
    categories: Categories
    collection(slug: String!): Collection
    collections: Collections
  }

  type Product {
    id: Int!
    name: String!
    slug: String!
    description: String!
    price: Int!
    rating: Int!
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
    products(take: Int, skip: Int): Products!
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
    products(take: Int, skip: Int): Products!
  }

  type Collections {
    data: [CollectionListItem!]!
  }

  type Meta {
    total: Int!
  }
`;
