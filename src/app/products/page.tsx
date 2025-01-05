import Image from "next/image";
import { Suspense } from "react";
import Loading from "./loading";
import Link from "next/link";

const StarRating = ({ count }: { count: number }) => {
  return (
    <span className="text-yellow-400">
      {Array.from({ length: count }, (_, i) => (
        <span key={i}>⭐</span>
      ))}
    </span>
  );
};

export default async function Page() {
  const images = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    stars: Math.floor(Math.random() * 10) + 1,
    url: `https://picsum.photos/500/300?random=${i + 1}`,
    title: `Product ${i + 1}`,
    price: (Math.random() * 100).toFixed(2)
  }));

  return (
    <Suspense fallback={<Loading />}>
      <main className="py-8 px-4 max-w-8xl mx-auto">
        <h1 className="text-4xl text-center font-bold mb-8">All Products</h1>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <Link href={`/product/${image.id}`} key={image.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative w-full h-48">
                <Image
                  src={image.url}
                  alt={image.title}
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{image.title}</h2>
                <StarRating count={image.stars} />
                <p className="text-gray-600 mt-2">{image.price}</p>
              </div>
            </Link>
          ))}
        </section>
      </main>
    </Suspense>
  );
}
