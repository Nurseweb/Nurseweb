"use client"

import { useState, useEffect, useRef } from "react"
import { BookOpen, Brain, Target, Award } from "lucide-react"

const features = [
  { icon: BookOpen, title: "Системтэй агуулга", description: "Ном, хичээлүүд, загвар тестүүд, кейс анализ — шат дараалсан сургалтын төлөвлөгөө бүхий иж бүрэн контент." },
  { icon: Brain, title: "Клиник сэтгэхүй", description: "NCLEX-ийн логик бүтэц, асуулт задлах аргачлалыг монгол хэлээр орчуулан клиник шийдвэр гаргах чадвар хөгжүүлнэ." },
  { icon: Target, title: "Бодит туршлага", description: "АНУ-д ажиллаж буй RN-ийн бодит клиник мэдлэг, АНУ-ын сувилахуйн боловсролын орчин бодит жишээгээр." },
  { icon: Award, title: "Батлагдсан үр дүн", description: "Зөвхөн шалгалт биш — олон улсын карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, мэргэжлийн чадвар." },
]

// Custom hook: element viewport-д орох үед trigger хийнэ
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect() } },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

// Animation style helper
function anim(inView: boolean, delay = 0, direction: "up" | "left" | "right" | "scale" = "up"): React.CSSProperties {
  const transforms: Record<string, string> = {
    up: "translateY(32px)",
    left: "translateX(-32px)",
    right: "translateX(32px)",
    scale: "scale(0.94) translateY(16px)",
  }
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : transforms[direction],
    transition: `opacity 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.7s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  }
}

export default function AboutSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  const sec1 = useInView()
  const sec2 = useInView()
  const sec3 = useInView()

  return (
    <section id="about" style={{ padding: "120px 24px", background: "#f8fafb", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        .feat-card { transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease; }
        .feat-card:hover { box-shadow: 0 12px 40px rgba(14,116,144,0.12); border-color: rgba(14,116,144,0.3) !important; transform: translateY(-4px); }
        .philosophy-line:not(:last-child) { border-bottom: 1px solid #e8f0f2; }
        .stat-card { transition: box-shadow 0.2s, transform 0.2s; }
        .stat-card:hover { box-shadow: 0 8px 28px rgba(14,116,144,0.1); transform: translateY(-2px); }
        @keyframes countUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:none; } }
        .count-anim { animation: countUp 0.6s cubic-bezier(0.22,1,0.36,1) both; }
      `}</style>

      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

        {/* ── Section 1: Image + Intro ── */}
        <div ref={sec1.ref} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "72px", alignItems: "center", marginBottom: "96px" }}>

          {/* Image — slides from left */}
          <div style={{ ...anim(sec1.inView, 0, "left"), position: "relative" }}>
            <div style={{ borderRadius: "20px", overflow: "hidden", aspectRatio: "4/3", position: "relative", boxShadow: "0 24px 64px rgba(13,43,51,0.12)" }}>
              <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80" alt="Nurse studying"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(14,116,144,0.08) 0%, transparent 60%)" }} />
              {/* Corner accent */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "32px", height: "32px", borderTop: "2px solid rgba(34,184,209,0.5)", borderLeft: "2px solid rgba(34,184,209,0.5)", borderRadius: "2px 0 0 0" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "32px", borderBottom: "2px solid rgba(34,184,209,0.5)", borderRight: "2px solid rgba(34,184,209,0.5)", borderRadius: "0 0 2px 0" }} />
            </div>
            {/* Floating badge */}
            <div style={{ position: "absolute", bottom: "-20px", right: "-20px", background: "#fff", border: "1px solid #dce9ec", borderRadius: "14px", padding: "16px 22px", boxShadow: "0 12px 40px rgba(14,116,144,0.14)", textAlign: "center", minWidth: "130px" }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#0e7490", margin: "0 0 2px", lineHeight: 1 }}>95%</p>
              <p style={{ fontSize: "0.7rem", color: "#8aacb4", margin: 0, fontWeight: 500 }}>NCLEX тэнцэлт</p>
            </div>
          </div>

          {/* Text — slides from right */}
          <div>
            <div style={anim(sec1.inView, 0.1, "right")}>
              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0e7490", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: "18px" }}>
                <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#0e7490" }} />
                Бидний тухай
              </span>
            </div>

            <h2 style={{ ...anim(sec1.inView, 0.16, "right"), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, color: "#0d2b33", margin: "0 0 0", letterSpacing: "-0.015em" }}>
              Монгол сувилагчийн
            </h2>
            <h2 style={{ ...anim(sec1.inView, 0.21, "right"), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.2, color: "#0e7490", margin: "0 0 24px", letterSpacing: "-0.015em" }}>
              олон улсын замнал
            </h2>

            <div style={{ ...anim(sec1.inView, 0.24, "right"), display: "flex", alignItems: "center", gap: "10px", marginBottom: "22px" }}>
              <div style={{ width: "36px", height: "1.5px", background: "linear-gradient(90deg, #0e7490, #22b8d1)", borderRadius: "2px" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22b8d1", opacity: 0.6 }} />
            </div>

            <p style={{ ...anim(sec1.inView, 0.28, "right"), fontSize: "0.95rem", color: "#517882", lineHeight: 1.85, margin: "0 0 12px" }}>
              Манай NCLEX-RN бэлтгэлийн платформ нь АНУ-д мэргэжлээрээ амжилттай ажиллаж буй, Монгол Улсад сувилахуйн боловсрол эзэмшсэн Registered Nurse-ийн бодит клиник туршлага дээр үндэслэн бүтээгдсэн.
            </p>
            <p style={{ ...anim(sec1.inView, 0.31, "right"), fontSize: "0.95rem", color: "#517882", lineHeight: 1.85, margin: "0 0 28px" }}>
              Бид Монгол дахь сувилагчдыг NCLEX шалгалтад бэлтгэхдээ цаг хугацаа, санхүүгийн нөөцөө хамгийн үр ашигтайгаар зарцуулж, зөв стратегиар, системтэй суралцах боломжийг бүрдүүлэхийг зорьдог.
            </p>

            <div style={{ ...anim(sec1.inView, 0.36, "right"), display: "flex", gap: "16px" }}>
              {[{ val: "500 +", label: "Бэлтгэгдсэн сувилагч" }, { val: "700 +", label: "Дасгал асуулт" }].map(({ val, label }) => (
                <div key={label} className={`stat-card ${sec1.inView ? "count-anim" : ""}`}
                  style={{ flex: 1, padding: "16px 20px", background: "#fff", border: "1px solid #dce9ec", borderRadius: "12px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 3px", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 2: Philosophy ── */}
        <div ref={sec2.ref} style={{ ...anim(sec2.inView, 0, "scale"), display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0", marginBottom: "80px", background: "#fff", border: "1px solid #dce9ec", borderRadius: "24px", overflow: "hidden", boxShadow: "0 4px 32px rgba(14,116,144,0.06)" }}>

          {/* Dark left */}
          <div style={{ background: "linear-gradient(145deg, #0d2b33 0%, #0e4a5c 100%)", padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <span style={{ fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.4)", letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: "20px" }}>
                Манай философи
              </span>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.55rem", fontWeight: 600, color: "#fff", lineHeight: 1.35, margin: "0 0 20px" }}>
                Бид амар хялбар зам амлахыг зорьдоггүй.
              </h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.85, margin: 0 }}>
                Харин бодит шалгууртай, хариуцлагатай, тууштай суралцахад чиглэсэн мэргэжлийн чиг баримжааг санал болгодог.
              </p>
            </div>
            <div style={{ marginTop: "36px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, margin: 0 }}>
                "NCLEX-д амжилттай тэнцэх таны замнал манай платформоор эхэлнэ."
              </p>
            </div>
          </div>

          {/* Right pillars */}
          <div style={{ padding: "48px 40px 48px 36px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "0.88rem", color: "#517882", lineHeight: 1.8, margin: "0 0 28px" }}>
              Энэ платформ нь зөвхөн шалгалтанд тэнцүүлэх бус, олон улсын сувилагчийн карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, клиник шийдвэр гаргах чадварыг хөгжүүлэхэд чиглэнэ.
            </p>
            {[
              { num: "01", title: "Нотолгоонд суурилсан мэдлэг", body: "Шинжлэх ухааны үндэслэлтэй, баталгаат арга зүйд тулгуурласан сургалтын агуулга." },
              { num: "02", title: "Бодит практик дасгал", body: "Кейс анализ, загвар тест, клиник нөхцөл байдлыг дуурайсан дасгалуудаар ур чадвараа бататгана." },
              { num: "03", title: "Тасралтгүй ахиц дэвшил", body: "Суралцагч бүр өөрийн түвшинд тохируулан үр дүнтэй ахиулах боломжтой бүтэц, систем." },
            ].map(({ num, title, body }, i) => (
              <div key={num} className="philosophy-line" style={{ ...anim(sec2.inView, 0.15 + i * 0.1, "right"), padding: "18px 0", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.78rem", fontStyle: "italic", color: "#0e7490", opacity: 0.5, minWidth: "22px", paddingTop: "2px" }}>{num}</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 3px" }}>{title}</p>
                  <p style={{ fontSize: "0.8rem", color: "#7a9ea7", lineHeight: 1.65, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: Feature cards ── */}
        <div ref={sec3.ref} style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {features.map(({ icon: Icon, title, description }, i) => (
            <div key={title} className="feat-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ ...anim(sec3.inView, i * 0.1, "up"), background: "#fff", border: "1px solid #dce9ec", borderRadius: "16px", padding: "26px 22px", cursor: "default" }}
            >
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: hovered === i ? "#0e7490" : "rgba(14,116,144,0.08)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px", transition: "background 0.25s ease" }}>
                <Icon size={18} color={hovered === i ? "#fff" : "#0e7490"} style={{ transition: "color 0.25s" }} />
              </div>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: "0.8rem", color: "#7a9ea7", lineHeight: 1.72, margin: 0 }}>{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}