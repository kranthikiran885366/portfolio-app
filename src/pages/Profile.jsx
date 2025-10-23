import { useState, useEffect } from "react"
import { useAuth } from "../hooks/useAuth"
import { studentAPI } from "../services/api"
import "./Profile.css"

function Profile() {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({})
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await studentAPI.getMyProfile()
      setProfile(response.data)
      setFormData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((s) => s.trim())
    setFormData((prev) => ({ ...prev, skills }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    try {
      await studentAPI.updateProfile(formData)
      setProfile(formData)
      setEditing(false)
      setSuccess("Profile updated successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div className="profile-page">Loading...</div>

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h1>Student Profile</h1>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        {!editing ? (
          <div className="profile-view">
            <div className="profile-header">
              <div className="profile-image">
                {profile?.profileImage ? (
                  <img src={profile.profileImage || "/placeholder.svg"} alt="Profile" />
                ) : (
                  <div className="placeholder-image">No Image</div>
                )}
              </div>
              <div className="profile-info">
                <h2>
                  {profile?.firstName} {profile?.lastName}
                </h2>
                <p className="email">{profile?.email}</p>
                <p className="status">{profile?.status}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="detail-section">
                <h3>Bio</h3>
                <p>{profile?.bio || "No bio added yet"}</p>
              </div>

              <div className="detail-section">
                <h3>Skills</h3>
                <div className="skills-list">
                  {profile?.skills && profile.skills.length > 0 ? (
                    profile.skills.map((skill, idx) => (
                      <span key={idx} className="skill-badge">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p>No skills added yet</p>
                  )}
                </div>
              </div>

              <div className="detail-section">
                <h3>Contact & Links</h3>
                <p>
                  <strong>Phone:</strong> {profile?.phone || "Not provided"}
                </p>
                <p>
                  <strong>Portfolio:</strong>{" "}
                  {profile?.portfolio ? (
                    <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                      {profile.portfolio}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  {profile?.github ? (
                    <a href={profile.github} target="_blank" rel="noopener noreferrer">
                      {profile.github}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  {profile?.linkedin ? (
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                      {profile.linkedin}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              </div>

              <div className="detail-section">
                <h3>Academic Info</h3>
                <p>
                  <strong>GPA:</strong> {profile?.gpa || "0.00"}
                </p>
                <p>
                  <strong>Enrolled Courses:</strong> {profile?.enrolledCourses?.length || 0}
                </p>
                <p>
                  <strong>Completed Courses:</strong> {profile?.completedCourses?.length || 0}
                </p>
              </div>
            </div>

            <button className="edit-button" onClick={() => setEditing(true)}>
              Edit Profile
            </button>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>First Name</label>
              <input type="text" name="firstName" value={formData.firstName || ""} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Last Name</label>
              <input type="text" name="lastName" value={formData.lastName || ""} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input type="tel" name="phone" value={formData.phone || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea name="bio" value={formData.bio || ""} onChange={handleChange} rows="4" />
            </div>

            <div className="form-group">
              <label>Skills (comma-separated)</label>
              <input
                type="text"
                value={formData.skills?.join(", ") || ""}
                onChange={handleSkillsChange}
                placeholder="e.g., JavaScript, React, Node.js"
              />
            </div>

            <div className="form-group">
              <label>Portfolio URL</label>
              <input type="url" name="portfolio" value={formData.portfolio || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>GitHub URL</label>
              <input type="url" name="github" value={formData.github || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>LinkedIn URL</label>
              <input type="url" name="linkedin" value={formData.linkedin || ""} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Profile Image URL</label>
              <input type="url" name="profileImage" value={formData.profileImage || ""} onChange={handleChange} />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button">
                Save Changes
              </button>
              <button type="button" className="cancel-button" onClick={() => setEditing(false)}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default Profile
