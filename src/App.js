// Містить основний шаблон та маршрути програми.
// Тут імпортуються необхідні бібліотеки та компоненти, які будуть використовуватись у додатку.
import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import SignIn from "./components/SignIn";
import SpecificBook from "./components/SpecificBook";
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

  React.useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUsername = localStorage.getItem("username");
    setIsLoggedIn(loggedIn);
    setUsername(storedUsername || "");
  }, []);

  const handleSignIn = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("username", username);
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setUsername("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");
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
    <Router>
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
              isLoggedIn ? (
                <Navigate to="/book-list" />
              ) : (
                <SignIn
                  setIsLoggedIn={setIsLoggedIn}
                  setUsernameGlobal={setUsername}
                />
              )
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
    </Router>
  );
};

const HeaderSelector = ({ isLoggedIn, username, onSignOut, cartItems }) => {
  const location = useLocation();

  return location.pathname === "/" ? (
    <HeaderLogin />
  ) : (
    <HeaderDefault
      username={username}
      avatarUrl="/img/user.png"
      onSignOut={onSignOut}
      cartItems={cartItems}
    />
  );
};

export default App;
