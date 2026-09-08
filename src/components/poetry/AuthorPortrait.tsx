import Icon from "@/components/ui/icon";

interface Props {
  src?: string;
  name: string;
  size?: number;
}

export default function AuthorPortrait({ src, name, size = 96 }: Props) {
  const initials = name
    .split(" ")
    .slice(1, 3)
    .map((w) => w[0])
    .join("");

  return (
    <div
      style={{
        width: size,
        height: size * 1.22,
        flexShrink: 0,
        borderRadius: "50% / 50%",
        overflow: "hidden",
        position: "relative",
        border: "1px solid #d9b878",
        boxShadow: "0 0 0 4px rgba(253,246,233,0.95), 0 6px 20px rgba(140,95,50,0.18)",
        background: "linear-gradient(160deg, #fdf3e2 0%, #f3e2c6 100%)",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "sepia(0.42) saturate(0.88) contrast(0.97) brightness(1.03)",
          }}
        />
      ) : (
        <div
          className="flex items-center justify-center"
          style={{
            width: "100%",
            height: "100%",
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: size * 0.32,
            fontWeight: 300,
            letterSpacing: "0.06em",
            color: "#b08b52",
          }}
        >
          {initials || <Icon name="User" size={size * 0.34} style={{ color: "#b08b52", opacity: 0.7 }} />}
        </div>
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50% / 50%",
          pointerEvents: "none",
          boxShadow: "inset 0 0 26px rgba(120,80,40,0.28)",
        }}
      />
    </div>
  );
}
