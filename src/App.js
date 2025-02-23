import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
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

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const eventImages = [
    'path/to/image1.jpg',
    'path/to/image2.jpg',
    'path/to/image3.jpg',
    // Add more image paths as needed
  ];

  return (
    <div>
      <Header />
      <Hero />
      <Problem/>
      <Solution/>
      <Team/>
      <div><Glimpses images={eventImages} /></div>
      <Footer />

      {/* Chatbot Toggle Button */}
      <div 
        className={`chatbot-toggle ${isChatOpen ? 'active' : ''}`}
        onClick={() => setIsChatOpen(!isChatOpen)}
      >
        {isChatOpen ? (
          <FaTimes className="chat-icon" />
        ) : (
          <FaCommentDots className="chat-icon" />
        )}
      </div>

      {/* Chatbot Overlay Positioned Above */}
      {isChatOpen && (
        <div className="chatbot-container">
          <Chatbot onClose={() => setIsChatOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default App;
