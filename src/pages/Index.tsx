import { useState } from "react";
import Icon from "@/components/ui/icon";

const POEMS = [
  {
    id: 1,
    title: "Осенний вечер",
    excerpt: "Прощальный свет осенних дней\nЛожится золотом на воды...",
    text: `Прощальный свет осенних дней
Ложится золотом на воды,
И тают медленно, как годы,
Последних листьев голоса.

Я снова здесь, у этих берегов,
Где тишина звучит красноречивей слов,
Где каждый вздох — как страница в книге,
Что не дочитана ещё.`,
    category: "Лирика",
    year: "2024",
    hasAudio: false,
    hasVideo: false,
  },
  {
    id: 2,
    title: "Первый снег",
    excerpt: "Он падал тихо, как молчание,\nКак исповедь без отпущения...",
    text: `Он падал тихо, как молчание,
Как исповедь без отпущения,
Покрывая землю белым знанием
О том, что всё имеет завершение.

И в этой чистоте безмолвной
Я видел снова — всё с начала.
Душа, израненная, полная,
Под снегом тихим задышала.`,
    category: "Духовная лирика",
    year: "2024",
    hasAudio: true,
    hasVideo: false,
  },
  {
    id: 3,
    title: "Свет незакатный",
    excerpt: "Где-то за краем земного пути\nСвет негасимый горит...",
    text: `Где-то за краем земного пути
Свет негасимый горит,
И сколько бы тьмы ни пришлось перейти —
Он тихо зовёт и манит.

Не гаснет в ночи, не меркнет в слезах,
Не ведает страха и лжи.
Он в детских руках, в молитвенных устах,
В любви, что сильнее межи.`,
    category: "Духовная лирика",
    year: "2023",
    hasAudio: false,
    hasVideo: true,
  },
];

const REVIEWS = [
  {
    id: 1,
    author: "Мария К.",
    text: "Стихи проникают в самую душу. Читаю и перечитываю «Первый снег» — каждый раз нахожу что-то новое.",
    poem: "Первый снег",
    date: "март 2025",
  },
  {
    id: 2,
    author: "Александр В.",
    text: "Редкое сочетание классической формы и глубокой веры. Восхищён.",
    poem: "Осенний вечер",
    date: "февраль 2025",
  },
];

