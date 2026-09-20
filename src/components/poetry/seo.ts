import { Poem, Section } from "./shared";

export const SITE_NAME = "Христианские стихотворения — семья Фастовщук";
export const OG_IMAGE = "/og-image.jpg";
export const SITE_URL = "https://hristianskiestihotvoreniya.ru";

type Meta = { title: string; description: string };

const SECTION_META: Record<Section, Meta> = {
  home: {
    title: SITE_NAME,
    description:
      "Христианские стихотворения семьи Фастовщук: строки, рождённые в молитве и тишине. Стихи о вере, Божьей любви, утешении и вечности.",
  },
  poems: {
    title: "Стихотворения о вере и Божьей любви — семья Фастовщук",
    description:
      "Собрание христианских стихотворений: о вере и молитве, о Божьей любви и утешении в скорби, о надежде и вечности. Читайте и слушайте.",
  },
  about: {
    title: "О поэте — семья Фастовщук",
    description:
      "История семьи Фастовщук и путь, которым рождались эти строки. О вере, что стала песней, и о слове, сказанном от сердца.",
  },
  contacts: {
    title: "Контакты — Христианские стихотворения",
    description:
      "Напишите нам, если стихотворение отозвалось в вашем сердце. Будем рады добрым словам и общению.",
  },
  admin: {
    title: "Управление сайтом",
    description: "",
  },
};

function setTag(selector: string, attr: string, value: string) {
  const el = document.head.querySelector(selector) as HTMLMetaElement | null;
  if (el) el.setAttribute(attr, value);
}

function trim(text: string, max = 300) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > max ? clean.slice(0, max - 1).trimEnd() + "…" : clean;
}

export function applyMeta(section: Section, poem?: Poem | null) {
  let meta = SECTION_META[section] ?? SECTION_META.home;

  if (poem) {
    const author = poem.author ? " — " + poem.author : "";
    meta = {
      title: poem.title + author + " | Христианские стихотворения",
      description: trim(poem.text || meta.description, 300),
    };
  }

  document.title = meta.title;
  setTag('meta[name="description"]', "content", meta.description);
  setTag('meta[property="og:title"]', "content", meta.title);
  setTag('meta[property="og:description"]', "content", meta.description);
  setTag('meta[property="og:url"]', "content", window.location.href);
  setTag('meta[name="twitter:title"]', "content", meta.title);
  setTag('meta[name="twitter:description"]', "content", meta.description);

  const noindex = section === "admin";
  setTag('meta[name="robots"]', "content", noindex ? "noindex, nofollow" : "noindex, nofollow");

  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", window.location.href);
}
