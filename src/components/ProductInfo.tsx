
"use client";

import { useState } from "react";
import { Heart, ChevronDown, MapPin, Star } from "lucide-react";
import { useCart } from "@/context/CartContext";

const sizes = [
  { size: "7", available: true },
  { size: "7.5", available: true },
  { size: "8", available: true },
  { size: "8.5", available: true },
  { size: "9", available: true },
  { size: "9.5", available: true },
  { size: "10", available: true },
  { size: "10.5", available: true },
  { size: "11", available: true },
  { size: "11.5", available: true },
  { size: "12", available: true },
  { size: "12.5", available: true },
  { size: "13", available: true },
  { size: "14", available: true },
  { size: "15", available: true },
  { size: "16", available: false },
  { size: "17", available: false },
  { size: "18", available: false },
];

const SizeGuideIcon = () => (
  <svg aria-hidden="true" className="w-4 h-4" fill="none" viewBox="0 0 24 24">
    <path
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M14.25 3.75h-13.5v6h13.5v-6z"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M6.75 3.75v6M9.75 3.75v4.5M3.75 3.75v4.5"
    />
  </svg>
);

export default function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShipping, setShowShipping] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const [showSizeError, setShowSizeError] = useState(false);
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const { addToCart } = useCart();

  const handleAddToBag = () => {
    if (!selectedSize) {
      setShowSizeError(true);
      return;
    }

    addToCart({
      id: "air-jordan-1-low-se",
      name: "Air Jordan 1 Low SE",
      subtitle: "Men's Shoes",
      price: 130,
      size: selectedSize,
      quantity: 1,
      color: "Black/Light Wild Mango/Oli...",
      image: "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png",
      arrivalDate: "Fri, Jan 16",
    });

    // Show success feedback
    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Title and price */}
      <div className="space-y-1">
        <h1 className="text-2xl font-medium">Air Jordan 1 Low SE</h1>
        <p className="text-gray-500">Men's Shoes</p>
        <p className="text-lg font-medium mt-2">$130</p>
      </div>

      {/* Size selector */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className={`font-medium ${showSizeError && !selectedSize ? "text-red-600" : ""}`}>
            {showSizeError && !selectedSize ? "Please select a size" : "Select Size"}
          </span>
          <button type="button" className="flex items-center gap-1 text-gray-500 hover:text-black transition-colors">
            <SizeGuideIcon />
            <span className="text-sm">Size Guide</span>
          </button>
        </div>

        <div className="grid grid-cols-5 gap-2">
          {sizes.map(({ size, available }) => (
            <button
              key={size}
              type="button"
              onClick={() => {
                if (available) {
                  setSelectedSize(size);
                  setShowSizeError(false);
                }
              }}
              disabled={!available}
              className={`size-box ${selectedSize === size ? "selected" : ""} ${
                !available ? "disabled" : ""
              } ${showSizeError && !selectedSize ? "border-red-300" : ""}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Klarna payment */}
      <div className="text-center text-sm text-gray-600">
        From <span className="font-medium text-black">$12/month</span>, or 4 payments at 0% interest with{" "}
        <span className="font-bold">Klarna</span>{" "}
        <button type="button" className="underline hover:text-black transition-colors">
          Check purchase power
        </button>
      </div>

      {/* Action buttons */}
      <div className="space-y-3">
        <button type="button" className="nike-btn-primary" onClick={handleAddToBag}>
          {showAddedToCart ? "Added to Bag ✓" : "Add to Bag"}
        </button>
        <button
          type="button"
          onClick={() => setIsFavorite(!isFavorite)}
          className="nike-btn-secondary"
        >
          Favorite
          <Heart className={`w-5 h-5 ${isFavorite ? "fill-black" : ""}`} />
        </button>
      </div>

      {/* Shipping info */}
      <div className="space-y-4 pt-4">
        <div>
          <h3 className="font-medium">Shipping</h3>
          <p className="text-gray-600 text-sm mt-1">You'll see our shipping options at checkout.</p>
        </div>
        <div>
          <h3 className="font-medium">Free Pickup</h3>
          <button type="button" className="flex items-center gap-1 text-sm underline hover:text-gray-600 transition-colors">
            <MapPin className="w-4 h-4" />
            Find a Store
          </button>
        </div>
      </div>

      {/* Product description */}
      <div className="space-y-4 pt-4 border-t border-gray-200">
        <p className="text-gray-700">
          Stay fresh with every step. This low-top take on the Air Jordan 1 is crafted with leather and suede,
          giving the legendary silhouette a premium feel that stands the test of time.
        </p>
        <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
          <li>Shown: Black/Light Wild Mango/Olive Grey</li>
          <li>Style: IB7109-005</li>
        </ul>
        <button type="button" className="text-sm underline font-medium hover:text-gray-600 transition-colors">
          View Product Details
        </button>
      </div>

      {/* Collapsible sections */}
      <div className="border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowShipping(!showShipping)}
          className="w-full py-6 flex justify-between items-center hover:text-gray-600 transition-colors"
        >
          <span className="text-lg font-medium">Shipping & Returns</span>
          <ChevronDown className={`w-6 h-6 transition-transform ${showShipping ? "rotate-180" : ""}`} />
        </button>
        {showShipping && (
          <div className="pb-6 text-gray-600 text-sm space-y-4">
            <p>
              Free standard shipping on orders $50+ and free 60-day returns for Nike Members.{" "}
              <button type="button" className="underline">Learn more.</button>{" "}
              <button type="button" className="underline">Return policy exclusions apply.</button>
            </p>
            <p>
              Pick-up available at select Nike Stores.{" "}
              <button type="button" className="underline">Check stores.</button>
            </p>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200">
        <button
          type="button"
          onClick={() => setShowReviews(!showReviews)}
          className="w-full py-6 flex justify-between items-center hover:text-gray-600 transition-colors"
        >
          <span className="text-lg font-medium">Reviews (0)</span>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-4 h-4 text-gray-300" />
              ))}
            </div>
            <ChevronDown className={`w-6 h-6 transition-transform ${showReviews ? "rotate-180" : ""}`} />
          </div>
        </button>
        {showReviews && (
          <div className="pb-6 text-gray-600 text-sm">
            <p>No reviews yet. Be the first to review this product.</p>
          </div>
        )}
      </div>
    </div>
  );
}

