import { create } from "zustand";
import axios from "axios";

const BASE_URL = "http://localhost:5000";

const useProductStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/api_v1/products`);
      set({ products: response.data.data, loading: false });
    } catch (error) {
      if (error.status === 429) {
        set({
          error: "Too many requests. Please try again later.",
          loading: false,
        });
      } else {
        set({ error: error.message, loading: false });
      }
    } finally {
      set({ loading: false });
    }
  },
}));

export default useProductStore;