type Section = "home" | "poems" | "about" | "contacts";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [selectedPoem, setSelectedPoem] = useState<(typeof POEMS)[0] | null>(null);
  const [reviewName, setReviewName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "#130f0a",
        backgroundImage:
          "radial-gradient(ellipse at 20% 50%, rgba(201,169,110,0.03) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(201,169,110,0.02) 0%, transparent 40%)",
      }}
    >
      {/* Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 px-6 py-5"
        style={{
          backgroundColor: "rgba(19, 15, 10, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid #2e2418",
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate("home")}
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.2rem",
              letterSpacing: "0.15em",
              color: "#c9a96e",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Поэзия
          </button>

          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: activeSection === item.key ? "#c9a96e" : "#e8d5a3",
                  opacity: activeSection === item.key ? 1 : 0.6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            className="md:hidden"
            style={{ color: "#c9a96e", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div
            className="md:hidden mt-4 pb-4 flex flex-col gap-5 items-center"
            style={{ borderTop: "1px solid #2e2418" }}
          >
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => navigate(item.key)}
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.65rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: activeSection === item.key ? "#c9a96e" : "#e8d5a3",
                  opacity: activeSection === item.key ? 1 : 0.6,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="pt-20">
        {/* HOME */}
        {activeSection === "home" && (
          <div>
            {/* Hero */}
            <section
              className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(201,169,110,0.05) 0%, transparent 70%)",
              }}
            >
              <div className="mb-8" style={{ opacity: 0.5 }}>
                <div
                  className="flex items-center gap-3 justify-center"
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.6rem",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    color: "#c9a96e",
                  }}
                >
                  <span>✦</span>
                  <span style={{ color: "#e8d5a3" }}>Авторские стихотворения</span>
                  <span>✦</span>
                </div>
              </div>

              {/* Главный заголовок */}
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  color: "#f0e8d5",
                  marginBottom: "0.3rem",
                }}
              >
                Христианские
              </h1>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.8rem, 8vw, 6.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "0.02em",
                  fontStyle: "italic",
                  color: "#c9a96e",
                }}
              >
                стихотворения
              </h1>

              {/* Декоративная линия */}
              <div
                style={{
                  width: "60px",
                  height: "1px",
                  background: "#c9a96e",
                  opacity: 0.5,
                  margin: "2.5rem auto",
                }}
              />

              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "rgba(240, 232, 213, 0.65)",
                  fontStyle: "italic",
                  maxWidth: "480px",
                }}
              >
                Слова, рождённые из молитвы и тишины.
                Каждое стихотворение — свидетельство веры
                и красоты Божьего мира.
              </p>

              <div className="flex gap-4 mt-12">
                <button
                  onClick={() => navigate("poems")}
                  style={{
                    background: "transparent",
                    border: "1px solid #c9a96e",
                    color: "#c9a96e",
                    padding: "0.6rem 2rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#c9a96e";
                    (e.currentTarget as HTMLButtonElement).style.color = "#130f0a";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    (e.currentTarget as HTMLButtonElement).style.color = "#c9a96e";
                  }}
                >
                  Читать стихи
                </button>
                <button
                  onClick={() => navigate("about")}
                  style={{
                    background: "transparent",
                    border: "1px solid rgba(201,169,110,0.4)",
                    color: "rgba(240,232,213,0.6)",
                    padding: "0.6rem 2rem",
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.7rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  О поэте
                </button>
              </div>

              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                style={{ color: "#c9a96e", opacity: 0.4 }}
              >
                <span
                  style={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Прокрутите
                </span>
                <Icon name="ChevronDown" size={14} />
              </div>
            </section>

            {/* Избранные стихи */}
            <section className="py-24 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                  <p
                    style={{
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      color: "#c9a96e",
                      opacity: 0.65,
                      marginBottom: "1rem",
                    }}
                  >
                    Избранное
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: "#f0e8d5",
                    }}
                  >
                    Последние стихотворения
                  </h2>
                  <div
                    style={{
                      width: "60px",
                      height: "1px",
                      background: "#c9a96e",
                      opacity: 0.45,
                      margin: "1.5rem auto 0",
                    }}
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {POEMS.map((poem) => (
                    <div
                      key={poem.id}
                      onClick={() => {
                        setSelectedPoem(poem);
                        setActiveSection("poems");
                      }}
                      className="cursor-pointer"
                      style={{
                        background: "#1c1610",
                        border: "1px solid #2e2418",
                        padding: "2rem",
                        transition: "all 0.4s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#c9a96e";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 40px rgba(201,169,110,0.07)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2418";
                        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      }}
                    >
                      <div className="flex items-center justify-between mb-5">
                        <span
                          style={{
                            fontFamily: "Montserrat, sans-serif",
                            fontSize: "0.55rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            color: "#c9a96e",
                            opacity: 0.6,
                          }}
                        >
                          {poem.category}
                        </span>
                        <span style={{ color: "#c9a96e", opacity: 0.25, fontSize: "0.75rem", fontFamily: "Montserrat" }}>
                          {poem.year}
                        </span>
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "1.4rem",
                          fontWeight: 400,
                          color: "#f0e8d5",
                          marginBottom: "0.8rem",
                        }}
                      >
                        {poem.title}
                      </h3>
                      <p
                        style={{
                          fontFamily: "'Cormorant Garamond', serif",
                          fontSize: "0.9rem",
                          fontWeight: 300,
                          lineHeight: 1.9,
                          color: "rgba(240,232,213,0.45)",
                          fontStyle: "italic",
                          whiteSpace: "pre-line",
                        }}
                      >
                        {poem.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-5">
                        {poem.hasAudio && <Icon name="Music" size={12} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                        {poem.hasVideo && <Icon name="Play" size={12} style={{ color: "#c9a96e", opacity: 0.5 }} />}
                        <div className="flex-1" />
                        <Icon name="ArrowRight" size={14} style={{ color: "#c9a96e", opacity: 0.4 }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => navigate("poems")}
                    style={{
                      background: "transparent",
                      border: "1px solid #c9a96e",
                      color: "#c9a96e",
                      padding: "0.6rem 2rem",
                      fontFamily: "Montserrat, sans-serif",
                      fontSize: "0.7rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                    }}
                  >
                    Все стихотворения
                  </button>
                </div>
              </div>
            </section>

            {/* Цитата */}
            <section
              className="py-24 px-6"
              style={{ borderTop: "1px solid #2e2418", borderBottom: "1px solid #2e2418" }}
            >
              <div className="max-w-2xl mx-auto text-center">
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "4rem",
                    color: "#c9a96e",
                    opacity: 0.2,
                    lineHeight: 1,
                  }}
                >
                  «
                </div>
                <blockquote
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.5rem",
                    fontWeight: 300,
                    lineHeight: 1.75,
                    fontStyle: "italic",
                    color: "#f0e8d5",
                    opacity: 0.8,
                  }}
                >
                  Поэзия — это молитва,<br />
                  которую сердце произносит словами.
                </blockquote>
                <div
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "4rem",
                    color: "#c9a96e",
                    opacity: 0.2,
                    lineHeight: 1,
                  }}
                >
                  »
                </div>
              </div>
            </section>
          </div>
        )}

        {/* POEMS LIST */}
        {activeSection === "poems" && !selectedPoem && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="mb-14">
              <p
                style={{
                  fontFamily: "Montserrat, sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  color: "#c9a96e",
                  opacity: 0.65,
                  marginBottom: "1rem",
                }}
              >
                Все произведения
              </p>
              <h1
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "3rem",
                  fontWeight: 300,
                  color: "#f0e8d5",
                }}
              >
                Стихотворения
              </h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>

            <div className="space-y-4">
              {POEMS.map((poem) => (
                <div
                  key={poem.id}
                  className="cursor-pointer flex items-start justify-between gap-6"
                  onClick={() => setSelectedPoem(poem)}
                  style={{
                    background: "#1c1610",
                    border: "1px solid #2e2418",
                    padding: "2rem",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#c9a96e";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#2e2418";
                  }}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>
                        {poem.category}
                      </span>
                      <span style={{ color: "#2e2418" }}>·</span>
                      <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(240,232,213,0.25)" }}>{poem.year}</span>
                      {poem.hasAudio && <Icon name="Music" size={12} style={{ color: "#c9a96e", opacity: 0.45 }} />}
                      {poem.hasVideo && <Icon name="Play" size={12} style={{ color: "#c9a96e", opacity: 0.45 }} />}
                    </div>
                    <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#f0e8d5", marginBottom: "0.5rem" }}>
                      {poem.title}
                    </h2>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(240,232,213,0.4)", whiteSpace: "pre-line", lineHeight: 1.8 }}>
                      {poem.excerpt}
                    </p>
                  </div>
                  <Icon name="ArrowRight" size={18} style={{ color: "#c9a96e", opacity: 0.35, marginTop: "0.5rem" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* POEM DETAIL */}
        {activeSection === "poems" && selectedPoem && (
          <div className="max-w-3xl mx-auto px-6 py-16">
            <button
              onClick={() => setSelectedPoem(null)}
              className="flex items-center gap-2 mb-12"
              style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.55, background: "none", border: "none", cursor: "pointer" }}
            >
              <Icon name="ArrowLeft" size={13} />
              Назад
            </button>

            <div className="flex items-center gap-4 mb-3">
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.6 }}>
                {selectedPoem.category}
              </span>
              <span style={{ color: "#2e2418" }}>·</span>
              <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(240,232,213,0.25)" }}>{selectedPoem.year}</span>
            </div>

            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#f0e8d5", marginBottom: "2rem" }}>
              {selectedPoem.title}
            </h1>

            <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginBottom: "3rem" }} />

            {(selectedPoem.hasAudio || selectedPoem.hasVideo) && (
              <div className="mb-10 p-5 flex items-center gap-4" style={{ border: "1px solid #2e2418", background: "rgba(201,169,110,0.02)" }}>
                {selectedPoem.hasAudio && (
                  <button className="flex items-center gap-2" style={{ background: "transparent", border: "1px solid #c9a96e", color: "#c9a96e", padding: "0.5rem 1.2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
                    <Icon name="Play" size={12} />
                    Слушать
                  </button>
                )}
                {selectedPoem.hasVideo && (
                  <button className="flex items-center gap-2" style={{ background: "transparent", border: "1px solid #c9a96e", color: "#c9a96e", padding: "0.5rem 1.2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}>
                    <Icon name="Video" size={12} />
                    Смотреть
                  </button>
                )}
              </div>
            )}

            <div
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.15rem",
                lineHeight: 2,
                fontWeight: 300,
                color: "#f0e8d5",
                whiteSpace: "pre-line",
                marginBottom: "5rem",
              }}
            >
              {selectedPoem.text}
            </div>

            {/* Отзывы */}
            <div style={{ borderTop: "1px solid #2e2418", paddingTop: "3rem" }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#f0e8d5", marginBottom: "2rem" }}>
                Отзывы читателей
              </h3>

              {REVIEWS.filter((r) => r.poem === selectedPoem.title).length > 0 ? (
                <div className="space-y-6 mb-10">
                  {REVIEWS.filter((r) => r.poem === selectedPoem.title).map((review) => (
                    <div key={review.id} style={{ borderLeft: "2px solid #c9a96e", paddingLeft: "1.5rem" }}>
                      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", fontStyle: "italic", lineHeight: 1.8, color: "#f0e8d5", opacity: 0.8, marginBottom: "0.75rem" }}>
                        {review.text}
                      </p>
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", color: "#c9a96e", opacity: 0.75 }}>{review.author}</span>
                        <span style={{ color: "#2e2418" }}>·</span>
                        <span style={{ fontFamily: "Montserrat", fontSize: "0.6rem", color: "rgba(240,232,213,0.3)" }}>{review.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", color: "rgba(240,232,213,0.3)", marginBottom: "2rem" }}>
                  Будьте первым, кто оставит отзыв.
                </p>
              )}

              <h4 style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.55, marginBottom: "1.5rem", marginTop: "2rem" }}>
                Оставить отзыв
              </h4>
              <div className="space-y-6">
                <input
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="Ваше имя"
                  style={{ display: "block", width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2e2418", color: "#f0e8d5", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.5rem 0", outline: "none" }}
                />
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Поделитесь впечатлением..."
                  rows={3}
                  style={{ display: "block", width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2e2418", color: "#f0e8d5", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.5rem 0", outline: "none", resize: "none" }}
                />
                <button style={{ background: "transparent", border: "1px solid #c9a96e", color: "#c9a96e", padding: "0.6rem 2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                  Отправить
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ABOUT */}
        {activeSection === "about" && (
          <div className="max-w-4xl mx-auto px-6 py-16">
            <div className="mb-14">
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>
                Биография
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>
                О поэте
              </h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>

            <div className="grid md:grid-cols-5 gap-12 mt-12">
              <div className="md:col-span-2">
                <div
                  className="aspect-[3/4] flex items-center justify-center"
                  style={{ background: "#1c1610", border: "1px solid #2e2418" }}
                >
                  <div className="text-center" style={{ opacity: 0.3 }}>
                    <Icon name="User" size={40} style={{ color: "#c9a96e", margin: "0 auto 1rem" }} />
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", color: "#c9a96e", letterSpacing: "0.1em" }}>Фото поэта</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="space-y-5" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", lineHeight: 1.9, fontWeight: 300, color: "rgba(240,232,213,0.75)" }}>
                  <p>
                    Поэт, чьи строки рождаются на пересечении веры и живого чувства.
                    Стихи — это попытка передать то, что слова обычно не умеют вместить:
                    свет тихой молитвы, красоту Божьего мира.
                  </p>
                  <p>
                    Каждое произведение — это диалог с Богом и с читателем.
                    Приглашение остановиться, вздохнуть и почувствовать нечто настоящее.
                  </p>
                  <p style={{ fontStyle: "italic", color: "rgba(240,232,213,0.45)" }}>
                    Пишу о том, что чувствую. О тишине и свете. О вере и сомнении.
                    О красоте, которую Господь вложил в каждую минуту жизни.
                  </p>
                </div>

                <div className="mt-10 grid grid-cols-3 gap-6">
                  {[
                    { label: "Стихотворений", value: "3+" },
                    { label: "Лет творчества", value: "5+" },
                    { label: "Отзывов", value: "2+" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#c9a96e", lineHeight: 1 }}>
                        {stat.value}
                      </div>
                      <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(240,232,213,0.35)", marginTop: "0.5rem" }}>
                        {stat.label}
                      </div>
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
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a96e", opacity: 0.65, marginBottom: "1rem" }}>
                Связаться
              </p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#f0e8d5" }}>
                Контакты
              </h1>
              <div style={{ width: "60px", height: "1px", background: "#c9a96e", opacity: 0.45, marginTop: "1.5rem" }} />
            </div>

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(240,232,213,0.55)", fontStyle: "italic", marginBottom: "3rem" }}>
              Если стихотворение тронуло вас, если хотите поделиться мыслями
              или предложить сотрудничество — напишите. Каждое письмо важно.
            </p>

            <div className="space-y-8">
              <input placeholder="Ваше имя" style={{ display: "block", width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2e2418", color: "#f0e8d5", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.5rem 0", outline: "none" }} />
              <input placeholder="Электронная почта" style={{ display: "block", width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2e2418", color: "#f0e8d5", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.5rem 0", outline: "none" }} />
              <textarea placeholder="Ваше сообщение..." rows={5} style={{ display: "block", width: "100%", background: "transparent", border: "none", borderBottom: "1px solid #2e2418", color: "#f0e8d5", fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", padding: "0.5rem 0", outline: "none", resize: "none" }} />
              <button style={{ display: "block", width: "100%", background: "#c9a96e", border: "1px solid #c9a96e", color: "#130f0a", padding: "0.75rem 2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Отправить сообщение
              </button>
            </div>

            <div className="mt-14 pt-10 flex items-center gap-10" style={{ borderTop: "1px solid #2e2418" }}>
              {[
                { icon: "Mail", label: "Почта", value: "Укажите email" },
                { icon: "MessageCircle", label: "Telegram", value: "@username" },
              ].map((contact) => (
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
        <div style={{ color: "#c9a96e", opacity: 0.25, marginBottom: "0.5rem", fontSize: "1.2rem" }}>✦</div>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(240,232,213,0.2)" }}>
          Христианские стихотворения · {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}
