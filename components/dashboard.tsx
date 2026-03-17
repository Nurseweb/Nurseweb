"use client";

import { useState, useEffect } from "react";
import {
  LogOut,
  BookOpen,
  ClipboardCheck,
  Shield,
  ArrowRight,
  Clock,
  GraduationCap,
  Plus,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Trash2,
  Users,
  X,
  Pencil,
} from "lucide-react";
import Quiz from "./quiz";
import CourseViewer from "./course-viewer";

const BASE_PDF = `${process.env.NEXT_PUBLIC_API_URL}/pdfs`;

const mockUser = {
  name: "Super Admin",
  email: "admin@medicare.com",
  role: "admin",
};
const mockCourses = Array.from({ length: 11 }, (_, i) => {
  const n = i + 1;
  return {
    id: n,
    title: `NCLEX-RN · Part ${n}`,
    description: `NCLEX-RN бэлтгэлийн ${n}-р хэсэг. Англи болон монгол хэлээр унших боломжтой.`,
    duration: "",
    lessons: n,
    language: "both",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80",
    pdfEn: `${BASE_PDF}/nclex-part${n}-en.pdf.pdf`,
    pdfMn: `${BASE_PDF}/nclex-part${n}-mn.pdf.pdf`,
  };
});

const API = `${process.env.NEXT_PUBLIC_API_URL}/api`;

function getToken() {
  return typeof window !== "undefined" ? localStorage.getItem("token") : "";
}

