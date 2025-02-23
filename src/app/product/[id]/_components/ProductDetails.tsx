import React from "react";

interface ProductDetailsProps {
  name: string;
  description: string;
  sizes: string[];
  price: number;
  discountPrice: number;
  stock: number;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  name,
  description,
  sizes,
  price,
  discountPrice,
  stock
}) => {
  return (
    <div className="p-6 bg-[#ffebd5] shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Product Details</h2>
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">{name}</h1>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-700 mb-2">Available Sizes:</h3>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size, index) => (
            <button
              key={index}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 hover:bg-gray-200 transition-all"
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-6 items-center text-gray-900">
        <span className="text-xl font-semibold">Price: <span className="text-gray-800 font-bold">Rs {price}</span></span>
        <span className="text-xl font-semibold">Discount Price: <span className="text-green-600 font-bold">Rs {discountPrice}</span></span>
        <span className={`text-xl font-semibold ${stock > 0 ? "text-gray-800" : "text-red-500"}`}>
          Stock: {stock > 0 ? stock : "Out of Stock"}
        </span>
      </div>

      {/* Optional Checkout Button */}
      {/* <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
        Checkout
      </button> */}
    </div>
  );
};

export default ProductDetails;
  