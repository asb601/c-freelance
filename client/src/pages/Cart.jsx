import { useEffect, useState } from "react";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/cart/userId123") // Replace with actual userId
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data.items);
        setTotal(data.total);
      });
  }, []);

  const removeItem = (itemId) => {
    fetch(`/api/cart/${itemId}`, { method: "DELETE" })
      .then(() => setCartItems((items) => items.filter((item) => item.id !== itemId)))
      .then(() => alert("Item removed"));
  };

  const updateQuantity = (itemId, quantity) => {
    fetch(`/api/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ itemId, quantity }),
    }).then(() => {
      // Update the cart in the UI
      setCartItems((items) =>
        items.map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    });
  };

  return (
    <div className="cart">
      <h1>Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.product.images[0]} alt={item.product.name} />
          <h3>{item.product.name}</h3>
          <p>${item.product.price}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
          />
          <button onClick={() => removeItem(item.id)}>Remove</button>
        </div>
      ))}
      <h2>Total: ${total}</h2>
      <button className="checkout">Proceed to Checkout</button>
    </div>
  );
}
