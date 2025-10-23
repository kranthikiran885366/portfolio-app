import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "./Login.css"

function Login() {
  const navigate = useNavigate()
  const { login, loading, error } = useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [localError, setLocalError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (localError) setLocalError("") // Clear error on input change
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")

    if (!formData.email || !formData.password) {
      setLocalError("Please fill in all fields")
      return
    }

    try {
      await login(formData.email, formData.password)
      navigate("/profile")
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Side - Welcome Section */}
        <div className="login-visual">
          <div className="visual-content">
            <div className="welcome-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M9 12l2 2 4-4"></path>
                <circle cx="12" cy="12" r="10"></circle>
              </svg>
            </div>
            <h2>Welcome Back!</h2>
            <p>Sign in to access your portfolio dashboard and continue building your professional presence.</p>
            
            <div className="features-list">
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Manage your portfolio</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Track your progress</span>
              </div>
              <div className="feature-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="20,6 9,17 4,12"></polyline>
                </svg>
                <span>Connect with opportunities</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="login-form">
          <div className="form-header">
            <h1>Sign In</h1>
            <p>Enter your credentials to access your account</p>
          </div>

          {(error || localError) && (
            <div className="alert alert-error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
              {error || localError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                  <circle cx="12" cy="16" r="1"></circle>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    {showPassword ? (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    ) : (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    )}
                  </svg>
                </button>
              </div>
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
              {loading ? (
                <>
                  <svg className="spinner" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="4" opacity="0.25"></circle>
                    <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" opacity="0.75"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="form-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="signup-link">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
