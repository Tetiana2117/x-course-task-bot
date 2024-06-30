import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImage from "../images/avatar.png";
import eyeIcon from "../images/eye-icon.png";
import eyeSlashIcon from "../images/eye-slash-icon.png";
import "../styles/SignIn.css";

const SignIn = ({ setIsLoggedIn, setUsernameGlobal }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting form...");

    let isValid = true;

    if (username.length < 4 || username.length > 16) {
      setUsernameError("The username must contain from 4 to 16 characters");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Please enter your password");
      isValid = false;
    } else if (password.length < 8) {
      setPasswordError("The password must contain at least 8 characters");
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      setPasswordError(
        "Your password must contain at least one uppercase and one lowercase letter"
      );
      isValid = false;
    } else if (!/[^a-zA-Z0-9]/.test(password)) {
      setPasswordError(
        "The password must contain at least one special character"
      );
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      setIsLoggedIn(true);
      setUsernameGlobal(username);
      localStorage.setItem("username", username);
      navigate("/book-list");
    }
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
    setUsernameError("");
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="form-wrapper">
        <img src={avatarImage} alt="User Avatar" className="form-avatar" />
        {username && <p className="user-name">{username}</p>}
        <form className="signin-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input-name-field"
            value={username}
            onChange={handleChangeUsername}
            id="username"
          />
          {usernameError && (
            <p className="error-signin-message">{usernameError}</p>
          )}
          <div className="password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={handleChangePassword}
              id="password"
            />
            <img
              src={showPassword ? eyeIcon : eyeSlashIcon}
              alt="Toggle Password Visibility"
              className="eye-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && (
            <p className="error-signin-message">{passwordError}</p>
          )}
          <button type="submit" className="signin-button">
            Sign-In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
