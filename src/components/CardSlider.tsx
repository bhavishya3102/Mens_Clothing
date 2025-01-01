"use client"
import React, { useState } from "react";

const CardSlider: React.FC = () => {
  const cards = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    image: `https://picsum.photos/200/300?random=${i + 1}`,
    text: `Card ${i + 1}`,
  }));

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? cards.length - 4 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === cards.length - 4 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto ">
      {/* Slider */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500"
          style={{
            transform: `translateX(-${currentIndex * (100 / 4)}%)`,
          }}
        >
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex-none w-1/2 md:w-1/3 lg:w-1/4 p-4 "
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden border-solid border-4 border-navbarBG">
                <img
                  src={card.image}
                  alt={card.text}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4">
                  <p className="text-lg font-medium text-gray-800">{card.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <button
        className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={handlePrev}
      >
        &lt;
      </button>
      <button
        className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={handleNext}
      >
        &gt;
      </button>
    </div>
  );
};

export default CardSlider;
