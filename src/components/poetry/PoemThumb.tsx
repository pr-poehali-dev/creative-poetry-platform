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

  return (
    <img
      src={source}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      onError={() => {
        if (source !== src) setSource(src);
      }}
      style={{ width: "100%", height: "100%", objectFit: "cover", opacity, ...style }}
    />
  );
}
