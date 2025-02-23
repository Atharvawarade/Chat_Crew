import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import Problem from "./components/Problem/Problem";
import Solution from "./components/Solution/Solution";
import Team from "./components/Team/Team";
import Glimpses from "./components/Glimpses/Glimpses";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      <Header />
      <div id="hero" >
        <Hero />
      </div>
      <div id="problem">
        <Problem />
      </div>
      <div id="solution" >
        <Solution />
      </div>
      <div id="team">
        <Team />
      </div>
      <div id="glimpses">
        <Glimpses />
      </div>
      <Footer />

      {/* Chatbot Toggle Button */}
      <div
        className="chatbot-toggle"
        onClick={() => setIsChatOpen((prev) => !prev)}
      >
        {isChatOpen ? (
          <FaTimes className="chat-icon" />
        ) : (
          <FaCommentDots className="chat-icon" />
        )}
      </div>

      {/* Chatbot Container */}
      {isChatOpen && (
        <div className="chatbot-overlay">
          <Chatbot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
