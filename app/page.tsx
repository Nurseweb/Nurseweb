"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import SocialProof from "@/components/social-proof"
import LoginModal from "@/components/login-modal"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const router = useRouter()

  // Аль хэдийн нэвтэрсэн бол dashboard руу шилжүүлнэ
  useEffect(() => {
    try {
      const token = localStorage.getItem("token")
      const user = localStorage.getItem("user")
      if (token && user) {
        router.push("/dashboard")
      }
    } catch {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    }
  }, [])

  const handleLoginSuccess = (
    user: { id: string; email: string; name: string; role: string },
    token: string
  ) => {
    setModalOpen(false)
    window.dispatchEvent(new Event("auth-change"))
    router.push("/dashboard")
  }

  return (
    <>
      <Navbar onLoginClick={() => setModalOpen(true)} />
      <main>
        <HeroSection onLoginClick={() => setModalOpen(true)} />
        <AboutSection />
        <SocialProof />
      </main>
      <LoginModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />
    </>
  )
}