"use client"
import Image from "next/image";
import React, { useState } from "react";

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="mb-4 group relative overflow-hidden rounded-lg shadow-lg bg-[#ffebd5]">
  <Image
    width={250}
    height={200}
    src={selectedImage}
    alt="Selected Product"
    className="w-80 h-96 object-contain rounded-lg transform transition-transform duration-300 ease-in-out group-hover:scale-110"
    sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1024px) 30vw, 23vw"

        />
      </div>
      <div className="flex flex-row items-center justify-center gap-4 mt-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border-4 ${selectedImage === image ? "border-[#b08355]" : "border-transparent"
              } rounded-lg`}
            onClick={() => setSelectedImage(image)}
          >
            <Image
              width={150}
              height={150}
              src={image}
              alt={`Product ${index}`}
              className="w-28 h-28 object-cover rounded-lg shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
