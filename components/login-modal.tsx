import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function LoginModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess?: (user: any, token: string) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Имэйл болон нууц үгээ оруулна уу.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();
      console.log("Response:", data); // ← шалгах

      if (!res.ok) {
        setError(data.message ?? "Нэвтрэхэд алдаа гарлаа.");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      window.dispatchEvent(new Event("auth-change"));

      onSuccess?.(data.user, data.token);
      onClose();
      setEmail("");
      setPassword("");
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Серверт холбогдох боломжгүй байна.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        @keyframes modalIn {
          from { opacity: 0; transform: translateY(12px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .modal-card { animation: modalIn 0.22s ease forwards; }

        .field-input {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          color: #0d2b33;
          background: #f0f6f8;
          border: 1.5px solid transparent;
          border-radius: 9px;
          padding: 11px 14px;
          outline: none;
          transition: border-color 0.2s ease, background 0.2s ease;
          box-sizing: border-box;
        }
        .field-input::placeholder { color: #a8c4cc; }
        .field-input:focus { border-color: #0e7490; background: #fff; }

        .field-input-pr { padding-right: 42px; }

        .submit-btn {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 600;
          background: #0e7490;
          color: #fff;
          border: none;
          border-radius: 9px;
          padding: 13px;
          cursor: pointer;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
          letter-spacing: 0.01em;
        }
        .submit-btn:hover:not(:disabled) {
          background: #0c6783;
          box-shadow: 0 6px 20px rgba(14,116,144,0.25);
          transform: translateY(-1px);
        }
        .submit-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .close-btn {
          position: absolute; top: 16px; right: 16px;
          background: none; border: none;
          color: #8aacb4; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          padding: 4px; border-radius: 6px;
          transition: color 0.2s ease, background 0.2s ease;
        }
        .close-btn:hover { color: #0d2b33; background: #eef3f5; }

        .eye-btn {
          position: absolute; right: 12px; top: 50%;
          transform: translateY(-50%);
          background: none; border: none;
          color: #8aacb4; cursor: pointer; padding: 2px;
          transition: color 0.2s ease;
        }
        .eye-btn:hover { color: #0e7490; }

        .forgot-link {
          font-size: 0.75rem; color: #8aacb4;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .forgot-link:hover { color: #0e7490; }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          background: "rgba(13,43,51,0.35)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
        }}
      >
        {/* Modal card */}
        <div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "relative",
            background: "#fff",
            borderRadius: "20px",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #dce9ec",
            boxShadow: "0 24px 64px rgba(13,43,51,0.14)",
            fontFamily: "'DM Sans', sans-serif",
            overflow: "hidden",
          }}
        >
          {/* Top teal accent strip */}
          <div
            style={{
              height: "3px",
              background: "linear-gradient(90deg, #0e7490, #22b8d1)",
            }}
          />

          <div style={{ padding: "36px 36px 32px" }}>
            <button className="close-btn" onClick={onClose} aria-label="Хаах">
              <X size={18} />
            </button>

            {/* Header */}
            <div style={{ marginBottom: "28px" }}>
              {/* Icon */}
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "11px",
                  background: "rgba(14,116,144,0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "16px",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M10 2v16M5 7h10M3 13h14"
                    stroke="#0e7490"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              <h2
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#0d2b33",
                  margin: "0 0 4px",
                  letterSpacing: "-0.01em",
                }}
              >
                Нэвтрэх
              </h2>
              <p style={{ fontSize: "0.82rem", color: "#8aacb4", margin: 0 }}>
                Бэлтгэлийн платформд тавтай морилно уу
              </p>
            </div>

            {/* Error */}
            {error && (
              <div
                style={{
                  background: "rgba(220,38,38,0.06)",
                  border: "1px solid rgba(220,38,38,0.15)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontSize: "0.8rem",
                  color: "#b91c1c",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                {error}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {/* Email */}
              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "#3d6672",
                    marginBottom: "7px",
                    letterSpacing: "0.02em",
                  }}
                >
                  Имэйл хаяг
                </label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="tanii@email.com"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "7px",
                  }}
                >
                  <label
                    style={{
                      fontSize: "0.78rem",
                      fontWeight: 600,
                      color: "#3d6672",
                      letterSpacing: "0.02em",
                    }}
                  >
                    Нууц үг
                  </label>
                  <a href="#" className="forgot-link">
                    Нууц үг мартсан?
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    className="field-input field-input-pr"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Нуух" : "Харуулах"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="submit-btn"
                disabled={loading}
                style={{ marginTop: "4px" }}
              >
                {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </button>
            </form>

            {/* Footer note */}
            <p
              style={{
                textAlign: "center",
                fontSize: "0.73rem",
                color: "#a8c4cc",
                marginTop: "20px",
                lineHeight: 1.6,
              }}
            >
              Зөвхөн бүртгэлтэй сувилагчид нэвтрэх боломжтой
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
