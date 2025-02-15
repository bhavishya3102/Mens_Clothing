"use client"
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { client } from "@/sanity/lib/client";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";


type Testimonial = {
  _id: string;
  ProductName: string;
  tagline: string;
  description: string;
  imageUrl: string;
};

export function AnimatedTestimonialsDemo() {

  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);


const getTrendingItems = async () => {
  const query = `*[_type == "trendingItem"]{
    _id,
    ProductName,
    tagline,
    description,
    "imageUrl": ProductImage.asset->url
  }`;
  
  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching trending items:", error);
    return [];
  }
}


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const data = await getTrendingItems();
      setTestimonials(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">
    <Loader className="text-4xl text-gray-500 animate-spin" />
  </div>  }
 
  return <AnimatedTestimonials testimonials={testimonials} />;
}
