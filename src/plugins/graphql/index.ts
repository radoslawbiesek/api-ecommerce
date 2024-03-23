import fastifyPlugin from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";

import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";
import { PubSub } from "./pubsub.js";

export const graphql: FastifyPluginAsync = async (app) => {
  await app.register(mercurius, {
    schema,
    resolvers,
    graphiql: true,
    subscription: { pubsub: new PubSub() },
  });

  codegenMercurius(app, {
    targetPath: "./src/plugins/graphql/generated.ts",
    disable: process.env.NODE_ENV === "production",
  }).catch(console.error);
};

const graphqlPlugin = fastifyPlugin(graphql);

export default graphqlPlugin;
