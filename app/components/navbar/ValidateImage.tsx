import React, { useEffect, useState } from "react";

interface ImageProps {
  src: string;
  alt: string;
  fallback: React.ReactNode;
}

const ValidatedImage: React.FC<ImageProps> = ({ src, alt, fallback }) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
  }, [src]);

  return isValid ? <img src={src} alt={alt} /> : fallback;
};

export default ValidatedImage;
