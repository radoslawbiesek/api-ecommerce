import { fastifyPlugin } from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";

import { db, sqlite, type Db } from "database/client.js";

declare module "fastify" {
  interface FastifyInstance {
    db: Db;
  }
}

export const database: FastifyPluginAsync = async (fastify) => {
  fastify.decorate("db", db);
  fastify.addHook("onClose", (instance, done) => {
    sqlite.close();
    done();
  });
};

const databasePlugin = fastifyPlugin(database);

export default databasePlugin;
