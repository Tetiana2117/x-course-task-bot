import React from "react";
import "../styles/Footer.css";

const Footer = () => (
  <footer className="footer">
    <p>
      Виконано в{" "}
      <a
        href="https://prometheus.org.ua/"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        Prometheus
      </a>{" "}
      © 2024
    </p>
  </footer>
);

export default Footer;
