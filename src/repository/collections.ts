import { eq } from "drizzle-orm";
import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";

import { type Collection, type NewCollection, collectionsTable } from "database/schema.js";

export class CollectionsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async create(collection: NewCollection): Promise<Collection> {
    const result = await this.db.insert(collectionsTable).values(collection).returning();

    return result[0];
  }

  async findAll(): Promise<Collection[]> {
    return this.db.select().from(collectionsTable);
  }

  async findById(id: number): Promise<Collection | undefined> {
    const result = await this.db.select().from(collectionsTable).where(eq(collectionsTable.id, id));

    return result[0];
  }

  async findBySlug(slug: string): Promise<Collection | undefined> {
    const result = await this.db.select().from(collectionsTable).where(eq(collectionsTable.slug, slug));

    return result[0];
  }

  async update(id: number, collection: NewCollection): Promise<Collection> {
    const result = await this.db
      .update(collectionsTable)
      .set(collection)
      .where(eq(collectionsTable.id, id))
      .returning();

    return result[0];
  }

  async delete(id: number): Promise<Collection> {
    const result = await this.db.delete(collectionsTable).where(eq(collectionsTable.id, id)).returning();

    return result[0];
  }
}
