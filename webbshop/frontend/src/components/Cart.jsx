import React, { useState } from 'react';
import ThanksMessage from './ThanksMessage.jsx';

 export default function Cart({ cart, setCart, setCurrentPage }) {
  const [showThanks, setShowThanks] = useState(false);
  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  function completePurchase() {
    fetch('http://localhost:5000/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cart),
    }).then(() => {
      setShowThanks(true);
      emptyCartShowThanks();
    });
  };

  function emptyCart() {
    setCart([]);
    setCurrentPage('products');
  };

  function emptyCartShowThanks() {
    setCart([]);
  };

  return (
    <div className="cart">
      {showThanks ? (
        <ThanksMessage />
      ) : (
        <>
          <h2>Your Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id}>
                  <p>
                    {item.name} x {item.quantity} (${item.price * item.quantity})
                  </p>
                </div>
              ))}
              <h3>Total: ${totalCost}</h3>
              <button onClick={completePurchase}>Complete Purchase</button>
              <button onClick={emptyCart}>Empty Cart</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};