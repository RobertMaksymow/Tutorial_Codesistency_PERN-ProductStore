import React from "react";
const ProductCard = ({ product }) => (
  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
    <figure className="h-48 w-full">
      <img
        src={product.image}
        alt={product.name}
        className="h-full w-full object-cover"
      />
    </figure>

    <h3>{product.name}</h3>
    <p>${product.price}</p>
    <p>{product.description}</p>
  </div>
);

export default ProductCard;
