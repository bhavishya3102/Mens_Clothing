import React from "react";
import ProductImages from "./_components/ProductImages";
import ProductDetails from "./_components/ProductDetails";
import CardSlider from "@/components/CardSlider";

const CheckoutPage: React.FC = () => {
  const product = {
    images: [
      "https://picsum.photos/800/1200?random=1",
      "https://picsum.photos/800/1200?random=4",
      "https://picsum.photos/800/1200?random=6",
    ],
    description: "This is a high-quality product that you will absolutely love!",
    sizes: ["S", "M", "L", "XL"],
    price: 49.99,
  };

  return (
    <div className="min-h-screenflex items-center justify-center">
      <div className="container mx-auto shadow-lg rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <ProductImages images={product.images} />
        </div>
        <div className="col-span-2">
          <ProductDetails
            description={product.description}
            sizes={product.sizes}
            price={product.price}
          />
        </div>
      </div>
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Similiar Products</h2>
      </div>
      <CardSlider />
    </div>
  );
};

export default CheckoutPage;
