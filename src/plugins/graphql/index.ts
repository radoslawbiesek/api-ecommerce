import fastifyPlugin from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import mercurius, { type IResolvers } from "mercurius";
import { gql, codegenMercurius } from "mercurius-codegen";

import { ProductsRepository } from "repository/products.js";

const schema = gql`
  type Query {
    product(id: Int!): Product
  }

  type Product {
    id: Int!
    name: String!
    slug: String!
    description: String!
    price: Int!
  }
`;

const resolvers: IResolvers = {
  Query: {
    product: async function product(parent, args, context) {
      const productsRepository = new ProductsRepository(context.app.db);
      return productsRepository.findById(args.id);
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
