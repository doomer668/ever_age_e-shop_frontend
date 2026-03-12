import { createContext } from "react";
import type { Product } from "../data/products";

export type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);
