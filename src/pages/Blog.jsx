import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import { blogAPI, courseAPI, skillAPI } from "../services/api"
import "./Blog.css"

const Blog = () => {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("courses")
  const [courses, setCourses] = useState([])
  const [blogs, setBlogs] = useState([])
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")

  const categories = ["All", "Web Development", "Mobile Development", "Data Science", "AI/ML", "DevOps", "Design"]
  const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"]

  useEffect(() => {
    fetchData()
  }, [activeTab, selectedCategory])

  const fetchData = async () => {
    try {
      setLoading(true)
      if (activeTab === "courses") {
        const params = selectedCategory !== "All" ? { category: selectedCategory } : {}
        const response = await courseAPI.getAllCourses(params)
        setCourses(response.data)
      } else if (activeTab === "blogs") {
        const params = selectedCategory !== "All" ? { category: selectedCategory } : {}
        const response = await blogAPI.getAllBlogs(params)
        setBlogs(response.data)
      } else if (activeTab === "skills") {
        const response = await skillAPI.getAllSkills()
        setSkills(response.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredData = () => {
    let data = activeTab === "courses" ? courses : activeTab === "blogs" ? blogs : skills
    
    if (searchQuery) {
      data = data.filter(item => 
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    
    return data
  }

  const getSkillIcon = (category) => {
    const icons = {
      "Frontend": "🎨",
      "Backend": "⚙️",
      "Database": "🗄️",
      "DevOps": "🚀",
      "Mobile": "📱",
      "Design": "✨",
      "Other": "💡"
    }
    return icons[category] || "💡"
  }

  const getLevelColor = (level) => {
    const colors = {
      "Beginner": "var(--info)",
      "Intermediate": "var(--warning)", 
      "Advanced": "var(--success)",
      "Expert": "var(--primary)"
    }
    return colors[level] || "var(--gray-500)"
  }

  return (
    <div className="academy-page">
      <div className="container">
        {/* Hero Section */}
        <div className="academy-hero">
          <div className="hero-content">
            <h1>
              <span className="hero-icon">🎓</span>
              Academy & Learning Hub
            </h1>
            <p>Master new skills, explore courses, and stay updated with the latest in tech</p>
            
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">{courses.length}</span>
                <span className="stat-label">Courses</span>
              </div>
              <div className="stat">
                <span className="stat-number">{blogs.length}</span>
                <span className="stat-label">Articles</span>
              </div>
              <div className="stat">
                <span className="stat-number">{skills.length}</span>
                <span className="stat-label">Skills</span>
              </div>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="learning-card">
              <div className="card-header">
                <div className="progress-ring">
                  <svg viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--gray-200)" strokeWidth="2"/>
                    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--primary)" strokeWidth="2" 
                            strokeDasharray="75, 100" strokeLinecap="round" transform="rotate(-90 18 18)"/>
                  </svg>
                  <div className="progress-text">75%</div>
                </div>
                <div className="card-info">
                  <h3>Learning Progress</h3>
                  <p>Keep up the great work!</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="academy-nav">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeTab === "courses" ? "active" : ""}`}
              onClick={() => setActiveTab("courses")}
            >
              <span className="tab-icon">📚</span>
              Courses
            </button>
            <button 
              className={`nav-tab ${activeTab === "blogs" ? "active" : ""}`}
              onClick={() => setActiveTab("blogs")}
            >
              <span className="tab-icon">📝</span>
              Articles
            </button>
            <button 
              className={`nav-tab ${activeTab === "skills" ? "active" : ""}`}
              onClick={() => setActiveTab("skills")}
            >
              <span className="tab-icon">⚡</span>
              Skills
            </button>
          </div>
          
          <div className="nav-actions">
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {activeTab !== "skills" && (
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading-state">
            <div className="spinner"></div>
            <p>Loading {activeTab}...</p>
          </div>
        ) : (
          <div className="academy-content">
            {activeTab === "courses" && (
              <div className="courses-grid">
                {filteredData().map((course) => (
                  <div key={course._id} className="course-card">
                    <div className="course-image">
                      {course.thumbnail ? (
                        <img src={course.thumbnail} alt={course.title} />
                      ) : (
                        <div className="placeholder-image">
                          <span className="course-icon">📚</span>
                        </div>
                      )}
                      <div className="course-level">{course.level}</div>
                    </div>
                    
                    <div className="course-content">
                      <div className="course-meta">
                        <span className="course-category">{course.category}</span>
                        <span className="course-duration">{course.duration}h</span>
                      </div>
                      
                      <h3 className="course-title">{course.title}</h3>
                      <p className="course-description">{course.description}</p>
                      
                      <div className="course-footer">
                        <div className="course-instructor">
                          <div className="instructor-avatar">
                            {course.instructor?.name?.charAt(0)}
                          </div>
                          <span>{course.instructor?.name}</span>
                        </div>
                        
                        <div className="course-rating">
                          <span className="rating-stars">⭐</span>
                          <span>{course.rating?.average?.toFixed(1) || "New"}</span>
                        </div>
                      </div>
                      
                      <div className="course-actions">
                        <button className="btn btn-primary">
                          {course.price > 0 ? `$${course.price}` : "Free"}
                        </button>
                        <button className="btn btn-outline">Preview</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "blogs" && (
              <div className="blogs-grid">
                {filteredData().map((blog) => (
                  <article key={blog._id} className="blog-card">
                    <div className="blog-image">
                      {blog.featuredImage ? (
                        <img src={blog.featuredImage} alt={blog.title} />
                      ) : (
                        <div className="placeholder-image">
                          <span className="blog-icon">📝</span>
                        </div>
                      )}
                      {blog.isFeatured && <div className="featured-badge">Featured</div>}
                    </div>
                    
                    <div className="blog-content">
                      <div className="blog-meta">
                        <span className="blog-category">{blog.category}</span>
                        <span className="blog-date">{new Date(blog.publishedAt).toLocaleDateString()}</span>
                      </div>
                      
                      <h3 className="blog-title">{blog.title}</h3>
                      <p className="blog-excerpt">{blog.excerpt}</p>
                      
                      <div className="blog-tags">
                        {blog.tags?.slice(0, 3).map((tag, index) => (
                          <span key={index} className="blog-tag">{tag}</span>
                        ))}
                      </div>
                      
                      <div className="blog-footer">
                        <div className="blog-author">
                          <div className="author-avatar">
                            {blog.author?.name?.charAt(0)}
                          </div>
                          <span>{blog.author?.name}</span>
                        </div>
                        
                        <div className="blog-stats">
                          <span className="read-time">{blog.readTime} min read</span>
                          <span className="blog-views">{blog.views} views</span>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {activeTab === "skills" && (
              <div className="skills-showcase">
                <div className="skills-header">
                  <h2>Community Skills</h2>
                  <p>Explore the diverse skill sets in our community</p>
                </div>
                
                <div className="skills-categories">
                  {["Frontend", "Backend", "Database", "DevOps", "Mobile", "Design"].map(category => {
                    const categorySkills = skills.filter(skill => skill.category === category)
                    return (
                      <div key={category} className="skill-category">
                        <div className="category-header">
                          <span className="category-icon">{getSkillIcon(category)}</span>
                          <h3>{category}</h3>
                          <span className="skill-count">{categorySkills.length}</span>
                        </div>
                        
                        <div className="category-skills">
                          {categorySkills.slice(0, 6).map((skill) => (
                            <div key={skill._id} className="skill-item">
                              <div className="skill-info">
                                <span className="skill-name">{skill.name}</span>
                                <span 
                                  className="skill-level"
                                  style={{ color: getLevelColor(skill.level) }}
                                >
                                  {skill.level}
                                </span>
                              </div>
                              
                              <div className="skill-progress">
                                <div 
                                  className="progress-bar"
                                  style={{ 
                                    width: `${skill.percentage}%`,
                                    backgroundColor: getLevelColor(skill.level)
                                  }}
                                ></div>
                              </div>
                              
                              <div className="skill-meta">
                                <span className="skill-percentage">{skill.percentage}%</span>
                                {skill.yearsOfExperience > 0 && (
                                  <span className="skill-experience">{skill.yearsOfExperience}y</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog