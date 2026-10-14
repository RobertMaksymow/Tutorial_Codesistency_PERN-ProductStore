import { create } from "zustand";
import axios from "axios";
import { toast } from "react-hot-toast";

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
          error:
            "Rate limit exceeded. Too many requests. Please try again later.",
          loading: false,
          products: [],
        });
      } else {
        set({ error: error.message, loading: false });
      }
    } finally {
      set({ loading: false });
    }
  },

  deleteProduct: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${BASE_URL}/api_v1/products/${id}`);
      const updatedProducts = get().products.filter(
        (product) => product.id !== id,
      );
      set({ products: updatedProducts, loading: false });
      toast.success("Product deleted successfully.");
    } catch (error) {
      set({ error: error.message, loading: false });
      toast.error("Failed to delete product. Please try again.");
    }
  },
}));

export default useProductStore;
