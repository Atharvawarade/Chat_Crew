import React from "react";
import Lottie from "react-lottie";
import animationData from "../../Animation - 1739523785292.json"; // Your Lottie file
import "./Hero.css";

const Hero = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-animation">
          <Lottie options={defaultOptions} />
        </div>
        <div className="hero-content">
          <h1>AI-Powered Student Assistance Chatbot</h1>
          <p className="hero-subtext">
          A Smart India Hackathon (SIH) 2024 project by Team Chat Crew, this chatbot streamlines student inquiries for the Department of Technical Education, Rajasthan, offering instant AI-powered responses on admissions, fees, scholarships, and more.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Programs</button>
            <button className="btn-secondary">Admission Open</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;