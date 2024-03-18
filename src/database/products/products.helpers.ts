import { asc, desc, type SQL } from "drizzle-orm";

import { type Product, type NewProduct, productsTable } from "../schema.js";

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

export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFKD") //for example è decomposes to as e +  ̀
    .replace(/[\u0300-\u036F]/g, "") // removes combining marks
    .replace(/ /g, "-") // replaces spaces with hyphens
    .replace(/[^\w.-]+/g, ""); // removes all non-word characters except for dots and hyphens
}
