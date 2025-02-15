import Image from "next/image";
import trust from "../assets/trust.webp"
import luxury from "../assets/luxary.webp"
import timeless from "../assets/timeless.webp"

export const WhyChooseUs = () => {

  const features = [
    {
      title: "Premium Quality",
      description: "Crafted from the finest materials to ensure durability and unmatched comfort.",
      image: trust, // Replace with actual men's clothing images
    },
    {
      title: "Timeless Style",
      description: "Curated collections that blend classic elegance with modern trends.",
      image: timeless, // Replace with actual men's clothing images
    },
    {
      title: "Affordable Luxury",
      description: "High-end fashion at unbeatable prices without compromising on quality.",
      image: luxury, // Replace with actual men's clothing images
    },
  ];

  return (
    <div className="flex items-center justify-center px-5 py-10">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
        {features.map((feature, index) => (
          <div
            key={index}
            className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow rounded-md"
          >
          <div className="h-[50vh] w-[100vw] md:w-[30vw] relative">
  <Image
    src={feature.image}
    alt={feature.title}
    width={600} // Adjust according to your design
    height={600}
    className="object-cover group-hover:rotate-3 group-hover:scale-110 transition-transform duration-700"
  />
</div>


            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 transition duration-700" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center translate-y-[50%] group-hover:translate-y-0 transition-all duration-700">
              <h1 className="text-3xl font-bold text-white">{feature.title}</h1>
              <p className="text-lg italic text-white opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
