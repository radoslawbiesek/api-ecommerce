import Fastify from "fastify";
import "dotenv/config";

const app = Fastify({ logger: { level: "debug" } });

await app.register(import("plugins/database/index.js"));
await app.register(import("plugins/graphql/index.js"));

await app.listen({ port: 3000 });
