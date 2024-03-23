import { asc, desc, type SQL } from "drizzle-orm";

import { type Product, type NewProduct, productsTable } from "./products.schema.js";

export type ProductWithVariants = Omit<Product, "variants"> & { variants: string[] };
export type NewProductWithVariants = Omit<NewProduct, "variants"> & { variants: string[] };

export function getOrdering(ordering?: string): SQL {
  switch (ordering) {
    case "-price":
      return desc(productsTable.price);
    case "price":
      return asc(productsTable.price);
    case "-rating":
      return desc(productsTable.rating);
    case "rating":
      return asc(productsTable.rating);
    case "name":
      return asc(productsTable.name);
    case "-name":
      return desc(productsTable.name);
  }

  return desc(productsTable.createdAt);
}

export function parseVariants(product: Product): ProductWithVariants {
  let variants: string[] = [];
  if (product.variants) {
    try {
      variants = JSON.parse(product.variants) as string[];
    } catch {}
  }

  return {
    ...product,
    variants,
  };
}
