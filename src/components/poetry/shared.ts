export const API = "https://functions.poehali.dev/4f546a64-ab67-4997-8f24-3dca5874d153";
export const UPLOAD_API = "https://functions.poehali.dev/5934a1fd-54aa-4dbb-b346-ccaf74ab4d2f";

export const AUTHORS = [
  "\u0424\u0430\u0441\u0442\u043e\u0432\u0449\u0443\u043a \u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440 \u0418\u043a\u0430\u0440\u043e\u0432\u0438\u0447",
  "\u0424\u0430\u0441\u0442\u043e\u0432\u0449\u0443\u043a \u0412\u0430\u043b\u0435\u043d\u0442\u0438\u043d\u0430 \u0410\u043b\u0435\u043a\u0441\u0430\u043d\u0434\u0440\u043e\u0432\u043d\u0430",
  "\u0424\u0430\u0441\u0442\u043e\u0432\u0449\u0443\u043a \u0412\u0430\u043b\u0435\u0440\u0438\u044f \u0418\u0432\u0430\u043d\u043e\u0432\u043d\u0430",
];

export const AUTHOR_PHOTOS: Record<string, string> = {
  [AUTHORS[0]]: "",
  [AUTHORS[1]]: "",
  [AUTHORS[2]]: "",
};

export interface Poem {
  id: number;
  title: string;
  text: string;
  excerpt: string;
  category: string;
  year: string;
  author: string;
  has_audio: boolean;
  has_video: boolean;
  audio_url?: string;
  video_url?: string;
  image_url?: string;
  created_at?: string;
}

export const EMPTY_FORM = {
  title: "",
  text: "",
  excerpt: "",
  category: "\u041b\u0438\u0440\u0438\u043a\u0430",
  year: new Date().getFullYear().toString(),
  author: AUTHORS[0],
  has_audio: false,
  has_video: false,
  audio_url: "",
  video_url: "",
  image_url: "",
};

export type PoemForm = typeof EMPTY_FORM;

export type Section = "home" | "poems" | "about" | "contacts" | "admin";

export const inputStyle = {
  display: "block",
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #e5d8c0",
  color: "#3d3226",
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1rem",
  padding: "0.5rem 0",
  outline: "none",
};

export const btnGold = {
  background: "linear-gradient(135deg, #c08a3e 0%, #b5673a 100%)",
  border: "1px solid #b5673a",
  color: "#fffaf3",
  padding: "0.5rem 1.5rem",
  fontFamily: "Montserrat, sans-serif",
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  cursor: "pointer",
  transition: "all 0.3s",
};

export const navItems: { key: Section; label: string }[] = [
  { key: "home", label: "\u0413\u043b\u0430\u0432\u043d\u0430\u044f" },
  { key: "poems", label: "\u0421\u0442\u0438\u0445\u043e\u0442\u0432\u043e\u0440\u0435\u043d\u0438\u044f" },
  { key: "about", label: "\u041e \u043f\u043e\u044d\u0442\u0435" },
  { key: "contacts", label: "\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b" },
];