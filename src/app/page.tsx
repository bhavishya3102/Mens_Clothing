import Carousel from "@/components/Carousal";
import { InfiniteSlider } from "@/components/Infinite-Slider";

export default function Home() {
  return (
    <div className="">
      <Carousel />
      <div className="py-6">
        <h2 className="text-center font-bold tracking-wide text-gray-800 text-4xl">Our Top Brands</h2>
      </div>
      <InfiniteSlider />
    </div>
  );
}
