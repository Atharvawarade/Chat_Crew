import React from "react";
import "./Header.css";

const Header = () => (
  <header className="header">
    <div className="header-content">
      <div className="logo">Technical Education Department</div>
      <nav>
        <ul className="nav-list">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About Us</a></li>
          <li><a href="#courses">Admissions</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
