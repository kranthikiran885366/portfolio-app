import React, { useState, useEffect } from "react";
import { projectAPI } from "../services/api";
import "./Portfolio.css";

function Portfolio() {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    try {
      const response = await projectAPI.getAllProjects();
      setPortfolios(response.data || response);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolios = portfolios.filter(item => 
    filter === 'all' || (item.category && item.category.toLowerCase() === filter.toLowerCase())
  );

  const categories = ['all', ...new Set(portfolios.map(p => p.category).filter(Boolean))];

  if (loading) {
    return <div className="loading">Loading portfolios...</div>;
  }

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <h1>My Portfolio</h1>
        <p>Showcasing my latest projects and creative work</p>
      </div>
      
      <div className="portfolio-filters">
        {categories.map(category => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'active' : ''}`}
            onClick={() => setFilter(category)}
          >
            {category && category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="portfolio-grid">
        {filteredPortfolios.map((item) => (
          <div className="portfolio-card" key={item._id}>
            <div className="portfolio-image">
              <img src={item.image} alt={item.title} />
              <div className="portfolio-overlay">
                <div className="portfolio-links">
                  {item.liveUrl && (
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
                      Live Demo
                    </a>
                  )}
                  {item.githubUrl && (
                    <a href={item.githubUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="portfolio-info">
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className="portfolio-tech">
                {item.technologies && item.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
