import Icon from "@/components/ui/icon";
import AuthorPortrait from "./AuthorPortrait";
import { AUTHORS, AUTHOR_PHOTOS } from "./shared";

const GRANDMA = AUTHORS[2];

const stories = [
  {
    icon: "PenLine",
    title: "Первое стихотворение на кухне",
    text: [
      "Бабушка жила далеко от нас, в Москве, и каждая поездка к ней была настоящим праздником. Однажды, как сейчас помню, на мой день рождения мы с папой поехали к ней. Папа после дальней дороги прилёг отдохнуть, а бабушка увела меня на кухню, усадила на табуретку рядом с собой и сказала: «Сейчас будем писать с тобой стихотворение. Поучимся».",
      "Она достала свой маленький блокнот, взяла ручку и присела рядом. Бабушка начинала строчку, а я её заканчивала. Что именно у нас получилось, я уже не помню — знаю только, что стихотворение было о природе. Может быть, однажды я найду его в семейном архиве.",
      "Зато хорошо помню другое: в одну из строчек я вставила слово «весьма». Бабушка была в таком восторге, что потом долго рассказывала папе, как чуть не упала с табуретки, — ребёнок в таком возрасте, а знает такие слова! Мне тогда было лет шесть или семь. Сейчас я вспоминаю это с улыбкой, но именно то стихотворение я и считаю своим самым первым.",
      "Тогда я и подумать не могла, что когда-нибудь сама стану писать стихи. Прошло много лет, прежде чем родилось следующее — я училась примерно в восьмом классе, и было мне лет пятнадцать. Но, видно, бабушкин урок на кухне не прошёл бесследно.",
      "Наверное, любовь к стихам передалась мне от родных. Ведь не только бабушка писала — мама и папа в молодости тоже сочиняли песни, когда трудились в молодёжи. Похоже, это слово, сложенное в строки, живёт в нашей семье из поколения в поколение.",
    ],
  },
  {
    icon: "Heart",
    title: "Стихи, обращённые к людям",
    text: [
      "Бабушка написала очень много стихов, и особенно любила посвящать их кому-нибудь. Среди её сочинений есть строки подругам, детям, нам — внукам. Каждое такое стихотворение — словно письмо, в котором она делилась теплом, поддержкой и своей верой.",
    ],
  },
  {
    icon: "Gift",
    title: "Новогодний подарок для всей семьи",
    text: [
      "Однажды бабушка сочинила для нашей семьи новогоднее стихотворение-поздравление. Папа красиво оформил его в виде открыток, распечатал и подарил каждому из нас. Помню, как мы держали в руках эти открытки и читали строки, написанные специально для нас, — в них было столько любви, что праздник сразу становился теплее.",
      "Для бабушки стихи были способом обнять тех, кто далеко. Она жила в другом городе, но каждым словом умела оказаться рядом.",
    ],
  },
];

export default function GrandmaStories() {
  return (
    <section id="grandma-stories" className="mt-20" style={{ scrollMarginTop: "90px" }}>
      <div className="text-center mb-12">
        <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#6b7d52", marginBottom: "1rem" }}>Семейная память</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(1.9rem, 4.5vw, 2.5rem)", fontWeight: 300, color: "#3d3226", lineHeight: 1.3 }}>Несколько тёплых историй о бабушке<br />и её творчестве</h2>
        <div style={{ width: "60px", height: "2px", background: "linear-gradient(90deg, #c08a3e, #b5673a, #7a8c60)", opacity: 0.7, margin: "1.5rem auto 0" }} />
        <p className="mx-auto mt-8" style={{ maxWidth: "640px", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.8, color: "#5a4a38" }}>
          Каждое дерево держится на корнях. Корень нашей семьи — Господь. А бабушка своей верой и стихами первой указала нам путь к Нему и стала для нас светом и добрым примером.
        </p>
      </div>

      <div className="flex flex-col items-center mb-12">
        <AuthorPortrait src={AUTHOR_PHOTOS[GRANDMA]} name={GRANDMA} size={120} />
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", fontStyle: "italic", color: "#a57c42", marginTop: "1rem", textAlign: "center" }}>{GRANDMA}</p>
      </div>

      <div className="space-y-8">
        {stories.map((s) => (
          <article key={s.title} className="p-6 sm:p-10" style={{ background: "linear-gradient(160deg, #fffdf8 0%, #fdf3e2 100%)", border: "1px solid #e6d2b0", borderRadius: "10px", boxShadow: "0 4px 18px rgba(140,95,50,0.07)" }}>
            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center justify-center" style={{ width: "42px", height: "42px", borderRadius: "50%", background: "rgba(181,103,58,0.1)", border: "1px solid rgba(181,103,58,0.25)", flexShrink: 0 }}>
                <Icon name={s.icon} size={18} style={{ color: "#a57c42" }} />
              </div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: "#3d3226", lineHeight: 1.3 }}>{s.title}</h3>
            </div>
            <div className="space-y-4 prose-text" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.22rem", lineHeight: 1.9, color: "#3a2d20" }}>
              {s.text.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}