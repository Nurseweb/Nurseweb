"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Dashboard from "@/components/dashboard"

interface User {
  id: string
  email: string
  name: string
  role: string
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      const stored = localStorage.getItem("user")

      if (!token || !stored) {
        router.push("/")
        return
      }

      setUser(JSON.parse(stored))
    } catch {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      router.push("/")
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("auth-change"))
    router.push("/")
  }

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center",
        background: "#f8fafb",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "50%",
            border: "3px solid #dce9ec", borderTopColor: "#0e7490",
            animation: "spin 0.8s linear infinite",
            margin: "0 auto 12px",
          }} />
          <p style={{ fontSize: "0.85rem", color: "#8aacb4", fontFamily: "'DM Sans', sans-serif" }}>
            Ачаалж байна...
          </p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!user) return null

  return (
    <Dashboard
      user={user}
      logout={handleLogout}
      onCourseClick={(course) => console.log("Course:", course)}
      onStartQuiz={(lang) => console.log("Quiz lang:", lang)}
    />
  )
}