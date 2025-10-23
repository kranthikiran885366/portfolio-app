import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { apiCall } from "../services/api"
import "./Skills.css"

const Skills = () => {
  const { user } = useAuth()
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingSkill, setEditingSkill] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    category: "Frontend",
    level: "Beginner",
    percentage: 0,
    yearsOfExperience: 0
  })

  const categories = [
    "All",
    "Frontend",
    "Backend",
    "Database",
    "DevOps",
    "Mobile",
    "Design",
    "Other"
  ]

  const levels = ["Beginner", "Intermediate", "Advanced", "Expert"]

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      setLoading(true)
      const response = user 
        ? await apiCall("/skills/my")
        : await apiCall("/skills")
      setSkills(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingSkill) {
        await apiCall(`/skills/${editingSkill._id}`, {
          method: "PUT",
          body: JSON.stringify(formData)
        })
      } else {
        await apiCall("/skills", {
          method: "POST",
          body: JSON.stringify(formData)
        })
      }
      
      setShowAddForm(false)
      setEditingSkill(null)
      setFormData({
        name: "",
        category: "Frontend",
        level: "Beginner",
        percentage: 0,
        yearsOfExperience: 0
      })
      fetchSkills()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      percentage: skill.percentage,
      yearsOfExperience: skill.yearsOfExperience || 0
    })
    setShowAddForm(true)
  }

  const handleDelete = async (skillId) => {
    if (window.confirm("Are you sure you want to delete this skill?")) {
      try {
        await apiCall(`/skills/${skillId}`, { method: "DELETE" })
        fetchSkills()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const filteredSkills = selectedCategory === "All" 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory)

  const getSkillColor = (percentage) => {
    if (percentage >= 80) return "var(--success)"
    if (percentage >= 60) return "var(--warning)"
    if (percentage >= 40) return "var(--info)"
    return "var(--gray-400)"
  }

  const getLevelIcon = (level) => {
    switch (level) {
      case "Expert": return "🏆"
      case "Advanced": return "⭐"
      case "Intermediate": return "📈"
      default: return "🌱"
    }
  }

  return (
    <div className="skills-page">
      <div className="container">
        {/* Header */}
        <div className="skills-header">
          <div className="header-content">
            <h1>
              <span className="header-icon">💡</span>
              {user ? "My Skills" : "Skills Showcase"}
            </h1>
            <p>
              {user 
                ? "Manage and showcase your technical skills and expertise"
                : "Explore the diverse skill sets of our talented community"}
            </p>
          </div>
          
          {user && (
            <button 
              onClick={() => setShowAddForm(true)}
              className="btn btn-primary"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m7-7H5"></path>
              </svg>
              Add Skill
            </button>
          )}
        </div>

        {/* Category Filter */}
        <div className="skills-filters">
          <div className="category-tabs">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-tab ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="modal-overlay" onClick={() => setShowAddForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingSkill ? "Edit Skill" : "Add New Skill"}</h3>
                <button 
                  onClick={() => {
                    setShowAddForm(false)
                    setEditingSkill(null)
                  }}
                  className="close-btn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="skill-form">
                <div className="form-group">
                  <label>Skill Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g., React, Python, Photoshop"
                    required
                  />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {categories.slice(1).map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Level</label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({...formData, level: e.target.value})}
                    >
                      {levels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Proficiency ({formData.percentage}%)</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.percentage}
                      onChange={(e) => setFormData({...formData, percentage: parseInt(e.target.value)})}
                      className="range-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Years of Experience</label>
                    <input
                      type="number"
                      min="0"
                      max="50"
                      value={formData.yearsOfExperience}
                      onChange={(e) => setFormData({...formData, yearsOfExperience: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">
                    {editingSkill ? "Update Skill" : "Add Skill"}
                  </button>
                  <button 
                    type="button" 
                    onClick={() => {
                      setShowAddForm(false)
                      setEditingSkill(null)
                    }}
                    className="btn btn-outline"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading skills...</p>
          </div>
        ) : error ? (
          <div className="error-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="15" y1="9" x2="9" y2="15"></line>
              <line x1="9" y1="9" x2="15" y2="15"></line>
            </svg>
            <h3>Error Loading Skills</h3>
            <p>{error}</p>
            <button onClick={fetchSkills} className="btn btn-primary">
              Try Again
            </button>
          </div>
        ) : filteredSkills.length > 0 ? (
          <div className="skills-grid">
            {filteredSkills.map((skill) => (
              <div key={skill._id} className="skill-card">
                <div className="skill-header">
                  <div className="skill-info">
                    <h3 className="skill-name">{skill.name}</h3>
                    <div className="skill-meta">
                      <span className="skill-level">
                        {getLevelIcon(skill.level)} {skill.level}
                      </span>
                      <span className="skill-category">{skill.category}</span>
                    </div>
                  </div>
                  
                  {user && skill.userId === user.id && (
                    <div className="skill-actions">
                      <button 
                        onClick={() => handleEdit(skill)}
                        className="action-btn edit-btn"
                        title="Edit skill"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(skill._id)}
                        className="action-btn delete-btn"
                        title="Delete skill"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <polyline points="3,6 5,6 21,6"></polyline>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="skill-progress">
                  <div className="progress-info">
                    <span className="progress-label">Proficiency</span>
                    <span className="progress-value">{skill.percentage}%</span>
                  </div>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{
                        width: `${skill.percentage}%`,
                        backgroundColor: getSkillColor(skill.percentage)
                      }}
                    ></div>
                  </div>
                </div>
                
                {skill.yearsOfExperience > 0 && (
                  <div className="skill-experience">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12,6 12,12 16,14"></polyline>
                    </svg>
                    {skill.yearsOfExperience} year{skill.yearsOfExperience !== 1 ? 's' : ''} experience
                  </div>
                )}
                
                {skill.certifications && skill.certifications.length > 0 && (
                  <div className="skill-certifications">
                    <h4>Certifications</h4>
                    {skill.certifications.map((cert, index) => (
                      <div key={index} className="certification">
                        <span className="cert-name">{cert.name}</span>
                        <span className="cert-issuer">{cert.issuer}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            <h3>No Skills Found</h3>
            <p>
              {selectedCategory === "All" 
                ? "No skills have been added yet."
                : `No skills found in the ${selectedCategory} category.`}
            </p>
            {user && (
              <button 
                onClick={() => setShowAddForm(true)}
                className="btn btn-primary"
              >
                Add Your First Skill
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Skills
