"use client"
import React, { useState } from "react";

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]); // Default to the first image

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Display selected image on the left */}
      <div className="mb-4">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-64 h-72 object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Render all images at the bottom */}
      <div className="flex flex-row items-center justify-center gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className={`cursor-pointer border-2 ${
              selectedImage === image ? "border-blue-500" : "border-transparent"
            } rounded-lg`}
            onClick={() => setSelectedImage(image)} // Set the clicked image as the selected image
          >
            <img
              src={image}
              alt={`Product ${index}`}
              className="w-24 h-24 object-cover rounded-lg shadow"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
