import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { apiCall } from "../services/api"
import "./Market.css"

const Market = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [sortBy, setSortBy] = useState("recent")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categories = [
    "All",
    "Web Development",
    "Mobile App",
    "Desktop App",
    "AI/ML",
    "Data Science",
    "Game Development",
    "Other"
  ]

  useEffect(() => {
    fetchProjects()
  }, [searchQuery, selectedCategory, sortBy, page])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12"
      })
      
      if (searchQuery) params.append("search", searchQuery)
      if (selectedCategory && selectedCategory !== "All") params.append("category", selectedCategory)
      
      const response = await apiCall(`/projects?${params}`)
      setProjects(response.data)
      setTotalPages(response.pages)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async (projectId) => {
    try {
      await apiCall(`/projects/${projectId}/like`, { method: "POST" })
      fetchProjects() // Refresh to get updated likes
    } catch (err) {
      console.error("Error liking project:", err)
    }
  }

  const highlightMatch = (text) => {
    if (!searchQuery) return text
    const regex = new RegExp(`(${searchQuery})`, "gi")
    return text.replace(regex, "<mark>$1</mark>")
  }

  return (
    <div className="market-page">
      <div className="container">
        {/* Header */}
        <div className="market-header">
          <div className="header-content">
            <h1>Project Marketplace</h1>
            <p>Discover amazing projects from talented developers around the world</p>
          </div>
          
          <div className="market-stats">
            <div className="stat">
              <span className="stat-number">{projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">{categories.length - 1}</span>
              <span className="stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="market-filters">
          <div className="search-section">
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="filter-section">
            <select 
              value={selectedCategory} 
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="filter-select"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Popular</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading projects...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h3>Error Loading Projects</h3>
            <p>{error}</p>
            <button onClick={fetchProjects} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project._id} className="project-card">
                  <div className="project-image">
                    {project.imageUrl ? (
                      <img src={project.imageUrl} alt={project.title} />
                    ) : (
                      <div className="placeholder-image">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="9" cy="9" r="2"></circle>
                          <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></path>
                        </svg>
                      </div>
                    )}
                    <div className="project-overlay">
                      <div className="project-actions">
                        {project.liveUrl && (
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15,3 21,3 21,9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </a>
                        )}
                        {project.githubUrl && (
                          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="project-content">
                    <div className="project-header">
                      <h3 dangerouslySetInnerHTML={{ __html: highlightMatch(project.title) }} />
                      <span className={`status-badge ${project.status.toLowerCase().replace(' ', '-')}`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <p className="project-description" dangerouslySetInnerHTML={{ __html: highlightMatch(project.description) }} />
                    
                    <div className="project-technologies">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="tech-more">+{project.technologies.length - 3}</span>
                      )}
                    </div>
                    
                    <div className="project-footer">
                      <div className="project-author">
                        <div className="author-avatar">
                          {project.userId?.name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="author-name">{project.userId?.name}</span>
                      </div>
                      
                      <div className="project-stats">
                        <button 
                          onClick={() => handleLike(project._id)}
                          className="stat-item like-btn"
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                          </svg>
                          {project.likes?.length || 0}
                        </button>
                        
                        <div className="stat-item">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                          {project.views || 0}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  onClick={() => setPage(page - 1)} 
                  disabled={page === 1}
                  className="btn btn-outline"
                >
                  Previous
                </button>
                
                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`page-btn ${page === pageNum ? 'active' : ''}`}
                    >
                      {pageNum}
                    </button>
                  ))}
                </div>
                
                <button 
                  onClick={() => setPage(page + 1)} 
                  disabled={page === totalPages}
                  className="btn btn-outline"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            <h3>No Projects Found</h3>
            <p>Try adjusting your search criteria or browse different categories.</p>
            <Link to="/profile" className="btn btn-primary">
              Add Your Project
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Market
