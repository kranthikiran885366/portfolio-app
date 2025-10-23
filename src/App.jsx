import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { useAuth } from "./hooks/useAuth"
import NotificationBell from "./components/NotificationBell"

// Pages
import Home from "./pages/Home.jsx"
import Portfolio from "./pages/Portfolio.jsx"
import Blog from "./pages/Blog.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"
import Skills from "./pages/Skills.jsx"
import Market from "./pages/Market.jsx"
import Profile from "./pages/Profile.jsx"

import "./App.css"

function Navbar() {
  const [submitted, setSubmitted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmitWebsite = () => {
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

  const handleLogout = () => {
    logout()
    navigate("/")
    setIsMenuOpen(false)
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <Link to="/" className="nav-logo">
            <span className="logo-icon">🚀</span>
            Portfolio
          </Link>

          <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/portfolio" className={`nav-link ${isActive('/portfolio') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Portfolio
            </Link>
            <Link to="/blog" className={`nav-link ${isActive('/blog') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Academy
            </Link>
            <Link to="/skills" className={`nav-link ${isActive('/skills') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Skills
            </Link>
            <Link to="/market" className={`nav-link ${isActive('/market') ? 'active' : ''}`} onClick={() => setIsMenuOpen(false)}>
              Market
            </Link>
          </div>

          <div className="nav-search">
            <div className="search-box">
              <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <input
                type="text"
                placeholder="Search projects, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="nav-actions">
            {user && <NotificationBell />}
            {user ? (
              <>
                <Link to="/profile" className="user-profile" onClick={() => setIsMenuOpen(false)}>
                  <div className="user-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="user-name">{user.name}</span>
                </Link>
                <button className="btn btn-outline" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-ghost" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/signup" className="btn btn-primary" onClick={() => setIsMenuOpen(false)}>
                  Sign Up
                </Link>
              </>
            )}
            <button className="btn btn-secondary" onClick={handleSubmitWebsite}>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M12 5v14m7-7H5"></path>
              </svg>
              Submit
            </button>
          </div>

          <div className="nav-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {submitted && (
        <div className="notification success">
          <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M9 12l2 2 4-4"></path>
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          Website submitted successfully!
        </div>
      )}
    </>
  )
}

function AppContent() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/market" element={<Market />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