// ── Create User Modal ──
function CreateUserModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.email || !form.phone || !form.password) {
      setError("Бүх талбарыг бөглөнө үү.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Алдаа гарлаа.");
        return;
      }
      onCreated();
      onClose();
    } catch {
      setError("Серверт холбогдох боломжгүй.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(13,43,51,0.4)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "440px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(13,43,51,0.15)",
          border: "1px solid #dce9ec",
        }}
      >
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #0e7490, #22b8d1)",
          }}
        />
        <div style={{ padding: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: "'Lora', Georgia, serif",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                  color: "#0d2b33",
                  margin: "0 0 3px",
                }}
              >
                Шинэ хэрэглэгч
              </h3>
              <p style={{ fontSize: "0.78rem", color: "#8aacb4", margin: 0 }}>
                Сувилагчийн бүртгэл үүсгэх
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8aacb4",
                padding: "4px",
              }}
            >
              <X size={18} />
            </button>
          </div>
          {error && (
            <div
              style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.15)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.8rem",
                color: "#b91c1c",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            {[
              {
                key: "name",
                label: "Нэр",
                placeholder: "Бат-Эрдэнэ",
                type: "text",
              },
              {
                key: "email",
                label: "Имэйл",
                placeholder: "bat@email.com",
                type: "email",
              },
              {
                key: "phone",
                label: "Утасны дугаар",
                placeholder: "99001234",
                type: "tel",
              },
            ].map(({ key, label, placeholder, type }) => (
              <div key={key}>
                <label
                  style={{
                    display: "block",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "#3d6672",
                    marginBottom: "6px",
                    letterSpacing: "0.02em",
                  }}
                >
                  {label}
                </label>
                <input
                  className="field-input"
                  type={type}
                  placeholder={placeholder}
                  value={(form as any)[key]}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  required
                />
              </div>
            ))}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3d6672",
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                Нууц үг
              </label>
              <div style={{ position: "relative" }}>
                <input
                  className="field-input field-input-pr"
                  type={showPw ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, password: e.target.value }))
                  }
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8aacb4",
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: "4px",
                width: "100%",
                background: loading ? "#8aacb4" : "#0e7490",
                color: "#fff",
                border: "none",
                borderRadius: "9px",
                padding: "13px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
              }}
            >
              {loading ? "Үүсгэж байна..." : "Бүртгэл үүсгэх"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function EditUserModal({
  user,
  onClose,
  onSaved,
}: {
  user: any;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState({
    name: user.name,
    phone: user.phone ?? "",
    password: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name) {
      setError("Нэр хоосон байж болохгүй.");
      return;
    }
    const body: any = { name: form.name, phone: form.phone };
    if (form.password.trim()) {
      if (form.password.length < 6) {
        setError("Нууц үг дор хаяж 6 тэмдэгт байна.");
        return;
      }
      body.password = form.password;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/admin/users/${user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message ?? "Алдаа гарлаа.");
        return;
      }
      setSuccess("Амжилттай хадгаллаа.");
      onSaved();
      setTimeout(onClose, 800);
    } catch {
      setError("Серверт холбогдох боломжгүй.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(13,43,51,0.4)",
        backdropFilter: "blur(6px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#fff",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "440px",
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(13,43,51,0.15)",
          border: "1px solid #dce9ec",
        }}
      >
        <div
          style={{
            height: "3px",
            background: "linear-gradient(90deg, #0e7490, #22b8d1)",
          }}
        />
        <div style={{ padding: "32px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "10px",
                  background: "#0e7490",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span
                  style={{ color: "#fff", fontSize: "1rem", fontWeight: 700 }}
                >
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "#0d2b33",
                    margin: "0 0 2px",
                  }}
                >
                  Мэдээлэл засах
                </h3>
                <p style={{ fontSize: "0.75rem", color: "#8aacb4", margin: 0 }}>
                  {user.email}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#8aacb4",
                padding: "4px",
              }}
            >
              <X size={18} />
            </button>
          </div>
          {error && (
            <div
              style={{
                background: "rgba(220,38,38,0.06)",
                border: "1px solid rgba(220,38,38,0.15)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.8rem",
                color: "#b91c1c",
                marginBottom: "16px",
              }}
            >
              {error}
            </div>
          )}
          {success && (
            <div
              style={{
                background: "rgba(14,116,144,0.07)",
                border: "1px solid rgba(14,116,144,0.2)",
                borderRadius: "8px",
                padding: "10px 14px",
                fontSize: "0.8rem",
                color: "#0e7490",
                marginBottom: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              ✓ {success}
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "14px" }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3d6672",
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                Нэр
              </label>
              <input
                className="field-input"
                type="text"
                value={form.name}
                onChange={(e) =>
                  setForm((p) => ({ ...p, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3d6672",
                  marginBottom: "6px",
                  letterSpacing: "0.02em",
                }}
              >
                Утасны дугаар
              </label>
              <input
                className="field-input"
                type="tel"
                placeholder="99001234"
                value={form.phone}
                onChange={(e) =>
                  setForm((p) => ({ ...p, phone: e.target.value }))
                }
              />
            </div>
            <div style={{ borderTop: "1px solid #e8f0f2", paddingTop: "14px" }}>
              <label
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  color: "#3d6672",
                  marginBottom: "4px",
                  letterSpacing: "0.02em",
                }}
              >
                Шинэ нууц үг
              </label>
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "#a8c4cc",
                  margin: "0 0 8px",
                }}
              >
                Хоосон орхивол нууц үг өөрчлөгдөхгүй
              </p>
              <div style={{ position: "relative" }}>
                <input
                  className="field-input field-input-pr"
                  type={showPw ? "text" : "password"}
                  placeholder="Шинэ нууц үг оруулах..."
                  value={form.password}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, password: e.target.value }))
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#8aacb4",
                  }}
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>
            <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  background: "#f0f6f8",
                  color: "#517882",
                  border: "none",
                  borderRadius: "9px",
                  padding: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Цуцлах
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  flex: 2,
                  background: loading ? "#8aacb4" : "#0e7490",
                  color: "#fff",
                  border: "none",
                  borderRadius: "9px",
                  padding: "12px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.88rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                }}
              >
                {loading ? "Хадгалж байна..." : "Хадгалах"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// ── Admin Panel ──
function AdminPanel() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editingUser, setEditingUser] = useState<any | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API}/admin/users`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch {
      console.error("Users fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggle = async (id: string) => {
    setActionLoading(id + "_toggle");
    try {
      const res = await fetch(`${API}/admin/users/${id}/toggle`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) fetchUsers();
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`"${name}" хэрэглэгчийг устгах уу?`)) return;
    setActionLoading(id + "_delete");
    try {
      const res = await fetch(`${API}/admin/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) fetchUsers();
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <>
      {showCreate && (
        <CreateUserModal
          onClose={() => setShowCreate(false)}
          onCreated={fetchUsers}
        />
      )}
      {editingUser && (
        <EditUserModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSaved={fetchUsers}
        />
      )}
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "24px",
          }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "#0d2b33",
                margin: "0 0 4px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Users size={20} color="#0e7490" />
            </h2>
            <p style={{ fontSize: "0.82rem", color: "#7a9ea7", margin: 0 }}>
              Нийт {users.length} хэрэглэгч бүртгэлтэй
            </p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "7px",
              background: "#0e7490",
              color: "#fff",
              border: "none",
              borderRadius: "9px",
              padding: "10px 18px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#0c6783")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0e7490")}
          >
            <Plus size={15} /> Хэрэглэгч нэмэх
          </button>
        </div>
        <div
          style={{
            background: "#fff",
            border: "1px solid #dce9ec",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          {loading ? (
            <div style={{ padding: "48px", textAlign: "center" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "3px solid #dce9ec",
                  borderTopColor: "#0e7490",
                  animation: "spin 0.8s linear infinite",
                  margin: "0 auto 12px",
                }}
              />
              <p style={{ fontSize: "0.82rem", color: "#8aacb4", margin: 0 }}>
                Ачаалж байна...
              </p>
            </div>
          ) : users.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center" }}>
              <Users
                size={32}
                color="#c8dde2"
                style={{ marginBottom: "12px" }}
              />
              <p style={{ fontSize: "0.85rem", color: "#8aacb4", margin: 0 }}>
                Хэрэглэгч байхгүй байна
              </p>
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#f8fafb",
                    borderBottom: "1px solid #e8f0f2",
                  }}
                >
                  {["Нэр", "Имэйл", "Утас", "Статус", "Үүсгэсэн", "Үйлдэл"].map(
                    (h) => (
                      <th
                        key={h}
                        style={{
                          padding: "12px 16px",
                          textAlign: "left",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          color: "#7a9ea7",
                          letterSpacing: "0.06em",
                          textTransform: "uppercase",
                        }}
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr
                    key={u.id}
                    style={{
                      borderBottom:
                        i < users.length - 1 ? "1px solid #e8f0f2" : "none",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#f8fbfc")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "transparent")
                    }
                  >
                    <td style={{ padding: "14px 16px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                        }}
                      >
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "8px",
                            background: "#0e7490",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <span
                            style={{
                              color: "#fff",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                            }}
                          >
                            {u.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "#0d2b33",
                          }}
                        >
                          {u.name}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: "0.82rem",
                        color: "#517882",
                      }}
                    >
                      {u.email}
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: "0.82rem",
                        color: "#517882",
                      }}
                    >
                      {u.phone ?? "—"}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "5px",
                          background: u.is_active
                            ? "rgba(14,116,144,0.08)"
                            : "rgba(220,38,38,0.06)",
                          color: u.is_active ? "#0e7490" : "#b91c1c",
                          border: `1px solid ${u.is_active ? "rgba(14,116,144,0.2)" : "rgba(220,38,38,0.15)"}`,
                          borderRadius: "99px",
                          padding: "3px 10px",
                          fontSize: "0.72rem",
                          fontWeight: 600,
                        }}
                      >
                        <div
                          style={{
                            width: "5px",
                            height: "5px",
                            borderRadius: "50%",
                            background: u.is_active ? "#0e7490" : "#b91c1c",
                          }}
                        />
                        {u.is_active ? "Идэвхтэй" : "Идэвхгүй"}
                      </span>
                    </td>
                    <td
                      style={{
                        padding: "14px 16px",
                        fontSize: "0.78rem",
                        color: "#8aacb4",
                      }}
                    >
                      {new Date(u.created_at).toLocaleDateString("mn-MN")}
                    </td>
                    <td style={{ padding: "14px 16px" }}>
                      <div style={{ display: "flex", gap: "6px" }}>
                        <button
                          onClick={() => setEditingUser(u)}
                          title="Засах"
                          style={{
                            background: "none",
                            border: "1px solid #dce9ec",
                            borderRadius: "7px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            color: "#517882",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#0e7490";
                            e.currentTarget.style.background =
                              "rgba(14,116,144,0.05)";
                            e.currentTarget.style.color = "#0e7490";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#dce9ec";
                            e.currentTarget.style.background = "none";
                            e.currentTarget.style.color = "#517882";
                          }}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleToggle(u.id)}
                          disabled={actionLoading === u.id + "_toggle"}
                          title={
                            u.is_active ? "Идэвхгүй болгох" : "Идэвхжүүлэх"
                          }
                          style={{
                            background: "none",
                            border: "1px solid #dce9ec",
                            borderRadius: "7px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            color: u.is_active ? "#0e7490" : "#8aacb4",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#0e7490";
                            e.currentTarget.style.background =
                              "rgba(14,116,144,0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#dce9ec";
                            e.currentTarget.style.background = "none";
                          }}
                        >
                          {u.is_active ? (
                            <ToggleRight size={15} />
                          ) : (
                            <ToggleLeft size={15} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDelete(u.id, u.name)}
                          disabled={actionLoading === u.id + "_delete"}
                          title="Устгах"
                          style={{
                            background: "none",
                            border: "1px solid #dce9ec",
                            borderRadius: "7px",
                            padding: "6px 8px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            color: "#b91c1c",
                            transition: "all 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = "#b91c1c";
                            e.currentTarget.style.background =
                              "rgba(220,38,38,0.05)";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = "#dce9ec";
                            e.currentTarget.style.background = "none";
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}

// ── Main Dashboard ──
interface DashboardProps {
  user?: { name: string; email: string; role?: string };
  courses?: Array<any>;
  logout?: () => void;
  onStartQuiz?: (lang: "en" | "mn") => void;
}

export default function Dashboard({
  user = mockUser,
  courses = mockCourses,
  logout,
  onStartQuiz,
}: DashboardProps) {
  const [activeTab, setActiveTab] = useState("courses");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [quizLang, setQuizLang] = useState<"mn" | "en" | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

  const tabs = [
    { id: "courses", label: "Хичээлүүд", icon: BookOpen },
    { id: "quizzes", label: "Шалгалт", icon: ClipboardCheck },
    ...(user?.role === "admin"
      ? [{ id: "admin", label: "Admin", icon: Shield }]
      : []),
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafb",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@400;500;600&display=swap');
        .tab-btn { transition: color 0.2s ease, background 0.2s ease; cursor: pointer; border: none; }
        .course-card { transition: box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease; cursor: pointer; border: none; text-align: left; background: #fff; }
        .course-card:hover { box-shadow: 0 12px 40px rgba(14,116,144,0.12); transform: translateY(-3px); border-color: rgba(14,116,144,0.25) !important; }
        .course-img { transition: transform 0.5s ease; }
        .course-card:hover .course-img { transform: scale(1.04); }
        .logout-btn { font-family: 'DM Sans', sans-serif; font-size: 0.82rem; font-weight: 500; background: transparent; color: #517882; border: 1.5px solid #dce9ec; border-radius: 7px; padding: 7px 16px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: border-color 0.2s, color 0.2s; }
        .logout-btn:hover { border-color: #0e7490; color: #0e7490; }
        .field-input { width: 100%; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; color: #0d2b33; background: #f0f6f8; border: 1.5px solid transparent; border-radius: 9px; padding: 11px 14px; outline: none; transition: border-color 0.2s ease, background 0.2s ease; box-sizing: border-box; }
        .field-input::placeholder { color: #a8c4cc; }
        .field-input:focus { border-color: #0e7490; background: #fff; }
        .field-input-pr { padding-right: 42px; }
      `}</style>

      {/* Header */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(248,250,251,0.90)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #e4eef1",
        }}
      >
        <div
          style={{
            maxWidth: "1080px",
            margin: "0 auto",
            padding: "0 32px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "9px",
                background: "#0e7490",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "#fff",
                  fontFamily: "'Lora', serif",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                }}
              >
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p
                style={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  color: "#0d2b33",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                {user?.name}
              </p>
              <p style={{ fontSize: "0.72rem", color: "#8aacb4", margin: 0 }}>
                {user?.email}
              </p>
            </div>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={14} /> Гарах
          </button>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1080px",
          margin: "0 auto",
          padding: "40px 32px 80px",
        }}
      >
        {/* Banner */}
        <div
          style={{
            background: "linear-gradient(135deg, #0d2b33 0%, #0e4a5c 100%)",
            borderRadius: "20px",
            padding: "40px 48px",
            marginBottom: "40px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "-60px",
              right: "-60px",
              width: "220px",
              height: "220px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.04)",
            }}
          />
          <div style={{ position: "relative" }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                color: "rgba(255,255,255,0.45)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                display: "block",
                marginBottom: "12px",
              }}
            >
              NCLEX-RN · бэлтгэл
            </span>
            <h1
              style={{
                fontFamily: "'Lora', Georgia, serif",
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 600,
                color: "#fff",
                margin: "0 0 10px",
                lineHeight: 1.25,
                letterSpacing: "-0.01em",
              }}
            >
              Тавтай морилно уу, {user?.name}
            </h1>
            <p
              style={{
                fontSize: "0.9rem",
                color: "rgba(255,255,255,0.55)",
                margin: 0,
                maxWidth: "480px",
                lineHeight: 1.7,
              }}
            >
              Хичээл үзэх, шалгалт өгөх, ахиц дэвшлээ хянах — бүгд нэг дор.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            background: "#eef3f5",
            borderRadius: "12px",
            padding: "4px",
            width: "fit-content",
            marginBottom: "32px",
          }}
        >
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className="tab-btn"
              onClick={() => {
                setActiveTab(id);
                setSelectedCourse(null);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "7px",
                padding: "9px 20px",
                borderRadius: "9px",
                fontSize: "0.84rem",
                fontWeight: 600,
                color: activeTab === id ? "#0d2b33" : "#7a9ea7",
                background: activeTab === id ? "#fff" : "transparent",
                boxShadow:
                  activeTab === id ? "0 1px 6px rgba(14,116,144,0.08)" : "none",
              }}
            >
              <Icon size={15} />
              {label}
            </button>
          ))}
        </div>

        {/* Courses Tab */}
        {activeTab === "courses" &&
          (selectedCourse ? (
            <CourseViewer
              course={selectedCourse}
              onBack={() => setSelectedCourse(null)}
            />
          ) : (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#0d2b33",
                    margin: "0 0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <GraduationCap size={20} color="#0e7490" /> Сургалтын
                  хичээлүүд
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#7a9ea7", margin: 0 }}>
                  Монгол болон англи хэлээр боломжтой.
                </p>
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "20px",
                }}
              >
                {courses.map((course, i) => (
                  <button
                    key={course.id}
                    className="course-card"
                    onMouseEnter={() => setHoveredCard(i)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => setSelectedCourse(course)}
                    style={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      border: "1px solid #dce9ec",
                    }}
                  >
                    <div
                      style={{
                        aspectRatio: "16/8",
                        overflow: "hidden",
                        position: "relative",
                        background: "#e0eef2",
                      }}
                    >
                      <img
                        src={course.image}
                        alt={course.title}
                        className="course-img"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background:
                            "linear-gradient(to top, rgba(13,43,51,0.55) 0%, transparent 55%)",
                        }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "12px",
                          right: "12px",
                          background: "#0e7490",
                          color: "#fff",
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "3px 10px",
                          borderRadius: "99px",
                        }}
                      >
                        МН · EN
                      </span>
                      <p
                        style={{
                          position: "absolute",
                          bottom: "12px",
                          left: "16px",
                          right: "16px",
                          margin: 0,
                          fontFamily: "'Lora', Georgia, serif",
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "#fff",
                          lineHeight: 1.3,
                        }}
                      >
                        {course.title}
                      </p>
                    </div>
                    <div style={{ padding: "18px 20px" }}>
                      <p
                        style={{
                          fontSize: "0.82rem",
                          color: "#7a9ea7",
                          margin: "0 0 14px",
                          lineHeight: 1.65,
                        }}
                      >
                        {course.description}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                            fontSize: "0.77rem",
                            color: "#8aacb4",
                          }}
                        >
                          <BookOpen size={13} /> Part {course.lessons}
                        </span>
                        <ArrowRight
                          size={16}
                          color={hoveredCard === i ? "#0e7490" : "#b0c8cf"}
                          style={{
                            transition: "transform 0.2s, color 0.2s",
                            transform:
                              hoveredCard === i ? "translateX(3px)" : "none",
                          }}
                        />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

        {/* Quiz Tab */}
        {activeTab === "quizzes" &&
          (quizLang ? (
            <Quiz lang={quizLang} onExit={() => setQuizLang(null)} />
          ) : (
            <div>
              <div style={{ marginBottom: "24px" }}>
                <h2
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "1.4rem",
                    fontWeight: 600,
                    color: "#0d2b33",
                    margin: "0 0 6px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <ClipboardCheck size={20} color="#0e7490" /> Шалгалт өгөх
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#7a9ea7", margin: 0 }}>
                  Мэдлэгээ шалгаарай. Асуулт бүр англи болон монгол хэлээр
                  харагдана.
                </p>
              </div>
              <div
                style={{
                  background: "#fff",
                  border: "1px solid #dce9ec",
                  borderRadius: "16px",
                  padding: "40px 32px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "14px",
                    background: "rgba(14,116,144,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                  }}
                >
                  <ClipboardCheck size={26} color="#0e7490" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Lora', Georgia, serif",
                    fontSize: "1.3rem",
                    fontWeight: 600,
                    color: "#0d2b33",
                    margin: "0 0 10px",
                  }}
                >
                  NCLEX-RN Шалгалт
                </h3>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#7a9ea7",
                    margin: "0 0 24px",
                    maxWidth: "400px",
                    marginLeft: "auto",
                    marginRight: "auto",
                    lineHeight: 1.7,
                  }}
                >
                  Санамсаргүй 10 асуулт. Асуулт бүр англи болон монгол хэлбэрээр
                  гарна. Тэнцэхэд 70% шаардлагатай.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    marginBottom: "32px",
                  }}
                >
                  {["10 асуулт", "70% тэнцэх", "Тайлбартай"].map((item) => (
                    <div
                      key={item}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        fontSize: "0.82rem",
                        color: "#517882",
                      }}
                    >
                      <div
                        style={{
                          width: "5px",
                          height: "5px",
                          borderRadius: "50%",
                          background: "#0e7490",
                        }}
                      />
                      {item}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setQuizLang("mn")}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "#0e7490",
                    color: "#fff",
                    border: "none",
                    borderRadius: "10px",
                    padding: "13px 40px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#0c6783")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#0e7490")
                  }
                >
                  Шалгалт эхлүүлэх <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}

        {/* Admin Tab */}
        {activeTab === "admin" && user?.role === "admin" && <AdminPanel />}
      </main>
    </div>
  );
}
