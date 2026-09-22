import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { Section, navItems, isAdminUnlocked } from "./shared";

interface NavProps {
  activeSection: Section;
  navigate: (section: Section) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (v: boolean) => void;
}

export function SiteNav({ activeSection, navigate, mobileMenuOpen, setMobileMenuOpen }: NavProps) {
  return (
    <>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-5" style={{ backgroundColor: "rgba(250,244,232,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e5d8c0" }}>
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("home")} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", letterSpacing: "0.15em", color: "#a57c42", background: "none", border: "none", cursor: "pointer" }}>
            Поэзия
          </button>
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: activeSection === item.key ? "#a57c42" : "#7a6444", opacity: activeSection === item.key ? 1 : 0.6, background: "none", border: "none", cursor: "pointer", transition: "all 0.3s" }}>
                {item.label}
              </button>
            ))}
            {isAdminUnlocked() && (
              <button onClick={() => navigate("admin")} title="Управление" style={{ background: "none", border: "none", cursor: "pointer", color: "#a57c42", opacity: activeSection === "admin" ? 1 : 0.4, transition: "opacity 0.3s" }}>
                <Icon name="Settings" size={15} />
              </button>
            )}
          </div>
          <button className="md:hidden" style={{ color: "#a57c42", background: "none", border: "none", cursor: "pointer" }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-5 items-center" style={{ borderTop: "1px solid #e5d8c0" }}>
            {navItems.map((item) => (
              <button key={item.key} onClick={() => navigate(item.key)} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: activeSection === item.key ? "#a57c42" : "#7a6444", opacity: activeSection === item.key ? 1 : 0.6, background: "none", border: "none", cursor: "pointer" }}>
                {item.label}
              </button>
            ))}
            {isAdminUnlocked() && (
              <button onClick={() => navigate("admin")} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a57c42", opacity: 0.75, background: "none", border: "none", cursor: "pointer" }}>
                Управление
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}

export function SiteFooter({ navigate }: { navigate: (section: Section) => void }) {
  const clicks = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const secretClick = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    if (clicks.current >= 3) {
      clicks.current = 0;
      navigate("admin");
      return;
    }
    timer.current = setTimeout(() => { clicks.current = 0; }, 900);
  };

  return (
    <>
      {/* Footer */}
      <footer className="mt-24 py-16 text-center" style={{ borderTop: "1px solid #e5d8c0", backgroundImage: "linear-gradient(180deg, rgba(253,246,233,0.9) 0%, rgba(253,246,233,0.82) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/3c87e877-562c-4446-a8a4-8cdb3988643f.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <button onClick={secretClick} aria-label="" style={{ color: "#a57c42", opacity: 0.7, marginBottom: "1.25rem", fontSize: "1.2rem", background: "none", border: "none", cursor: "default", lineHeight: 1, userSelect: "none" }}>✦</button>
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mb-8">
          {navItems.map((item) => (
            <button key={item.key} onClick={() => navigate(item.key)} style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7d6047", background: "none", border: "none", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#5f7043"}
              onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.color = "#7d6047"}>
              {item.label}
            </button>
          ))}
        </div>
        <div className="flex items-center justify-center gap-6 mb-8">
          <a href="https://t.me/hristianskiestihotvoreniyafastov" target="_blank" rel="noreferrer" title="Telegram"
            className="flex items-center gap-2" style={{ textDecoration: "none", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7d6047", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#5f7043"}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#7d6047"}>
            <Icon name="Send" size={14} />Telegram
          </a>
          <a href="mailto:hristianskiestihotvoreniya@yandex.ru" title="Написать"
            className="flex items-center gap-2" style={{ textDecoration: "none", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#7d6047", transition: "color 0.3s" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#5f7043"}
            onMouseLeave={(e) => (e.currentTarget as HTMLAnchorElement).style.color = "#7d6047"}>
            <Icon name="Mail" size={14} />Почта
          </a>
        </div>
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(58,45,32,0.8)" }}>
          © {new Date().getFullYear()} Христианские стихотворения · Семья Фастовщук
        </p>
        <p className="max-w-xl mx-auto mt-4 px-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", fontStyle: "italic", lineHeight: 1.7, color: "rgba(58,45,32,0.7)" }}>
          Все стихотворения принадлежат их авторам. Копирование и распространение возможны при указании автора и ссылки на этот сайт.
        </p>
      </footer>
    </>
  );
}