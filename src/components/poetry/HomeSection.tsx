import Icon from "@/components/ui/icon";
import { Poem, Section, btnGold } from "./shared";

interface Props {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
  navigate: (section: Section) => void;
  poems: Poem[];
  loading: boolean;
  setSelectedPoem: (p: Poem | null) => void;
}

export default function HomeSection({ activeSection, setActiveSection, navigate, poems, loading, setSelectedPoem }: Props) {
  return (
    <>
        {/* HOME */}
        {activeSection === "home" && (
          <div>
            <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6" style={{ background: "radial-gradient(ellipse at center, rgba(165,124,66,0.05) 0%, transparent 70%)" }}>
              <div className="mb-8" style={{ opacity: 0.75 }}>
                <div className="flex items-center gap-3 justify-center" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", color: "#a57c42" }}>
                  <span>✦</span><span style={{ color: "#7a6444" }}>Авторские стихотворения</span><span>✦</span>
                </div>
              </div>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.15, letterSpacing: "0.02em", color: "#3d3226", marginBottom: "0.3rem" }}>
                Христианские
              </h1>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.8rem, 8vw, 6.5rem)", fontWeight: 300, lineHeight: 1.15, fontStyle: "italic", background: "linear-gradient(100deg, #c08a3e 0%, #b5673a 45%, #7a8c60 100%)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                стихотворения
              </h1>
              <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.75, margin: "2.5rem auto" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(58,45,32,0.93)", fontStyle: "italic", maxWidth: "480px" }}>
                Слова, рождённые из молитвы и тишины. Каждое{"\u00A0"}стихотворение{"\u00A0"}— свидетельство веры и красоты Божьего мира.
              </p>
              <div className="flex gap-4 mt-12">
                <button onClick={() => navigate("poems")} style={btnGold}>Читать стихи</button>
                <button onClick={() => navigate("about")} style={{ ...btnGold, background: "transparent", borderColor: "#7a8c60", color: "#5f7043" }}>О поэте</button>
              </div>
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "#a57c42", opacity: 0.6 }}>
                <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", textTransform: "uppercase" }}>Прокрутите</span>
                <Icon name="ChevronDown" size={14} />
              </div>
            </section>

            {/* Приветственное слово */}
            <section className="py-24 px-6">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14" style={{ position: "relative", borderRadius: "10px", overflow: "hidden", padding: "3.5rem 2.5rem", backgroundImage: "linear-gradient(180deg, rgba(253,246,233,0.88) 0%, rgba(253,246,233,0.8) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/3c87e877-562c-4446-a8a4-8cdb3988643f.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid #e6d2b0" }}>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Приветствие</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.3rem", fontWeight: 300, lineHeight: 1.3, color: "#3d3226" }}>
                    Добро пожаловать в мир поэзии,<br />рождённой с верой и любовью
                  </h2>
                  <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.65, margin: "2rem auto 0" }} />
                </div>

                <div className="space-y-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.28rem", fontWeight: 400, lineHeight: 1.95, color: "#3a2d20", textAlign: "justify", textIndent: "2.2rem", hyphens: "auto" }}>
                  <p>Мы рады приветствовать вас на нашей странице, где каждый стих — это отклик души, пропитанный молитвой, тишиной и глубокими жизненными переживаниями. Здесь вы откроете для себя авторские стихотворения, написанные мной, а также произведения, вдохновлённые и созданные моей бабушкой и моим папой.</p>

                  <p>Мы создали этот сайт как место поддержки, утешения и духовного укрепления. Мы надеемся, что каждый, кто зайдёт сюда, найдёт слова, которые коснутся его сердца.</p>

                  <p>Здесь собраны и будут пополняться христианские стихи, пронизанные размышлениями, переживаниями и глубоким смыслом. Мы верим, что каждое стихотворение, подобно псалмам, наполнено особым значением. В них вложена частичка души, искренние молитвы и размышления о Божьей любви и Его Промысле.</p>

                  <p>В жизни каждого человека встречаются радости и трудности, но во всём этом присутствует Господь. Надеемся, что читая строки здесь, вы сможете найти утешение, почувствовать Божью любовь, мир и тепло. Возможно, в каких-то стихах вы узнаете себя, свои переживания, и это послужит вам поддержкой. Кроме того, мы хотим сохранить ту часть семейного наследия, где поэзия становилась личным письмом: многие из бабушкиных стихов изначально предназначались конкретным людям, и теперь они хранятся здесь как тихое напоминание о связи сердец.</p>

                  <p className="text-center" style={{ color: "#a57c42", fontStyle: "italic", fontSize: "1.3rem", padding: "1rem 0", textIndent: 0, textAlign: "center" }}>
                    Пусть Господь благословит каждого из вас!
                  </p>

                  <p className="text-center" style={{ color: "#a57c42", opacity: 0.8, letterSpacing: "0.15em", fontSize: "1.2rem", textIndent: 0, textAlign: "center" }}>
                    С теплом, Валентина Фастовщук
                  </p>
                </div>

                {/* Напоминание из Писания */}
                <div className="mt-16 p-8" style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", boxShadow: "0 4px 18px rgba(140,95,50,0.07)" }}>
                  <div className="text-center mb-8">
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "#a57c42", opacity: 0.9 }}>Напоминание из Писания</p>
                  </div>
                  <div className="space-y-6">
                    {[
                      { ref: "Псалтирь 104:1", text: "Славьте Господа; призывайте имя Его; возвещайте в народах дела Его" },
                      { ref: "Книга Иова 34:21", text: "Ибо очи Его над путями человека, и Он видит все шаги его" },
                      { ref: "2 Паралипоменон 16:9", text: "Ибо очи Господа обозревают всю землю, чтобы поддерживать тех, чьё сердце вполне предано Ему" },
                      { ref: "1 Фессалоникийцам 5:11", text: "Посему увещавайте друг друга и назидайте один другого" },
                    ].map((verse) => (
                      <div key={verse.ref} style={{ borderLeft: "3px solid #7a8c60", paddingLeft: "1.5rem", background: "rgba(122,140,96,0.07)", paddingTop: "0.75rem", paddingBottom: "0.75rem", borderRadius: "0 6px 6px 0" }}>
                        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", lineHeight: 1.7, color: "rgba(58,45,32,0.96)", marginBottom: "0.5rem" }}>
                          «{verse.text}»
                        </p>
                        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a57c42", opacity: 0.85 }}>
                          {verse.ref}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Featured poems */}
            <section className="pb-24 px-6">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16" style={{ position: "relative", borderRadius: "10px", overflow: "hidden", padding: "3rem 2.5rem", backgroundImage: "linear-gradient(180deg, rgba(253,246,233,0.88) 0%, rgba(253,246,233,0.8) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/4ca1ed55-b029-4d0e-b334-8862593ef5d2.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid #e6d2b0" }}>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Избранное</p>
                  <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2.5rem", fontWeight: 300, color: "#3d3226" }}>Последние стихотворения</h2>
                  <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.65, margin: "1.5rem auto 0" }} />
                </div>
                {loading ? (
                  <div className="text-center py-20" style={{ color: "rgba(58,45,32,0.72)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Загрузка...</div>
                ) : (
                  <div className="grid md:grid-cols-3 gap-6">
                    {poems.slice(0, 3).map((poem) => (
                      <div key={poem.id} onClick={() => { setSelectedPoem(poem); setActiveSection("poems"); }} className="cursor-pointer" style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", boxShadow: "0 4px 18px rgba(140,95,50,0.07)", transition: "all 0.4s ease", overflow: "hidden" }}
                        onMouseEnter={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#a57c42"; el.style.transform = "translateY(-2px)"; el.style.boxShadow = "0 0 40px rgba(165,124,66,0.07)"; }}
                        onMouseLeave={(e) => { const el = e.currentTarget as HTMLDivElement; el.style.borderColor = "#e5d8c0"; el.style.transform = "translateY(0)"; el.style.boxShadow = "none"; }}>
                        {poem.image_url && (
                          <div style={{ height: "140px", overflow: "hidden" }}>
                            <img src={poem.image_url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
                          </div>
                        )}
                        <div style={{ padding: "2rem" }}>
                          <div className="flex items-center justify-between mb-5">
                            <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>{poem.category}</span>
                            <span style={{ color: "#a57c42", opacity: 0.5, fontSize: "0.75rem", fontFamily: "Montserrat" }}>{poem.year}</span>
                          </div>
                          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontWeight: 400, color: "#3d3226", marginBottom: "0.8rem" }}>{poem.title}</h3>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(58,45,32,0.85)", fontStyle: "italic", whiteSpace: "pre-line" }}>{poem.excerpt}</p>
                          <div className="flex items-center gap-3 mt-5">
                            {poem.has_audio && <Icon name="Music" size={12} style={{ color: "#a57c42", opacity: 0.75 }} />}
                            {poem.has_video && <Icon name="Play" size={12} style={{ color: "#a57c42", opacity: 0.75 }} />}
                            {poem.image_url && <Icon name="Image" size={12} style={{ color: "#a57c42", opacity: 0.75 }} />}
                            <div className="flex-1" />
                            <Icon name="ArrowRight" size={14} style={{ color: "#a57c42", opacity: 0.65 }} />
                          </div>
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

            <section className="py-24 px-6" style={{ borderTop: "1px solid #e5d8c0", borderBottom: "1px solid #e5d8c0" }}>
              <div className="max-w-2xl mx-auto text-center">
                <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, lineHeight: 1.75, fontStyle: "italic", color: "#3d3226", opacity: 0.8 }}>
                  <span style={{ color: "#a57c42", opacity: 0.55 }}>«</span>Поэзия{"\u00A0"}— это молитва,<br />которую сердце произносит словами.<span style={{ color: "#a57c42", opacity: 0.55 }}>»</span>
                </blockquote>
              </div>
            </section>
          </div>
        )}
    </>
  );
}