import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import "./Home.css";

function Home() {
  const { user } = useAuth();

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="hero-gradient"></div>
          <div className="hero-pattern"></div>
        </div>
        
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              Welcome to the Future of Portfolios
            </div>
            
            <h1 className="hero-title">
              Build Your
              <span className="gradient-text"> Dream Portfolio</span>
              <br />in Minutes
            </h1>
            
            <p className="hero-description">
              Create stunning portfolios, showcase your skills, and connect with opportunities.
              Join thousands of developers, designers, and creators building their future.
            </p>
            
            <div className="hero-actions">
              {user ? (
                <Link to="/profile" className="btn btn-primary btn-lg">
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  View My Profile
                </Link>
              ) : (
                <Link to="/signup" className="btn btn-primary btn-lg">
                  <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 5v14m7-7H5"></path>
                  </svg>
                  Get Started Free
                </Link>
              )}
              
              <Link to="/portfolio" className="btn btn-outline btn-lg">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10,17 15,12 10,7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                Explore Portfolios
              </Link>
            </div>
            
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">10K+</div>
                <div className="stat-label">Active Users</div>
              </div>
              <div className="stat">
                <div className="stat-number">50K+</div>
                <div className="stat-label">Projects Showcased</div>
              </div>
              <div className="stat">
                <div className="stat-number">95%</div>
                <div className="stat-label">Success Rate</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="hero-card">
              <div className="card-header">
                <div className="card-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
              <div className="card-content">
                <div className="profile-preview">
                  <div className="profile-avatar">JD</div>
                  <div className="profile-info">
                    <h3>John Developer</h3>
                    <p>Full Stack Developer</p>
                  </div>
                </div>
                <div className="skills-preview">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Python</span>
                </div>
                <div className="projects-preview">
                  <div className="project-item">
                    <div className="project-icon">🚀</div>
                    <div className="project-details">
                      <h4>E-commerce Platform</h4>
                      <p>Full-stack web application</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Platform?</h2>
            <p>Everything you need to build and showcase your professional portfolio</p>
          </div>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
                </svg>
              </div>
              <h3>Lightning Fast</h3>
              <p>Create your portfolio in minutes with our intuitive builder and pre-designed templates.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
              </div>
              <h3>Professional Quality</h3>
              <p>Stand out with beautiful, responsive designs that look great on any device.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12,6 12,12 16,14"></polyline>
                </svg>
              </div>
              <h3>Real-time Updates</h3>
              <p>Keep your portfolio fresh with instant updates and seamless content management.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
