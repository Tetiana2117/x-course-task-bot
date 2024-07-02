const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

const booksFilePath = path.join(__dirname, "books.json");

// Обработчик маршрута для получения списка книг
app.get("/books", (req, res) => {
  fs.readFile(booksFilePath, (err, data) => {
    if (err) {
      console.error("Error reading books.json file:", err);
      res.status(500).json({ error: "Failed to read books data" });
      return;
    }

    try {
      const booksData = JSON.parse(data);
      res.json(booksData);
    } catch (error) {
      console.error("Error parsing books.json file:", error);
      res.status(500).json({ error: "Failed to parse books data" });
    }
  });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
