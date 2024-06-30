import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/HeaderDefault.css";

const HeaderDefault = ({ username, avatarUrl, onSignOut, cartItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("HeaderDefault loaded");
  }, []);

  const handleSignOut = () => {
    if (typeof onSignOut === "function") {
      onSignOut();
    }
    navigate("/");
  };

  const totalCartItems = cartItems
    ? cartItems.reduce((total, item) => total + item.quantity, 0)
    : 0;

  return (
    <header className="header-default">
      <div className="header-content">
        <h2>JS BAND STORE / Besshchastna Tetiana</h2>
        <nav className="header-nav">
          <Link to="/cart">
            <FaShoppingCart className="cart-icon" />
            {totalCartItems > 0 && (
              <span className="cart-count">{totalCartItems}</span>
            )}
          </Link>
          <button className="sign-out-button" onClick={handleSignOut}>
            Sign-out
          </button>
          <div className="user-info">
            <img src={avatarUrl} alt="User Avatar" className="header-avatar" />
            {username && <span className="username">{username}</span>}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderDefault;
