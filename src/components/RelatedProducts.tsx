
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const relatedProducts = [
  {
    id: 1,
    name: "Jordan Spizike Low",
    category: "Big Kids' Shoes",
    price: "$97.97",
    originalPrice: "$130.00",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png",
    onSale: true,
  },
  {
    id: 2,
    name: "Air Jordan 1 Mid SE",
    category: "Men's Shoes",
    price: "$140.00",
    originalPrice: null,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png",
    onSale: false,
  },
  {
    id: 3,
    name: "Nike Sportswear Phoenix Fleece",
    category: "Women's Over-Oversized Crew-Neck Sweatshirt",
    price: "$56.97",
    originalPrice: "$75.00",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a9abad6-8f29-4107-bf6c-e98625990722/AIR+JORDAN+1+LOW+SE.png",
    onSale: true,
  },
  {
    id: 4,
    name: "Air Jordan 1 Low",
    category: "Men's Shoes",
    price: "$97.97",
    originalPrice: "$130.00",
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d910b1a3-3fb8-4a47-a6d7-6addca152f8c/AIR+JORDAN+1+LOW+SE.png",
    onSale: true,
  },
  {
    id: 5,
    name: "Air Jordan 1 High OG",
    category: "Men's Shoes",
    price: "$180.00",
    originalPrice: null,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png",
    onSale: false,
  },
  {
    id: 6,
    name: "Jordan NU Retro 1 Low",
    category: "Women's Shoes",
    price: "$110.00",
    originalPrice: null,
    image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png",
    onSale: false,
  },
];

export default function RelatedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="py-12">
      <div className="max-w-[1920px] mx-auto px-12">
        {/* User photos section */}
        <div className="mb-16">
          <h2 className="text-2xl font-medium mb-2">How Others Are Wearing It</h2>
          <p className="text-gray-600 mb-4">Upload your photo or mention @Nike on Instagram for a chance to be featured.</p>
          <button type="button" className="border border-black rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors">
            Upload Your Photo
          </button>
        </div>

        {/* Related products */}
        <div className="relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-medium">You Might Also Like</h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => scroll("left")}
                disabled={!canScrollLeft}
                className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${
                  canScrollLeft ? "hover:bg-gray-200" : "opacity-40 cursor-not-allowed"
                }`}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => scroll("right")}
                disabled={!canScrollRight}
                className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${
                  canScrollRight ? "hover:bg-gray-200" : "opacity-40 cursor-not-allowed"
                }`}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-2 px-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {relatedProducts.map((product) => (
              <a
                key={product.id}
                href="#"
                className="flex-shrink-0 w-[280px] group"
              >
                <div className="aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden mb-3 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium text-base">{product.name}</h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <div className="flex gap-2 items-center">
                    <span className={`font-medium ${product.onSale ? "text-[#9e3500]" : ""}`}>
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-gray-500 line-through text-sm">{product.originalPrice}</span>
                    )}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

