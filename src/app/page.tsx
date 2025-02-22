import { AnimatedTestimonialsDemo } from "@/components/AnimatedTestimonialsDemo";
import { BackgroundBoxesDemo } from "@/components/BackgroundBoxesDemo";
import CardSlider from "@/components/CardSlider";
import Carousel from "@/components/Carousal";
import { InfiniteSlider } from "@/components/Infinite-Slider";
// import ReturnPolicy from "@/components/ReturnPolicy";
import { WhyChooseUs } from "@/components/WhyChooseUs";


export default function Home() {
  return (
    <div >
      <Carousel />
      <div className="py-6">
        <h2 className="text-center font-extrabold  tracking-wide text-gray-800 text-4xl">Feature Articles</h2>
      </div>
      <CardSlider />
      <div className="py-6">
        <h2 className="text-center font-extrabold  tracking-wide text-gray-800 text-4xl">Our Top Brands</h2>
      </div>
      <InfiniteSlider />
     
      <div className="py-6">
        <h2 className="text-center font-extrabold tracking-wide text-gray-800 text-4xl">Why Choose Us</h2>
      </div>
      <WhyChooseUs />
        <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500"></p>
        <div className="">
          <h2 className="text-center font-extrabold tracking-wide text-gray-800 text-4xl">Trending Items</h2>
        </div>
        <AnimatedTestimonialsDemo />
       
      
     {/* <ReturnPolicy /> */}
      <BackgroundBoxesDemo />
    </div>
  );
}
