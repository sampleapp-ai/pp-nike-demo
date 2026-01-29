
"use client";

import {useState, useEffect} from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ChevronLeft, ChevronRight, Pause, Play} from "lucide-react";
import {NIKE_LOGO_PATH, NIKE_LOGO_VIEWBOX} from "@/lib/constants";

// Hero slide data
const heroSlides = [
  {
    id: 1,
    title: "LICENSED FOR SKILL",
    subtitle:
      "For professionals like Devin Booker, every job gets handled with elite execution. Nike Book 2 has arrived.",
    cta: "Shop",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/a11613ea-789d-4a06-bebb-3eca5fb4ce62/nike-just-do-it.jpg",
  },
  {
    id: 2,
    title: "BRING THE ATTACK",
    subtitle:
      "Stay on the offense with the latest Phantom and Mercurial from Nike Soccer.",
    cta: "Explore",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/986d0d29-7262-48d8-abe0-62760bd2f8b4/nike-just-do-it.jpg",
  },
];

// Promo cards
const promoCards = [
  {
    id: 1,
    label: "Jordan Trunner",
    title: "Off-Season Comfort",
    cta: "Shop",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1920,c_limit/21843f3c-03d6-40b2-993d-438128ffddb7/nike-just-do-it.jpg",
  },
  {
    id: 2,
    label: "Coming Soon: Nike Mind",
    title: "A Mind-Altering Shoe",
    cta: "Explore",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_960,c_limit/702b8640-e328-42fe-befa-1a532c7aa85b/nike-just-do-it.jpg",
  },
];

// Category cards
const categoryCards = [
  {
    id: 1,
    cta: "Shop Football",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/8c44ee3a-d574-4d85-979b-16fb121267ca/nike-just-do-it.jpg",
  },
  {
    id: 2,
    cta: "Shop Basketball",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/8fc15789-0a9f-4135-9fc3-0dffb61277d8/nike-just-do-it.jpg",
  },
  {
    id: 3,
    cta: "Shop Training",
    image:
      "https://static.nike.com/a/images/f_auto,cs_srgb/w_1536,c_limit/33d80ec2-cd4f-4101-a3fd-79368669fbcd/nike-just-do-it.jpg",
  },
];

// Spotlight products - row 1
const spotlightRow1 = [
  {
    id: 1,
    name: "Air Jordan 1",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/c3e7c3ea-ef98-429f-87c0-84956d44ad6b/image.png",
    href: "/w/jordan-1-shoes-4fokyzy7ok",
  },
  {
    id: 2,
    name: "Dunk",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/09ff6ed4-6191-4e8a-9421-bf7d26c9c25d/image.png",
    href: "#",
  },
  {
    id: 3,
    name: "Graphic Tees",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/fb05b442-ee33-4214-abfb-e94b09c8cdcc/image.png",
    href: "#",
  },
  {
    id: 4,
    name: "Air Max",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/a8bad793-4c43-4245-b198-bb258c2a57b9/image.png",
    href: "#",
  },
  {
    id: 5,
    name: "Vomero Plus",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/44efefec-1dbe-40bc-a87e-b2fe6b321c2b/image.png",
    href: "#",
  },
  {
    id: 6,
    name: "Lebron XXIII",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/b1106c02-8222-4110-9a61-8a5cfc40e9ca/image.png",
    href: "#",
  },
  {
    id: 7,
    name: "ACG",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/cef2ec4c-b7e6-4ef1-9832-d146a5389176/image.png",
    href: "#",
  },
  {
    id: 8,
    name: "Pegasus Premium",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/b2f4edaf-0902-4b17-a734-df27402c7ab2/image.png",
    href: "#",
  },
];

