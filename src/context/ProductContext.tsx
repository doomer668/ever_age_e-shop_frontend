import React, { createContext, useContext, useEffect, useState } from "react";
import type { Product } from "../data/products";
import { productApi } from "../services/api";

type ProductContextType = {
  products: Product[];
  loading: boolean;
  error: string | null;
  getProductById: (id: string) => Product | undefined;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productApi.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const getProductById = (id: string) => products.find(p => p.uuid === id);

  return (
    <ProductContext.Provider value={{ products, loading, error, getProductById }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider");
  }
  return context;
};
