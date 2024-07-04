// import React from "react";
// import "../styles/CartItem.css";

// const CartItem = ({ book, onRemove, onChangeQuantity }) => {
//   const { title, price, quantity, amount } = book;

//   const handleRemove = () => {
//     onRemove(book);
//   };

//   const handleQuantityChange = (e) => {
//     const newQuantity = parseInt(e.target.value, 10);
//     if (newQuantity > 0 && newQuantity <= amount) {
//       onChangeQuantity(book.id, newQuantity);
//     }
//   };

//   return (
//     <div className="cart-item">
//       <div>
//         <h3>{title}</h3>
//         <p>Price: ${price.toFixed(2)}</p>
//         <p>
//           Count:{" "}
//           <input
//             type="number"
//             value={quantity}
//             onChange={handleQuantityChange}
//             min="1"
//             max={amount}
//           />
//         </p>
//         <p>Total price: ${(price * quantity).toFixed(2)}</p>
//       </div>
//       <button onClick={handleRemove}>Remove</button>
//     </div>
//   );
// };

// export default CartItem;

// src/components/CartItem.js
import React from "react";
import "../styles/CartItem.css";

const CartItem = ({ book, onRemove, onChangeQuantity }) => {
  const { title, price, quantity, amount } = book;

  const handleRemove = () => {
    onRemove(book);
  };

  const handleIncrease = () => {
    if (quantity < amount) {
      onChangeQuantity(book.id, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      onChangeQuantity(book.id, quantity - 1);
    }
  };

  return (
    <div className="cart-item">
      <div>
        <h3>{title}</h3>
        <p>Price: ${price.toFixed(2)}</p>
        <div className="quantity-controls">
          <button onClick={handleDecrease} disabled={quantity <= 1}>
            -
          </button>
          <span>{quantity}</span>
          <button onClick={handleIncrease} disabled={quantity >= amount}>
            +
          </button>
        </div>
        <p>Total price: ${(price * quantity).toFixed(2)}</p>
      </div>
      <button onClick={handleRemove} className="remove-button">
        Remove
      </button>
    </div>
  );
};

export default CartItem;
