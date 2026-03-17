"use client"

import { useState, useEffect, useRef } from "react"

const images = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80",
]

const stats = [
  { val: "700+", label: "Дасгал асуулт" },
  { val: "80+",  label: "Кейс анализ"  },
  { val: "11",   label: "Бүлэг хичээл" },
]

function ImageCarousel() {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setCurrent(p => (p + 1) % images.length); setFading(false) }, 480)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const goTo = (i: number) => {
    if (i === current) return
    setFading(true)
    setTimeout(() => { setCurrent(i); setFading(false) }, 380)
  }

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {/* Frame with decorative corner lines */}
      <div style={{ position: "relative", borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", background: "#0d2b33" }}>
        {/* Corner accents */}
        {[
          { top: 0, left: 0, borderTop: "2px solid rgba(34,184,209,0.6)", borderLeft: "2px solid rgba(34,184,209,0.6)" },
          { top: 0, right: 0, borderTop: "2px solid rgba(34,184,209,0.6)", borderRight: "2px solid rgba(34,184,209,0.6)" },
          { bottom: 0, left: 0, borderBottom: "2px solid rgba(34,184,209,0.6)", borderLeft: "2px solid rgba(34,184,209,0.6)" },
          { bottom: 0, right: 0, borderBottom: "2px solid rgba(34,184,209,0.6)", borderRight: "2px solid rgba(34,184,209,0.6)" },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", zIndex: 3, width: "28px", height: "28px", ...s }} />
        ))}

        <img src={images[current]} alt="medical"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: fading ? 0 : 1, transform: fading ? "scale(1.04)" : "scale(1)", transition: "opacity 0.48s ease, transform 0.48s ease" }}
        />
        {/* Deep gradient */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(13,43,51,0.1) 0%, rgba(13,43,51,0.65) 100%)", zIndex: 1 }} />

        {/* Dots */}
        <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "7px", zIndex: 2 }}>
          {images.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? "22px" : "6px", height: "6px", borderRadius: "99px", background: i === current ? "#22b8d1" : "rgba(255,255,255,0.35)", border: "none", cursor: "pointer", padding: 0, transition: "width 0.35s ease, background 0.3s ease" }} />
          ))}
        </div>
      </div>

      {/* Floating card — top left */}
      <div style={{ position: "absolute", top: "32px", left: "-28px", background: "rgba(255,255,255,0.97)", backdropFilter: "blur(12px)", border: "1px solid rgba(14,116,144,0.15)", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 12px 40px rgba(14,116,144,0.14)", minWidth: "148px", zIndex: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
          <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22b8d1", boxShadow: "0 0 0 3px rgba(34,184,209,0.2)" }} />
          <span style={{ fontSize: "0.65rem", fontWeight: 700, color: "#0e7490", letterSpacing: "0.08em", textTransform: "uppercase" }}>Амжилт</span>
        </div>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.7rem", fontWeight: 600, color: "#0e7490", margin: "0 0 1px", lineHeight: 1 }}>95%</p>
        <p style={{ fontSize: "0.68rem", color: "#8aacb4", margin: 0, fontWeight: 500 }}>NCLEX тэнцэлтийн хувь</p>
      </div>

      {/* Floating card — bottom right */}
      <div style={{ position: "absolute", bottom: "56px", right: "-24px", background: "rgba(13,43,51,0.92)", backdropFilter: "blur(12px)", border: "1px solid rgba(34,184,209,0.2)", borderRadius: "14px", padding: "14px 18px", boxShadow: "0 12px 40px rgba(13,43,51,0.25)", minWidth: "140px", zIndex: 4 }}>
        <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.7rem", fontWeight: 600, color: "#fff", margin: "0 0 1px", lineHeight: 1 }}>500+</p>
        <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.45)", margin: 0, fontWeight: 500 }}>Бэлтгэгдсэн сувилагч</p>
      </div>
    </div>
  )
}

