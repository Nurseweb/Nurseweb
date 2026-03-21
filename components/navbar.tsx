"use client";

import { useState, useEffect } from "react";
import { Menu, X, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

interface NavbarProps {
  onLoginClick: () => void;
}

interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

export default function Navbar({ onLoginClick }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<CurrentUser | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  // LocalStorage-оос user уншина
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem("user");
      }
    }

    // Login болмогц update хийх
    const handleStorage = () => {
      const updated = localStorage.getItem("user");
      if (updated) {
        try {
          const parsed = JSON.parse(updated);
          if (parsed?.name) setUser(parsed);
        } catch {
          localStorage.removeItem("user");
        }
      } else {
        setUser(null);
      }
    };
    window.addEventListener("storage", handleStorage);
    window.addEventListener("auth-change", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("auth-change", handleStorage);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setDropdownOpen(false);
    router.push("/");
    window.dispatchEvent(new Event("auth-change"));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');

        .nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 500;
          color: #517882; text-decoration: none; letter-spacing: 0.01em;
          transition: color 0.2s ease; position: relative;
        }
        .nav-link::after {
          content: ''; position: absolute; bottom: -2px; left: 0;
          width: 0; height: 1px; background: #0e7490; transition: width 0.25s ease;
        }
        .nav-link:hover { color: #0d2b33; }
        .nav-link:hover::after { width: 100%; }

        .nav-cta {
          font-family: 'DM Sans', sans-serif; font-size: 0.85rem; font-weight: 600;
          color: #fff; background: #0e7490; border: none; border-radius: 7px;
          padding: 9px 22px; cursor: pointer; letter-spacing: 0.01em;
          transition: background 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
        }
        .nav-cta:hover {
          background: #0c6783; box-shadow: 0 4px 16px rgba(14,116,144,0.25);
          transform: translateY(-1px);
        }

        .user-btn {
          display: flex; align-items: center; gap: 8px;
          background: rgba(14,116,144,0.06); border: 1px solid rgba(14,116,144,0.15);
          border-radius: 99px; padding: 6px 14px 6px 8px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .user-btn:hover { background: rgba(14,116,144,0.1); border-color: rgba(14,116,144,0.3); }

        .user-avatar {
          width: 28px; height: 28px; border-radius: 50%;
          background: #0e7490; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; font-family: 'DM Sans', sans-serif;
          flex-shrink: 0;
        }

        .dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: #fff; border: 1px solid #dce9ec; border-radius: 12px;
          box-shadow: 0 12px 40px rgba(13,43,51,0.12);
          min-width: 200px; overflow: hidden; z-index: 100;
        }

        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .dropdown { animation: dropIn 0.18s ease forwards; }

        .dropdown-item {
          display: flex; align-items: center; gap: 9px;
          padding: 10px 16px; font-family: 'DM Sans', sans-serif;
          font-size: 0.84rem; font-weight: 500; color: #517882;
          cursor: pointer; border: none; background: none; width: 100%; text-align: left;
          transition: background 0.15s ease, color 0.15s ease;
          text-decoration: none;
        }
        .dropdown-item:hover { background: #f0f7f9; color: #0d2b33; }
        .dropdown-item.danger:hover { background: rgba(220,38,38,0.05); color: #b91c1c; }

        .mobile-nav-link {
          font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 500;
          color: #517882; text-decoration: none; padding: 10px 0; display: block;
          border-bottom: 1px solid #e8f0f2; transition: color 0.2s ease;
        }
        .mobile-nav-link:hover { color: #0e7490; }

        .hamburger {
          background: none; border: none; cursor: pointer; color: #517882;
          padding: 4px; display: flex; align-items: center; transition: color 0.2s ease;
        }
        .hamburger:hover { color: #0e7490; }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .mobile-menu-anim { animation: slideDown 0.22s ease forwards; }

        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-only { display: flex !important; }
        }
      `}</style>

      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(248,250,251,0.88)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid #e4eef1",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "0 32px",
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "9px",
            }}
          >
            <img
              src="/images/logos.png"
              alt="Logo"
              style={{ width: "72px", height: "48px" }}
            />
          </a>

          {/* Desktop nav */}
          <nav
            className="desktop-nav"
            style={{ display: "flex", alignItems: "center", gap: "32px" }}
          >
            <a href="#about" className="nav-link">
              Бидний тухай
            </a>
            <a href="#features" className="nav-link">
              Агуулга
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=61583464740599"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Холбоо барих
            </a>

            <div
              style={{ width: "1px", height: "18px", background: "#dce9ec" }}
            />

            {user ? (
              /* ── Logged in ── */
              <div style={{ position: "relative" }}>
                <button
                  className="user-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <div className="user-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() ?? "U"}
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        fontWeight: 600,
                        color: "#0d2b33",
                        margin: 0,
                        lineHeight: 1.2,
                      }}
                    >
                      {user.name}
                    </p>
                    {user.role === "admin" && (
                      <p
                        style={{
                          fontSize: "0.65rem",
                          color: "#0e7490",
                          margin: 0,
                          fontWeight: 600,
                          letterSpacing: "0.05em",
                        }}
                      >
                        ADMIN
                      </p>
                    )}
                  </div>
                  <ChevronDown
                    size={14}
                    color="#8aacb4"
                    style={{
                      transition: "transform 0.2s",
                      transform: dropdownOpen ? "rotate(180deg)" : "none",
                    }}
                  />
                </button>

                {dropdownOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      style={{ position: "fixed", inset: 0, zIndex: 99 }}
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="dropdown">
                      {/* User info */}
                      <div
                        style={{
                          padding: "12px 16px 10px",
                          borderBottom: "1px solid #e8f0f2",
                        }}
                      >
                        <p
                          style={{
                            fontSize: "0.82rem",
                            fontWeight: 600,
                            color: "#0d2b33",
                            margin: "0 0 2px",
                          }}
                        >
                          {user.name}
                        </p>
                        <p
                          style={{
                            fontSize: "0.72rem",
                            color: "#8aacb4",
                            margin: 0,
                          }}
                        >
                          {user.email}
                        </p>
                      </div>

                      {/* Dashboard link */}
                      <a href="/dashboard" className="dropdown-item">
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                        >
                          <rect
                            x="1"
                            y="1"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="#8aacb4"
                            strokeWidth="1.4"
                          />
                          <rect
                            x="8.5"
                            y="1"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="#8aacb4"
                            strokeWidth="1.4"
                          />
                          <rect
                            x="1"
                            y="8.5"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="#8aacb4"
                            strokeWidth="1.4"
                          />
                          <rect
                            x="8.5"
                            y="8.5"
                            width="5.5"
                            height="5.5"
                            rx="1"
                            stroke="#8aacb4"
                            strokeWidth="1.4"
                          />
                        </svg>
                        Хянах самбар
                      </a>

                      {/* Logout */}
                      <button
                        className="dropdown-item danger"
                        onClick={handleLogout}
                      >
                        <LogOut size={14} color="#b91c1c" />
                        Гарах
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              /* ── Not logged in ── */
              <button className="nav-cta" onClick={onLoginClick}>
                Нэвтрэх
              </button>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="hamburger mobile-only"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Цэс хаах" : "Цэс нээх"}
            style={{ display: "none" }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            className="mobile-menu-anim"
            style={{
              background: "#fff",
              borderTop: "1px solid #e4eef1",
              padding: "16px 32px 24px",
            }}
          >
            <a
              href="#about"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Бидний тухай
            </a>
            <a
              href="#features"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Агуулга
            </a>
            <a
              href="#contact"
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Холбоо барих
            </a>

            {user ? (
              <div
                style={{
                  marginTop: "16px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid #e8f0f2",
                  }}
                >
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "#0d2b33",
                      margin: "0 0 2px",
                    }}
                  >
                    {user.name}
                  </p>
                  <p
                    style={{ fontSize: "0.75rem", color: "#8aacb4", margin: 0 }}
                  >
                    {user.email}
                  </p>
                </div>
                <a
                  href="/dashboard"
                  className="mobile-nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Хянах самбар
                </a>
                <button
                  className="nav-cta"
                  style={{
                    marginTop: "8px",
                    width: "100%",
                    padding: "12px",
                    background: "#b91c1c",
                  }}
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                >
                  Гарах
                </button>
              </div>
            ) : (
              <button
                className="nav-cta"
                style={{ marginTop: "16px", width: "100%", padding: "12px" }}
                onClick={() => {
                  onLoginClick();
                  setMenuOpen(false);
                }}
              >
                Нэвтрэх
              </button>
            )}
          </div>
        )}
      </header>
    </>
  );
}
