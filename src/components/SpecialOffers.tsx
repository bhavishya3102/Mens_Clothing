
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { client } from "@/sanity/lib/client";


interface SpecialOffer {
  _id: string;
  title: string;
  price: string;
  tag: string;
}

async function getSpecialOffers() {
  const query = `*[_type == "specialoffers"]{
    _id,
    title,
    price,
    tag
  }`;

  return await client.fetch(query);
}

const SpecialOffers = async () => {
  
  const products= await getSpecialOffers();

 return (
    <section className="bg-[#cba783] py-12">
      <div className="container mx-auto text-center">
        <h1 className="text-center font-extrabold  tracking-wide text-gray-800 text-4xl dark:text-white">🎉 Exclusive Offers 🎉</h1>

        <p className="text-lg text-gray-700 mb-10">Shop the best deals on traditional wear</p>

        {/* Offers Grid */}
        <div className="w-[85%] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((offer: SpecialOffer) => (
            <Card key={offer._id} className="dark:bg-[#8d7141] bg-[#f8ecd7] shadow-xl rounded-xl overflow-hidden border border-[#a07436] relative">
              {/* Sticker Tag */}
              <div className="absolute top-3 left-3 bg-yellow-300 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <Star className="w-4 h-4" />
                {offer.tag}
              </div>

            

              {/* Offer Details */}
              <CardContent className="p-6 text-center mt-3">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{offer.title}</h2>
                <p className="text-lg text-gray-700 mt-2 dark:text-white font-bold">
                  Starting at <span className="text-red-600 dark:text-white font-bold">₹{offer.price}</span>
                </p>
                <Button className="mt-4 bg-yellow-500 text-white px-6 py-2 rounded-lg hover:bg-yellow-600 transition">
                  🛍️ Grab Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
