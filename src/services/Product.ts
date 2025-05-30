import { BASE_URL } from "../config";

export const ProductAPI = {
  getAllProducts: async () => {
    console.log("getting All products")
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
    console.log("getting by category")
    const res = await fetch(`${BASE_URL}/products/category/${category}`);
    const data = await res.json();
    return data.products;
  }
};
