import React, { useEffect, useState } from "react";
import "./Header.css";

const Header = () => {
  const [scrollWidth, setScrollWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollWidth(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Function to handle smooth scrolling
  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const offset = 70; // Adjust this based on your fixed navbar height
      const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg fixed-top custom-navbar">
        <div className="container">
          <a className="navbar-brand logo" href="/">
            <img src="/images/logo.png" alt="Logo" className="navbar-logo" />
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="#hero" onClick={(e) => handleNavClick(e, "hero")}>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#problem" onClick={(e) => handleNavClick(e, "problem")}>Problem Statement</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#solution" onClick={(e) => handleNavClick(e, "solution")}>Solution</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#team" onClick={(e) => handleNavClick(e, "team")}>Team</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#glimpses" onClick={(e) => handleNavClick(e, "glimpses")}>Glimpses</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress" style={{ width: `${scrollWidth}%` }}></div>
    </>
  );
};

export default Header;
