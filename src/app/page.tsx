import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo";
import CardSlider from "@/components/CardSlider";
import Carousel from "@/components/Carousal";
import { InfiniteSlider } from "@/components/Infinite-Slider";
import { WhyChooseUs } from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Carousel />
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Our Top Brands</h2>
      </div>
      <InfiniteSlider />
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Feature Articles</h2>
      </div>
      <CardSlider />
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Why Choose Us</h2>
      </div>
      <WhyChooseUs />
      <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex flex-col items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"></p>
          <div className="py-6">
            <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Trending Items</h2>
          </div>
          <AnimatedTestimonialsDemo />
        </div>
      </div>
    </div>
  );
}
