// Цей файл використовується для умовного рендерингу різних версій заголовка,
// залежно від стану входу користувача(авторизований чи ні).

import React from "react";
import HeaderLogin from "./HeaderLogin";
import HeaderDefault from "./HeaderDefault";
import Footer from "./Footer";

const Layout = ({ isLoggedIn, children }) => {
  return (
    <div>
      {isLoggedIn ? <HeaderLogin /> : <HeaderDefault />}
      {children}
    </div>
  );
};

export default Layout;
