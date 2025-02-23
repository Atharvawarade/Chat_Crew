import React from 'react';
import './Problem.css';

const Problem = () => {
  return (
    <section className="problem-section">
      <div className="problem-container">
        <div className="problem-content">
          <h1 className="problem-title">Problem Statement</h1>
          <div className="problem-description">
          <h1 className="text-3xl font-bold mb-4">Background</h1>
      <p className="mb-4">
        There are numerous engineering and polytechnic institutes in Rajasthan running under the Department of Technical Education, Government of Rajasthan. Notably, during the admission process, there is a significant increase in inquiries from various groups, including students, their parents, and other stakeholders. These inquiries cover a wide range of queries about the admission process, eligibility criteria, information about different colleges, fee structure (F), curriculum, scholarship, hostel facilities, previous year's college and branch-specific allotment, placement opportunities, and many more. 
      </p>
      <p className="mb-4">
        Currently, stakeholders have to contact colleges individually through phone or email, and sometimes even visit the colleges personally. This process is not only cumbersome for the stakeholders but also demands a pool of manpower for the colleges to manage these inquiries.
      </p>
      
      <h2 className="text-2xl font-bold mt-6 mb-4">Detailed Description</h2>
      <p className="mb-4">
        With the continuous rise in inquiries, it is becoming increasingly difficult for colleges to respond promptly and effectively using traditional communication methods. To address this issue more efficiently and ensure timely assistance for everyone, there is a pressing need to adopt new technological solutions. One effective approach is to develop an AI-powered chatbot at a centralized level that would serve as a virtual assistant, available 24/7 to answer a wide range of questions. 
      </p>
      <p className="mb-4">
        By automating responses to common inquiries, the chatbot would significantly enhance accessibility to important information and allow staff to focus on handling more complex queries and other critical tasks. For example, the chatbot would provide insights into information about various engineering and polytechnic colleges that fall under the jurisdiction of the Department of Technical Education, guide users through the admission processes, explain fee structures, share curriculum updates, provide details about available scholarships, share alumni information, and share information on job placement opportunities, etc. This will empower the technical education department because of the ease of providing information, help, and advice instantly to prospective students, their parents, and all interested parties. All colleges' required information can be easily integrated with ease into software.
      </p>
      
      <h2 className="text-2xl font-bold mt-6 mb-4">Expected Solutions</h2>
      <h3 className="text-xl font-semibold mt-4">1. Efficient Information Retrieval</h3>
      <p className="mb-4">
        The chatbot should rapidly access and provide accurate information from a comprehensive database on topics such as admissions, fees, scholarships, and recommendations based on previous years' cutoffs, minimizing the need for human assistance. Incorporate Natural Language Processing (NLP) to support voice-based assistance in English and extend it to Hindi and other regional languages, ensuring wide accessibility and understanding.
      </p>
      
      <h3 className="text-xl font-semibold mt-4">2. Enhanced User Experience</h3>
      <p className="mb-4">
        Design an intuitive interface that allows users to navigate easily and find information quickly. The interface should be straightforward, accessible on a common platform, and capable of understanding natural language, ensuring user-friendliness.
      </p>
      
      <h3 className="text-xl font-semibold mt-4">3. Reduced Workload</h3>
      <p className="mb-4">
        By automating responses to Frequently Asked Questions (FAQs), the chatbot will reduce the workload on department staff, allowing them to concentrate on more complex and urgent tasks.
      </p>
      
      <h3 className="text-xl font-semibold mt-4">4. Data Insights</h3>
      <p>
        The chatbot will gather valuable data from user interactions, helping the department to identify common concerns and optimize its services based on these insights.
      </p>
          </div>
        </div>

        <div className="problem-image-container">
          <img 
            src="https://i0.wp.com/opportunitycell.com/wp-content/uploads/2022/03/SIH2.png?fit=327%2C345&ssl=1" 
            alt="Digital platform interface"
            className="problem-image"
          />
        </div>
      </div>
    </section>
  );
};

export default Problem;
