"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export function Carousel() {
  const images = [...Array(5)].map((_, index) => `/random_image_${index + 1}.avif`);
  const [imgIndex, setImageIndex] = useState(0);

  useEffect(() => {
    const interval = setTimeout(() => {
      setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearTimeout(interval);
  }, [imgIndex, images]);

  return (
    <div className="relative w-full">
      <div className="relative h-[500px] overflow-hidden rounded-lg">
        {images.map((imageUrl, index) => (
          <div
            key={imageUrl}
            className={`absolute w-full h-full transition-transform duration-500 ease-in-out`}
            style={{
              transform: `translateX(${100 * (index - imgIndex)}%)`
            }}
          >
            <Image
              src={imageUrl}
              alt={`Slide ${index + 1}`}
              fill
              priority={index === imgIndex}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${index === imgIndex ? "bg-white w-4" : "bg-white/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
