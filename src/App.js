// Містить основний шаблон та маршрути програми.
// Тут імпортуються необхідні бібліотеки та компоненти, які будуть використовуватись у додатку.
import React from "react";
import {
  // BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
  HashRouter,
} from "react-router-dom";
import SignIn from "./components/SignIn";
// import Layout from "./components/Layout";
import SpecificBook from "./components/SpecificBook";
import userAvatar from "./images/user.png";
import BookList from "./components/BookList";
import CartPage from "./components/CartPage";
import HeaderLogin from "./components/HeaderLogin";
import HeaderDefault from "./components/HeaderDefault";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [cartItems, setCartItems] = React.useState([]);

  const handleSignIn = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    setCartItems([]);
  };

  const addToCart = (book) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === book.id);
      if (existingItem) {
        return prevCartItems.map((item) =>
          item.id === book.id
            ? { ...item, quantity: item.quantity + book.quantity }
            : item
        );
      } else {
        return [...prevCartItems, { ...book, quantity: book.quantity }];
      }
    });
  };

  return (
    <HashRouter>
      <HeaderSelector
        isLoggedIn={isLoggedIn}
        username={username}
        onSignOut={handleSignOut}
        cartItems={cartItems}
      />
      <div className="main-content">
        <Routes>
          <Route
            path="/"
            element={
              <SignIn
                setIsLoggedIn={setIsLoggedIn}
                setUsernameGlobal={setUsername}
              />
            }
          />
          <Route
            path="/book-list"
            element={
              isLoggedIn ? (
                <BookList addToCart={addToCart} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/specific-book/:id"
            element={
              isLoggedIn ? (
                <SpecificBook addToCart={addToCart} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <CartPage cartItems={cartItems} setCartItems={setCartItems} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </HashRouter>
  );
};

const HeaderSelector = ({ isLoggedIn, username, onSignOut, cartItems }) => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <HeaderLogin />
  ) : (
    <HeaderDefault
      username={username}
      avatarUrl={userAvatar}
      onSignOut={onSignOut}
      cartItems={cartItems}
    />
  );
};

export default App;
