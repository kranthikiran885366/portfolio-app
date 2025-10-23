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
      const data = response.data || response || [];
      // Ensure all items have required properties
      const safeData = Array.isArray(data) ? data.filter(item => item && typeof item === 'object') : [];
      setPortfolios(safeData);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredPortfolios = portfolios.filter(item => {
    if (!item || typeof item !== 'object') return false;
    if (filter === 'all') return true;
    return item.category && typeof item.category === 'string' && 
           item.category.toLowerCase() === filter.toLowerCase();
  });

  const categories = ['all', ...new Set(
    portfolios
      .map(p => p && p.category)
      .filter(cat => cat && typeof cat === 'string')
  )];

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
        {categories.map(category => {
          if (!category || typeof category !== 'string') return null;
          return (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          );
        })}
      </div>

      <div className="portfolio-grid">
        {filteredPortfolios.length > 0 ? (
          filteredPortfolios.map((item) => {
            if (!item || !item._id) return null;
            return (
              <div className="portfolio-card" key={item._id}>
                <div className="portfolio-image">
                  <img 
                    src={item.image || 'https://via.placeholder.com/400x250?text=No+Image'} 
                    alt={item.title || 'Project'} 
                  />
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
                  <h3>{item.title || 'Untitled Project'}</h3>
                  <p>{item.description || 'No description available'}</p>
                  <div className="portfolio-tech">
                    {item.technologies && Array.isArray(item.technologies) && 
                     item.technologies.map((tech, index) => {
                       if (!tech || typeof tech !== 'string') return null;
                       return <span key={index} className="tech-tag">{tech}</span>;
                     })
                    }
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="no-projects">
            <p>No projects found. Try a different filter or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Portfolio;
