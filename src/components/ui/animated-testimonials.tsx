"use client";

import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Testimonial = {
  _id: string;
  ProductName: string;
  tagline: string;
  description: string;
  imageUrl: string;
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  // Handle navigation
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  return (
    <div className="max-w-6xl mx-auto antialiased font-sans px-6 md:px-12 lg:px-16 py-24">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Image Section */}
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-lg">
          <AnimatePresence>
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.imageUrl}
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  rotate: isActive(index) ? 0 : -10,
                }}
                animate={{
                  opacity: isActive(index) ? 1 : 0.6,
                  scale: isActive(index) ? 1 : 0.95,
                  rotate: isActive(index) ? 0 : -10,
                  zIndex: isActive(index) ? 50 : 0,
                  y: isActive(index) ? [0, -50, 0] : 0,
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={testimonial.imageUrl}
                  alt={testimonial.ProductName}
                  width={600}
                  height={400}
                  draggable={false}
                  className="h-full w-full object-cover rounded-xl shadow-md"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <motion.div
            key={active}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <h3 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              {testimonials[active].ProductName}
            </h3>
            <p className="text-lg italic text-gray-600 dark:text-neutral-400 mt-1">
              {testimonials[active].tagline}
            </p>

            <motion.p className="text-xl text-gray-700 mt-6 dark:text-neutral-300 leading-relaxed">
              {testimonials[active].description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ filter: "blur(10px)", opacity: 0, y: 5 }}
                  animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut", delay: 0.02 * index }}
                  className={`inline-block ${
                    ["luxurious", "premium", "exclusive", "gold"].includes(word.toLowerCase())
                      ? "text-gold-500 font-semibold"
                      : ""
                  }`}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex gap-6 pt-12">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center shadow-md transition-all hover:scale-110"
            >
              <IconArrowLeft className="h-6 w-6 text-black dark:text-white" />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center shadow-md transition-all hover:scale-110"
            >
              <IconArrowRight className="h-6 w-6 text-black dark:text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
