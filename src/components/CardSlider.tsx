"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";

const CardSlider = () => {
  const cards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/800/1200?random=${i + 1}`,
    text: `Card ${i + 1}`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);

  useEffect(() => {
    const updateSlidesPerView = () => {
      if (window.innerWidth < 640) {
        setSlidesPerView(1);
      } else if (window.innerWidth < 768) {
        setSlidesPerView(2);
      } else if (window.innerWidth < 1024) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(4);
      }
    };

    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? cards.length - slidesPerView : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === cards.length - slidesPerView ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-[99%] max-w-8xl mx-auto">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)`,
          }}
        >
          {cards.map((card) => (
          <Link key={card.id} style={{ flex: `0 0 ${100 / slidesPerView}%` }} href={'/products'} className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
           
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-solid border-gray-200 p-2">
                <div className="relative w-full h-72">
                  <Image
                    src={card.image}
                    alt={card.text}
                    fill
                    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-lg font-medium text-gray-800">{card.text}</p>
                </div>
              </div>
           
          </Link>
          ))}
        </div>
      </div>
      <button
        className="absolute top-1/2 left-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
        onClick={handlePrev}
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        className="absolute top-1/2 right-3 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-200 backdrop-blur-sm border border-gray-200"
        onClick={handleNext}
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};
export default CardSlider;
