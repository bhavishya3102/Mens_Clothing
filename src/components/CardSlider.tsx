"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronRight, ChevronLeft} from "lucide-react";
import Link from "next/link";
import { client } from "../sanity/lib/client"; // Import Sanity client

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
}

const CardSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product"]{
          _id,
          name,
          "imageUrl": images[0].asset->url
        }`;
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
    window.addEventListener("resize", updateSlidesPerView);
    return () => window.removeEventListener("resize", updateSlidesPerView);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - slidesPerView : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === products.length - slidesPerView ? 0 : prev + 1
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
          {loading
            ? // Show shimmer effect while loading
            Array.from({ length: slidesPerView }).map((_, index) => (
              <div
                key={index}
                style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                className="flex-none w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-2 md:p-4"
              >
                <div className="bg-white rounded-lg shadow-lg overflow-hidden border-4 border-solid border-[#cba783] p-2 animate-pulse">
                  <div className="relative w-full h-[250px] md:h-[300px] bg-[#cba783]"></div>
                  <div className="p-4">
                    <div className="h-4 w-3/4 bg-[#cba783] rounded mb-2"></div>
                    <div className="h-3 w-1/2 bg-[#cba783] rounded"></div>
                  </div>
                </div>
              </div>
            ))
            : // Show actual products when data is loaded
              products.map((product) => (
                <Link
                  key={product._id}
                  style={{ flex: `0 0 ${100 / slidesPerView}%` }}
                  href={`/product/${product._id}`}
                  className="flex-none w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4"
                >
                  <div className="bg-[#fef5eb] rounded-lg shadow-lg overflow-hidden border-4 border-solid border-[#cba783] p-2">
                    <div className="relative w-full h-[300px]">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"
                        className="object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-lg font-medium text-gray-800">
                        {product.name}
                      </p>
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
