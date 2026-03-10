"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import SocialProof from "@/components/social-proof"
import AboutSection from "@/components/about-section"
import Footer from "@/components/footer"
import LoginModal from "@/components/login-modal"

export default function LandingPage() {
  const [loginOpen, setLoginOpen] = useState(false)

  return (
    <>
      <Navbar onLoginClick={() => setLoginOpen(true)} />
      <main>
        <HeroSection onLoginClick={() => setLoginOpen(true)} />
        <SocialProof />
        <AboutSection />
      </main>
      <Footer />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  )
}
