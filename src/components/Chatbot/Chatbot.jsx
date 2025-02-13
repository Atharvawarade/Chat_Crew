import React, { useState } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [chatActive, setChatActive] = useState(false);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { text: userMessage, type: "user" }];
    setMessages(newMessages);
    setUserMessage("");

    try {
      const response = await fetch("http://localhost:5000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userMessage }),
      });
      const data = await response.json();
      setMessages([...newMessages, { text: data.response, type: "bot" }]);
    } catch (error) {
      setMessages([...newMessages, { text: "Error processing your request.", type: "bot" }]);
    }
  };

  return (
    <div className={`chatbot-container ${chatActive ? "active" : ""}`}>
      <div className="chatbot-header">
        <span className="chatbot-title">Student Assistance Chatbot</span>
        <button className="btn-close" onClick={() => setChatActive(!chatActive)}></button>
      </div>

      <div className="chatbot-body">
        {messages.map((msg, index) => (
          <div key={index} className={`chat-message ${msg.type}-message`}>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="chatbot-footer">
        <input
          type="text"
          className="form-control"
          placeholder="Ask your query"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="btn btn-primary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
