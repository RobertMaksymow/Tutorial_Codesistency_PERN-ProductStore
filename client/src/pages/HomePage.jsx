import React, { useEffect } from "react";
import useProductStore from "../store/useProductStore.js";
import { PlusCircleIcon, RefreshCcw } from "lucide-react";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { products, loading, error, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Products in HomePage:", products); // Debugging line to check the products state in HomePage

  // if (loading) return <div>Loading...</div>;
  // if (error)
  //   return <div className="alert alert-error mb-8">Error: {error}</div>;

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      <h1>THIS IS THE HOME PAGE</h1>
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary">
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCcw className="size-5" />
        </button>
      </div>

      {error && <div className="alert alert-error mb-8">Error: {error}</div>}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default HomePage;
