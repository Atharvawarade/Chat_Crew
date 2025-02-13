import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import ProfileSection from "./components/ProfileSection/ProfileSection";
import Footer from "./components/Footer/Footer";
import Chatbot from "./components/Chatbot/Chatbot";

const App = () => (
  <div>
    <Header />
    <Hero />
    <ProfileSection />
    <Chatbot />
    <Footer />
  </div>
);

export default App;
