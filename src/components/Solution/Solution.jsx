import React from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import "./Solution.css";

const Solution = () => {
  return (
    <section className="solutions-section">
      <div className="solutions-container">
        <div className="solutions-header" data-aos="fade-up">
          <h2 className="section-title">Our Innovative Solution</h2>
          <p className="section-subtitle">
            Introducing our AI-Powered Chatbot, a cutting-edge <strong>Retrieval Augmented Generation (RAG)
            </strong> solution powered by <strong>Google Gemini’s API</strong>, delivering an impressive <strong>95% accuracy</strong> 
            in contextually relevant responses! Designed with an engaging <strong>React.js UI</strong>, it offers seamless <strong>voice 
              and image capabilities</strong>, earning a stellar <strong>4.8/5</strong> user satisfaction score. The system is divided 
              into two parts: Admin Panel & Chatbot. The Admin Panel, used by the Department of Technical Education Rajasthan and college 
              administrators, empowers them to monitor and manage Firebase, the knowledge hub for student queries. Meanwhile, the Chatbot, 
              tailored for students and parents, ensures instant and accurate responses, simplifying admissions, scholarships, and placement 
              inquiries. With an intuitive interface and real-time updates, our solution redefines student assistance, making information 
              smarter, faster, and more accessible than ever!
          </p>
        </div>

        <div className="solution-cards" >
          {/* Admin Panel Card */}
          <div className="solution-card" data-aos="fade-right">
            <div className="card-content">
              <h3 className="card-title">Admin Panel</h3>
              <p className="card-description">
              With the Admin Panel, the Department of Technical Education Rajasthan can effortlessly register new colleges, provide them 
              with secure credentials, and monitor data uploads. College Admins can update their profiles and seamlessly manage 
              essential information, including admission details, fee structures, scholarships, placements, curriculum, and infrastructure. 
              They also have the flexibility to regularly update information, ensuring accuracy, reliability, and up-to-date insights for students
               and parents.
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
          <div className="solution-card" data-aos="fade-left">
            <div className="card-content">
              <h3 className="card-title">Chatbot</h3>
              <p className="card-description">
                With our AI-powered Chatbot, students can ask any admission-related queries and receive accurate, easy-to-understand answers 
                instantly! If a query lacks enough details, the chatbot intelligently asks follow-up questions to provide the most 
                relevant response. It can even recommend colleges based on the provided data and showcase images of the institutions 
                students are inquiring about, making the decision-making process smoother and more interactive!
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
                  href="https://student-assistance-chatbot-chatcrew.netlify.app/"
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
