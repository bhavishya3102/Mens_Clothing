"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import ProductImages from "./_components/ProductImages";
import ProductDetails from "./_components/ProductDetails";
import CardSlider from "@/components/CardSlider";
import { Loader } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  images: {
    asset: {
      url: string;
    };
  }[];
  description: string;
  size: string[];
  price: number;
  discount_price: number;
  stock_quantity: number;
  category: string;
}

const CheckoutPage: React.FC = () => {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [productsbycategory, setProductsbycategory] = useState<Product[]>([]);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      try {
        const query = `*[_type == "product" && _id == $id][0]{
          name,
          images[] {
            asset->{
              _id,
              url
            }
          },
          description,
          size,
          price,
          discount_price,
          stock_quantity,
          category
        }`;
        const data = await client.fetch(query, { id: productId });
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  console.log("product", product?.category?._ref);


  // now fetch all the products acording to the product category
  useEffect(() => {
    const fetchProductsbyCategory = async () => {
      setLoading(true);
      try {
        const query = `*[_type == "product" && category->_id  == "${product?.category?._ref}"]{
          _id,
          name,
          price,
          discount_price,
          "imageUrl": images[0].asset->url
        }`;

        const data = await client.fetch(query);
        //now filter all the products except the current product
        const filteredProducts = data.filter((product: Product) => product._id !== productId);
        setProductsbycategory(filteredProducts);
        console.log("Fetched Data:", filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsbyCategory();
  }, [product?.category]); 




  console.log("product", product);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="text-4xl text-gray-500 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return <div className="text-center p-10 text-red-500">Product not found.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="container mx-auto shadow-lg rounded-lg p-6 flex flex-col md:flex-row justify-around gap-4">
          <div className="w-full md:w-1/2">
            <ProductImages images={product.images.map((img) => img.asset.url)} />
          </div>
          <div className="w-full md:w-1/2">
            <ProductDetails
              name={product.name}
              description={product.description}
              sizes={product.size}
              price={product.price}
              discountPrice={product.discount_price}
              stock={product.stock_quantity}
            />
          </div>
        </div>
      </div>

      <div className="py-8">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">
          Similar Products
        </h2>
      </div>

      <div className="pb-12">
        <CardSlider products={productsbycategory} loading={loading} />
      </div>
    </div>
  );
};

export default CheckoutPage;
