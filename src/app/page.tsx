import AllProductsSlider from "@/components/AllProductsSlider";
import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import Carousel from "@/components/Carousal";
import { InfiniteSlider } from "@/components/Infinite-Slider";
import SpecialOffers from "@/components/SpecialOffers";
// import ReturnPolicy from "@/components/ReturnPolicy";
import { WhyChooseUs } from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div >
      <Carousel />
      <SpecialOffers/>
      <div className="py-6">
        <h2 className="text-center font-extrabold  tracking-wide text-gray-800 text-4xl my-3 dark:text-white">Feature Articles</h2>
      </div>
      <AllProductsSlider />
      <div className="py-6">
        <h2 className="text-center font-extrabold  tracking-wide text-gray-800 text-4xl dark:text-white">Our Top Brands</h2>
      </div>
      <InfiniteSlider />
     
      <div className="py-6">
        <h2 className="text-center font-extrabold tracking-wide text-gray-800 text-4xl dark:text-white">Why Choose Us</h2>
      </div>
      <WhyChooseUs />
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"></p>
        <div className="">
          <h2 className="text-center font-extrabold tracking-wide text-gray-800 text-4xl dark:text-white">Trending Items</h2>
        </div>
        <AnimatedTestimonialsDemo />
       
      
     {/* <ReturnPolicy /> */}
      <BackgroundBoxesDemo />
    </div>
  );
}
