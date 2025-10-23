import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"
import "./Signup.css"

function Signup() {
  const navigate = useNavigate()
  const { signup, loading, error } = useAuth()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [localError, setLocalError] = useState("")
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [fieldErrors, setFieldErrors] = useState({})

  const calculatePasswordStrength = (password) => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[a-z]/.test(password)) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    return strength
  }

  const validateField = (name, value) => {
    const errors = { ...fieldErrors }
    
    switch (name) {
      case 'name':
        if (value.length < 2) errors.name = 'Name must be at least 2 characters'
        else delete errors.name
        break
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errors.email = 'Invalid email format'
        else delete errors.email
        break
      case 'password':
        if (value.length < 6) errors.password = 'Password must be at least 6 characters'
        else delete errors.password
        setPasswordStrength(calculatePasswordStrength(value))
        break
      case 'confirmPassword':
        if (value !== formData.password) errors.confirmPassword = 'Passwords do not match'
        else delete errors.confirmPassword
        break
    }
    
    setFieldErrors(errors)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")

    if (!acceptTerms) {
      setLocalError("Please accept the Terms and Conditions")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setLocalError("Passwords do not match")
      return
    }

    try {
      await signup(formData.name, formData.email, formData.password, formData.confirmPassword)
      navigate("/")
    } catch (err) {
      setLocalError(err.message)
    }
  }

  return (
    <div className="signup-page">
      {/* Left Side - Welcome Section */}
      <div className="signup-left">
        <div className="welcome-content">
          <div className="logo">
            <span className="logo-icon">🚀</span>
            <h1>Portfolio</h1>
          </div>
          <h2>Join Our Community</h2>
          <p>Create your professional portfolio and showcase your skills to the world</p>
          <div className="features">
            <div className="feature">
              <span className="feature-icon">✨</span>
              <span>Beautiful Templates</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🎯</span>
              <span>Easy Customization</span>
            </div>
            <div className="feature">
              <span className="feature-icon">📱</span>
              <span>Mobile Responsive</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="signup-right">
        <div className="form-container">
          <div className="form-header">
            <h2>Create Account</h2>
            <p>Already have an account? <Link to="/login" className="login-link">Sign in</Link></p>
          </div>
          
          {(error || localError) && <div className="error-message">{error || localError}</div>}
          
          <form onSubmit={handleSubmit} className="signup-form">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className={fieldErrors.name ? 'error' : ''}
                required
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={fieldErrors.email ? 'error' : ''}
                required
              />
              {fieldErrors.email && <span className="field-error">{fieldErrors.email}</span>}
            </div>

            <div className="input-group">
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={fieldErrors.password ? 'error' : ''}
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className={`strength-fill strength-${passwordStrength}`}
                      style={{ width: `${passwordStrength}%` }}
                    ></div>
                  </div>
                  <span className="strength-text">
                    {passwordStrength < 50 ? 'Weak' : passwordStrength < 75 ? 'Good' : 'Strong'}
                  </span>
                </div>
              )}
              {fieldErrors.password && <span className="field-error">{fieldErrors.password}</span>}
            </div>

            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={fieldErrors.confirmPassword ? 'error' : ''}
                required
              />
              {fieldErrors.confirmPassword && <span className="field-error">{fieldErrors.confirmPassword}</span>}
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={acceptTerms} 
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  required
                />
                <span className="checkmark"></span>
                <span>I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a></span>
              </label>
            </div>

            <button 
              type="submit" 
              className={`signup-button ${loading ? 'loading' : ''}`}
              disabled={loading || Object.keys(fieldErrors).length > 0}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          <div className="social-signup">
            <div className="divider">
              <span>or continue with</span>
            </div>
            <div className="social-buttons">
              <button className="social-btn google">
                <span>🔍</span> Google
              </button>
              <button className="social-btn github">
                <span>⚡</span> GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