// Spotlight products - row 2
const spotlightRow2 = [
  {
    id: 9,
    name: "Rejuven8",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/464a6e49-d3ea-4ca2-abbd-af966a7151ce/image.png",
    href: "#",
  },
  {
    id: 10,
    name: "Shox",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/00c8638d-173e-422a-864e-c31bdc15c4a2/image.png",
    href: "#",
  },
  {
    id: 11,
    name: "Vomero 5",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/5ab5081f-6435-4542-a2ec-7678f83ad805/image.png",
    href: "#",
  },
  {
    id: 12,
    name: "Tatum 4",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/951e44a9-52c0-49a8-8f07-d8f2bfbdba51/image.png",
    href: "#",
  },
  {
    id: 13,
    name: "24.7 Collection",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/a070a573-6ce5-4ec9-926f-10ce4f3d0be1/image.png",
    href: "#",
  },
  {
    id: 14,
    name: "Air Force 1",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/cc26ea74-cc1a-4464-a5a0-a6072c217fcc/image.png",
    href: "#",
  },
  {
    id: 15,
    name: "Jordan Retro",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/4d5ef922-1f55-4ab6-946c-b99caca16b05/image.png",
    href: "/w/jordan-1-shoes-4fokyzy7ok",
  },
  {
    id: 16,
    name: "Fan Gear",
    image:
      "https://static.nike.com/a/images/w_144,c_limit/2f5a02ed-ae85-4eec-8d2e-013cc22f3917/image.png",
    href: "#",
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play carousel
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1">
        {/* Hero Carousel */}
        <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute bottom-16 left-8 md:left-16 text-white">
                  <h1
                    className="text-4xl md:text-6xl font-bold tracking-tight mb-2"
                    style={{
                      fontFamily: "'Nike Futura', sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p className="text-sm md:text-base max-w-sm mb-4">
                    {slide.subtitle}
                  </p>
                  <button
                    type="button"
                    className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                  >
                    {slide.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel controls */}
          <div className="absolute bottom-6 right-6 flex items-center gap-2">
            {/* Dots */}
            <div className="flex items-center gap-2 mr-4">
              {heroSlides.map((_, index) => (
                <button
                  key={`dot-${index}`}
                  type="button"
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentSlide ? "bg-white" : "bg-white/50"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            {/* Play/Pause */}
            <button
              type="button"
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            {/* Prev/Next */}
            <button
              type="button"
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Promo Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {promoCards.map((card) => (
            <div
              key={card.id}
              className="relative h-[400px] md:h-[500px] overflow-hidden group"
            >
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-sm mb-1">{card.label}</p>
                <h2 className="text-2xl md:text-3xl font-medium mb-4">
                  {card.title}
                </h2>
                <button
                  type="button"
                  className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  {card.cta}
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Category Cards */}
        <section className="py-12 px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {categoryCards.map((card) => (
              <div
                key={card.id}
                className="relative h-[400px] md:h-[500px] overflow-hidden group"
              >
                <Image
                  src={card.image}
                  alt={card.cta}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-6 left-6">
                  <button
                    type="button"
                    className="px-6 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {card.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spotlight Section */}
        <section className="py-16 px-4 md:px-12 bg-white">
          <div className="text-center mb-12">
            <h2
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-4"
              style={{
                fontFamily: "'Nike Futura', sans-serif",
                fontStyle: "italic",
              }}
            >
              SPOTLIGHT
            </h2>
            <p className="text-gray-600 max-w-md mx-auto">
              Classic silhouettes and cutting-edge innovation to build your game
              from the ground up.
            </p>
          </div>
          {/* Row 1 */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-8">
            {spotlightRow1.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="flex flex-col items-center group"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2 group-hover:scale-110 transition-transform">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-center">{product.name}</span>
              </Link>
            ))}
          </div>
          {/* Row 2 */}
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {spotlightRow2.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                className="flex flex-col items-center group"
              >
                <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2 group-hover:scale-110 transition-transform">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs text-center">{product.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Secondary Footer Links */}
        <section className="py-12 px-4 md:px-12 border-t border-gray-200">
          <div className="flex justify-center mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="59"
              height="21"
              viewBox={NIKE_LOGO_VIEWBOX}
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              role="img"
              className="h-12"
            >
              <path d={NIKE_LOGO_PATH} />
            </svg>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-12 text-sm">
            <Link href="#" className="hover:text-gray-600">
              Find a Store
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Help
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Join Us
            </Link>
            <Link href="#" className="hover:text-gray-600">
              Sign In
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-sm">
            <div>
              <h3 className="font-medium mb-4">Featured</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black">
                    Air Force 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Jordan 1
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Air Max Dn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Vomero
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Shoes</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black">
                    All Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Jordan Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Running Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Basketball Shoes
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Clothing</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black">
                    All Clothing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Tops & T-Shirts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Shorts
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Hoodies & Pullovers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">Kids</h3>
              <ul className="space-y-2 text-gray-500">
                <li>
                  <Link href="#" className="hover:text-black">
                    Infant & Toddler Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Kids Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Kids Basketball Shoes
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-black">
                    Kids Running Shoes
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

