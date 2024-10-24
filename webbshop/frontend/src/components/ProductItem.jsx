import React from "react";

export default function ProductItem({ product, addtoCart }) {
    return (
        <div className="product">
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name}/>
            <p>${product.price}</p>
            <p>In stock: {product.stock}</p>
            <button onClick={() => addtoCart(product)} disabled={product.stock <= 0}>
                Add to Cart
            </button>
        </div>
    );
};