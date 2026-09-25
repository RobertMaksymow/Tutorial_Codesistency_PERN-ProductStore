import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("preferredTheme") || "forest",
  setTheme: (theme) => {
    localStorage.setItem("preferredTheme", theme);
    set({ theme });
  },
}));

export default useThemeStore;
