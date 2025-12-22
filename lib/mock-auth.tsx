"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface User {
  email: string
  name: string
  uid: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function MockAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem("bracket_validator_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock validation
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const mockUser: User = {
      email,
      name: email.split("@")[0],
      uid: Math.random().toString(36).substring(7),
    }

    localStorage.setItem("bracket_validator_user", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const signup = async (email: string, password: string, name?: string) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // Mock validation
    if (!email || !password) {
      throw new Error("Email and password are required")
    }

    const mockUser: User = {
      email,
      name: name || email.split("@")[0],
      uid: Math.random().toString(36).substring(7),
    }

    localStorage.setItem("bracket_validator_user", JSON.stringify(mockUser))
    setUser(mockUser)
  }

  const logout = async () => {
    localStorage.removeItem("bracket_validator_user")
    setUser(null)
  }

  return <AuthContext.Provider value={{ user, loading, login, signup, logout }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a MockAuthProvider")
  }
  return context
}
