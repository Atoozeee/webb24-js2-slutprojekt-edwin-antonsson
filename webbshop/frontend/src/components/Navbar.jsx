import React from 'react';

export default function Navbar({ setCurrentPage, cartCount }) {
  return (
    <nav className="navbar">
      <button onClick={() => setCurrentPage('products')}>Products</button>
      <button onClick={() => setCurrentPage('cart')}>Cart ({cartCount})</button>
    </nav>
  );
};



