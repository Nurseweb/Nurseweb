import { useState, useEffect } from "react"

const images = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
]

function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true)
      setTimeout(() => {
        setCurrent(prev => (prev + 1) % images.length)
        setTransitioning(false)
      }, 500)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const goTo = (idx: number) => {
    if (idx === current) return
    setTransitioning(true)
    setTimeout(() => {
      setCurrent(idx)
      setTransitioning(false)
    }, 400)
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Main image */}
      <div style={{
        borderRadius: "20px",
        overflow: "hidden",
        aspectRatio: "4/5",
        position: "relative",
        background: "#e0eef2",
      }}>
        <img
          src={images[current]}
          alt="medical"
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", display: "block",
            opacity: transitioning ? 0 : 1,
            transform: transitioning ? "scale(1.03)" : "scale(1)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}
        />
        {/* Subtle gradient overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to bottom, transparent 50%, rgba(13,43,51,0.35) 100%)",
          pointerEvents: "none",
        }} />

        {/* Dots */}
        <div style={{
          position: "absolute", bottom: "18px", left: "50%",
          transform: "translateX(-50%)",
          display: "flex", gap: "7px",
        }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: i === current ? "20px" : "6px",
                height: "6px",
                borderRadius: "99px",
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none", cursor: "pointer", padding: 0,
                transition: "width 0.35s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating card */}
      <div style={{
        position: "absolute", top: "28px", left: "-24px",
        background: "#fff",
        border: "1px solid #dce9ec",
        borderRadius: "12px",
        padding: "14px 18px",
        boxShadow: "0 8px 32px rgba(14,116,144,0.12)",
        minWidth: "148px",
      }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "1.6rem", fontWeight: 600,
          color: "#0e7490", margin: "0 0 2px", lineHeight: 1,
        }}>95%</p>
        <p style={{ fontSize: "0.7rem", color: "#8aacb4", margin: 0, fontWeight: 500 }}>
          NCLEX тэнцэлтийн хувь
        </p>
      </div>

      {/* Second floating card */}
      <div style={{
        position: "absolute", bottom: "52px", right: "-20px",
        background: "#fff",
        border: "1px solid #dce9ec",
        borderRadius: "12px",
        padding: "14px 18px",
        boxShadow: "0 8px 32px rgba(14,116,144,0.12)",
        minWidth: "136px",
      }}>
        <p style={{
          fontFamily: "'Lora', Georgia, serif",
          fontSize: "1.6rem", fontWeight: 600,
          color: "#0d2b33", margin: "0 0 2px", lineHeight: 1,
        }}>500+</p>
        <p style={{ fontSize: "0.7rem", color: "#8aacb4", margin: 0, fontWeight: 500 }}>
          Бэлтгэгдсэн сувилагч
        </p>
      </div>
    </div>
  )
}

function AnimatedBackground() {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none" }}>
      <style>{`
        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,-20px) scale(1.05)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-25px,30px) scale(0.97)} }
        .orb1{animation:drift1 12s ease-in-out infinite}
        .orb2{animation:drift2 16s ease-in-out infinite}
      `}</style>
      <div className="orb1" style={{ position:"absolute", top:"10%", left:"5%", width:"480px", height:"480px", borderRadius:"50%", background:"radial-gradient(circle, rgba(14,116,144,0.06) 0%, transparent 70%)", filter:"blur(40px)" }} />
      <div className="orb2" style={{ position:"absolute", bottom:"10%", right:"5%", width:"400px", height:"400px", borderRadius:"50%", background:"radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)", filter:"blur(40px)" }} />
      <div style={{ position:"absolute", inset:0, backgroundImage:`linear-gradient(rgba(14,116,144,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(14,116,144,0.04) 1px, transparent 1px)`, backgroundSize:"64px 64px" }} />
    </div>
  )
}

