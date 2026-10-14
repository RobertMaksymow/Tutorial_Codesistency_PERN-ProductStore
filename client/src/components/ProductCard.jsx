import React from "react";
import { Link } from "react-router-dom";
import { EditIcon, Trash2Icon } from "lucide-react";
import useProductStore from "../store/useProductStore.js";

const ProductCard = ({ product }) => {
  const { deleteProduct } = useProductStore();

  return (
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      <figure className="h-48 w-full">
        <img
          src={product.image}
          alt={product.name}
          className="top-0 left-0 h-full w-full  object-cover"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title text-lg font-semibold">{product.name}</h3>
        <p className="text-2xl font-bold text-primary">
          ${Number(product.price).toFixed(2)}
        </p>
        <p>{product.description}</p>
      </div>

      <div className="card-actions justify-end mt-4">
        <Link
          to={`/products/${product.id}`}
          className="btn btn-sm btn-outline btn-info"
        >
          <EditIcon className="size-4" />
          View Details
        </Link>
        <button
          className="btn btn-sm btn-error"
          onClick={() => useProductStore.getState().deleteProduct(product.id)}
        >
          <Trash2Icon className="size-4" />
        </button>
        <button className="btn btn-sm btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;
