import React, { useEffect, useState } from 'react';
import ProductItem from './ProductItem.jsx';

export default function Products({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

useEffect(() => {
  fetchProducts();
}, []);

function fetchProducts(search = '', sortOrder = 'asc') {
  setLoading(true);
  setError('');
  fetch(`http://localhost:5000/products?search=${search}&sortOrder=${sortOrder}`)
  .then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch products, try again another time. Sorry for the inconvenience!');
    }
    return response.json();
  })
  .then((data) => {
    setProducts(data);
    setLoading(false);
  })
  .catch((error) => {
    setError('Could not load products, try again another time. Sorry for the inconvenience!');
    setLoading(false);
  })
}

function handleSearchSubmit(event) {
  event.preventDefault();
  fetchProducts(search, sortOrder);
}


function addToCart(product) {
  setCart((prevCart) => {
    const itemExists = prevCart.find((item) => item.id === product.id);
    if (itemExists) {
      if (itemExists.quantity >= product.stock) {
        return prevCart;
      }
      return prevCart.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1} : item
    );
    } else {
      if (product.stock > 0) {
        return [...prevCart, {...product, quantity: 1}];
      } else {
        return prevCart;
      }
    }
  })
}

  return (
    <div className="products">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for Products"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading products...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
      <div className="product-list">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} addtoCart={addToCart} />
        ))}
      </div>
      )}
    </div>
  );
};
