import React, { useEffect } from "react";
import useProductStore from "../store/useProductStore.js";
import { PackageIcon, PlusCircleIcon, RefreshCcw } from "lucide-react";
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

      {products.length === 0 && !loading && !error && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-10 text-gray-400" />
          </div>
          <div className="text-gray-500 text-lg">No products available.</div>
          <div className="text-gray-400 text-sm">
            Click the "Add Product" button to create a new product.
          </div>
        </div>
      )}

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
