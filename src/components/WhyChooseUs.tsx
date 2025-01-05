import Image from "next/image"

export const WhyChooseUs = () => {
  const features = [
    {
      title: "Tech-Savvy",
      description: "Offering the latest devices with cutting-edge features to keep you ahead of the curve.",
      image: "/pic1.jpg"
    },
    {
      title: "Trusted",
      image: "/pic2.jpg",
      description: "Delivering high-quality products and reliable service you can count on every time.",
    },
    {
      title: "Value-Driven",
      description: "Providing the best deals and competitive prices without compromising on quality.",
      image: "/pic3.jpg"
    }
  ]

  return (
    <div className="flex items-center justify-center  ">
      <div className="grid grid-cols-1 gap-10 md:gap-5 lg:gap-10 md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="group relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow rounded-sm">
            <div className="h-[50vh] w-[70vw] md:w-[30vw] relative">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover group-hover:rotate-3 group-hover:scale-125 transition-transform duration-1000"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70 transition duration-1000" />

            <div className="absolute inset-0 flex flex-col items-center justify-center px-9 text-center translate-y-[50%] group-hover:translate-y-0 transition-all duration-1000">
              <h1 className="text-3xl font-bold text-white">{feature.title}</h1>
              <p className="text-lg italic text-white mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
