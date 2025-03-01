import { client } from "@/sanity/lib/client";
import { ClientCarousel } from "./ClientCarousel";

async function getBanners() {
  const query = `*[_type == "banner"]{
    "imageUrl": bannerImage.asset->url
  }`;
  return await client.fetch(query);
}

export async function Carousel() {
  const banners = await getBanners();

  if (!banners.length) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
      </div>
    );
  }

  return <ClientCarousel banners={banners} />;
}

export default Carousel;