export default function HeroSection({ onLoginClick }: { onLoginClick: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
  })

  return (
    <>
      <AnimatedBackground />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');
        .cta-primary { background:#0e7490; color:#fff; border:none; border-radius:8px; padding:13px 28px; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:600; cursor:pointer; transition:background 0.2s, box-shadow 0.2s, transform 0.2s; }
        .cta-primary:hover { background:#0c6783; box-shadow:0 6px 24px rgba(14,116,144,0.28); transform:translateY(-1px); }
        .cta-ghost { background:transparent; color:#4a7c8a; border:1.5px solid #c5d9de; border-radius:8px; padding:12px 24px; font-family:'DM Sans',sans-serif; font-size:0.9rem; font-weight:500; cursor:pointer; transition:border-color 0.2s, color 0.2s; }
        .cta-ghost:hover { border-color:#0e7490; color:#0e7490; }
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .hero-text { text-align: center !important; align-items: center !important; }
        }
      `}</style>

      <section style={{
        minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "100px 40px 80px",
        fontFamily: "'DM Sans', sans-serif",
      }}>
        <div
          className="hero-grid"
          style={{
            maxWidth: "1080px", width: "100%",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* LEFT — text */}
          <div
            className="hero-text"
            style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
          >
            {/* Eyebrow */}
            <div style={{ ...fade(0), marginBottom: "24px" }}>
              <span style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(14,116,144,0.07)",
                border: "1px solid rgba(14,116,144,0.15)",
                borderRadius: "99px", padding: "5px 14px 5px 10px",
                fontSize: "0.75rem", fontWeight: 600,
                color: "#0e7490", letterSpacing: "0.05em",
              }}>
                <span style={{ background:"#0e7490", color:"#fff", borderRadius:"99px", padding:"1px 8px", fontSize:"0.68rem", fontWeight:700, letterSpacing:"0.08em" }}>ШИНЭ</span>
                NCLEX-RN · 2026 бэлтгэл
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ ...fade(0.1), fontFamily:"'Lora',Georgia,serif", fontSize:"clamp(2.2rem,3.5vw,3.4rem)", fontWeight:600, lineHeight:1.2, color:"#0d2b33", margin:"0 0 4px", letterSpacing:"-0.015em" }}>
              Сувилахуй ухааны
            </h1>
            <h1 style={{ ...fade(0.16), fontFamily:"'Lora',Georgia,serif", fontSize:"clamp(2.2rem,3.5vw,3.4rem)", fontWeight:400, fontStyle:"italic", lineHeight:1.2, color:"#0e7490", margin:"0 0 24px", letterSpacing:"-0.015em" }}>
              мэдлэг олгох платформ
            </h1>

            {/* Rule */}
            <div style={{ ...fade(0.2), width:"36px", height:"1.5px", background:"#0e7490", opacity:0.45, borderRadius:"2px", marginBottom:"20px" }} />

            {/* Subtitle */}
            <p style={{ ...fade(0.26), fontSize:"0.95rem", color:"#517882", lineHeight:1.85, margin:"0 0 36px", fontWeight:400, maxWidth:"460px" }}>
              АНУ-д мэргэжлээрээ амжилттай ажиллаж буй Registered Nurse-ийн бодит клиник туршлага дээр үндэслэн бүтээгдсэн. Монгол хэлээр, системтэй, хариуцлагатайгаар бэлтгэх мэргэжлийн орчин.
            </p>

            {/* CTAs */}
            <div style={{ ...fade(0.33), display:"flex", gap:"10px", flexWrap:"wrap", marginBottom:"48px" }}>
              <button className="cta-primary" onClick={onLoginClick}>Бэлтгэл эхлэх</button>
              <button className="cta-ghost">Дэлгэрэнгүй үзэх</button>
            </div>

            {/* Bottom stats */}
            <div style={{ ...fade(0.42), borderTop:"1px solid #dce9ec", paddingTop:"28px", width:"100%" }}>
              <div style={{ display:"flex", gap:"28px", flexWrap:"wrap" }}>
                {[
                  { label:"Дасгал асуулт", val:"1,200+" },
                  { label:"Кейс анализ", val:"80+" },
                  { label:"Сургалтын модуль", val:"12" },
                ].map(({ label, val }) => (
                  <div key={label}>
                    <p style={{ fontFamily:"'Lora',Georgia,serif", fontSize:"1.4rem", fontWeight:600, color:"#0d2b33", margin:"0 0 2px", lineHeight:1 }}>{val}</p>
                    <p style={{ fontSize:"0.71rem", color:"#8aacb4", margin:0, fontWeight:500 }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — carousel */}
          <div style={{ ...fade(0.2), position: "relative", paddingLeft: "24px", paddingRight: "20px" }}>
            <ImageCarousel />
          </div>
        </div>
      </section>
    </>
  )
}