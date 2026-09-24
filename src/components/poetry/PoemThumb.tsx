import { useState } from "react";

interface Props {
  id: number;
  src: string;
  alt?: string;
  opacity?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function PoemThumb({ id, src, alt = "", opacity = 0.9, className, style }: Props) {
  const [source, setSource] = useState(`/poems/thumbs/${id}.webp`);

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
