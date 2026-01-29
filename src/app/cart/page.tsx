"use client";

import {useState, useRef, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {useCart} from "@/context/CartContext";
import {
  HelpCircle,
  Trash2,
  Plus,
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ShoppingBag,
} from "lucide-react";
import {ConfigProvider} from "@/components/paze/config-context";
import PazeButtonWidget from "@/components/paze/paze-button-widget";
import type {DemoConfig} from "@/components/paze/types";

// Product data for "You Might Also Like" section
const recommendedProducts = [
  {
    id: 1,
    name: "Air Jordan 1 Low SE",
    category: "Men's Shoes",
    price: 97.97,
    originalPrice: 130,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png",
  },
  {
    id: 2,
    name: "Tatum 4 Basketball Shoes",
    category: "Men's Shoes",
    price: 130,
    originalPrice: null,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png",
  },
  {
    id: 3,
    name: "Nike Air Force 1 '07 LV8",
    category: "Men's Shoes",
    price: 125,
    originalPrice: null,
    image:
      "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/d910b1a3-3fb8-4a47-a6d7-6addca152f8c/AIR+JORDAN+1+LOW+SE.png",
  },
];

export default function CartPage() {
  const {items, getSubtotal, removeFromCart, updateQuantity} = useCart();
  const [showPromoCode, setShowPromoCode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Paze button configuration
  const [config, setConfig] = useState<DemoConfig>({
    showButtons: true,
    buttonLayout: "vertical",
    buttonColor: "pazeblue",
    buttonShape: "default",
    buttonLabel: undefined,
    disableMaxHeight: false,
    showTagline: false,
    showMessage: false,
    messageColor: "black",
    messagePosition: "bottom",
    deviceView: "desktop"
  });

  const displayItems = items.map((item) => ({
    ...item,
    quantity: item.quantity || 1,
  }));

  const subtotal = getSubtotal();
  const shipping = 0;
  const tax = subtotal * 0.0938; // ~9.38% tax rate
  const total = subtotal + shipping + tax;

  // Handle PayPal Checkout
  const handlePayPalCheckout = () => {
    alert("PayPal checkout would be initiated here");
  };

  const checkScroll = () => {
    if (scrollRef.current) {
      const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
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

  const handleQuantityChange = (
    itemId: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) {
      removeFromCart(itemId, size);
    } else {
      updateQuantity(itemId, newQuantity, size);
    }
  };

  return (
    <ConfigProvider value={{config, setConfig}}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />

        <main className="flex-1 max-w-[1200px] mx-auto px-4 md:px-8 py-8 w-full">
          {displayItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
              {/* Left Column - Bag */}
              <div className="space-y-8">
                <h1 className="text-2xl font-medium">Bag</h1>

                {/* Product Items */}
                {displayItems.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="space-y-6">
                    <div className="flex gap-6">
                      {/* Product Image */}
                      <div className="relative w-32 h-32 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-2">
                        <div>
                          <h3 className="font-medium text-lg">{item.name}</h3>
                          <p className="text-gray-500 text-sm">{item.subtitle}</p>
                          <p className="text-gray-500 text-sm">{item.color}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-sm">
                            Size <span className="underline">{item.size}</span>
                          </p>
                          <p className="font-medium">${item.price.toFixed(2)}</p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2 border border-gray-300 rounded">
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.quantity - 1
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 min-w-[3rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  item.size,
                                  item.quantity + 1
                                )
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <button
                            type="button"
                            className="p-2 hover:bg-gray-100 rounded transition-colors"
                          >
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <div>
                        <h4 className="font-medium mb-1">Shipping</h4>
                        <p className="text-sm text-gray-600">
                          Arrives by {item.arrivalDate}
                        </p>
                        <button
                          type="button"
                          className="text-sm underline hover:text-gray-600 mt-1"
                        >
                          Edit Location
                        </button>
                      </div>

                      <div>
                        <h4 className="font-medium mb-1">Free Pickup</h4>
                        <button
                          type="button"
                          className="text-sm underline hover:text-gray-600"
                        >
                          Find a Store
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column - Summary */}
              {displayItems.length > 0 && (
                <div className="lg:border-l lg:pl-8 border-gray-200">
                  <div className="lg:sticky lg:top-8">
                    <h2 className="text-lg font-medium mb-6">Summary</h2>

                    {/* Price Breakdown */}
                    <div className="space-y-4 mb-6">
                      <div className="text-2xl font-medium">
                        ${subtotal.toFixed(2)}
                      </div>

                      {/* Promo Code */}
                      <div>
                        <button
                          type="button"
                          onClick={() => setShowPromoCode(!showPromoCode)}
                          className="flex items-center justify-between w-full text-sm hover:text-gray-600"
                        >
                          <span>Do you have a Promo Code?</span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform ${
                              showPromoCode ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {showPromoCode && (
                          <div className="mt-2">
                            <input
                              type="text"
                              placeholder="Enter code"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-black"
                            />
                          </div>
                        )}
                      </div>

                      {/* Price Details */}
                      <div className="space-y-2 text-sm pt-4 border-t border-gray-200">
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            Subtotal
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </span>
                          <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Estimated Shipping & Handling</span>
                          <span>Free</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="flex items-center gap-1">
                            Estimated Tax
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                          </span>
                          <span>${tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                          <span>Total</span>
                          <span>${total.toFixed(2)}</span>
                        </div>
                      </div>

                      {/* Free Shipping Message */}
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">
                          You qualify for Free Shipping as a Member!{" "}
                          <Link href="#" className="underline hover:text-black">
                            Join us
                          </Link>{" "}
                          or{" "}
                          <Link href="#" className="underline hover:text-black">
                            Sign-in
                          </Link>
                        </p>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div
                            className="bg-green-500 h-full"
                            style={{width: "100%"}}
                          />
                          <div className="text-xs text-right text-gray-500 mt-1">
                            $50
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Payment Buttons */}
                    <div className="space-y-3">
                      <Link
                        href="/checkout"
                        className="block w-full px-6 py-4 bg-black hover:bg-gray-800 text-white rounded-lg font-medium text-center transition-colors"
                      >
                        Checkout
                      </Link>

                      {/* Paze Button */}
                      <PazeButtonWidget
                        transactionAmount={total.toFixed(2)}
                        className="w-full"
                      />
                    </div>

                    {/* Legal Disclaimer */}
                    <p className="mt-6 text-xs text-gray-500">
                      By selecting one of the above payment options, you confirm
                      that you have read, understand, and agree to Nike's Terms of
                      Use, Terms of Sale and Return Policy, and acknowledge Nike's
                      Privacy Policy.
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h2 className="text-xl font-medium mb-2">Your bag is empty</h2>
              <p className="text-gray-500 mb-6">
                Add items to your bag to continue shopping.
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          )}

          {/* Favorites Section */}
          <section className="mt-16 pt-8 border-t border-gray-200">
            <div className="text-center">
              <h2 className="text-lg font-medium mb-2">Favorites</h2>
              <p className="text-sm text-gray-600 mb-4">
                Sign in to view your favorites
              </p>
              <Link
                href="#"
                className="inline-block border border-black rounded-full px-6 py-2 text-sm font-medium hover:bg-gray-100 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </section>

          {/* You Might Also Like Section */}
          <section className="mt-16 pt-8 border-t border-gray-200">
            <div className="relative">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium">You Might Also Like</h2>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => scroll("left")}
                    disabled={!canScrollLeft}
                    className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${
                      canScrollLeft
                        ? "hover:bg-gray-200"
                        : "opacity-40 cursor-not-allowed"
                    }`}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scroll("right")}
                    disabled={!canScrollRight}
                    className={`w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center transition-colors ${
                      canScrollRight
                        ? "hover:bg-gray-200"
                        : "opacity-40 cursor-not-allowed"
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
                style={{scrollbarWidth: "none", msOverflowStyle: "none"}}
              >
                {recommendedProducts.map((product) => (
                  <Link
                    key={product.id}
                    href="/t/air-jordan-1-low-se-mens-shoes-smntu6D2/IB7109-005"
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
                        <span
                          className={`font-medium ${
                            product.originalPrice ? "text-[#9e3500]" : ""
                          }`}
                        >
                          ${product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-gray-500 line-through text-sm">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </ConfigProvider>
  );
}
