import { useState, useEffect } from "react";

interface Props {
  id: number;
  src: string;
  thumb?: string;
  alt?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PoemThumb({ id, src, thumb, alt = "", opacity = 0.9, className, style }: Props) {
  const preferred = thumb || `/poems/thumbs/${id}.webp`;
  const [source, setSource] = useState(preferred);

  useEffect(() => {
    setSource(preferred);
  }, [preferred]);

  const onError = () => {
    if (source !== src) setSource(src);
  };

  return (
    <div className={className} style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", background: "#fdf6e9", ...style }}>
      <img
        src={source}
        alt=""
        aria-hidden="true"
        loading="eager"
        decoding="async"
        onError={onError}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "blur(14px) saturate(0.9)", transform: "scale(1.15)", opacity: opacity * 0.45 }}
      />
      <img
        src={source}
        alt={alt}
        loading="eager"
        decoding="async"
        onError={onError}
        style={{ position: "relative", width: "100%", height: "100%", objectFit: "contain", opacity }}
      />
    </div>
  );
}
