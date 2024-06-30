import React from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import "../styles/Cart.css";

const Cart = ({
  cartItems,
  clearCart,
  purchaseEnabled,
  onPurchase,
  onRemove,
  onChangeQuantity,
}) => {
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        <ul>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              book={item}
              onRemove={onRemove}
              onChangeQuantity={onChangeQuantity}
            />
          ))}
        </ul>
      </div>
      <div className="cart-summary">
        <span>Total: ${totalAmount.toFixed(2)}</span>
        <button onClick={onPurchase} disabled={!purchaseEnabled}>
          Purchase
        </button>
        <button onClick={clearCart} className="clear-cart">
          Clear Cart
        </button>
        <Link to="/book-list" className="btn-back-to-books">
          Go back to books
        </Link>
      </div>
    </div>
  );
};

export default Cart;
