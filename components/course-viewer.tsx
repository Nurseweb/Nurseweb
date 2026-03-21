"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { ArrowLeft, Globe, BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react"

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
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.3)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [isMobile, setIsMobile] = useState(false)

  // Desktop: single page view
  const [currentPage, setCurrentPage] = useState(1)
  const [inputPage, setInputPage] = useState("1")
  const [thumbnails, setThumbnails] = useState<string[]>([])
  const mainCanvasRef = useRef<HTMLCanvasElement>(null)
  const thumbsRef = useRef<HTMLDivElement>(null)
  const renderTaskRef = useRef<any>(null)

  // Mobile: all pages rendered
  const mobileCanvasRefs = useRef<(HTMLCanvasElement | null)[]>([])
  const mobileRenderDoneRef = useRef<boolean[]>([])

  const pdfJsLoadedRef = useRef(false)

  const pdfUrl = lang === "mn" ? course.pdfMn : course.pdfEn
  const hasBothLangs = course.pdfEn && course.pdfMn

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Load pdf.js
  const loadPdfJs = useCallback((): Promise<any> => {
    return new Promise((resolve, reject) => {
      if (pdfJsLoadedRef.current && (window as any).pdfjsLib) {
        resolve((window as any).pdfjsLib); return
      }
      const existing = document.querySelector('script[data-pdfjs]')
      if (existing) {
        const lib = (window as any).pdfjsLib
        if (lib) { resolve(lib); return }
        existing.addEventListener('load', () => resolve((window as any).pdfjsLib))
        return
      }
      const script = document.createElement("script")
      script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"
      script.setAttribute('data-pdfjs', '1')
      script.onload = () => {
        const lib = (window as any).pdfjsLib
        lib.GlobalWorkerOptions.workerSrc =
          "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"
        pdfJsLoadedRef.current = true
        resolve(lib)
      }
      script.onerror = () => reject(new Error("pdf.js ачааллаж чадсангүй"))
      document.head.appendChild(script)
    })
  }, [])

  // Load PDF
  useEffect(() => {
    if (!pdfUrl) return
    let cancelled = false
    setLoading(true)
    setError("")
    setPdfDoc(null)
    setThumbnails([])
    setCurrentPage(1)
    setInputPage("1")
    setTotalPages(0)
    mobileRenderDoneRef.current = []

    const load = async () => {
      try {
        const pdfjsLib = await loadPdfJs()
        if (cancelled) return
        const doc = await pdfjsLib.getDocument({ url: pdfUrl }).promise
        if (cancelled) return
        setPdfDoc(doc)
        setTotalPages(doc.numPages)
        mobileRenderDoneRef.current = new Array(doc.numPages).fill(false)
        setLoading(false)

        // Desktop thumbnails
        for (let i = 1; i <= doc.numPages; i++) {
          if (cancelled) break
          try {
            const page = await doc.getPage(i)
            const vp = page.getViewport({ scale: 0.2 })
            const c = document.createElement("canvas")
            c.width = vp.width; c.height = vp.height
            await page.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise
            if (!cancelled) setThumbnails(prev => [...prev, c.toDataURL()])
          } catch {}
        }
      } catch (e: any) {
        if (!cancelled) { setError(e.message || "PDF ачааллахад алдаа гарлаа"); setLoading(false) }
      }
    }
    load()
    return () => { cancelled = true }
  }, [pdfUrl, loadPdfJs])

  // Desktop: render single page
  const renderPage = useCallback(async () => {
    if (!pdfDoc || !mainCanvasRef.current || isMobile) return
    if (renderTaskRef.current) { try { renderTaskRef.current.cancel() } catch {} }
    try {
      const page = await pdfDoc.getPage(currentPage)
      const viewport = page.getViewport({ scale })
      const canvas = mainCanvasRef.current
      if (!canvas) return
      canvas.width = viewport.width
      canvas.height = viewport.height
      const task = page.render({ canvasContext: canvas.getContext("2d")!, viewport })
      renderTaskRef.current = task
      await task.promise
    } catch (e: any) {
      if (e?.name !== "RenderingCancelledException") console.error(e)
    }
  }, [pdfDoc, currentPage, scale, isMobile])

  useEffect(() => { if (!isMobile) renderPage() }, [renderPage, isMobile])

  // Mobile: render all pages sequentially
  useEffect(() => {
    if (!pdfDoc || !isMobile || totalPages === 0) return
    let cancelled = false

    const renderAll = async () => {
      for (let i = 1; i <= totalPages; i++) {
        if (cancelled) break
        if (mobileRenderDoneRef.current[i - 1]) continue
        const canvas = mobileCanvasRefs.current[i - 1]
        if (!canvas) continue
        try {
          const page = await pdfDoc.getPage(i)
          const mobileScale = (window.innerWidth - 32) / (page.getViewport({ scale: 1 }).width)
          const viewport = page.getViewport({ scale: Math.min(mobileScale, 2) })
          canvas.width = viewport.width
          canvas.height = viewport.height
          await page.render({ canvasContext: canvas.getContext("2d")!, viewport }).promise
          if (!cancelled) mobileRenderDoneRef.current[i - 1] = true
        } catch {}
      }
    }
    renderAll()
    return () => { cancelled = true }
  }, [pdfDoc, isMobile, totalPages])

  // Desktop scroll thumb
  useEffect(() => {
    if (isMobile) return
    setInputPage(String(currentPage))
    if (thumbsRef.current) {
      const el = thumbsRef.current.querySelector(`[data-page="${currentPage}"]`) as HTMLElement
      el?.scrollIntoView({ behavior: "smooth", block: "nearest" })
    }
  }, [currentPage, isMobile])

  const goToPage = (p: number) => {
    const c = Math.max(1, Math.min(p, totalPages || 1))
    setCurrentPage(c)
  }

  // ── MOBILE VIEW ──
  if (isMobile) {
    return (
      <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>

        {/* Mobile top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px", gap: "8px" }}>
          <button onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: "5px", background: "none", border: "1px solid #dce9ec", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", color: "#517882", fontSize: "0.8rem", fontWeight: 600, flexShrink: 0 }}>
            <ArrowLeft size={14} /> Буцах
          </button>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: "0.95rem", fontWeight: 600, color: "#0d2b33", margin: 0, flex: 1, textAlign: "center" }}>
            {course.title}
          </h2>
          {hasBothLangs && (
            <div style={{ display: "flex", background: "#eef3f5", borderRadius: "8px", padding: "2px", flexShrink: 0 }}>
              {(["mn", "en"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ padding: "5px 10px", borderRadius: "6px", border: "none", fontSize: "0.72rem", fontWeight: 600, cursor: "pointer", background: lang === l ? "#fff" : "transparent", color: lang === l ? "#0d2b33" : "#7a9ea7", transition: "all 0.2s" }}>
                  {l === "mn" ? "МН" : "EN"}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Mobile: pages stacked vertically */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", padding: "60px 0" }}>
            <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid #dce9ec", borderTopColor: "#0e7490", animation: "spin 0.8s linear infinite" }} />
            <p style={{ fontSize: "0.82rem", color: "#517882", margin: 0 }}>PDF ачаалж байна...</p>
          </div>
        ) : error ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ color: "#b91c1c", fontSize: "0.85rem" }}>{error}</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {Array.from({ length: totalPages }, (_, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: "10px", overflow: "hidden", boxShadow: "0 2px 8px rgba(13,43,51,0.08)", border: "1px solid #e8f0f2" }}>
                {/* Page number badge */}
                <div style={{ padding: "6px 12px", background: "#f8fafb", borderBottom: "1px solid #e8f0f2", fontSize: "0.68rem", fontWeight: 600, color: "#8aacb4", letterSpacing: "0.05em" }}>
                  {i + 1} / {totalPages}
                </div>
                <canvas
                  ref={el => { mobileCanvasRefs.current[i] = el }}
                  style={{ width: "100%", display: "block", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    )
  }

  // ── DESKTOP VIEW ──
  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
        .cv-thumb::-webkit-scrollbar{width:3px}
        .cv-thumb::-webkit-scrollbar-thumb{background:#c8dde2;border-radius:99px}
        .cv-scroll::-webkit-scrollbar{width:4px;height:4px}
        .cv-scroll::-webkit-scrollbar-thumb{background:#c8dde2;border-radius:99px}
      `}</style>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "14px", flexWrap: "wrap", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button onClick={onBack}
            style={{ display: "flex", alignItems: "center", gap: "6px", background: "none", border: "1px solid #dce9ec", borderRadius: "8px", padding: "8px 14px", cursor: "pointer", color: "#517882", fontSize: "0.82rem", fontWeight: 600, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#0e7490"; e.currentTarget.style.color = "#0e7490" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#dce9ec"; e.currentTarget.style.color = "#517882" }}>
            <ArrowLeft size={14} /> Буцах
          </button>
          <div>
            <h2 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.1rem", fontWeight: 600, color: "#0d2b33", margin: 0 }}>{course.title}</h2>
            <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: "2px 0 0" }}>NCLEX-RN · Хичээлийн материал</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {/* Zoom */}
          <div style={{ display: "flex", alignItems: "center", gap: "2px", background: "#f0f6f8", borderRadius: "9px", padding: "3px 6px" }}>
            <button onClick={() => setScale(s => Math.max(0.5, parseFloat((s - 0.2).toFixed(1))))}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#517882", display: "flex", padding: "4px" }}>
              <ZoomOut size={15} />
            </button>
            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#0d2b33", minWidth: "38px", textAlign: "center" }}>
              {Math.round(scale * 100)}%
            </span>
            <button onClick={() => setScale(s => Math.min(3, parseFloat((s + 0.2).toFixed(1))))}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#517882", display: "flex", padding: "4px" }}>
              <ZoomIn size={15} />
            </button>
          </div>

          {/* Page nav */}
          {totalPages > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: "2px", background: "#f0f6f8", borderRadius: "9px", padding: "3px 6px" }}>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                style={{ background: "none", border: "none", cursor: currentPage <= 1 ? "not-allowed" : "pointer", color: currentPage <= 1 ? "#c8dde2" : "#0e7490", display: "flex", padding: "4px" }}>
                <ChevronLeft size={16} />
              </button>
              <input value={inputPage}
                onChange={e => setInputPage(e.target.value)}
                onBlur={() => goToPage(parseInt(inputPage) || 1)}
                onKeyDown={e => e.key === "Enter" && goToPage(parseInt(inputPage) || 1)}
                style={{ width: "34px", textAlign: "center", border: "none", background: "transparent", fontSize: "0.8rem", fontWeight: 600, color: "#0d2b33", outline: "none", fontFamily: "'DM Sans', sans-serif" }} />
              <span style={{ fontSize: "0.75rem", color: "#8aacb4" }}>/ {totalPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}
                style={{ background: "none", border: "none", cursor: currentPage >= totalPages ? "not-allowed" : "pointer", color: currentPage >= totalPages ? "#c8dde2" : "#0e7490", display: "flex", padding: "4px" }}>
                <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* Language toggle */}
          {hasBothLangs && (
            <div style={{ display: "flex", background: "#eef3f5", borderRadius: "10px", padding: "3px" }}>
              {(["mn", "en"] as const).map(l => (
                <button key={l} onClick={() => setLang(l)}
                  style={{ display: "flex", alignItems: "center", gap: "4px", padding: "6px 14px", borderRadius: "7px", border: "none", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", background: lang === l ? "#fff" : "transparent", color: lang === l ? "#0d2b33" : "#7a9ea7", boxShadow: lang === l ? "0 1px 4px rgba(14,116,144,0.1)" : "none", transition: "all 0.2s" }}>
                  <Globe size={12} />{l === "mn" ? "Монгол" : "English"}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop viewer */}
      <div style={{ display: "flex", height: "calc(100vh - 210px)", minHeight: "500px", background: "#fff", border: "1px solid #dce9ec", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 16px rgba(14,116,144,0.07)" }}>
        {/* Thumbnails */}
        <div ref={thumbsRef} className="cv-thumb"
          style={{ width: "108px", flexShrink: 0, overflowY: "auto", background: "#f8fafb", borderRight: "1px solid #e8f0f2", padding: "10px 7px", display: "flex", flexDirection: "column", gap: "7px" }}>
          {thumbnails.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ borderRadius: "5px", background: "#e4eef1", aspectRatio: "3/4", animation: "pulse 1.5s ease-in-out infinite", animationDelay: `${i * 0.15}s` }} />
              ))
            : thumbnails.map((src, idx) => {
                const p = idx + 1; const isActive = p === currentPage
                return (
                  <button key={p} data-page={p} onClick={() => goToPage(p)}
                    style={{ background: isActive ? "#e8f4f7" : "none", border: `2px solid ${isActive ? "#0e7490" : "transparent"}`, borderRadius: "6px", padding: "2px", cursor: "pointer", transition: "all 0.15s" }}>
                    <img src={src} alt={`${p}`} style={{ width: "100%", borderRadius: "3px", display: "block" }} />
                    <span style={{ display: "block", textAlign: "center", fontSize: "0.62rem", color: isActive ? "#0e7490" : "#8aacb4", fontWeight: isActive ? 700 : 400, marginTop: "2px" }}>{p}</span>
                  </button>
                )
              })}
        </div>

        {/* Canvas */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
          <div style={{ background: "linear-gradient(135deg, #0d2b33 0%, #0e4a5c 100%)", padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <BookOpen size={13} color="rgba(255,255,255,0.65)" />
              <p style={{ margin: 0, fontSize: "0.83rem", fontWeight: 600, color: "#fff", fontFamily: "'Lora', serif" }}>{course.title}</p>
            </div>
            <span style={{ background: lang === "mn" ? "rgba(14,116,144,0.5)" : "rgba(29,111,164,0.5)", color: "#fff", fontSize: "0.65rem", fontWeight: 700, padding: "3px 9px", borderRadius: "99px", letterSpacing: "0.08em" }}>
              {lang === "mn" ? "МОНГОЛ" : "ENGLISH"}
            </span>
          </div>

          <div className="cv-scroll" style={{ flex: 1, overflowY: "auto", overflowX: "auto", background: "#dde8eb", display: "flex", justifyContent: "center", alignItems: "flex-start", padding: "20px 12px" }}>
            {loading ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px", minHeight: "300px", width: "100%" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", border: "3px solid #dce9ec", borderTopColor: "#0e7490", animation: "spin 0.8s linear infinite" }} />
                <p style={{ fontSize: "0.82rem", color: "#517882", margin: 0 }}>PDF ачаалж байна...</p>
              </div>
            ) : error ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", minHeight: "300px", justifyContent: "center", width: "100%" }}>
                <p style={{ fontSize: "0.85rem", color: "#b91c1c", margin: 0 }}>{error}</p>
              </div>
            ) : (
              <canvas ref={mainCanvasRef} style={{ borderRadius: "6px", boxShadow: "0 4px 24px rgba(13,43,51,0.2)", maxWidth: "100%", display: "block", WebkitUserSelect: "none", userSelect: "none", pointerEvents: "none" }} />
            )}
          </div>

          {totalPages > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", padding: "10px 16px", background: "#f8fafb", borderTop: "1px solid #e8f0f2", flexShrink: 0 }}>
              <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage <= 1}
                style={{ display: "flex", alignItems: "center", gap: "5px", background: currentPage <= 1 ? "#f0f6f8" : "#0e7490", color: currentPage <= 1 ? "#c8dde2" : "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "0.78rem", fontWeight: 600, cursor: currentPage <= 1 ? "not-allowed" : "pointer" }}>
                <ChevronLeft size={14} /> Өмнөх
              </button>
              <span style={{ fontSize: "0.78rem", color: "#517882", fontWeight: 500, minWidth: "70px", textAlign: "center" }}>{currentPage} / {totalPages}</span>
              <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage >= totalPages}
                style={{ display: "flex", alignItems: "center", gap: "5px", background: currentPage >= totalPages ? "#f0f6f8" : "#0e7490", color: currentPage >= totalPages ? "#c8dde2" : "#fff", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "0.78rem", fontWeight: 600, cursor: currentPage >= totalPages ? "not-allowed" : "pointer" }}>
                Дараах <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}