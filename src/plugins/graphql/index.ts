import fastifyPlugin from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import mercurius, { type IResolvers } from "mercurius";
import { gql, codegenMercurius } from "mercurius-codegen";

import { ProductsRepository } from "repository/products.js";
import { CategoriesRepository } from "repository/category.js";
import { CollectionsRepository } from "repository/collections.js";

const DEFAULT_TAKE = 10;
const DEFAULT_SKIP = 0;

const schema = gql`
  type Query {
    product(id: Int!): Product
    products(take: Int, skip: Int): Products
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
  }

  type Products {
    data: [Product]!
    meta: Meta
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
    products: Products
  }

  type Categories {
    data: [CategoryListItem]
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
    products: Products
  }

  type Collections {
    data: [CollectionListItem]
  }

  type Meta {
    total: Int!
    count: Int!
  }
`;

const resolvers: IResolvers = {
  Query: {
    product: async function product(_parent, args: { id: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);

      return productsRepository.findById(args.id);
    },

    products: async function products(_parent, args: { take?: number; skip?: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);
      const take = args.take || DEFAULT_TAKE;
      const skip = args.skip || DEFAULT_SKIP;

      const data = await productsRepository.findAll({ take, skip });
      const total = data[0].count;

      return {
        data,
        meta: {
          total,
          count: take,
        },
      };
    },

    category: async function category(_parent, args: { slug: string }, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);

      return categoriesRepository.findBySlug(args.slug);
    },

    categories: async function categories(_parent, _args, context) {
      const categoriesRepository = new CategoriesRepository(context.app.db);
      const data = await categoriesRepository.findAll();

      return { data };
    },

    collection: async function collection(_parent, args: { slug: string }, context) {
      const collectionsRepository = new CollectionsRepository(context.app.db);

      return collectionsRepository.findBySlug(args.slug);
    },

    collections: async function collections(_parent, _args, context) {
      const collectionsRepository = new CollectionsRepository(context.app.db);
      const data = await collectionsRepository.findAll();

      return { data };
    },
  },

  Category: {
    products: async function products(parent: { id: number }, args: { take?: number; skip?: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);
      const take = args.take || DEFAULT_TAKE;
      const skip = args.skip || DEFAULT_SKIP;

      const data = await productsRepository.findAllByCategory(parent.id, { take, skip });

      return {
        data,
        meta: {
          total: data.length,
          count: take,
        },
      };
    },
  },

  Collection: {
    products: async function products(parent: { id: number }, args: { take?: number; skip?: number }, context) {
      const productsRepository = new ProductsRepository(context.app.db);
      const take = args.take || DEFAULT_TAKE;
      const skip = args.skip || DEFAULT_SKIP;

      const data = await productsRepository.findAllByCollection(parent.id, { take, skip });

      return {
        data,
        meta: {
          total: data.length,
          count: take,
        },
      };
    },
  },
};

export const graphql: FastifyPluginAsync = async (app) => {
  await app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
  });

  codegenMercurius(app, {
    targetPath: "./src/plugins/graphql/generated.ts",
  }).catch(console.error);
};

const graphqlPlugin = fastifyPlugin(graphql);

export default graphqlPlugin;
