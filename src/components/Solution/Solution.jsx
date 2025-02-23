import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import "./Solution.css";

const Solution = () => {
  return (
    <section className="solutions-section">
      <div className="solutions-container">
        <div className="solutions-header">
          <h2 className="section-title">Our Innovative Solution</h2>
          <p className="section-subtitle">
            Revolutionizing the way you interact with technology Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Reprehenderit modi
            iusto rerum quaerat quis excepturi facere nihil aut, iure
            repudiandae repellat laboriosam voluptatem, accusantium dolores ipsa
            perspiciatis! Fuga, consequuntur aliquam.
          </p>
        </div>

        <div className="solution-cards">
          {/* Admin Panel Card */}
          <div className="solution-card">
            <div className="card-content">
              <h3 className="card-title">Admin Panel</h3>
              <p className="card-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo maxime repellendus tenetur.
              </p>

              {/* Built With Section */}
              <p className="built-with-text">Built with:</p>
              <div className="built-with-icons">
                <i className="devicon-html5-plain-wordmark"></i>
                <i className="devicon-css3-plain-wordmark"></i>
                <i className="devicon-javascript-plain"></i>
                <i className="devicon-firebase-plain"></i>
                <i className="devicon-vercel-original"></i>
              </div>

              <div className="button-container">
                <a
                  href="https://chatbot-admin-ochre.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-button"
                >
                  <FiExternalLink className="button-icon" />
                  View Live Demo
                </a>
                <a
                  href="https://github.com/Atharvawarade/Chat_Crew_Admin.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                >
                  <FiGithub className="button-icon" />
                  View on GitHub
                </a>
              </div>
            </div>
          </div>

          {/* Chatbot Card */}
          <div className="solution-card">
            <div className="card-content">
              <h3 className="card-title">Chatbot</h3>
              <p className="card-description">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Explicabo maxime repellendus tenetur.
              </p>

              {/* Built With Section */}
              <p className="built-with-text">Built with:</p>
              <div className="built-with-icons">
                <i className="devicon-react-original"></i>
                <i className="devicon-nodejs-plain-wordmark"></i>
                <i className="devicon-python-plain"></i>
                <i className="devicon-flask-original"></i>
                <i className="devicon-npm-original-wordmark"></i>
                <i className="devicon-firebase-plain"></i>
                <i className="devicon-netlify-plain"></i>
              </div>

              <div className="button-container">
                <a
                  href="https://your-chatbot-live-demo-link.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="demo-button"
                >
                  <FiExternalLink className="button-icon" />
                  Live
                </a>
                <a
                  href="https://github.com/Atharvawarade/Chat_Crew.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                >
                  <FiGithub className="button-icon" />
                  Frontend
                </a>
                <a
                  href="https://github.com/Atharvawarade/Chat_Crew_Backend.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-button"
                >
                  <FiGithub className="button-icon" />
                  Backend
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solution;
