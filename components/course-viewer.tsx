"use client"

import { useState } from "react"
import { ArrowLeft, Globe, BookOpen } from "lucide-react"

interface CourseViewerProps {
  course: {
    id: number
    title: string
    description: string
    duration: string
    lessons: number
    language: string
    image: string
    pdfEn?: string
    pdfMn?: string
  }
  onBack: () => void
}

export default function CourseViewer({ course, onBack }: CourseViewerProps) {
  const [lang, setLang] = useState<"mn" | "en">("mn")

  const pdfUrl = lang === "mn" ? course.pdfMn : course.pdfEn
  const hasBothLangs = course.pdfEn && course.pdfMn

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        marginBottom: "20px", flexWrap: "wrap", gap: "12px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={onBack}
            style={{
              display: "flex", alignItems: "center", gap: "6px",
              background: "none", border: "1px solid #dce9ec", borderRadius: "8px",
              padding: "8px 14px", cursor: "pointer", color: "#517882",
              fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s"
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0e7490"; e.currentTarget.style.color = "#0e7490" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#dce9ec"; e.currentTarget.style.color = "#517882" }}
          >
            <ArrowLeft size={14} /> Буцах
          </button>
          <div>
            <h2 style={{
              fontFamily: "'Lora', Georgia, serif", fontSize: "1.2rem",
              fontWeight: 600, color: "#0d2b33", margin: 0
            }}>
              {course.title}
            </h2>
            <p style={{ fontSize: "0.75rem", color: "#8aacb4", margin: "2px 0 0" }}>
              NCLEX-RN · Хичээлийн материал
            </p>
          </div>
        </div>

        {/* Language toggle */}
        {hasBothLangs && (
          <div style={{ display: "flex", background: "#eef3f5", borderRadius: "10px", padding: "3px" }}>
            {(["mn", "en"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  padding: "7px 18px", borderRadius: "8px", border: "none",
                  fontSize: "0.82rem", fontWeight: 600, cursor: "pointer",
                  background: lang === l ? "#fff" : "transparent",
                  color: lang === l ? "#0d2b33" : "#7a9ea7",
                  boxShadow: lang === l ? "0 1px 4px rgba(14,116,144,0.1)" : "none",
                  transition: "all 0.2s"
                }}
              >
                <Globe size={13} />
                {l === "mn" ? "Монгол" : "English"}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* PDF Viewer */}
      <div style={{
        background: "#fff", border: "1px solid #dce9ec", borderRadius: "16px",
        overflow: "hidden", boxShadow: "0 2px 12px rgba(14,116,144,0.06)"
      }}>
        {/* PDF header bar */}
        <div style={{
          background: "linear-gradient(135deg, #0d2b33 0%, #0e4a5c 100%)",
          padding: "16px 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: "rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              <BookOpen size={16} color="rgba(255,255,255,0.8)" />
            </div>
            <div>
              <p style={{ margin: 0, fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                NCLEX-RN · Хичээлийн материал
              </p>
              <p style={{ margin: 0, fontSize: "0.88rem", fontWeight: 600, color: "#fff", fontFamily: "'Lora', serif" }}>
                {course.title}
              </p>
            </div>
          </div>
          <span style={{
            background: lang === "mn" ? "rgba(14,116,144,0.6)" : "rgba(29,111,164,0.6)",
            border: `1px solid ${lang === "mn" ? "rgba(14,116,144,0.8)" : "rgba(29,111,164,0.8)"}`,
            color: "#fff", fontSize: "0.7rem", fontWeight: 700,
            padding: "4px 12px", borderRadius: "99px", letterSpacing: "0.08em"
          }}>
            {lang === "mn" ? "МОНГОЛ" : "ENGLISH"}
          </span>
        </div>

        {pdfUrl ? (
          <iframe
            key={pdfUrl}
            src={pdfUrl}
            style={{ width: "100%", height: "78vh", border: "none", display: "block" }}
            title={`${course.title} - ${lang === "mn" ? "Монгол" : "English"}`}
          />
        ) : (
          <div style={{
            height: "300px", display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "12px"
          }}>
            <Globe size={28} color="#c8dde2" />
            <p style={{ fontSize: "0.85rem", color: "#8aacb4", margin: 0 }}>
              PDF файл олдсонгүй
            </p>
          </div>
        )}
      </div>
    </div>
  )
}