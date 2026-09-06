import { useState, useEffect, useCallback } from "react";
import { SiteNav, SiteFooter } from "@/components/poetry/SiteChrome";
import HomeSection from "@/components/poetry/HomeSection";
import PoemsSections from "@/components/poetry/PoemsSections";
import PoemFormModal from "@/components/poetry/PoemFormModal";
import { API, UPLOAD_API, AUTHORS, EMPTY_FORM, Poem, Section } from "@/components/poetry/shared";

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

  // Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);

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
      author: poem.author || AUTHORS[0],
      has_audio: poem.has_audio,
      has_video: poem.has_video,
      audio_url: poem.audio_url || "",
      video_url: poem.video_url || "",
      image_url: poem.image_url || "",
    });
    setAdminOpen(true);
  };

  const uploadFile = async (
    file: File,
    setUploading: (v: boolean) => void,
    field: "image_url" | "audio_url" | "video_url"
  ) => {
    setUploading(true);
    try {
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
      const res = await fetch(UPLOAD_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ file: base64, name: file.name, type: file.type }),
      });
      const data = await res.json();
      if (data.url) setForm((prev) => ({ ...prev, [field]: data.url }));
    } finally {
      setUploading(false);
    }
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6e9", backgroundImage: "radial-gradient(ellipse 60% 40% at 15% 10%, rgba(181,103,58,0.10) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 85% 25%, rgba(122,140,96,0.10) 0%, transparent 60%), radial-gradient(ellipse 60% 40% at 50% 85%, rgba(192,138,62,0.10) 0%, transparent 65%)", backgroundAttachment: "fixed" }}>

      <SiteNav
        activeSection={activeSection}
        navigate={navigate}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="pt-20">

        <HomeSection
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          navigate={navigate}
          poems={poems}
          loading={loading}
          setSelectedPoem={setSelectedPoem}
        />

        <PoemsSections
          activeSection={activeSection}
          navigate={navigate}
          poems={poems}
          loading={loading}
          selectedPoem={selectedPoem}
          setSelectedPoem={setSelectedPoem}
          openEdit={openEdit}
          openCreate={openCreate}
          deletePoem={deletePoem}
          deleteConfirm={deleteConfirm}
          setDeleteConfirm={setDeleteConfirm}
        />

      </main>

      <SiteFooter navigate={navigate} />

      <PoemFormModal
        adminOpen={adminOpen}
        setAdminOpen={setAdminOpen}
        editingPoem={editingPoem}
        form={form}
        setForm={setForm}
        saving={saving}
        savePoem={savePoem}
        uploadFile={uploadFile}
        uploadingImage={uploadingImage}
        uploadingAudio={uploadingAudio}
        uploadingVideo={uploadingVideo}
        setUploadingImage={setUploadingImage}
        setUploadingAudio={setUploadingAudio}
        setUploadingVideo={setUploadingVideo}
      />
    </div>
  );
}
