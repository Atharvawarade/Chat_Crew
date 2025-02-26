import React, { useState, useEffect, useRef } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Chatbot.css";
import { processResponse } from "./utils";


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [chatStarted, setChatStarted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = async (message) => {
    if (!message.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { text: message, type: "user" },
    ]);
    setUserMessage("");
    setIsTyping(true);
    setShowSuggestions(false);

    try {
      const response = await fetch("https://chat-crew-backend.onrender.com/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message }),
      });
      const data = await response.json();

      // Process the response to separate text and image links.
      const { text, imageLinks } = processResponse(data.response);

      setMessages((prevMessages) => [
        ...prevMessages,
        { text, type: "bot", imageLinks },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error processing your request.", type: "bot" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const fetchVoiceInput = async () => {
    setIsListening(true);
    try {
      const response = await fetch("https://chat-crew-backend.onrender.com/voice-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (data.success) {
        sendMessage(data.text);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Voice input error: " + data.message, type: "bot" },
        ]);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Error fetching voice input.", type: "bot" },
      ]);
    } finally {
      setIsListening(false);
    }
  };

  const renderMessageContent = (msg) => {
  // Regex to identify YouTube embed links


  if (msg.type === "bot") {
    // If text is empty and there are image links, show only the images
    if (!msg.text && msg.imageLinks && msg.imageLinks.length > 0) {
      return (
        <div>
          {msg.imageLinks.map((link, idx) => (
            <img
              key={idx}
              src={link}
              alt={`Image ${idx + 1}`}
              className="image-preview"
            />
          ))}
        </div>
      );
    }

    // If there is text and possibly images, display both (text and image previews)
    let cleanText = msg.text || "";
    if (msg.imageLinks && msg.imageLinks.length > 0) {
      msg.imageLinks.forEach((link) => {
        cleanText = cleanText.replace(link, "").trim();
      });
    }

    return (
      <div>
        {cleanText && <div className="bubble">{cleanText}</div>}
        {msg.imageLinks &&
          msg.imageLinks.map((link, idx) => (
            <img
              key={idx}
              src={link}
              alt={`Image ${idx + 1}`}
              className="image-preview"
            />
          ))}
      </div>
    );
  }

  // Render user messages directly
  return <div className="bubble">{msg.text}</div>;
};

  
  

  return (
    <div className="chatbot-wrapper">
      {!chatStarted ? (
        <div className="welcome-screen animate-in">
          <Player
            autoplay
            loop
            src="./animations/Animation - 1739523785292.json"
            style={{ height: "200px", width: "200px" }}
          />
          <div className="welcome-content">
            <h1>Welcome to DTE Rajasthan! 👋</h1>
            <p>
              I'm your virtual assistant, here to help you with engineering and
              polytechnic admissions in Rajasthan.
            </p>
            <button className="start-btn" onClick={() => setChatStarted(true)}>
              Start Chat
            </button>
          </div>
        </div>
      ) : (
        <div className="chat-container animate-in">
          <div className="chat-header">
            <div className="header-content">
              <div className="bot-avatar">🎓</div>
              <div className="header-text">
                <h3>Admission Assistant</h3>
                <p>Online</p>
              </div>
            </div>
            <button className="close-btn" onClick={() => setChatStarted(false)}>
              ×
            </button>
          </div>

          {/* Suggestion Question Boxes */}
          {showSuggestions && (
            <div className="suggestions-container" >
              <div className="row g-3 px-3">
                <div className="col-md-6 col-12">
                  <div
                    
                    className="suggestion-box p-1 "
                    onClick={() => sendMessage("Can I apply online?")}
                  >
                    <i className="bi bi-question-circle"></i> Can I apply
                    online?
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div
                    className="suggestion-box p-1 "
                    onClick={() => sendMessage("What is the fees?")}
                  >
                    <i className="bi bi-list-check"></i> What is the fees?
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div
                    className="suggestion-box p-1 "
                    onClick={() =>
                      sendMessage("What is the last date for admission?")
                    }
                  >
                    <i className="bi bi-calendar-event"></i> What is the last
                    date for admission?
                  </div>
                </div>
                <div className="col-md-6 col-12">
                  <div
                    className="suggestion-box p-1 "
                    onClick={() => sendMessage("What are required documents?")}
                  >
                    <i className="bi bi-file-earmark-text"></i> What are
                    required documents?
                  </div>
                </div>
                <div className="col-12 text-center">
                  <div
                    className="suggestion-box p-1 d-inline-block mb-4"
                    onClick={() => sendMessage("What is eligibility criteria?")}
                  >
                    <i className="bi bi-globe"></i> What is eligibility
                    criteria?
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message-container ${msg.type}`}>
                <div className={`message ${msg.type}`}>
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-container bot">
                <div className="message bot">
                  <div className="bubble thinking-animation">
                    <Player
                      autoplay
                      loop
                      speed={1.5}
                      src="/animations/Animation - 1739472719231.json"
                      style={{ height: "60px", width: "100px" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input">
            <button
              className={`mic-btn ${isListening ? "active" : ""}`}
              onClick={fetchVoiceInput}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-mic"
                viewBox="0 0 16 16"
              >
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5" />
                <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3" />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type your message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage(userMessage)}
            />
            <button
              className="send-btn"
              onClick={() => sendMessage(userMessage)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-send"
                viewBox="0 0 16 16"
              >
                <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
