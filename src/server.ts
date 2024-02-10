import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";

import { typeDefs } from "@/graphql/typeDefs.generated.js";
import { resolvers } from "@/graphql/resolvers.generated.js";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    port: 4000,
  },
});

console.log(`Server is listening at: ${url}`);
