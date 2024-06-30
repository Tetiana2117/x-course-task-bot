import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import { Link } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = ({ cartItems, setCartItems }) => {
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [addedItem, setAddedItem] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("CartPage loaded");
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const onPurchase = () => {
    setMessage("Purchase was made!");
    clearCart();
    setShowCartMessage(true);
    setTimeout(() => {
      setShowCartMessage(false);
      setMessage("");
    }, 3000); // Приховати повідомлення за 3 секунди
  };

  const removeItem = (book) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== book.id)
    );
  };

  const handleChangeQuantity = (bookId, newQuantity) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleAddToCart = (book) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === book.id);
      const quantityToAdd = book.quantity || 1;
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [...prevCartItems, { ...book, quantity: quantityToAdd }];
      }
    });
  };

  const purchaseEnabled = cartItems.length > 0;

  return (
    <div className="cart-page">
      {cartItems.length > 0 ? (
        <Cart
          cartItems={cartItems}
          clearCart={clearCart}
          purchaseEnabled={purchaseEnabled}
          onPurchase={onPurchase}
          onRemove={removeItem}
          onChangeQuantity={handleChangeQuantity}
          onAddToCart={handleAddToCart}
        />
      ) : (
        <EmptyCart />
      )}
      {message && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
