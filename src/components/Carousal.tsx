"use client";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";

export function Carousel() {
  const [imgIndex, setImageIndex] = useState(0);
  const images = ["https://picsum.photos/800/1200?random=1", "https://picsum.photos/800/1200?random=2", "https://picsum.photos/800/1200?random=3"]
  // const images = [...Array(5)].map((_, index) => `/random_image_${index + 1}.avif`);

  const nextImage = useCallback(() => {
    setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(nextImage, 5000);
    return () => clearInterval(interval);
  }, [nextImage]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, prevImage]);

  return (
    <>
      <div className="relative h-[calc(100vh-65px)] overflow-hidden ">
        {images.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className={`absolute w-full h-full transition-opacity duration-500 ease-in-out ${index === imgIndex ? "opacity-100" : "opacity-0"
              }`}
            aria-hidden={index !== imgIndex}
          >
            <Image
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === imgIndex}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              loading={Math.abs(index - imgIndex) <= 1 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === imgIndex ? "bg-white w-4" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
            aria-selected={index === imgIndex}
            role="tab"
          />
        ))}
      </div>
    </>
  );
}

export default Carousel;

