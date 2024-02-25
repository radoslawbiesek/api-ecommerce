import fastifyPlugin from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";

import { schema } from "./schema.js";
import { resolvers } from "./resolvers.js";

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
