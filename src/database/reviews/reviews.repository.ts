import { type BetterSQLite3Database } from "drizzle-orm/better-sqlite3";
import { avg, desc, eq } from "drizzle-orm";

import { reviewsTable, type Review, type NewReview, productsTable } from "database/schema.js";

export class ReviewsRepository {
  constructor(private readonly db: BetterSQLite3Database) {}

  async findAll(productId: number): Promise<Review[]> {
    return this.db
      .select()
      .from(reviewsTable)
      .where(eq(reviewsTable.productId, productId))
      .orderBy(desc(reviewsTable.createdAt));
  }

  async create(review: NewReview): Promise<Review> {
    const result = await this.db.insert(reviewsTable).values(review).returning();

    // TO DO - merge into one query
    const avgRating = (await this.db
      .select({ value: avg(reviewsTable.rating).as("value") })
      .from(reviewsTable)
      .where(eq(reviewsTable.productId, review.productId))) as unknown as { value: number }[];

    await this.db
      .update(productsTable)
      .set({ rating: avgRating[0].value })
      .where(eq(productsTable.id, review.productId));

    return result[0];
  }
}
