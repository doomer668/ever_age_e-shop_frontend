import type { Product } from "../data/products";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173/api";

export const productApi = {
  async getAll(): Promise<Product[]> {
    const response = await fetch(`${API_BASE_URL}/items/all`);
    if (!response.ok) {
      const error = await response.text();
      console.error("API Error:", response.status, error);
      throw new Error(`Failed to fetch products: ${response.status}`);
    }
    return response.json();
  },
  
  async getById(id: string): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/items/${id}`);
    if (!response.ok) {
      const error = await response.text();
      console.error("API Error:", response.status, error);
      throw new Error(`Product not found: ${response.status}`);
    }
    return response.json();
  },
};