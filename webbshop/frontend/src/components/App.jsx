import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import Products from './Products.jsx';
import Cart from './Cart.jsx';

export function App() {
  const [currentPage, setCurrentPage] = useState('products');
  const [cart, setCart] = useState([]);

  return (
    <div>
      <Navbar setCurrentPage={setCurrentPage} cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} />
      {currentPage === 'products' && <Products cart={cart} setCart={setCart} />}
      {currentPage === 'cart' && <Cart cart={cart} setCart={setCart} setCurrentPage={setCurrentPage} />}
    </div>
  );
};
