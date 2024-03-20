import Fastify from "fastify";

const app = Fastify({
  logger: { level: "debug", ...(process.env.NODE_ENV !== "production" && { transport: { target: "pino-pretty" } }) },
});

await app.register(import("./plugins/database/index.js"));
await app.register(import("./plugins/graphql/index.js"));
await app.register((fastify) => {
  fastify.get("/health", async () => {
    return { message: "ok" };
  });
});

await app.listen({ port: 8000, host: "0.0.0.0" });
