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
            <div className="hero-image-stack">
              <div className="hero-card main-card">
                <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop&crop=faces" alt="Developer workspace" className="card-image" />
                <div className="card-overlay">
                  <div className="profile-preview">
                    <div className="profile-avatar">
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face" alt="Profile" />
                    </div>
                    <div className="profile-info">
                      <h3>Alex Johnson</h3>
                      <p>Full Stack Developer</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hero-card floating-card">
                <div className="card-content">
                  <div className="project-showcase">
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=200&h=120&fit=crop" alt="Project" className="project-thumb" />
                    <div className="project-info">
                      <h4>E-commerce App</h4>
                      <div className="project-stats">
                        <span>⭐ 4.9</span>
                        <span>👀 2.1k</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hero-card skills-card">
                <div className="skills-header">
                  <span className="skills-icon">🎯</span>
                  <span>Skills</span>
                </div>
                <div className="skills-list">
                  <div className="skill-item">
                    <span>React</span>
                    <div className="skill-bar"><div className="skill-fill" style={{width: '90%'}}></div></div>
                  </div>
                  <div className="skill-item">
                    <span>Node.js</span>
                    <div className="skill-bar"><div className="skill-fill" style={{width: '85%'}}></div></div>
                  </div>
                  <div className="skill-item">
                    <span>Python</span>
                    <div className="skill-bar"><div className="skill-fill" style={{width: '80%'}}></div></div>
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
      
      {/* Showcase Section */}
      <section className="showcase">
        <div className="container">
          <div className="section-header">
            <h2>Portfolio Showcase</h2>
            <p>See what amazing portfolios our users have created</p>
          </div>
          
          <div className="showcase-grid">
            <div className="showcase-item">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=300&fit=crop" alt="Portfolio 1" />
                <div className="showcase-overlay">
                  <div className="showcase-info">
                    <h4>Sarah Chen</h4>
                    <p>UX Designer</p>
                  </div>
                  <div className="showcase-stats">
                    <span>👀 5.2k views</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="showcase-item">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop" alt="Portfolio 2" />
                <div className="showcase-overlay">
                  <div className="showcase-info">
                    <h4>Mike Rodriguez</h4>
                    <p>Frontend Developer</p>
                  </div>
                  <div className="showcase-stats">
                    <span>👀 3.8k views</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="showcase-item">
              <div className="showcase-image">
                <img src="https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop" alt="Portfolio 3" />
                <div className="showcase-overlay">
                  <div className="showcase-info">
                    <h4>Emma Wilson</h4>
                    <p>Data Scientist</p>
                  </div>
                  <div className="showcase-stats">
                    <span>👀 4.1k views</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <div className="section-header">
            <h2>What Our Users Say</h2>
            <p>Join thousands of satisfied creators</p>
          </div>
          
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">“</div>
                <p>This platform helped me land my dream job! The portfolio builder is incredibly intuitive and the results look professional.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face" alt="Jessica" />
                <div>
                  <h4>Jessica Park</h4>
                  <p>Software Engineer at Google</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">“</div>
                <p>Amazing templates and customization options. I've received multiple job offers since creating my portfolio here.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face" alt="David" />
                <div>
                  <h4>David Kim</h4>
                  <p>Product Designer at Spotify</p>
                </div>
              </div>
            </div>
            
            <div className="testimonial-card">
              <div className="testimonial-content">
                <div className="quote-icon">“</div>
                <p>The best investment I made for my career. Clean, modern designs that really showcase my work effectively.</p>
              </div>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face" alt="Maria" />
                <div>
                  <h4>Maria Garcia</h4>
                  <p>Freelance Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Build Your Portfolio?</h2>
            <p>Join thousands of professionals who've already transformed their careers</p>
            <div className="cta-actions">
              <Link to="/signup" className="btn btn-primary btn-lg">
                Start Building Now
              </Link>
              <Link to="/portfolio" className="btn btn-outline btn-lg">
                View Examples
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
