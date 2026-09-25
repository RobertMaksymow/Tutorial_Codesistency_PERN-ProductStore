import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import useThemeStore from "./store/useThemeStore.js";

function App() {
  const { theme } = useThemeStore();
  console.log("Current theme in App:", theme); // Debugging line to check the current theme in App
  return (
    <div
      className="min-h-screen bg-base-200 transition-colors duration-500"
      data-theme={theme}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/:id" element={<ProductPage />} />
      </Routes>
    </div>
  );
}

export default App;
