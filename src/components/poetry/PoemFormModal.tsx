import Icon from "@/components/ui/icon";
import { AUTHORS, Poem, PoemForm, btnGold, inputStyle } from "./shared";

interface Props {
  adminOpen: boolean;
  setAdminOpen: (v: boolean) => void;
  editingPoem: Poem | null;
  form: PoemForm;
  setForm: React.Dispatch<React.SetStateAction<PoemForm>>;
  saving: boolean;
  savePoem: () => void;
  uploadFile: (file: File, setUploading: (v: boolean) => void, field: "image_url" | "audio_url" | "video_url") => void;
  uploadingImage: boolean;
  uploadingAudio: boolean;
  uploadingVideo: boolean;
  setUploadingImage: (v: boolean) => void;
  setUploadingAudio: (v: boolean) => void;
  setUploadingVideo: (v: boolean) => void;
}

export default function PoemFormModal({ adminOpen, setAdminOpen, editingPoem, form, setForm, saving, savePoem, uploadFile, uploadingImage, uploadingAudio, uploadingVideo, setUploadingImage, setUploadingAudio, setUploadingVideo }: Props) {
  return (
    <>
      {/* ===== MODAL: Create / Edit ===== */}
      {adminOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-10 px-4" style={{ backgroundColor: "rgba(255,250,243,0.9)", backdropFilter: "blur(6px)" }}>
          <div className="w-full max-w-2xl" style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", boxShadow: "0 4px 18px rgba(140,95,50,0.07)" }}>
            {/* Modal header */}
            <div className="flex items-center justify-between px-8 py-6" style={{ borderBottom: "1px solid #e5d8c0" }}>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", fontWeight: 300, color: "#3d3226" }}>
                {editingPoem ? "Редактировать стихотворение" : "Новое стихотворение"}
              </h2>
              <button onClick={() => setAdminOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#a57c42", opacity: 0.75 }}>
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Modal body */}
            <div className="px-8 py-8 space-y-8">
              {/* Название */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Название *</label>
                <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Название стихотворения" style={{ ...inputStyle, marginTop: "0.5rem" }} />
              </div>

              {/* Текст */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Текст *</label>
                <textarea value={form.text} onChange={(e) => setForm({ ...form, text: e.target.value })} placeholder="Текст стихотворения..." rows={10} style={{ ...inputStyle, marginTop: "0.5rem", resize: "vertical", lineHeight: 2, fontStyle: "italic" }} />
              </div>

              {/* Анонс */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Анонс (2 строки)</label>
                <textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Короткий анонс для списка (если пусто — возьмётся из текста)" rows={2} style={{ ...inputStyle, marginTop: "0.5rem", resize: "none", fontStyle: "italic" }} />
              </div>

              {/* Автор */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Автор</label>
                <select value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} style={{ ...inputStyle, marginTop: "0.5rem" }}>
                  {AUTHORS.map((a) => (
                    <option key={a} value={a} style={{ background: "#fffaf3", color: "#3d3226" }}>{a}</option>
                  ))}
                </select>
              </div>

              {/* Категория и год */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Категория</label>
                  <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Лирика" style={{ ...inputStyle, marginTop: "0.5rem" }} />
                </div>
                <div>
                  <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Год</label>
                  <input value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2024" style={{ ...inputStyle, marginTop: "0.5rem" }} />
                </div>
              </div>

              {/* Картинка */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Картинка</label>
                <div className="mt-3 space-y-3">
                  {form.image_url && (
                    <div className="relative" style={{ maxWidth: "200px" }}>
                      <img src={form.image_url} alt="" style={{ width: "100%", height: "120px", objectFit: "cover", border: "1px solid #e5d8c0" }} />
                      <button onClick={() => setForm({ ...form, image_url: "" })} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(255,250,243,0.85)", border: "none", cursor: "pointer", color: "#a13b3b", padding: "2px" }}>
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  )}
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: uploadingImage ? "wait" : "pointer", ...btnGold, padding: "0.4rem 1rem", opacity: uploadingImage ? 0.5 : 1 }}>
                    <Icon name={uploadingImage ? "Loader" : "ImagePlus"} size={13} />
                    <span>{uploadingImage ? "Загрузка..." : form.image_url ? "Заменить" : "Загрузить"}</span>
                    <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploadingImage}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadFile(f, setUploadingImage, "image_url"); e.target.value = ""; }} />
                  </label>
                  <input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} placeholder="или вставьте ссылку на картинку" style={{ ...inputStyle, fontSize: "0.85rem" }} />
                </div>
              </div>

              {/* Аудио */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Аудио</label>
                <div className="mt-3 space-y-3">
                  {form.audio_url && (
                    <div className="flex items-center gap-3 p-3" style={{ background: "rgba(165,124,66,0.04)", border: "1px solid #e5d8c0" }}>
                      <audio controls src={form.audio_url} style={{ height: "32px", flex: 1, accentColor: "#a57c42" }} />
                      <button onClick={() => setForm({ ...form, audio_url: "", has_audio: false })} style={{ background: "none", border: "none", cursor: "pointer", color: "#a13b3b", opacity: 0.85 }}>
                        <Icon name="X" size={14} />
                      </button>
                    </div>
                  )}
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: uploadingAudio ? "wait" : "pointer", ...btnGold, padding: "0.4rem 1rem", opacity: uploadingAudio ? 0.5 : 1 }}>
                    <Icon name={uploadingAudio ? "Loader" : "Music"} size={13} />
                    <span>{uploadingAudio ? "Загрузка..." : form.audio_url ? "Заменить" : "Загрузить"}</span>
                    <input type="file" accept="audio/*" style={{ display: "none" }} disabled={uploadingAudio}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) { uploadFile(f, setUploadingAudio, "audio_url"); setForm((prev) => ({ ...prev, has_audio: true })); } e.target.value = ""; }} />
                  </label>
                  <input value={form.audio_url} onChange={(e) => setForm({ ...form, audio_url: e.target.value, has_audio: !!e.target.value })} placeholder="или вставьте ссылку на аудио" style={{ ...inputStyle, fontSize: "0.85rem" }} />
                </div>
              </div>

              {/* Видео */}
              <div>
                <label style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8f4f2a", background: "rgba(181,103,58,0.12)", border: "1px solid rgba(181,103,58,0.25)", padding: "0.2rem 0.6rem", borderRadius: "999px" }}>Видео</label>
                <div className="mt-3 space-y-3">
                  {form.video_url && (
                    <div className="relative" style={{ maxWidth: "320px" }}>
                      <video controls src={form.video_url} style={{ width: "100%", border: "1px solid #e5d8c0", display: "block" }} />
                      <button onClick={() => setForm({ ...form, video_url: "", has_video: false })} style={{ position: "absolute", top: "4px", right: "4px", background: "rgba(255,250,243,0.85)", border: "none", cursor: "pointer", color: "#a13b3b", padding: "2px" }}>
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  )}
                  <label style={{ display: "inline-flex", alignItems: "center", gap: "8px", cursor: uploadingVideo ? "wait" : "pointer", ...btnGold, padding: "0.4rem 1rem", opacity: uploadingVideo ? 0.5 : 1 }}>
                    <Icon name={uploadingVideo ? "Loader" : "Video"} size={13} />
                    <span>{uploadingVideo ? "Загрузка..." : form.video_url ? "Заменить" : "Загрузить"}</span>
                    <input type="file" accept="video/*" style={{ display: "none" }} disabled={uploadingVideo}
                      onChange={(e) => { const f = e.target.files?.[0]; if (f) { uploadFile(f, setUploadingVideo, "video_url"); setForm((prev) => ({ ...prev, has_video: true })); } e.target.value = ""; }} />
                  </label>
                  <input value={form.video_url} onChange={(e) => setForm({ ...form, video_url: e.target.value, has_video: !!e.target.value })} placeholder="или вставьте ссылку на видео" style={{ ...inputStyle, fontSize: "0.85rem" }} />
                </div>
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex items-center justify-end gap-4 px-8 py-6" style={{ borderTop: "1px solid #e5d8c0" }}>
              <button onClick={() => setAdminOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(58,45,32,0.8)" }}>
                Отмена
              </button>
              <button onClick={savePoem} disabled={saving || !form.title.trim() || !form.text.trim()} style={{ ...btnGold, opacity: saving || !form.title.trim() || !form.text.trim() ? 0.4 : 1 }}>
                {saving ? "Сохраняю..." : editingPoem ? "Сохранить" : "Добавить"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