export default function HeroSection({ onLoginClick }: { onLoginClick: () => void }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t) }, [])

  const fade = (delay = 0): React.CSSProperties => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  })

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400;1,600&family=DM+Sans:wght@400;500;600&display=swap');

        :root {
          --teal: #0e7490;
          --teal-dark: #0d2b33;
          --teal-mid: #0e4a5c;
          --teal-light: #22b8d1;
          --muted: #517882;
          --border: #dce9ec;
          --bg: #f8fafb;
        }

        @keyframes drift1 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,-30px) scale(1.06)} }
        @keyframes drift2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-30px,40px) scale(0.96)} }
        @keyframes drift3 { 0%,100%{transform:translate(0,0) rotate(0deg)} 50%{transform:translate(20px,20px) rotate(8deg)} }
        @keyframes lineGrow { from{width:0} to{width:100%} }
        @keyframes floatBadge { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }

        .hero-orb1 { animation: drift1 14s ease-in-out infinite; }
        .hero-orb2 { animation: drift2 18s ease-in-out infinite; }
        .hero-orb3 { animation: drift3 22s ease-in-out infinite; }
        .float-badge { animation: floatBadge 4s ease-in-out infinite; }

        .cta-primary {
          background: var(--teal); color: #fff; border: none;
          border-radius: 10px; padding: 14px 32px;
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 600;
          cursor: pointer; letter-spacing: 0.01em;
          transition: background 0.2s, box-shadow 0.25s, transform 0.2s;
          position: relative; overflow: hidden;
        }
        .cta-primary::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
          transform: translateX(-100%); transition: transform 0.5s ease;
        }
        .cta-primary:hover::after { transform: translateX(100%); }
        .cta-primary:hover { background: #0c6783; box-shadow: 0 8px 28px rgba(14,116,144,0.32); transform: translateY(-1px); }

        .cta-ghost {
          background: transparent; color: var(--muted);
          border: 1.5px solid var(--border);
          border-radius: 10px; padding: 13px 28px;
          font-family: 'DM Sans', sans-serif; font-size: 0.92rem; font-weight: 500;
          cursor: pointer; transition: border-color 0.2s, color 0.2s, background 0.2s;
        }
        .cta-ghost:hover { border-color: var(--teal); color: var(--teal); background: rgba(14,116,144,0.04); }

        .stat-item { transition: transform 0.2s ease; }
        .stat-item:hover { transform: translateY(-2px); }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .hero-image-col { display: none !important; }
        }
      `}</style>

      {/* Animated background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
        <div className="hero-orb1" style={{ position: "absolute", top: "5%", left: "-5%", width: "560px", height: "560px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,116,144,0.07) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="hero-orb2" style={{ position: "absolute", bottom: "5%", right: "-5%", width: "480px", height: "480px", borderRadius: "50%", background: "radial-gradient(circle, rgba(34,184,209,0.055) 0%, transparent 65%)", filter: "blur(50px)" }} />
        <div className="hero-orb3" style={{ position: "absolute", top: "40%", left: "40%", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(14,116,144,0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />
        {/* Grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(14,116,144,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(14,116,144,0.035) 1px, transparent 1px)", backgroundSize: "72px 72px" }} />
        {/* Vignette */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(248,250,251,0.6) 100%)" }} />
      </div>

      <section style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "100px 40px 80px", fontFamily: "'DM Sans', sans-serif" }}>
        <div className="hero-grid" style={{ maxWidth: "1100px", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "96px", alignItems: "center" }}>

          {/* LEFT — Text */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

            {/* Eyebrow pill */}
            <div style={{ ...fade(0), marginBottom: "28px" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "9px", background: "rgba(14,116,144,0.07)", border: "1px solid rgba(14,116,144,0.18)", borderRadius: "99px", padding: "6px 16px 6px 8px", fontSize: "0.73rem", fontWeight: 600, color: "#0e7490", letterSpacing: "0.04em" }}>
                <span style={{ background: "linear-gradient(135deg, #0e7490, #22b8d1)", color: "#fff", borderRadius: "99px", padding: "2px 10px", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.09em" }}>ШИНЭ</span>
                NCLEX-RN ·  бэлтгэл
              </span>
            </div>

            {/* Heading */}
            <h1 style={{ ...fade(0.08), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(2.4rem, 3.8vw, 3.6rem)", fontWeight: 600, lineHeight: 1.18, color: "#0d2b33", margin: "0 0 0", letterSpacing: "-0.018em" }}>
              Сувилахуй ухааны
            </h1>
            <h1 style={{ ...fade(0.15), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(2.4rem, 3.8vw, 3.6rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.18, color: "#0e7490", margin: "0 0 28px", letterSpacing: "-0.018em" }}>
              мэдлэг олгох платформ
            </h1>

            {/* Decorative line */}
            <div style={{ ...fade(0.2), display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ width: "40px", height: "1.5px", background: "linear-gradient(90deg, #0e7490, #22b8d1)", borderRadius: "2px" }} />
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22b8d1", opacity: 0.6 }} />
            </div>

            {/* Subtitle */}
            <p style={{ ...fade(0.26), fontSize: "0.95rem", color: "#517882", lineHeight: 1.9, margin: "0 0 38px", maxWidth: "460px" }}>
              АНУ-д мэргэжлээрээ амжилттай ажиллаж буй Registered Nurse-ийн бодит клиник туршлага дээр үндэслэн бүтээгдсэн. Монгол хэлээр, системтэй, хариуцлагатайгаар бэлтгэх мэргэжлийн орчин.
            </p>

            {/* CTAs */}
            <div style={{ ...fade(0.33), display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "52px" }}>
              <button className="cta-primary" onClick={onLoginClick}>
                Бэлтгэл эхлэх
                <span style={{ marginLeft: "8px", opacity: 0.8 }}>→</span>
              </button>
              <button className="cta-ghost">Дэлгэрэнгүй үзэх</button>
            </div>

            {/* Stats */}
            <div style={{ ...fade(0.42), borderTop: "1px solid #dce9ec", paddingTop: "28px", width: "100%" }}>
              <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
                {stats.map(({ val, label }, i) => (
                  <div key={label} className="stat-item" style={{ animationDelay: `${i * 0.1}s` }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
                      <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.55rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 3px", lineHeight: 1 }}>{val}</p>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: "#8aacb4", margin: 0, fontWeight: 500, letterSpacing: "0.02em" }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — Image */}
          <div className="hero-image-col" style={{ ...fade(0.18), position: "relative", paddingLeft: "28px", paddingRight: "24px" }}>
            {/* Subtle backdrop glow */}
            <div style={{ position: "absolute", inset: "-20px", borderRadius: "40px", background: "radial-gradient(ellipse at center, rgba(14,116,144,0.08) 0%, transparent 70%)", zIndex: 0 }} />
            <div style={{ position: "relative", zIndex: 1 }} className="float-badge">
              <ImageCarousel />
            </div>
          </div>

        </div>
      </section>
    </>
  )
}