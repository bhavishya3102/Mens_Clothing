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
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Trending Items</h2>
      </div>
      <AnimatedTestimonialsDemo/>

    </div>
  );
}
