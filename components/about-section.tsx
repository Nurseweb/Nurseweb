import { useState, useEffect } from "react"
import { BookOpen, Brain, Target, Award } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Системтэй агуулга",
    description: "Ном, хичээлүүд, загвар тестүүд, кейс анализ — шат дараалсан сургалтын төлөвлөгөө бүхий иж бүрэн контент.",
  },
  {
    icon: Brain,
    title: "Клиник сэтгэхүй",
    description: "NCLEX-ийн логик бүтэц, асуулт задлах аргачлалыг монгол хэлээр орчуулан клиник шийдвэр гаргах чадвар хөгжүүлнэ.",
  },
  {
    icon: Target,
    title: "Бодит туршлага",
    description: "АНУ-д ажиллаж буй RN-ийн бодит клиник мэдлэг, АНУ-ын сувилахуйн боловсролын орчин бодит жишээгээр.",
  },
  {
    icon: Award,
    title: "Батлагдсан үр дүн",
    description: "Зөвхөн шалгалт биш — олон улсын карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, мэргэжлийн чадвар.",
  },
]

export default function AboutSection() {
  const [mounted, setMounted] = useState(false)
  const [hovered, setHovered] = useState<number | null>(null)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  return (
    <section id="about" style={{
      padding: "100px 24px",
      background: "#f8fafb",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        .feat-card { transition: box-shadow 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
        .feat-card:hover { box-shadow: 0 8px 32px rgba(14,116,144,0.10); border-color: rgba(14,116,144,0.3) !important; transform: translateY(-2px); }
        .philosophy-line:not(:last-child) { border-bottom: 1px solid #e8f0f2; }
      `}</style>

      <div style={{ maxWidth: "1060px", margin: "0 auto" }}>

        {/* ── Section 1: Image + Intro ── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "64px",
          alignItems: "center",
          marginBottom: "80px",
        }}>

          {/* Image */}
          <div style={{ ...fade(0), position: "relative" }}>
            <div style={{ borderRadius: "16px", overflow: "hidden", aspectRatio: "4/3", position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80"
                alt="Nurse studying"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(160deg, rgba(14,116,144,0.08) 0%, transparent 60%)",
                pointerEvents: "none",
              }} />
            </div>
            <div style={{
              position: "absolute", bottom: "-20px", right: "-20px",
              background: "#fff", border: "1px solid #dce9ec",
              borderRadius: "12px", padding: "16px 22px",
              boxShadow: "0 8px 32px rgba(14,116,144,0.12)",
              textAlign: "center", minWidth: "130px",
            }}>
              <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.9rem", fontWeight: 600, color: "#0e7490", margin: "0 0 2px", lineHeight: 1 }}>95%</p>
              <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: 0, fontWeight: 500 }}>NCLEX тэнцэлт</p>
            </div>
          </div>

          {/* Intro text */}
          <div>
            <div style={{ ...fade(0.08), marginBottom: "18px" }}>
              <span style={{
                fontSize: "0.72rem", fontWeight: 600, color: "#0e7490",
                letterSpacing: "0.1em", textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}>
                <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#0e7490" }} />
                Бидний тухай
              </span>
            </div>

            <h2 style={{ ...fade(0.13), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 600, lineHeight: 1.2, color: "#0d2b33", margin: "0 0 6px", letterSpacing: "-0.015em" }}>
              Монгол сувилагчийн
            </h2>
            <h2 style={{ ...fade(0.17), fontFamily: "'Lora', Georgia, serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.2, color: "#0e7490", margin: "0 0 24px", letterSpacing: "-0.015em" }}>
              олон улсын замнал
            </h2>

            <div style={{ ...fade(0.2), width: "32px", height: "1.5px", background: "#0e7490", opacity: 0.4, marginBottom: "20px" }} />

            <p style={{ ...fade(0.24), fontSize: "0.95rem", color: "#517882", lineHeight: 1.85, margin: "0 0 12px" }}>
              Манай NCLEX-RN бэлтгэлийн платформ нь АНУ-д мэргэжлээрээ амжилттай ажиллаж буй, Монгол Улсад сувилахуйн боловсрол эзэмшсэн Registered Nurse-ийн бодит клиник туршлага дээр үндэслэн бүтээгдсэн.
            </p>
            <p style={{ ...fade(0.27), fontSize: "0.95rem", color: "#517882", lineHeight: 1.85, margin: "0 0 28px" }}>
              Бид Монгол дахь сувилагчдыг NCLEX шалгалтад бэлтгэхдээ цаг хугацаа, санхүүгийн нөөцөө хамгийн үр ашигтайгаар зарцуулж, зөв стратегиар, системтэй суралцах боломжийг бүрдүүлэхийг зорьдог.
            </p>

            <div style={{ ...fade(0.3), display: "flex", gap: "16px" }}>
              {[
                { val: "500+", label: "Бэлтгэгдсэн сувилагч" },
                { val: "1,200+", label: "Дасгал асуулт" },
              ].map(({ val, label }) => (
                <div key={label} style={{ flex: 1, padding: "16px 20px", background: "#fff", border: "1px solid #dce9ec", borderRadius: "10px", textAlign: "center" }}>
                  <p style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "1.5rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 3px", lineHeight: 1 }}>{val}</p>
                  <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 2: Philosophy block ── */}
        <div style={{
          ...fade(0.2),
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          marginBottom: "72px",
          background: "#fff",
          border: "1px solid #dce9ec",
          borderRadius: "20px",
          overflow: "hidden",
        }}>
          {/* Left: dark panel */}
          <div style={{
            background: "linear-gradient(145deg, #0d2b33 0%, #0e4a5c 100%)",
            padding: "44px 40px",
            display: "flex", flexDirection: "column", justifyContent: "space-between",
          }}>
            <div>
              <span style={{
                fontSize: "0.7rem", fontWeight: 600, color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em", textTransform: "uppercase",
                display: "block", marginBottom: "20px",
              }}>
                Манай философи
              </span>
              <h3 style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 600,
                color: "#fff", lineHeight: 1.35,
                margin: "0 0 20px",
              }}>
                Бид амар хялбар зам амлахыг зорьдоггүй.
              </h3>
              <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.85, margin: 0 }}>
                Харин бодит шалгууртай, хариуцлагатай, тууштай суралцахад чиглэсэн мэргэжлийн чиг баримжааг санал болгодог.
              </p>
            </div>
            <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
              <p style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1rem", fontStyle: "italic",
                color: "rgba(255,255,255,0.5)", lineHeight: 1.7, margin: 0,
              }}>
                "NCLEX-д амжилттай тэнцэх таны замнал манай платформоор эхэлнэ."
              </p>
            </div>
          </div>

          {/* Right: three pillars */}
          <div style={{ padding: "44px 36px 44px 32px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <p style={{ fontSize: "0.88rem", color: "#517882", lineHeight: 1.8, margin: "0 0 28px" }}>
              Энэ платформ нь зөвхөн шалгалтанд тэнцүүлэх бус, олон улсын сувилагчийн карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, клиник шийдвэр гаргах чадварыг хөгжүүлэхэд чиглэнэ.
            </p>

            {[
              { num: "01", title: "Нотолгоонд суурилсан мэдлэг", body: "Шинжлэх ухааны үндэслэлтэй, баталгаат арга зүйд тулгуурласан сургалтын агуулга." },
              { num: "02", title: "Бодит практик дасгал", body: "Кейс анализ, загвар тест, клиник нөхцөл байдлыг дуурайсан дасгалуудаар ур чадвараа бататгана." },
              { num: "03", title: "Тасралтгүй ахиц дэвшил", body: "Суралцагч бүр өөрийн түвшинд тохируулан үр дүнтэй ахиулах боломжтой бүтэц, систем." },
            ].map(({ num, title, body }) => (
              <div key={num} className="philosophy-line" style={{ padding: "16px 0", display: "flex", gap: "16px", alignItems: "flex-start" }}>
                <span style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "0.78rem", fontStyle: "italic",
                  color: "#0e7490", opacity: 0.5,
                  minWidth: "20px", paddingTop: "2px",
                }}>{num}</span>
                <div>
                  <p style={{ fontSize: "0.88rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 3px" }}>{title}</p>
                  <p style={{ fontSize: "0.8rem", color: "#7a9ea7", lineHeight: 1.65, margin: 0 }}>{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 3: Feature cards ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {features.map(({ icon: Icon, title, description }, i) => (
            <div
              key={title}
              className="feat-card"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{
                ...fade(0.1 + i * 0.08),
                background: "#fff", border: "1px solid #dce9ec",
                borderRadius: "14px", padding: "24px 22px", cursor: "default",
              }}
            >
              <div style={{
                width: "38px", height: "38px", borderRadius: "9px",
                background: hovered === i ? "#0e7490" : "rgba(14,116,144,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "16px", transition: "background 0.2s ease",
              }}>
                <Icon size={17} color={hovered === i ? "#fff" : "#0e7490"} style={{ transition: "color 0.2s ease" }} />
              </div>
              <h3 style={{ fontFamily: "'Lora', Georgia, serif", fontSize: "0.95rem", fontWeight: 600, color: "#0d2b33", margin: "0 0 8px" }}>{title}</h3>
              <p style={{ fontSize: "0.82rem", color: "#7a9ea7", lineHeight: 1.7, margin: 0 }}>{description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}