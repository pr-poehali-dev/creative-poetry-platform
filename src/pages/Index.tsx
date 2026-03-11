import { useState, useEffect, useCallback } from "react";
import Icon from "@/components/ui/icon";

const API = "https://functions.poehali.dev/b5fe522b-d013-460b-93e0-a5976ac7056e";

interface Poem {
  id: number;
  title: string;
  text: string;
  excerpt: string;
  category: string;
  year: string;
  has_audio: boolean;
  has_video: boolean;
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  created_at?: string;
}

const EMPTY_FORM = {
  title: "",
  text: "",
  excerpt: "",
  category: "Лирика",
  year: new Date().getFullYear().toString(),
  has_audio: false,
  has_video: false,
  audio_url: "",
  video_url: "",
  image_url: "",
};

type Section = "home" | "poems" | "about" | "contacts" | "admin";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [selectedPoem, setSelectedPoem] = useState<Poem | null>(null);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Admin state
  const [adminOpen, setAdminOpen] = useState(false);
  const [editingPoem, setEditingPoem] = useState<Poem | null>(null);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const fetchPoems = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(API);
      const data = await res.json();
      setPoems(data);
    } catch {
      setPoems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchPoems(); }, [fetchPoems]);

  const navItems: { key: Section; label: string }[] = [
    { key: "home", label: "Главная" },
    { key: "poems", label: "Стихотворения" },
    { key: "about", label: "О поэте" },
    { key: "contacts", label: "Контакты" },
  ];

  const navigate = (section: Section) => {
    setActiveSection(section);
    setSelectedPoem(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openCreate = () => {
    setEditingPoem(null);
    setForm({ ...EMPTY_FORM });
    setAdminOpen(true);
  };

  const openEdit = (poem: Poem) => {
    setEditingPoem(poem);
    setForm({
      title: poem.title,
      text: poem.text,
      excerpt: poem.excerpt || "",
      category: poem.category,
      year: poem.year,
      has_audio: poem.has_audio,
      has_video: poem.has_video,
      audio_url: poem.audio_url || "",
      video_url: poem.video_url || "",
      image_url: poem.image_url || "",
    });
    setAdminOpen(true);
  };

  const savePoem = async () => {
    if (!form.title.trim() || !form.text.trim()) return;
    setSaving(true);
    try {
      const body = {
        ...form,
        excerpt: form.excerpt.trim() || form.text.split("\n").slice(0, 2).join("\n") + "...",
      };
      const url = editingPoem ? `${API}?id=${editingPoem.id}` : API;
      const method = editingPoem ? "PUT" : "POST";
      await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      await fetchPoems();
      setAdminOpen(false);
    } finally {
      setSaving(false);
    }
  };

  const deletePoem = async (id: number) => {
    await fetch(`${API}?id=${id}`, { method: "DELETE" });
    await fetchPoems();
    setDeleteConfirm(null);
    if (selectedPoem?.id === id) setSelectedPoem(null);
  };

  const inputStyle = {
    display: "block",
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid #2e2418",
    color: "#f0e8d5",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    padding: "0.5rem 0",
    outline: "none",
  };

  const btnGold = {
    background: "transparent",
    border: "1px solid #c9a96e",
    color: "#c9a96e",
    padding: "0.5rem 1.5rem",
    fontFamily: "Montserrat, sans-serif",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    cursor: "pointer",
    transition: "all 0.3s",
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#130f0a", backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.03) 0%, transparent 50%)" }}>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5" style={{ backgroundColor: "rgba(19,15,10,0.95)", backdropFilter: "blur(10px)", borderBottom: "1px solid #2e2418" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("home")} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", letterSpacing: "0.15em", color: "#c9a96e", background: "none", border: "none", cursor: "pointer" }}>
            Поэзия
          </button>
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: activeSection === item.key ? "#c9a96e" : "#e8d5a3", opacity: activeSection === item.key ? 1 : 0.6, background: "none", border: "none", cursor: "pointer", transition: "all 0.3s" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => navigate("admin")} title="Управление" style={{ background: "none", border: "none", cursor: "pointer", color: activeSection === "admin" ? "#c9a96e" : "#c9a96e", opacity: activeSection === "admin" ? 1 : 0.3, transition: "opacity 0.3s" }}>
              <Icon name="Settings" size={15} />
            </button>
          </div>
          <button className="md:hidden" style={{ color: "#c9a96e", background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-5 items-center" style={{ borderTop: "1px solid #2e2418" }}>
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: activeSection === item.key ? "#c9a96e" : "#e8d5a3", opacity: activeSection === item.key ? 1 : 0.6, background: "none", border: "none", cursor: "pointer" }}>
                {item.label}
              </button>
            ))}
            <button onClick={() => navigate("admin")} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.5, background: "none", border: "none", cursor: "pointer" }}>
              Управление
            </button>
          </div>
        )}
      </nav>

      <main className="pt-20">

        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 70%)" }}>
              <div className="mb-8" style={{ opacity: 0.5 }}>
                <div className="flex items-center gap-3 justify-center" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#c9a96e" }}>
                  <span>✦</span><span style={{ color: "#e8d5a3" }}>Авторские стихотворения</span><span>✦</span>
                </div>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "0.02em", color: "#f0e8d5", marginBottom: "0.3rem" }}>
                Христианские
              </h1>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.15, fontStyle: "italic", color: "#c9a96e" }}>
                стихотворения
              </h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.5, margin: "2.5rem auto" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,232,213,0.65)", fontStyle: "italic", maxWidth: "480px" }}>
                Слова, рождённые из молитвы и тишины. Каждое стихотворение — свидетельство веры и красоты Божьего мира.
              </p>
              <div className="flex gap-4 mt-12">
                <button onClick={() => navigate("poems")} style={btnGold}>Читать стихи</button>
                <button onClick={() => navigate("about")} style={{ ...btnGold, borderColor: "rgba(201,169,110,0.35)", color: "rgba(240,232,213,0.55)" }}>О поэте</button>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#c9a96e", opacity: 0.35 }}>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Прокрутите</span>
                <Icon name="ChevronDown" size={14} />
              </div>
            </section>

            {/* Featured poems */}
            <section className="py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>Избранное</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#f0e8d5" }}>Последние стихотворения</h2>
                  <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.4, margin: "1.5rem auto 0" }} />
                </div>
                {loading ? (
                  <div className="text-center py-20" style={{ color: "rgba(240,232,213,0.3)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Загрузка...</div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {poems.slice(0, 3).map((poem) => (
                      <div key={poem.id} onClick={() => { setSelectedPoem(poem); setActiveSection("poems"); }} className="cursor-pointer" style={{ background: "#1c1610", border: "1px solid #2e2418", padding: "2rem", transition: "all 0.4s ease" }}
                        onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#c9a96e"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 0 40px rgba(201,169,110,0.07)"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#2e2418"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                        <div className="flex items-center justify-between mb-5">
                          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>{poem.category}</span>
                          <span style={{ color: "#c9a96e", opacity: 0.25, fontSize: "0.75rem", fontFamily: "Montserrat" }}>{poem.year}</span>
                        </div>
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#f0e8d5", marginBottom: "0.8rem" }}>{poem.title}</h3>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,232,213,0.45)", fontStyle: "italic", whiteSpace: "pre-line" }}>{poem.excerpt}</p>
                        <div className="flex items-center gap-3 mt-5">
                          {poem.has_audio && <Icon name="Music" size={12} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                          {poem.has_video && <Icon name="Play" size={12} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                          <div className="flex-1" />
                          <Icon name="ArrowRight" size={14} style={{ color: "#c9a96e", opacity: 0.4 }} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="text-center mt-12">
                  <button onClick={() => navigate("poems")} style={btnGold}>Все стихотворения</button>
                </div>
              </div>
            </section>

            <section className="py-24 px-6" style={{ borderTop: "1px solid #2e2418", borderBottom: "1px solid #2e2418" }}>
              <div className="max-w-2xl mx-auto text-center">
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "#c9a96e", opacity: 0.2, lineHeight: 1 }}>«</div>
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.75, fontStyle: "italic", color: "#f0e8d5", opacity: 0.8 }}>
                  Поэзия — это молитва,<br />которую сердце произносит словами.
                </blockquote>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "4rem", color: "#c9a96e", opacity: 0.2, lineHeight: 1 }}>»</div>
              </div>
            </section>
          </div>
        )}

        {/* POEMS LIST */}
        {activeSection === "poems" && !selectedPoem && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-14">
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>Все произведения</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>Стихотворения</h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>
            {loading ? (
              <div className="text-center py-20" style={{ color: "rgba(240,232,213,0.3)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Загрузка...</div>
            ) : poems.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(240,232,213,0.3)" }}>Стихотворений пока нет.</p>
                <button onClick={() => navigate("admin")} style={{ ...btnGold, marginTop: "1.5rem" }}>Добавить первое</button>
              </div>
            ) : (
              <div className="space-y-4">
                {poems.map((poem) => (
                  <div key={poem.id} className="cursor-pointer flex items-start justify-between gap-6" onClick={() => setSelectedPoem(poem)}
                    style={{ background: "#1c1610", border: "1px solid #2e2418", padding: "2rem", transition: "all 0.4s ease" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#c9a96e"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2418"; }}>
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>{poem.category}</span>
                        <span style={{ color: "#2e2418" }}>·</span>
                        <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(240,232,213,0.25)" }}>{poem.year}</span>
                        {poem.has_audio && <Icon name="Music" size={12} style={{ color: "#c9a96e", opacity: 0.45 }} />}
                        {poem.has_video && <Icon name="Play" size={12} style={{ color: "#c9a96e", opacity: 0.45 }} />}
                      </div>
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#f0e8d5", marginBottom: "0.5rem" }}>{poem.title}</h2>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(240,232,213,0.4)", whiteSpace: "pre-line", lineHeight: 1.8 }}>{poem.excerpt}</p>
                    </div>
                    <Icon name="ArrowRight" size={18} style={{ color: "#c9a96e", opacity: 0.35, marginTop: "0.5rem", flexShrink: 0 }} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* POEM DETAIL */}
        {activeSection === "poems" && selectedPoem && (
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="flex items-center justify-between mb-12">
              <button onClick={() => setSelectedPoem(null)} className="flex items-center gap-2" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.55, background: "none", border: "none", cursor: "pointer" }}>
                <Icon name="ArrowLeft" size={13} />Назад
              </button>
              <button onClick={() => openEdit(selectedPoem)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c9a96e", opacity: 0.4, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.4"}>
                <Icon name="Pencil" size={15} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>{selectedPoem.category}</span>
              <span style={{ color: "#2e2418" }}>·</span>
              <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(240,232,213,0.25)" }}>{selectedPoem.year}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#f0e8d5", marginBottom: "2rem" }}>{selectedPoem.title}</h1>
            <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginBottom: "3rem" }} />
            {(selectedPoem.has_audio || selectedPoem.has_video) && (
              <div className="mb-10 p-5 flex items-center gap-4" style={{ border: "1px solid #2e2418", background: "rgba(201,169,110,0.02)" }}>
                {selectedPoem.has_audio && <button className="flex items-center gap-2" style={btnGold}><Icon name="Play" size={12} />Слушать</button>}
                {selectedPoem.has_video && <button className="flex items-center gap-2" style={btnGold}><Icon name="Video" size={12} />Смотреть</button>}
              </div>
            )}
            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", lineHeight: 2, fontWeight: 300, color: "#f0e8d5", whiteSpace: "pre-line", marginBottom: "5rem" }}>
              {selectedPoem.text}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {activeSection === "admin" && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>Панель управления</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>Стихотворения</h1>
                <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
              </div>
              <button onClick={openCreate} className="flex items-center gap-2" style={{ ...btnGold, padding: "0.6rem 1.5rem" }}>
                <Icon name="Plus" size={14} />Добавить
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20" style={{ color: "rgba(240,232,213,0.3)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>Загрузка...</div>
            ) : poems.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(240,232,213,0.3)", marginBottom: "1.5rem" }}>Стихотворений пока нет.</p>
                <button onClick={openCreate} style={btnGold}>Добавить первое</button>
              </div>
            ) : (
              <div className="space-y-3">
                {poems.map((poem) => (
                  <div key={poem.id} className="flex items-center justify-between gap-4" style={{ background: "#1c1610", border: "1px solid #2e2418", padding: "1.25rem 1.75rem" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#f0e8d5" }}>{poem.title}</h3>
                        {poem.has_audio && <Icon name="Music" size={11} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                        {poem.has_video && <Icon name="Play" size={11} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.5 }}>{poem.category}</span>
                        <span style={{ color: "#2e2418" }}>·</span>
                        <span style={{ fontFamily: "Montserrat", fontSize: "0.6rem", color: "rgba(240,232,213,0.25)" }}>{poem.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => { setSelectedPoem(poem); navigate("poems"); }} title="Просмотр" style={{ background: "none", border: "none", cursor: "pointer", color: "#c9a96e", opacity: 0.35, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.35"}>
                        <Icon name="Eye" size={16} />
                      </button>
                      <button onClick={() => openEdit(poem)} title="Редактировать" style={{ background: "none", border: "none", cursor: "pointer", color: "#c9a96e", opacity: 0.35, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.35"}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      {deleteConfirm === poem.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => deletePoem(poem.id)} style={{ background: "none", border: "1px solid #8b2a2a", color: "#c97070", padding: "0.2rem 0.6rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Удалить</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ background: "none", border: "none", color: "rgba(240,232,213,0.3)", cursor: "pointer", fontFamily: "Montserrat", fontSize: "0.55rem" }}>Отмена</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(poem.id)} title="Удалить" style={{ background: "none", border: "none", cursor: "pointer", color: "#c97070", opacity: 0.3, transition: "opacity 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"}
                          onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.3"}>
                          <Icon name="Trash2" size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-14">
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>Биография</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>О поэте</h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>
            <div className="grid md:grid-cols-5 gap-12 mt-12">
              <div className="md:col-span-2">
                <div className="aspect-[3/4] flex items-center justify-center" style={{ background: "#1c1610", border: "1px solid #2e2418" }}>
                  <div className="text-center" style={{ opacity: 0.3 }}>
                    <Icon name="User" size={40} style={{ color: "#c9a96e", margin: "0 auto 1rem" }} />
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", color: "#c9a96e", letterSpacing: "0.1em" }}>Фото поэта</p>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3">
                <div className="space-y-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", lineHeight: 1.9, fontWeight: 300, color: "rgba(240,232,213,0.75)" }}>
                  <p>Поэт, чьи строки рождаются на пересечении веры и живого чувства. Стихи — это попытка передать свет тихой молитвы и красоту Божьего мира.</p>
                  <p>Каждое произведение — это диалог с Богом и с читателем. Приглашение остановиться, вздохнуть и почувствовать нечто настоящее.</p>
                  <p style={{ fontStyle: "italic", color: "rgba(240,232,213,0.45)" }}>Пишу о том, что чувствую. О тишине и свете. О вере и сомнении. О красоте, которую Господь вложил в каждую минуту жизни.</p>
                </div>
                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[{ label: "Стихотворений", value: `${poems.length}` }, { label: "Лет творчества", value: "5+" }, { label: "Категорий", value: `${new Set(poems.map(p => p.category)).size}` }].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#c9a96e", lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,232,213,0.35)", marginTop: "0.5rem" }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="mb-14">
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>Связаться</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>Контакты</h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,232,213,0.55)", fontStyle: "italic", marginBottom: "3rem" }}>
              Если стихотворение тронуло вас, если хотите поделиться мыслями или предложить сотрудничество — напишите.
            </p>
            <div className="space-y-8">
              <input placeholder="Ваше имя" style={inputStyle} />
              <input placeholder="Электронная почта" style={inputStyle} />
              <textarea placeholder="Ваше сообщение..." rows={5} style={{ ...inputStyle, resize: "none" }} />
              <button style={{ display: "block", width: "100%", background: "#c9a96e", border: "1px solid #c9a96e", color: "#130f0a", padding: "0.75rem 2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Отправить сообщение
              </button>
            </div>
            <div className="mt-14 pt-10 flex items-center gap-10" style={{ borderTop: "1px solid #2e2418" }}>
              {[{ icon: "Mail", label: "Почта", value: "Укажите email" }, { icon: "MessageCircle", label: "Telegram", value: "@username" }].map((contact) => (
                <div key={contact.label} className="flex items-center gap-3">
                  <Icon name={contact.icon as "Mail"} size={15} style={{ color: "#c9a96e", opacity: 0.5 }} />
                  <div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.45 }}>{contact.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(240,232,213,0.45)" }}>{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-24 py-10 text-center" style={{ borderTop: "1px solid #2e2418" }}>
        <div style={{ color: "#c9a96e", opacity: 0.2, marginBottom: "0.5rem", fontSize: "1.2rem" }}>✦</div>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,232,213,0.2)" }}>
          Христианские стихотворения · {new Date().getFullYear()}
        </p>
      </footer>

      {/* ===== MODAL: Create / Edit ===== */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4" style={{ backgroundColor: "rgba(10,8,5,0.9)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-2xl" style={{ background: "#1c1610", border: "1px solid #2e2418" }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #2e2418" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#f0e8d5" }}>
                {editingPoem ? "Редактировать стихотворение" : "Новое стихотворение"}
              </h2>
              <button onClick={() => setAdminOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c9a96e", opacity: 0.5 }}>
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-8 py-8 space-y-8">
              {/* Название */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>Название *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название стихотворения" style={{ ...inputStyle, marginTop: "0.5rem" }} />
              </div>

              {/* Текст */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>Текст *</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Текст стихотворения..." rows={10} style={{ ...inputStyle, marginTop: "0.5rem", resize: "vertical", lineHeight: 2, fontStyle: "italic" }} />
              </div>

              {/* Анонс */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>Анонс (2 строки)</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Короткий анонс для списка (если пусто — возьмётся из текста)" rows={2} style={{ ...inputStyle, marginTop: "0.5rem", resize: "none", fontStyle: "italic" }} />
              </div>

              {/* Категория и год */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>Категория</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Лирика" style={{ ...inputStyle, marginTop: "0.5rem" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>Год</label>
                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" style={{ ...inputStyle, marginTop: "0.5rem" }} />
                </div>
              </div>

              {/* Медиа переключатели */}
              <div className="flex items-center gap-8">
                {[{ key: "has_audio" as const, icon: "Music", label: "Есть аудио" }, { key: "has_video" as const, icon: "Video", label: "Есть видео" }].map(({ key, icon, label }) => (
                  <button key={key} onClick={() => setForm({ ...form, [key]: !form[key] })} className="flex items-center gap-2" style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: form[key] ? "#c9a96e" : "rgba(240,232,213,0.3)", transition: "color 0.3s" }}>
                    <Icon name={icon as "Music"} size={14} />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-4 px-8 py-6" style={{ borderTop: "1px solid #2e2418" }}>
              <button onClick={() => setAdminOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(240,232,213,0.35)" }}>
                Отмена
              </button>
              <button onClick={savePoem} disabled={saving || !form.title.trim() || !form.text.trim()} style={{ ...btnGold, opacity: saving || !form.title.trim() || !form.text.trim() ? 0.4 : 1 }}>
                {saving ? "Сохраняю..." : editingPoem ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
