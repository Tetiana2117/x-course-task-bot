import React from "react";
import { useNavigate } from "react-router-dom";
import emptyCartImage from "../images/empty-cart.png";
import "../styles/EmptyCart.css";

const EmptyCart = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/book-list");
  };

  return (
    <div className="empty-cart">
      <div className="container-cart">
        <img
          src={emptyCartImage}
          alt="Empty Cart"
          className="empty-cart-image"
        />
      </div>
      <p className="empty-cart-text">Your cart is empty</p>
      <button className="go-back-button" onClick={handleGoBack}>
        Go back to books
      </button>
    </div>
  );
};

export default EmptyCart;
