import React, { useState, useEffect } from "react";
import Cart from "../components/Cart";
import EmptyCart from "../components/EmptyCart";
import "../styles/CartPage.css";
import { sendTelegramMessage } from "../utils/telegram";

const CartPage = ({ cartItems, setCartItems, userName }) => {
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("CartPage loaded");
  }, []);

  const clearCart = () => {
    setCartItems([]);
  };

  const onPurchase = async () => {
    const orderDetails = cartItems
      .map(
        (item) =>
          `*Title:* ${item.title}\n*Count:* ${item.quantity}\n*Price:* ${item.price} $`
      )
      .join("\n\n");

    const totalAmount = cartItems
      .reduce((total, item) => total + item.quantity * item.price, 0)
      .toFixed(2); // Округлення  після коми

    const messageContent = `A new order has arrived from User: *${userName}*:\n\n${orderDetails}\n\n*Total price:* ${totalAmount}$`;

    setMessage("Your order has been processed!");
    clearCart();
    setShowCartMessage(true);

    try {
      await sendTelegramMessage(messageContent, "Markdown"); // синтаксис форматування
      console.log("Message sent to Telegram");
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setTimeout(() => {
      setShowCartMessage(false);
      setMessage("");
    }, 3000);
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
      {showCartMessage && (
        <div className="message">
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default CartPage;
