import { fastifyPlugin } from "fastify-plugin";
import { type FastifyPluginAsync } from "fastify";
import { drizzle } from "drizzle-orm/libsql";
import { DefaultLogger } from "drizzle-orm";

import * as schema from "../../database/schema.js";
import { type Db, client } from "../../database/client.js";

declare module "fastify" {
  interface FastifyInstance {
    db: Db;
  }
}

export const database: FastifyPluginAsync = async (fastify) => {
  const logger = new DefaultLogger({
    writer: {
      write(message: string) {
        fastify.log.info(message);
      },
    },
  });

  const db = drizzle(client, { schema, logger });

  fastify.decorate("db", db);
  fastify.addHook("onClose", (_instance, done) => {
    client.close();
    done();
  });
};

const databasePlugin = fastifyPlugin(database);

export default databasePlugin;
