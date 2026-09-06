import Icon from "@/components/ui/icon";
import { AUTHORS, Poem, Section, btnGold, inputStyle } from "./shared";

interface Props {
  activeSection: Section;
  navigate: (section: Section) => void;
  poems: Poem[];
  loading: boolean;
  selectedPoem: Poem | null;
  setSelectedPoem: (p: Poem | null) => void;
  openEdit: (poem: Poem) => void;
  openCreate: () => void;
  deletePoem: (id: number) => void;
  deleteConfirm: number | null;
  setDeleteConfirm: (v: number | null) => void;
}

export default function PoemsSections({ activeSection, navigate, poems, loading, selectedPoem, setSelectedPoem, openEdit, openCreate, deletePoem, deleteConfirm, setDeleteConfirm }: Props) {
  return (
    <>
        {/* POEMS LIST */}
        {activeSection === "poems" && !selectedPoem && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", padding: "3.5rem 2.5rem", marginBottom: "3.5rem", backgroundImage: "linear-gradient(90deg, rgba(253,246,233,0.94) 0%, rgba(253,246,233,0.72) 55%, rgba(253,246,233,0.55) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/8145e7ba-a43c-4589-9837-e8077605bda8.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid #e6d2b0" }}>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Все произведения</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#3d3226" }}>Стихотворения</h1>
              <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, marginTop: "1.5rem" }} />
            </div>
            {loading ? (
              <div className="text-center py-20" style={{ color: "rgba(58,45,32,0.72)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic" }}>Загрузка...</div>
            ) : poems.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(58,45,32,0.72)" }}>Стихотворений пока нет.</p>
                <button onClick={() => navigate("admin")} style={{ ...btnGold, marginTop: "1.5rem" }}>Добавить первое</button>
              </div>
            ) : (
              <div className="space-y-16">
                {AUTHORS.filter((a) => poems.some((p) => (p.author || AUTHORS[0]) === a)).map((author) => (
                  <div key={author}>
                    <div className="mb-8">
                      <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.9rem", fontWeight: 300, fontStyle: "italic", color: "#a57c42" }}>{author}</h2>
                      <div style={{ width: "100%", height: "1px", background: "#e5d8c0", marginTop: "1rem" }} />
                    </div>
                    <div className="space-y-4">
                      {poems.filter((p) => (p.author || AUTHORS[0]) === author).map((poem) => (
                        <div key={poem.id} className="cursor-pointer flex items-start justify-between gap-6" onClick={() => setSelectedPoem(poem)}
                          style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", boxShadow: "0 4px 18px rgba(140,95,50,0.07)", padding: "2rem", transition: "all 0.4s ease" }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#a57c42"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.borderColor = "#e5d8c0"; }}>
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-3">
                              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>{poem.category}</span>
                              <span style={{ color: "#e5d8c0" }}>·</span>
                              <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(58,45,32,0.68)" }}>{poem.year}</span>
                              {poem.has_audio && <Icon name="Music" size={12} style={{ color: "#a57c42", opacity: 0.7 }} />}
                              {poem.has_video && <Icon name="Play" size={12} style={{ color: "#a57c42", opacity: 0.7 }} />}
                            </div>
                            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 400, color: "#3d3226", marginBottom: "0.5rem" }}>{poem.title}</h3>
                            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", fontStyle: "italic", color: "rgba(58,45,32,0.82)", whiteSpace: "pre-line", lineHeight: 1.8 }}>{poem.excerpt}</p>
                          </div>
                          <Icon name="ArrowRight" size={18} style={{ color: "#a57c42", opacity: 0.6, marginTop: "0.5rem", flexShrink: 0 }} />
                        </div>
                      ))}
                    </div>
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
              <button onClick={() => setSelectedPoem(null)} className="flex items-center gap-2" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#a57c42", opacity: 0.8, background: "none", border: "none", cursor: "pointer" }}>
                <Icon name="ArrowLeft" size={13} />Назад
              </button>
              <button onClick={() => openEdit(selectedPoem)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a57c42", opacity: 0.65, transition: "opacity 0.3s" }}
                onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"}
                onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.4"}>
                <Icon name="Pencil" size={15} />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-3">
              <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>{selectedPoem.category}</span>
              <span style={{ color: "#e5d8c0" }}>·</span>
              <span style={{ fontFamily: "Montserrat", fontSize: "0.65rem", color: "rgba(58,45,32,0.68)" }}>{selectedPoem.year}</span>
            </div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "#3d3226", marginBottom: "0.75rem" }}>{selectedPoem.title}</h1>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#a57c42", opacity: 0.8, marginBottom: "2rem" }}>{selectedPoem.author || AUTHORS[0]}</p>
            <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, marginBottom: "3rem" }} />
            {/* Картинка */}
            {selectedPoem.image_url && (
              <div className="mb-10">
                <img src={selectedPoem.image_url} alt={selectedPoem.title} style={{ width: "100%", maxHeight: "400px", objectFit: "cover", border: "1px solid #e5d8c0" }} />
              </div>
            )}

            {/* Аудио */}
            {selectedPoem.audio_url && (
              <div className="mb-8 p-5" style={{ border: "1px solid #e5d8c0", background: "rgba(165,124,66,0.02)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Music" size={13} style={{ color: "#a57c42", opacity: 0.85 }} />
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a57c42", opacity: 0.75 }}>Аудиозапись</span>
                </div>
                <audio controls src={selectedPoem.audio_url} style={{ width: "100%", height: "36px", accentColor: "#a57c42" }} />
              </div>
            )}

            {/* Видео */}
            {selectedPoem.video_url && (
              <div className="mb-10" style={{ border: "1px solid #e5d8c0" }}>
                <video controls src={selectedPoem.video_url} style={{ width: "100%", display: "block", maxHeight: "400px", background: "#e5d8c0" }} />
              </div>
            )}

            <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", lineHeight: 2, fontWeight: 300, color: "#3d3226", whiteSpace: "pre-line", marginBottom: "5rem" }}>
              {selectedPoem.text}
            </div>
          </div>
        )}

        {/* ADMIN */}
        {activeSection === "admin" && (
          <div className="max-w-5xl mx-auto px-6 py-16">
            <div className="flex items-end justify-between mb-14">
              <div>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Панель управления</p>
                <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#3d3226" }}>Стихотворения</h1>
                <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, marginTop: "1.5rem" }} />
              </div>
              <button onClick={openCreate} className="flex items-center gap-2" style={{ ...btnGold, padding: "0.6rem 1.5rem" }}>
                <Icon name="Plus" size={14} />Добавить
              </button>
            </div>

            {loading ? (
              <div className="text-center py-20" style={{ color: "rgba(58,45,32,0.72)", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>Загрузка...</div>
            ) : poems.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "rgba(58,45,32,0.72)", marginBottom: "1.5rem" }}>Стихотворений пока нет.</p>
                <button onClick={openCreate} style={btnGold}>Добавить первое</button>
              </div>
            ) : (
              <div className="space-y-3">
                {poems.map((poem) => (
                  <div key={poem.id} className="flex items-center justify-between gap-4" style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", boxShadow: "0 4px 18px rgba(140,95,50,0.07)", padding: "1.25rem 1.75rem" }}>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontWeight: 400, color: "#3d3226" }}>{poem.title}</h3>
                        {poem.has_audio && <Icon name="Music" size={11} style={{ color: "#a57c42", opacity: 0.75 }} />}
                        {poem.has_video && <Icon name="Play" size={11} style={{ color: "#a57c42", opacity: 0.75 }} />}
                      </div>
                      <div className="flex items-center gap-3">
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>{poem.category}</span>
                        <span style={{ color: "#e5d8c0" }}>·</span>
                        <span style={{ fontFamily: "Montserrat", fontSize: "0.6rem", color: "rgba(58,45,32,0.68)" }}>{poem.year}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button onClick={() => { setSelectedPoem(poem); navigate("poems"); }} title="Просмотр" style={{ background: "none", border: "none", cursor: "pointer", color: "#a57c42", opacity: 0.6, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.35"}>
                        <Icon name="Eye" size={16} />
                      </button>
                      <button onClick={() => openEdit(poem)} title="Редактировать" style={{ background: "none", border: "none", cursor: "pointer", color: "#a57c42", opacity: 0.6, transition: "opacity 0.2s" }}
                        onMouseEnter={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.8"}
                        onMouseLeave={(e) => (e.currentTarget as HTMLButtonElement).style.opacity = "0.35"}>
                        <Icon name="Pencil" size={16} />
                      </button>
                      {deleteConfirm === poem.id ? (
                        <div className="flex items-center gap-2">
                          <button onClick={() => deletePoem(poem.id)} style={{ background: "none", border: "1px solid #8b2a2a", color: "#a13b3b", padding: "0.2rem 0.6rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer" }}>Удалить</button>
                          <button onClick={() => setDeleteConfirm(null)} style={{ background: "none", border: "none", color: "rgba(58,45,32,0.72)", cursor: "pointer", fontFamily: "Montserrat", fontSize: "0.55rem" }}>Отмена</button>
                        </div>
                      ) : (
                        <button onClick={() => setDeleteConfirm(poem.id)} title="Удалить" style={{ background: "none", border: "none", cursor: "pointer", color: "#a13b3b", opacity: 0.55, transition: "opacity 0.2s" }}
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
          <div className="max-w-3xl mx-auto px-6 py-16">
            <div className="text-center" style={{ position: "relative", borderRadius: "10px", overflow: "hidden", padding: "3.5rem 2.5rem", marginBottom: "3.5rem", backgroundImage: "linear-gradient(180deg, rgba(253,246,233,0.86) 0%, rgba(253,246,233,0.78) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/10690ee4-ac28-404c-87fa-1a502c26a23c.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid #e6d2b0" }}>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Об авторе</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, lineHeight: 1.3, color: "#3d3226" }}>
                История одной души,<br />преображённой словом
              </h1>
              <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, margin: "2rem auto 0" }} />
            </div>

            <div className="space-y-6" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.28rem", lineHeight: 1.95, fontWeight: 400, color: "#3a2d20" }}>
              <p style={{ fontStyle: "italic", color: "#a57c42", opacity: 0.85, textAlign: "center", fontSize: "1.25rem" }}>Здравствуйте, дорогие читатели!</p>

              <p>Я сердечно приветствую каждого из вас на этой странице. Если вы здесь, значит, наши души ищут чего-то схожего: опоры в вере, утешения в словах и отклика в поэзии.</p>

              <p>Этот сайт — моё скромное начинание, место, где я делюсь стихотворениями, которые рождаются в тишине молитвы, в глубине переживаний, в моменты откровения. Я верю, что каждое слово, написанное с искренним сердцем, несёт в себе Божью благодать. Здесь вы найдёте не только мои авторские стихи, но и драгоценные строки, написанные моей бабушкой и моим папой. Их творчество — это отражение их жизненного пути, их веры и их любви к Богу.</p>

              <p>Особое место среди бабушкиных произведений занимают те стихи, которые она часто адресовала конкретным людям в знак поддержки или благодарности. Для меня очень важно сохранить эти личные послания на страницах сайта как живое свидетельство её чуткого сердца. Именно поэтому этот проект служит ещё одной важной цели — бережно сберечь нашу семейную память о близких людях и передать тепло их слов будущим поколениям.</p>

              <p>Я надеюсь, что их стихи, как и мои, смогут послужить вам поддержкой, утешением и вдохновением. Как сказано в Писании:</p>

              <div className="my-8 py-6 px-8" style={{ borderLeft: "3px solid #7a8c60", background: "rgba(122,140,96,0.08)", borderRadius: "0 6px 6px 0" }}>
                <p style={{ fontStyle: "italic", color: "rgba(58,45,32,1)", marginBottom: "0.75rem" }}>
                  «Ибо очи Господа обозревают всю землю, чтобы поддерживать тех, чьё сердце вполне предано Ему».
                </p>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a57c42", opacity: 0.85 }}>2 Паралипоменон 16:9</p>
              </div>

              <p>Я стремлюсь, чтобы мои стихи были именно такими — искренними свидетельствами преданности и доверия Богу.</p>

              <p>Мне бы очень хотелось, чтобы эти страницы наполняли ваши сердца Божьей любовью, миром и теплом. Возможно, читая эти строки, вы найдёте отраду в своих собственных переживаниях, вспомните о Божьем присутствии в самые трудные моменты жизни.</p>

              <p>Если у вас есть желание поделиться своими христианскими стихотворениями или теми, которые находят отклик в вашей душе, я буду очень рада этому. Будем вместе вдохновляться и назидать друг друга.</p>

              <p style={{ textAlign: "center", color: "#a57c42", opacity: 0.85, fontStyle: "italic", fontSize: "1.25rem", paddingTop: "1rem" }}>
                Пусть наш общий путь через поэзию будет благословен Господом!
              </p>

              <p style={{ textAlign: "center", color: "rgba(58,45,32,0.92)" }}>
                С любовью и верой, <span style={{ color: "#a57c42", opacity: 0.85, letterSpacing: "0.15em" }}>ФВА</span>
              </p>
            </div>
          </div>
        )}

        {/* CONTACTS */}
        {activeSection === "contacts" && (
          <div className="max-w-2xl mx-auto px-6 py-16">
            <div style={{ position: "relative", borderRadius: "10px", overflow: "hidden", padding: "3.5rem 2.5rem", marginBottom: "3.5rem", backgroundImage: "linear-gradient(90deg, rgba(253,246,233,0.94) 0%, rgba(253,246,233,0.72) 55%, rgba(253,246,233,0.55) 100%), url('https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/4ca1ed55-b029-4d0e-b334-8862593ef5d2.jpg')", backgroundSize: "cover", backgroundPosition: "center", border: "1px solid #e6d2b0" }}>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", opacity: 1, marginBottom: "1rem" }}>Связаться</p>
              <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "3rem", fontWeight: 300, color: "#3d3226" }}>Контакты</h1>
              <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, marginTop: "1.5rem" }} />
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontWeight: 300, lineHeight: 1.9, color: "rgba(58,45,32,0.9)", fontStyle: "italic", marginBottom: "3rem" }}>
              Если стихотворение тронуло вас, если хотите поделиться мыслями или предложить сотрудничество — напишите.
            </p>
            <div className="space-y-8">
              <input placeholder="Ваше имя" style={inputStyle} />
              <input placeholder="Электронная почта" style={inputStyle} />
              <textarea placeholder="Ваше сообщение..." rows={5} style={{ ...inputStyle, resize: "none" }} />
              <button style={{ display: "block", width: "100%", background: "linear-gradient(135deg, #c08a3e 0%, #b5673a 100%)", border: "1px solid #b5673a", color: "#fffaf3", padding: "0.75rem 2rem", fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}>
                Отправить сообщение
              </button>
            </div>
            <div className="mt-14 pt-10 flex items-center gap-10" style={{ borderTop: "1px solid #e5d8c0" }}>
              {[{ icon: "Mail", label: "Почта", value: "Укажите email" }, { icon: "MessageCircle", label: "Telegram", value: "@username" }].map((contact) => (
                <div key={contact.label} className="flex items-center gap-3">
                  <Icon name={contact.icon as "Mail"} size={15} style={{ color: "#a57c42", opacity: 0.75 }} />
                  <div>
                    <div style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#a57c42", opacity: 0.7 }}>{contact.label}</div>
                    <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "rgba(58,45,32,0.85)" }}>{contact.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
    </>
  );
}
