import { useState } from "react"
import { useNavigate } from "react-router-dom"
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
        <h2>Welcome!</h2>
        <div className="emoji">😊</div>
      </div>

      {/* Right Side - Form Section */}
      <div className="signup-right">
        <div className="form-container">
          <h2>Register with your e-mail</h2>
          {(error || localError) && <div className="error-message">{error || localError}</div>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Repeat Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            <p className="privacy-text">
              We may keep you informed with personalized emails about products and services. See our{" "}
              <a href="#">Privacy Policy</a> for more details.
            </p>

            <div className="checkboxes">
              <label>
                <input type="checkbox" />
                <span>Please contact me via e-mail</span>
              </label>
              <label>
                <input type="checkbox" checked={acceptTerms} onChange={(e) => setAcceptTerms(e.target.checked)} />
                <span>I have read and accept the Terms and Conditions</span>
              </label>
            </div>

            <p className="captcha-note">
              This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
            </p>

            <button type="submit" className="signup-button" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
