import React from "react";

interface ProductDetailsProps {
  description: string;
  sizes: string[];
  price: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  description,
  sizes,
  price,
}) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Product Details</h2>
      <p className="text-gray-700 mb-4">{description}</p>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Available Sizes:</h3>
        <div className="flex space-x-2">
          {sizes.map((size, index) => (
            <button
              key={index}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold text-gray-800">${price}</span>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
