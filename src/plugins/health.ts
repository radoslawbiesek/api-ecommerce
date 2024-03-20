import { fastifyPlugin } from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
export const health: FastifyPluginAsync = async (fastify) => {
  fastify.get("/health", async () => {
    return { message: "ok" };
  });
};

const healthPlugin = fastifyPlugin(health);

export default healthPlugin;
