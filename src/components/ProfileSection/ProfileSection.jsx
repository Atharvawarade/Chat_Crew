import React from "react";
import "./ProfileSection.css";

const ProfileSection = () => {
  const profiles = [
    { name: "Shri Bhajan Lal Sharma", role: "Chief Minister", image: "image1.jpg" },
    { name: "Dr. Prem Chand Bairwa", role: "Deputy Minister", image: "image2.jpg" },
    { name: "Dr. Arushi Ajey Malik", role: "Secretary", image: "image3.jpg" },
    { name: "Shri Anshu Kumar Sahgal", role: "Director", image: "image4.jpg" }
  ];

  return (
    <section className="profile-section">
      {profiles.map((profile, index) => (
        <div className="card" key={index}>
          <img src={`/static/images/${profile.image}`} alt={profile.role} className="card-img-top" />
          <div className="card-body">
            <h3 className="card-title">{profile.role}</h3>
            <p className="card-text">{profile.name}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProfileSection;
