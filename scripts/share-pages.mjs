import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const API = "https://functions.poehali.dev/4f546a64-ab67-4997-8f24-3dca5874d153";
const HOST = "https://xn--80aafbmbrabbcsi6agnbewlkddjhici5ayio0mni.xn--p1ai";
const SITE_NAME = "Христианские стихотворения";
const DEFAULT_IMAGE = "https://cdn.poehali.dev/projects/75fbe93d-cfab-43f5-9635-e93d4516bacb/files/og-image-1792423529444.jpg";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function firstLines(text, count = 4) {
  const lines = String(text || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
    .slice(0, count);
  let out = lines.join("\n");
  if (out.length > 280) out = out.slice(0, 277).trimEnd();
  return out + "…";
}

function absolute(url) {
  if (!url) return DEFAULT_IMAGE;
  if (/^https?:\/\//.test(url)) return url;
  return HOST + (url.startsWith("/") ? url : "/" + url);
}

export function renderSharePage(poem) {
  const target = `/#/poems/${poem.id}`;
  const url = `${HOST}/p/${poem.id}.html`;
  const title = poem.title;
  const author = poem.author ? `— ${poem.author}` : "";
  const description = firstLines(poem.text) + (author ? `\n${author}` : "");
  const image = absolute(poem.image_url);

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} | ${SITE_NAME}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${HOST}${target}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${SITE_NAME}">
<meta property="og:locale" content="ru_RU">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:alt" content="${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<script>location.replace(${JSON.stringify(target)});</script>
</head>
<body style="font-family:Georgia,serif;background:#fdf6e9;color:#3d3226;text-align:center;padding:3rem 1rem">
<p><a href="${target}" style="color:#a57c42">${esc(title)}</a></p>
</body>
</html>
`;
}

export async function generateSharePages(outDir) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  let poems;
  try {
    const res = await fetch(API, { signal: controller.signal });
    poems = await res.json();
  } finally {
    clearTimeout(timer);
  }
  if (!Array.isArray(poems) || poems.length === 0) return 0;
  const dir = path.join(outDir, "p");
  fs.mkdirSync(dir, { recursive: true });
  for (const poem of poems) {
    fs.writeFileSync(path.join(dir, `${poem.id}.html`), renderSharePage(poem));
  }
  const ids = poems.map((p) => p.id).sort((a, b) => a - b);
  fs.writeFileSync(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../src/components/poetry/sharePages.ts"),
    `export const SHARE_API = "https://functions.poehali.dev/d982c099-c603-4992-a98e-bb7e2366af4f";\nexport const STATIC_SHARE_IDS = new Set<number>(${JSON.stringify(ids)});\n`
  );
  return poems.length;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const out = process.argv[2] || "public";
  generateSharePages(out).then((n) => console.log(`share pages: ${n}`));
}
