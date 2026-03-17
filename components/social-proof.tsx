"use client";

import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function anim(
  inView: boolean,
  delay = 0,
  dir: "up" | "left" | "right" | "scale" = "up",
): React.CSSProperties {
  const t: Record<string, string> = {
    up: "translateY(28px)",
    left: "translateX(-28px)",
    right: "translateX(28px)",
    scale: "scale(0.95) translateY(12px)",
  };
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "none" : t[dir],
    transition: `opacity 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.72s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  };
}

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
];

export default function SocialProof() {
  const left = useInView(0.1);
  const right = useInView(0.1);
  const note = useInView(0.2);

  return (
    <section
      style={{
        padding: "120px 24px",
        background: "#fff",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        .sp-point { transition: background 0.2s ease, padding-left 0.25s ease; border-radius: 10px; }
        .sp-point:not(:last-child) { border-bottom: 1px solid #e8f0f2; }
        .sp-point:hover { background: #f8fbfc; padding-left: 10px !important; }
        .sp-stat { transition: transform 0.2s, box-shadow 0.2s; }
        .sp-stat:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(14,116,144,0.1); }

        /* ── TABLET (≤768px) ── */
        @media (max-width: 768px) {
          .sp-section {
            padding: 72px 20px !important;
          }
          .sp-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .sp-left {
            position: static !important;
            top: unset !important;
          }
        }

        /* ── MOBILE (≤480px) ── */
        @media (max-width: 480px) {
          .sp-section {
            padding: 56px 16px !important;
          }
          .sp-grid {
            gap: 40px !important;
          }
          .sp-point {
            padding: 24px 12px 24px 0 !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: "1040px", margin: "0 auto" }}>
        <div
          className="sp-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "start",
          }}
        >
          {/* LEFT — sticky on desktop, static on mobile */}
          <div ref={left.ref} className="sp-left" style={{ position: "sticky", top: "120px" }}>
            <div style={anim(left.inView, 0, "left")}>
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 600,
                  color: "#0e7490",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <span style={{ display: "inline-block", width: "20px", height: "1px", background: "#0e7490" }} />
                Яагаад биднийг сонгох вэ
              </span>
            </div>

            <h2
              style={{
                ...anim(left.inView, 0.1, "left"),
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 600,
                lineHeight: 1.2,
                color: "#0d2b33",
                margin: "0 0 6px",
                letterSpacing: "-0.015em",
              }}
            >
              Мэргэжлийн
            </h2>
            <h2
              style={{
                ...anim(left.inView, 0.16, "left"),
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 400,
                fontStyle: "italic",
                lineHeight: 1.2,
                color: "#0e7490",
                margin: "0 0 28px",
                letterSpacing: "-0.015em",
              }}
            >
              чиг баримжаа
            </h2>

            <div
              style={{
                ...anim(left.inView, 0.2, "left"),
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "24px",
              }}
            >
              <div style={{ width: "36px", height: "1.5px", background: "linear-gradient(90deg, #0e7490, #22b8d1)", borderRadius: "2px" }} />
              <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22b8d1", opacity: 0.6 }} />
            </div>

            <p
              style={{
                ...anim(left.inView, 0.24, "left"),
                fontSize: "0.95rem",
                color: "#517882",
                lineHeight: 1.85,
                margin: "0 0 40px",
              }}
            >
              Энэхүү платформ нь зөвхөн шалгалтанд тэнцүүлэх бус — олон улсын
              сувилагчийн карьераа эхлүүлэхэд шаардлагатай сэтгэлгээ, клиник
              шийдвэр гаргах чадварыг хөгжүүлэхэд чиглэнэ.
            </p>

            {/* Stats */}
            <div
              style={{
                ...anim(left.inView, 0.3, "scale"),
                display: "flex",
                gap: "0",
                border: "1px solid #dce9ec",
                borderRadius: "12px",
                overflow: "hidden",
                background: "#f8fbfc",
              }}
            >
              {[
                { val: "500+", label: "Бэлтгэгдсэн сувилагч" },
                { val: "95%", label: "NCLEX тэнцэлт" },
              ].map(({ val, label }, i) => (
                <div
                  key={label}
                  className="sp-stat"
                  style={{
                    flex: 1,
                    padding: "22px 24px",
                    textAlign: "center",
                    borderRight: i === 0 ? "1px solid #dce9ec" : "none",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "1.85rem",
                      fontWeight: 600,
                      color: "#0d2b33",
                      margin: "0 0 3px",
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </p>
                  <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: 0 }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — points */}
          <div ref={right.ref} style={{ paddingTop: "4px" }}>
            {points.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="sp-point"
                style={{
                  ...anim(right.inView, i * 0.12, "right"),
                  padding: "32px 20px 32px 0",
                  cursor: "default",
                }}
              >
                <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
                  <span
                    style={{
                      fontFamily: "'Lora', Georgia, serif",
                      fontSize: "0.85rem",
                      fontWeight: 400,
                      fontStyle: "italic",
                      color: "#0e7490",
                      opacity: 0.55,
                      minWidth: "24px",
                      paddingTop: "2px",
                      lineHeight: 1,
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <div
                      style={{
                        width: "24px",
                        height: "1.5px",
                        background: "linear-gradient(90deg, #0e7490, #22b8d1)",
                        opacity: 0.4,
                        marginBottom: "12px",
                        borderRadius: "2px",
                      }}
                    />
                    <h3
                      style={{
                        fontFamily: "'Lora', Georgia, serif",
                        fontSize: "1.15rem",
                        fontWeight: 600,
                        color: "#0d2b33",
                        margin: "0 0 10px",
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "#517882",
                        lineHeight: 1.8,
                        margin: 0,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Quote note */}
            <div
              ref={note.ref}
              style={{
                ...anim(note.inView, 0.1, "up"),
                marginTop: "20px",
                padding: "22px 24px",
                background: "linear-gradient(135deg, rgba(14,116,144,0.04) 0%, rgba(34,184,209,0.04) 100%)",
                borderRadius: "12px",
                border: "1px solid rgba(14,116,144,0.12)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "16px",
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "4rem",
                  color: "#0e7490",
                  opacity: 0.07,
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                "
              </span>
              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#4a7c8a",
                  lineHeight: 1.8,
                  margin: 0,
                  fontStyle: "italic",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                Манай сургалтын философи нь нотолгоонд суурилсан мэдлэг, бодит
                практик, тасралтгүй ахиц дэвшлийг чухалчилдаг.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}