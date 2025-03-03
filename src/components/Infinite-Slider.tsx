'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { getBrands } from '@/lib/fetchBrands';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '../sanity/lib/client';

// Create the builder
const builder = imageUrlBuilder(client);

interface Brand {
  _id: string;
  brandImage: string;
  brandName: string;
}

export function InfiniteSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let animationId: number;
    let startX: number;
    let scrollLeft: number;
    let isDown: boolean = false;

    const scroll = () => {
      if (!slider) return;
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0;
      } else {
        slider.scrollLeft += 1;
      }
      animationId = requestAnimationFrame(scroll);
    };

    const startScrolling = () => {
      animationId = requestAnimationFrame(scroll);
    };

    const stopScrolling = () => {
      cancelAnimationFrame(animationId);
    };

    const onMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      stopScrolling();
    };

    const onMouseUp = () => {
      isDown = false;
      startScrolling();
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', onMouseDown);
    slider.addEventListener('mouseleave', onMouseUp);
    slider.addEventListener('mouseup', onMouseUp);
    slider.addEventListener('mousemove', onMouseMove);

    startScrolling();

    return () => {
      stopScrolling();
      slider.removeEventListener('mousedown', onMouseDown);
      slider.removeEventListener('mouseleave', onMouseUp);
      slider.removeEventListener('mouseup', onMouseUp);
      slider.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden dark:bg-[#7a5d3d] bg-[#dbc5b0] py-10 border-solid border-[#cba783]">
      <div className="relative w-full">
        <div
          ref={sliderRef}
          className="flex w-max animate-slide cursor-grab active:cursor-grabbing"
        >
          {loading
            ? // Show shimmer effect while loading
              Array.from({ length: 12 }).map((_, index) => (
                <div
                  key={index}
                  className="w-[230px] flex-shrink-0 px-4"
                >
                  <div className="rounded-lg p-2 border-3 border-solid border-[#cba783] bg-white shadow animate-pulse">
                    <div className="w-[180px] h-[120px] bg-[#cba783] rounded mx-auto"></div>
                  </div>
                </div>
              ))
            : // Show actual brands when data is loaded
              [...brands, ...brands].map((brand, index) => (
                <div key={index} className="w-[200px] flex-shrink-0 px-4">
                  <div className="rounded-lg p-3 bg-[#fef5eb] shadow border-3 border-solid border-[#cba783]">
                    <Image
                      src={builder.image(brand.brandImage).url()}
                      alt={`${brand.brandName} logo`}
                      width={150}
                      height={50}
                      className="mx-auto aspect-square"
                    />
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
