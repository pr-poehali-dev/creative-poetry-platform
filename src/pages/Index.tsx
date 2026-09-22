import { useState, useEffect, useCallback } from "react";
import { SiteNav, SiteFooter } from "@/components/poetry/SiteChrome";
import HomeSection from "@/components/poetry/HomeSection";
import PoemsSections from "@/components/poetry/PoemsSections";
import PoemFormModal from "@/components/poetry/PoemFormModal";
import { API, UPLOAD_API, AUTHORS, EMPTY_FORM, Poem, Section } from "@/components/poetry/shared";
import { applyMeta } from "@/components/poetry/seo";

const VALID_SECTIONS: Section[] = ["home", "poems", "about", "contacts", "admin"];

const sectionFromHash = (): Section => {
  const raw = window.location.hash.replace(/^#\/?/, "").split("/")[0];
  return (VALID_SECTIONS as string[]).includes(raw) ? (raw as Section) : "home";
};

const poemIdFromHash = (): number | null => {
  const parts = window.location.hash.replace(/^#\/?/, "").split("/");
  const id = Number(parts[1]);
  return parts[0] === "poems" && Number.isFinite(id) && id > 0 ? id : null;
};

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>(sectionFromHash);
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

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => {
      setActiveSection(sectionFromHash());
      const id = poemIdFromHash();
      setSelectedPoem(id ? poems.find((p) => p.id === id) || null : null);
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [poems]);

  useEffect(() => {
    applyMeta(activeSection, selectedPoem);
    window.scrollTo(0, 0);
  }, [activeSection, selectedPoem]);

  useEffect(() => {
    const id = poemIdFromHash();
    if (id && poems.length && !selectedPoem) {
      const found = poems.find((p) => p.id === id);
      if (found) setSelectedPoem(found);
    }
  }, [poems, selectedPoem]);

  const scrollTop = () => {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  };

  const navigate = (section: Section) => {
    setActiveSection(section);
    setSelectedPoem(null);
    setMobileMenuOpen(false);
    if (sectionFromHash() !== section || poemIdFromHash()) {
      window.location.hash = `#/${section}`;
    }
    scrollTop();
  };

  const openPoem = (poem: Poem | null) => {
    setSelectedPoem(poem);
    window.location.hash = poem ? `#/poems/${poem.id}` : "#/poems";
    scrollTop();
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
          setSelectedPoem={openPoem}
        />

        <PoemsSections
          activeSection={activeSection}
          navigate={navigate}
          poems={poems}
          loading={loading}
          selectedPoem={selectedPoem}
          setSelectedPoem={openPoem}
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