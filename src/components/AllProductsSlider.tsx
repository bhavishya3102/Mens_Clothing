"use client";
import React, { useState, useEffect } from "react";
import { client } from "../sanity/lib/client"; // Import Sanity client
import CardSlider from "./CardSlider";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
}

const AllProductsSlider = () => {
  const [products, setProducts] = useState<Product[]>([]);
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



  return (
    <div className="relative w-[99%] max-w-8xl mx-auto">
      <CardSlider products={products} loading={loading} />
    </div>
  );
};

export default AllProductsSlider;
