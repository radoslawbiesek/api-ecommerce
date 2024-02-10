import { eq } from "drizzle-orm";

import { db } from "@/database/client";
import { products } from "@/database/schema";

export async function findById(id: number) {
  const results = await db.select().from(products).where(eq(products.id, id));

  return results[0];
}
