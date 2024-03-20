import { desc, eq, sql } from "drizzle-orm";

import { reviewsTable, type Review, type NewReview } from "../schema.js";
import { type Db } from "../client.js";

export class ReviewsRepository {
  constructor(private readonly db: Db) {}

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

      await tx.run(
        sql`UPDATE products SET rating = (SELECT AVG(rating) FROM reviews WHERE product_id = ${review.productId}) WHERE id = ${review.productId}`,
      );

      return result[0];
    });

    if (!newReview) {
      throw new Error("Failed to create review");
    }

    return newReview;
  }
}
