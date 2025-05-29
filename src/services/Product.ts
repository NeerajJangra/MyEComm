import { BASE_URL } from "../config";

export const ProductAPI = {
  getAllProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();
    return data.products;
  },

  getCategories: async () => {
    const res = await fetch(`${BASE_URL}/products/categories`);
    const data = await res.json();
    return data;
  },

  getProductsByCategory: async (category: string) => {
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await res.json();
    return data.products;
  }
};
