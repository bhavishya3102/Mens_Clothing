"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
// import { ChevronLeft, ChevronRight } from 'lucide-react';
// import { Button } from "@/components/ui/button";

export function Carousel() {
  const [imgIndex, setImageIndex] = useState(0);
  const images = [...Array(5)].map((_, index) => `/random_image_${index + 1}.avif`);

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
    <div className="relative w-full" style={{ aspectRatio: "14/9" }}>
      <div className="relative h-full overflow-hidden ">
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

      {/* <Button */}
      {/*   variant="outline" */}
      {/*   size="icon" */}
      {/*   className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" */}
      {/*   onClick={prevImage} */}
      {/*   aria-label="Previous image" */}
      {/* > */}
      {/*   <ChevronLeft className="h-4 w-4" /> */}
      {/* </Button> */}
      {/**/}
      {/* <Button */}
      {/*   variant="outline" */}
      {/*   size="icon" */}
      {/*   className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" */}
      {/*   onClick={nextImage} */}
      {/*   aria-label="Next image" */}
      {/* > */}
      {/*   <ChevronRight className="h-4 w-4" /> */}
      {/* </Button> */}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2" role="tablist">
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
    </div>
  );
}

export default Carousel;

