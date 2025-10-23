const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"

// Request interceptor for loading states
let activeRequests = new Set()
let loadingCallbacks = new Set()

export const onLoadingChange = (callback) => {
  loadingCallbacks.add(callback)
  return () => loadingCallbacks.delete(callback)
}

const notifyLoadingChange = () => {
  const isLoading = activeRequests.size > 0
  loadingCallbacks.forEach(callback => callback(isLoading))
}

// Enhanced API call with better error handling
export const apiCall = async (endpoint, options = {}) => {
  const requestId = Math.random().toString(36).substr(2, 9)
  activeRequests.add(requestId)
  notifyLoadingChange()

  try {
    const token = localStorage.getItem("token")
    const headers = {
      "Content-Type": "application/json",
      ...options.headers,
    }

    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 30000) // 30s timeout

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      let errorMessage = "An error occurred"
      
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || `HTTP ${response.status}: ${response.statusText}`
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`
      }

      // Handle specific status codes
      if (response.status === 401) {
        localStorage.removeItem("token")
        window.location.href = "/login"
        throw new Error("Session expired. Please login again.")
      }
      
      if (response.status === 403) {
        throw new Error("You don't have permission to perform this action.")
      }
      
      if (response.status >= 500) {
        throw new Error("Server error. Please try again later.")
      }

      throw new Error(errorMessage)
    }

    const contentType = response.headers.get("content-type")
    if (contentType && contentType.includes("application/json")) {
      return await response.json()
    }
    
    return response
  } catch (error) {
    if (error.name === 'AbortError') {
      throw new Error("Request timeout. Please check your connection and try again.")
    }
    
    if (!navigator.onLine) {
      throw new Error("No internet connection. Please check your network and try again.")
    }
    
    throw error
  } finally {
    activeRequests.delete(requestId)
    notifyLoadingChange()
  }
}

// Enhanced Auth API calls
export const authAPI = {
  signup: async (data) => {
    // Validate data before sending
    if (!data.email || !data.password || !data.name) {
      throw new Error("Please fill in all required fields")
    }
    
    if (data.password !== data.confirmPassword) {
      throw new Error("Passwords do not match")
    }
    
    if (data.password.length < 6) {
      throw new Error("Password must be at least 6 characters long")
    }
    
    return apiCall("/auth/signup", { 
      method: "POST", 
      body: JSON.stringify(data) 
    })
  },
  
  login: async (data) => {
    if (!data.email || !data.password) {
      throw new Error("Please enter both email and password")
    }
    
    return apiCall("/auth/login", { 
      method: "POST", 
      body: JSON.stringify(data) 
    })
  },
  
  getMe: () => apiCall("/auth/me"),
  
  refreshToken: () => apiCall("/auth/refresh", { method: "POST" }),
}

// Enhanced Student API calls
export const studentAPI = {
  getAllStudents: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/students${queryString ? `?${queryString}` : ''}`)
  },
  
  getMyProfile: () => apiCall("/students/profile/me"),
  
  updateProfile: async (data) => {
    // Validate profile data
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      throw new Error("Please enter a valid email address")
    }
    
    if (data.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\s/g, ''))) {
      throw new Error("Please enter a valid phone number")
    }
    
    return apiCall("/students/profile/me", { 
      method: "PUT", 
      body: JSON.stringify(data) 
    })
  },
  
  getStudentById: (id) => {
    if (!id) throw new Error("Student ID is required")
    return apiCall(`/students/${id}`)
  },
  
  deleteStudent: (id) => {
    if (!id) throw new Error("Student ID is required")
    return apiCall(`/students/${id}`, { method: "DELETE" })
  },
  
  searchStudents: (query, filters = {}) => {
    const params = { q: query, ...filters }
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/students/search?${queryString}`)
  },
}

// Project API calls
export const projectAPI = {
  getAllProjects: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/projects${queryString ? `?${queryString}` : ''}`)
  },
  
  getMyProjects: () => apiCall("/projects/my"),
  
  getProjectById: (id) => {
    if (!id) throw new Error("Project ID is required")
    return apiCall(`/projects/${id}`)
  },
  
  createProject: async (data) => {
    if (!data.title || !data.description) {
      throw new Error("Title and description are required")
    }
    
    return apiCall("/projects", {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
  
  updateProject: (id, data) => {
    if (!id) throw new Error("Project ID is required")
    return apiCall(`/projects/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },
  
  deleteProject: (id) => {
    if (!id) throw new Error("Project ID is required")
    return apiCall(`/projects/${id}`, { method: "DELETE" })
  },
  
  likeProject: (id) => {
    if (!id) throw new Error("Project ID is required")
    return apiCall(`/projects/${id}/like`, { method: "POST" })
  },
}

// Skill API calls
export const skillAPI = {
  getAllSkills: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/skills${queryString ? `?${queryString}` : ''}`)
  },
  
  getMySkills: () => apiCall("/skills/my"),
  
  getSkillCategories: () => apiCall("/skills/categories"),
  
  createSkill: async (data) => {
    if (!data.name || !data.category || !data.level) {
      throw new Error("Name, category, and level are required")
    }
    
    if (data.percentage < 0 || data.percentage > 100) {
      throw new Error("Percentage must be between 0 and 100")
    }
    
    return apiCall("/skills", {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
  
  updateSkill: (id, data) => {
    if (!id) throw new Error("Skill ID is required")
    
    if (data.percentage && (data.percentage < 0 || data.percentage > 100)) {
      throw new Error("Percentage must be between 0 and 100")
    }
    
    return apiCall(`/skills/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },
  
  deleteSkill: (id) => {
    if (!id) throw new Error("Skill ID is required")
    return apiCall(`/skills/${id}`, { method: "DELETE" })
  },
}

// Course API calls
export const courseAPI = {
  getAllCourses: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/courses${queryString ? `?${queryString}` : ''}`)
  },
  
  getMyCourses: (type = "enrolled") => {
    return apiCall(`/courses/my?type=${type}`)
  },
  
  getCourseById: (id) => {
    if (!id) throw new Error("Course ID is required")
    return apiCall(`/courses/${id}`)
  },
  
  createCourse: async (data) => {
    if (!data.title || !data.description || !data.category) {
      throw new Error("Title, description, and category are required")
    }
    
    return apiCall("/courses", {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
  
  updateCourse: (id, data) => {
    if (!id) throw new Error("Course ID is required")
    return apiCall(`/courses/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },
  
  deleteCourse: (id) => {
    if (!id) throw new Error("Course ID is required")
    return apiCall(`/courses/${id}`, { method: "DELETE" })
  },
  
  enrollInCourse: (id) => {
    if (!id) throw new Error("Course ID is required")
    return apiCall(`/courses/${id}/enroll`, { method: "POST" })
  },
  
  completeCourse: (id) => {
    if (!id) throw new Error("Course ID is required")
    return apiCall(`/courses/${id}/complete`, { method: "POST" })
  },
  
  addReview: (id, data) => {
    if (!id) throw new Error("Course ID is required")
    if (!data.rating || !data.comment) {
      throw new Error("Rating and comment are required")
    }
    return apiCall(`/courses/${id}/review`, {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
}

// Blog API calls
export const blogAPI = {
  getAllBlogs: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/blogs${queryString ? `?${queryString}` : ''}`)
  },
  
  getMyBlogs: () => apiCall("/blogs/my"),
  
  getBlogById: (id) => {
    if (!id) throw new Error("Blog ID is required")
    return apiCall(`/blogs/${id}`)
  },
  
  getBlogBySlug: (slug) => {
    if (!slug) throw new Error("Blog slug is required")
    return apiCall(`/blogs/slug/${slug}`)
  },
  
  getBlogCategories: () => apiCall("/blogs/categories"),
  
  getBlogTags: () => apiCall("/blogs/tags"),
  
  createBlog: async (data) => {
    if (!data.title || !data.content || !data.excerpt) {
      throw new Error("Title, content, and excerpt are required")
    }
    
    return apiCall("/blogs", {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
  
  updateBlog: (id, data) => {
    if (!id) throw new Error("Blog ID is required")
    return apiCall(`/blogs/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },
  
  deleteBlog: (id) => {
    if (!id) throw new Error("Blog ID is required")
    return apiCall(`/blogs/${id}`, { method: "DELETE" })
  },
  
  likeBlog: (id) => {
    if (!id) throw new Error("Blog ID is required")
    return apiCall(`/blogs/${id}/like`, { method: "POST" })
  },
  
  addComment: (id, content) => {
    if (!id) throw new Error("Blog ID is required")
    if (!content) throw new Error("Comment content is required")
    return apiCall(`/blogs/${id}/comments`, {
      method: "POST",
      body: JSON.stringify({ content })
    })
  },
  
  addReply: (blogId, commentId, content) => {
    if (!blogId || !commentId) throw new Error("Blog ID and Comment ID are required")
    if (!content) throw new Error("Reply content is required")
    return apiCall(`/blogs/${blogId}/comments/${commentId}/replies`, {
      method: "POST",
      body: JSON.stringify({ content })
    })
  },
}

// Portfolio API calls
export const portfolioAPI = {
  getAllPortfolios: (params = {}) => {
    const queryString = new URLSearchParams(params).toString()
    return apiCall(`/portfolios${queryString ? `?${queryString}` : ''}`)
  },
  
  getMyPortfolio: () => apiCall("/portfolios/my"),
  
  getPortfolioById: (id) => {
    if (!id) throw new Error("Portfolio ID is required")
    return apiCall(`/portfolios/${id}`)
  },
  
  getPortfolioBySubdomain: (subdomain) => {
    if (!subdomain) throw new Error("Subdomain is required")
    return apiCall(`/portfolios/subdomain/${subdomain}`)
  },
  
  createPortfolio: async (data) => {
    if (!data.title) {
      throw new Error("Title is required")
    }
    
    return apiCall("/portfolios", {
      method: "POST",
      body: JSON.stringify(data)
    })
  },
  
  updatePortfolio: (data) => {
    return apiCall("/portfolios", {
      method: "PUT",
      body: JSON.stringify(data)
    })
  },
  
  deletePortfolio: () => {
    return apiCall("/portfolios", { method: "DELETE" })
  },
  
  checkSubdomainAvailability: (subdomain) => {
    if (!subdomain) throw new Error("Subdomain is required")
    return apiCall(`/portfolios/check-subdomain/${subdomain}`)
  },
  
  updateTheme: (theme) => {
    return apiCall("/portfolios/theme", {
      method: "PUT",
      body: JSON.stringify({ theme })
    })
  },
  
  updateLayout: (layout) => {
    return apiCall("/portfolios/layout", {
      method: "PUT",
      body: JSON.stringify({ layout })
    })
  },
}

// Utility functions
export const handleApiError = (error) => {
  console.error('API Error:', error)
  
  // Return user-friendly error messages
  if (error.message.includes('fetch')) {
    return "Network error. Please check your connection and try again."
  }
  
  return error.message || "An unexpected error occurred. Please try again."
}

export const isOnline = () => navigator.onLine

// Cache management
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

export const getCachedData = (key) => {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data
  }
  return null
}

export const setCachedData = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

export const clearCache = () => {
  cache.clear()
}
