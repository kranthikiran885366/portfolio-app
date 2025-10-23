"use client"

import { createContext, useState, useEffect } from "react"
import { authAPI } from "../services/api"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      checkAuth()
    } else {
      setLoading(false)
    }
  }, [])

  const checkAuth = async () => {
    try {
      const response = await authAPI.getMe()
      setUser(response.user)
    } catch (err) {
      localStorage.removeItem("token")
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authAPI.login({ email, password })
      localStorage.setItem("token", response.token)
      setUser(response.user)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name, email, password, confirmPassword) => {
    setLoading(true)
    setError(null)
    try {
      const response = await authAPI.signup({ name, email, password, confirmPassword })
      localStorage.setItem("token", response.token)
      setUser(response.user)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, error, login, signup, logout }}>{children}</AuthContext.Provider>
}
