import fastifyPlugin from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import mercurius from "mercurius";
import { codegenMercurius } from "mercurius-codegen";
import mercuriusCache from "mercurius-cache";

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

  function logCache(action: "miss" | "hit") {
    return function (type: string, fieldName: string, queryStr: string) {
      let identifier = "";
      try {
        const query = JSON.parse(queryStr) as { arg?: { id?: string }; self?: { id?: string } };
        identifier = query?.arg?.id || query?.self?.id || "";
      } catch {}

      app.log.info(`Cache ${action}: ${type}.${fieldName} ${identifier}`);
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  await app.register(mercuriusCache, {
    ttl: 60 * 60 * 24,
    policy: {
      Query: {
        product: true,
        products: true,
        recommended_products: true,
        category: true,
        categories: true,
        collection: true,
        collections: true,
      },
      CartItem: {
        product: true,
      },
      Product: {
        categories: true,
        images: true,
      },
      Collection: {
        products: true,
      },
      Category: {
        products: true,
      },
      Mutation: {
        productCreate: {
          invalidate: () => ["products", "category", "collection"],
        },
        addReview: {
          invalidate: () => ["product", "products", "category", "collection"],
        },
      },
    },
    onMiss: logCache("miss"),
    onHit: logCache("hit"),
  });

  codegenMercurius(app, {
    targetPath: "./src/plugins/graphql/generated.ts",
    disable: process.env.NODE_ENV === "production",
  }).catch(console.error);
};

const graphqlPlugin = fastifyPlugin(graphql);

export default graphqlPlugin;
