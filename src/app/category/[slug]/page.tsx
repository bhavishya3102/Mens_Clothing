"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { Loader } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  discount_price: number;
}

export default function Page() {
  const pathname = usePathname();
  const category = pathname.split("/").pop(); // Get last part of URL as category

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Show loading indicator
      try {
        const query = `*[_type == "product" && category->slug.current == "${category}"]{
          _id,
          name,
          price,
          discount_price,
          "imageUrl": images[0].asset->url
        }`;
        
        const data = await client.fetch(query, { category });
        console.log("Fetched Data:", data);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); // Hide loading indicator
      }
    };

    fetchProducts();
  }, [category]); // Re-run when category changes

  return (
    <main className="py-8 px-4 max-w-8xl mx-auto">
      <h1 className="text-4xl text-center font-bold mb-8">All {category}&apos;s</h1>

      {/* Show Loading Indicator Instead of Products */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader className="text-4xl text-gray-500 animate-spin" />
        </div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.length > 0 ? (
            products.map((product) => (
              <Link href={`/product/${product._id}`} key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-48">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    className="object-contain hover:scale-105 transition-transform duration-300"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-600 mt-2">
                    <span className="line-through text-red-500 mr-2">${product.price}</span> 
                    <span className="font-bold text-green-600">${product.discount_price}</span>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500">No products found in this category.</p>
          )}
        </section>
      )}
    </main>
  );
}
