// Цей файл ініціалізує React-додаток, пов'язуючи його з елементом у DOM, до якого він буде прикріплений.

import { StrictMode } from "react";
// Компонент, який допомагає виявляти потенційні проблеми у програмі.

import { createRoot } from "react-dom/client";
// Метод із react-dom/client, який використовується для створення кореневого вузла для рендерингу React-додатка.

import App from "./App";
// Основний компонент програми, який містить всю логіку та інтерфейс користувача.

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
