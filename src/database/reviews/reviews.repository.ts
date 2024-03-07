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
    const newReview = await this.db.transaction(async (tx) => {
      const result = await tx.insert(reviewsTable).values(review).returning();

      if (!result[0]) {
        tx.rollback();
        return;
      }

      const avgRating = (await this.db
        .select({ value: avg(reviewsTable.rating).as("value") })
        .from(reviewsTable)
        .where(eq(reviewsTable.productId, review.productId))) as unknown as { value: number }[];

      if (avgRating[0]) {
        await this.db
          .update(productsTable)
          .set({ rating: avgRating[0].value })
          .where(eq(productsTable.id, review.productId));
      }

      return result[0];
    });

    if (!newReview) {
      throw new Error("Failed to create review");
    }

    return newReview;
  }
}
