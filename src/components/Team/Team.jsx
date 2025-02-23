import React from 'react';
import './Team.css'; // Create this CSS file
import AnujaImage from '../../assets/Anuja.jpeg';
import AtharvaImage from '../../assets/Atharva.jpg';
import HarshalImage from '../../assets/Harshal.jpg';
import SharayuImage from '../../assets/Sharayu.jpg';
import AftabImage from '../../assets/Aftab.jpg';
import DhanashreeImage from '../../assets/Dhanashree.jpg';

const Team = () => {
  const teamMembers = [
    {
      name: 'Anuja Lanjewar',
      role: 'Team Lead',
      image: AnujaImage,
      socials: { linkedin: '#', github: '#', instagram: '#' }
    },
    {
      name: 'Atharva Warade',
      role: 'Team Member',
      image: AtharvaImage,
      socials: { linkedin: '#', github: '#', instagram: '#', twitter: '#' }
    },
    {
      name: 'Harshal Mude',
      role: 'Team Member',
      image: HarshalImage,
      socials: { linkedin: 'https://www.linkedin.com/in/harshal-mude', github: 'https://github.com/Harshal-Mude-BIT'}
    },
    {
      name: 'Sharayu Kakas',
      role: 'Team Member',
      image: SharayuImage,
      socials: { linkedin: 'https://www.linkedin.com/in/sharayu-kakas-370227259?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app', github: 'https://github.com/kakassharayu', instagram: '#'  }
    },
    {
      name: 'Aftab Sheikh',
      role: 'Team Member',
      image: AftabImage,
      socials: { linkedin: '#', github: '#', instagram: '#' }
    },
    {
      name: 'Dhanashree Hingankar',
      role: 'Team Member',
      image: DhanashreeImage,
      socials: { linkedin: '#', github: '#', instagram: '#' }
    }
  ];

  return (
    <section className="team-section py-5">
      <div className="container">
        <h2 className="section-title text-center mb-5">
          <span className="team-name">Meet Our Team</span>
          <br />
          <h3>Chat Crew</h3>
        </h2>
        
        <div className="row g-5 justify-content-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12 d-flex justify-content-center">
              <div className="custom-card">
                <div className="card-bg" style={{ backgroundImage: `url(${member.image})` }}></div>
                <div className="details">
                  <h5 className="fw-bold">{member.name}</h5>
                  <p>{member.role}</p>
                  <div className="social-icons">
                    {Object.entries(member.socials).map(([platform, link]) => (
                      <a key={platform} href={link} className={`social-icon ${platform}`}>
                        <i className={`fab fa-${platform}`}></i>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
