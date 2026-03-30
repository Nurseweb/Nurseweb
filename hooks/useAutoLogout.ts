"use client"

import { useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"

const TIMEOUT_MS = 5 * 60 * 1000 // 5 минут

export function useAutoLogout() {
  const router = useRouter()
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const logout = useCallback(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    window.dispatchEvent(new Event("auth-change"))
    router.push("/")
  }, [router])

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(logout, TIMEOUT_MS)
  }, [logout])

  useEffect(() => {
    // Хэрэглэгч нэвтрээгүй бол hook ажиллахгүй
    const token = localStorage.getItem("token")
    if (!token) return

    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"]

    events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }))
    resetTimer() // эхний timer

    return () => {
      events.forEach(e => window.removeEventListener(e, resetTimer))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer])
}