
"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const productImages = [
  { id: "1", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png" },
  { id: "2", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png" },
  { id: "3", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/1a9abad6-8f29-4107-bf6c-e98625990722/AIR+JORDAN+1+LOW+SE.png" },
  { id: "4", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d910b1a3-3fb8-4a47-a6d7-6addca152f8c/AIR+JORDAN+1+LOW+SE.png" },
  { id: "5", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png" },
  { id: "6", src: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png" },
];

export default function ProductGallery() {
  const [selectedImage, setSelectedImage] = useState(0);

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % productImages.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + productImages.length) % productImages.length);
  };

  return (
    <div className="flex gap-4">
      {/* Thumbnail column - hidden on mobile */}
      <div className="hidden lg:flex flex-col gap-2 w-[60px] flex-shrink-0">
        {productImages.map((img, index) => (
          <button
            key={img.id}
            type="button"
            onClick={() => setSelectedImage(index)}
            className={`w-[60px] h-[60px] rounded-md overflow-hidden border transition-all bg-[#f5f5f5] ${
              selectedImage === index ? "border-black border-2" : "border-transparent hover:border-gray-400"
            }`}
          >
            <Image
              src={img.src}
              alt={`Air Jordan 1 Low SE view ${index + 1}`}
              width={60}
              height={60}
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="relative flex-1 aspect-square bg-[#f5f5f5] rounded-lg overflow-hidden group">
        <Image
          src={productImages[selectedImage].src}
          alt="Air Jordan 1 Low SE"
          fill
          className="object-contain p-4"
          priority
        />

        {/* Navigation arrows - positioned at bottom center like Nike */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 opacity-100 transition-opacity">
          <button
            type="button"
            onClick={prevImage}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border border-gray-100"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            onClick={nextImage}
            className="w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg border border-gray-100"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile dots indicator */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 lg:hidden">
          {productImages.map((img, index) => (
            <button
              key={img.id}
              type="button"
              onClick={() => setSelectedImage(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                selectedImage === index ? "bg-black" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

