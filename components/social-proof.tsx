import { useState, useEffect } from "react"

export default function SocialProof() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 80) }, [])

  const fade = (delay = 0) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(14px)",
    transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
  })

  const points = [
    {
      num: "01",
      title: "Бодит туршлагад суурилсан",
      body: "АНУ-д ажиллаж буй RN-ийн клиник туршлага, шалгалтын стратегийг шууд дамжуулна. Онол биш — практик.",
    },
    {
      num: "02",
      title: "Монгол хэлээр, системтэйгээр",
      body: "NCLEX-ийн логик бүтэц, асуулт задлах аргачлалыг монгол хэлээр ойлгомжтой тайлбарласан иж бүрэн агуулга.",
    },
    {
      num: "03",
      title: "95% тэнцэлтийн үр дүн",
      body: "Манай системтэй бэлтгэлийн арга зүйгээр дамжсан 500+ сувилагч NCLEX-д амжилттай тэнцсэн.",
    },
  ]

  return (
    <section style={{
      padding: "100px 24px",
      background: "#fff",
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        .sp-point:not(:last-child) { border-bottom: 1px solid #e8f0f2; }
        .sp-point { transition: background 0.2s ease; }
        .sp-point:hover { background: #f8fbfc; }
      `}</style>

      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}>

          {/* Left — sticky text block */}
          <div style={{ position: "sticky", top: "120px" }}>

            {/* Eyebrow */}
            <div style={{ ...fade(0), marginBottom: "20px" }}>
              <span style={{
                fontSize: "0.72rem", fontWeight: 600,
                color: "#0e7490", letterSpacing: "0.1em",
                textTransform: "uppercase",
                display: "inline-flex", alignItems: "center", gap: "8px",
              }}>
                <span style={{
                  display: "inline-block", width: "20px", height: "1px",
                  background: "#0e7490",
                }} />
                Яагаад биднийг сонгох вэ
              </span>
            </div>

            {/* Heading */}
            <h2 style={{
              ...fade(0.1),
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 600, lineHeight: 1.2,
              color: "#0d2b33",
              margin: "0 0 6px",
              letterSpacing: "-0.015em",
            }}>
              Мэргэжлийн
            </h2>
            <h2 style={{
              ...fade(0.15),
              fontFamily: "'Lora', Georgia, serif",
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400, fontStyle: "italic",
              lineHeight: 1.2,
              color: "#0e7490",
              margin: "0 0 28px",
              letterSpacing: "-0.015em",
            }}>
              чиг баримжаа
            </h2>

            <div style={{ ...fade(0.18), width: "32px", height: "1.5px", background: "#0e7490", opacity: 0.4, marginBottom: "24px" }} />

            <p style={{
              ...fade(0.22),
              fontSize: "0.95rem", color: "#517882",
              lineHeight: 1.85, margin: "0 0 40px",
            }}>
              Энэхүү платформ нь зөвхөн шалгалтанд тэнцүүлэх бус — олон улсын сувилагчийн карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, клиник шийдвэр гаргах чадварыг хөгжүүлэхэд чиглэнэ.
            </p>

            {/* Stats pair */}
            <div style={{
              ...fade(0.28),
              display: "flex", gap: "0",
              border: "1px solid #dce9ec",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#f8fbfc",
            }}>
              {[
                { val: "500+", label: "Бэлтгэгдсэн сувилагч" },
                { val: "95%", label: "NCLEX тэнцэлт" },
              ].map(({ val, label }, i) => (
                <div key={label} style={{
                  flex: 1, padding: "20px 24px", textAlign: "center",
                  borderRight: i === 0 ? "1px solid #dce9ec" : "none",
                }}>
                  <p style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "1.8rem", fontWeight: 600,
                    color: "#0d2b33", margin: "0 0 3px", lineHeight: 1,
                  }}>{val}</p>
                  <p style={{ fontSize: "0.73rem", color: "#8aacb4", margin: 0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — points list */}
          <div style={{ paddingTop: "4px" }}>
            {points.map(({ num, title, body }, i) => (
              <div key={num} className="sp-point" style={{
                ...fade(0.1 + i * 0.1),
                padding: "32px 20px 32px 0",
                borderRadius: "8px",
                cursor: "default",
              }}>
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  {/* Number */}
                  <span style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "0.85rem", fontWeight: 400, fontStyle: "italic",
                    color: "#0e7490", opacity: 0.6,
                    minWidth: "24px", paddingTop: "2px",
                    lineHeight: 1,
                  }}>{num}</span>

                  <div>
                    {/* Thin teal line */}
                    <div style={{
                      width: "24px", height: "1.5px",
                      background: "#0e7490", opacity: 0.3,
                      marginBottom: "12px",
                    }} />
                    <h3 style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "1.15rem", fontWeight: 600,
                      color: "#0d2b33", margin: "0 0 10px",
                      lineHeight: 1.3,
                    }}>{title}</h3>
                    <p style={{
                      fontSize: "0.9rem", color: "#517882",
                      lineHeight: 1.8, margin: 0,
                    }}>{body}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Bottom note */}
            <div style={{ ...fade(0.45), marginTop: "16px", padding: "20px", background: "#f0f7f9", borderRadius: "10px", border: "1px solid #dce9ec" }}>
              <p style={{
                fontSize: "0.82rem", color: "#4a7c8a",
                lineHeight: 1.75, margin: 0, fontStyle: "italic",
              }}>
                "Манай сургалтын философи нь нотолгоонд суурилсан мэдлэг, бодит практик, тасралтгүй ахиц дэвшлийг чухалчилдаг."
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}