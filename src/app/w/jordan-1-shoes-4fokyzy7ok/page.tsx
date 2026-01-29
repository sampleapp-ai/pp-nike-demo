
"use client";

import {useState} from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {SlidersHorizontal, ChevronDown, Heart} from "lucide-react";

// Product data
const products = [
  {
    id: 1,
    name: "Air Jordan 1 Low SE",
    category: "Men's Shoes",
    colors: "1 Color",
    price: 130,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png",
    href: "/t/air-jordan-1-low-se-mens-shoes-smntu6D2/IB7109-005",
  },
  {
    id: 2,
    name: "Air Jordan 1 Mid SE",
    category: "Men's Shoes",
    colors: "1 Color",
    price: 140,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/6135647d-4d7f-4b19-9e68-bca6fe443031/AIR+JORDAN+1+MID+SE.png",
    href: "#",
  },
  {
    id: 3,
    name: "Air Jordan 1 Low SE",
    category: "Women's Shoes",
    colors: "6 Colors",
    price: 130,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/44640a97-9e60-48a4-b8d2-9d08137f8ace/WMNS+AIR+JORDAN+1+LOW+SE.png",
    href: "#",
  },
  {
    id: 4,
    name: "Air Jordan 1 Triple Stack",
    category: "Women's Shoes",
    colors: "3 Colors",
    price: 145,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a2d279de-139f-467f-a063-025ae337e83b/WMNS+AIR+JORDAN+1+TRIPLE+STACK.png",
    href: "#",
  },
  {
    id: 5,
    name: "Air Jordan 1 Mid",
    category: "Men's Shoes",
    colors: "6 Colors",
    price: 130,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/cf2ce544-3429-41af-b81e-ac418bdb03db/AIR+JORDAN+1+MID.png",
    href: "#",
  },
  {
    id: 6,
    name: "Air Jordan 1 Element Low A/T",
    category: "Men's Shoes",
    colors: "4 Colors",
    price: 205,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5a30e348-3cac-4394-89bb-dac0475657b1/AIR+JORDAN+1+ELEMENT+LOW+A%2FT.png",
    href: "#",
  },
  {
    id: 7,
    name: "Air Jordan 1 Low",
    category: "Women's Shoes",
    colors: "13 Colors",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2ac6a35c-9e3a-4aba-a8a7-08abb364ffbd/WMNS+AIR+JORDAN+1+LOW.png",
    href: "#",
  },
  {
    id: 8,
    name: "Air Jordan 1 Mid",
    category: "Women's Shoes",
    colors: "11 Colors",
    price: 130,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/02d24606-98ee-4708-a1b8-7b85d3f26650/WMNS+AIR+JORDAN+1+MID.png",
    href: "#",
  },
  {
    id: 9,
    name: "Air Jordan 1 Mid SE Edge",
    category: "Women's Shoes",
    colors: "1 Color",
    price: 140,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/025e7260-f757-4b85-b1f8-267840725bd3/WMNS+AIR+JORDAN+1+MID+SE+EDG.png",
    href: "#",
  },
  {
    id: 10,
    name: 'Air Jordan 1 Retro Low "Chicago"',
    category: "Men's Shoes",
    colors: "1 Color",
    price: 145,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/61632c2e-69e4-4fd8-b848-2775e5042b22/AIR+JORDAN+1+RETRO+LOW+OG.png",
    href: "#",
  },
  {
    id: 11,
    name: 'Air Jordan 1 Retro Low "Chicago"',
    category: "Big Kids' Shoes",
    colors: "1 Color",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2a009a4f-f9ea-4bb3-8fb0-8cc4c0db1f1c/AIR+JORDAN+1+RETRO+LOW+OG+%28GS%29.png",
    href: "#",
  },
  {
    id: 12,
    name: "Air Jordan 1 Low Method of Make",
    category: "Women's Shoes",
    colors: "4 Colors",
    price: 140,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ce8529e5-125c-4708-8b35-8e7498ef48fd/WMNS+AIR+JORDAN+1+MM+LOW+V3.png",
    href: "#",
  },
  {
    id: 13,
    name: "Air Jordan 1 Low SE",
    category: "Men's Shoes",
    colors: "4 Colors",
    price: 97.97,
    originalPrice: 130,
    discount: "24% off",
    badge: "Best Seller",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f359f330-b2f1-4875-9cb2-0820339dae6d/AIR+JORDAN+1+LOW+SE.png",
    href: "/t/air-jordan-1-low-se-mens-shoes-smntu6D2/IB7109-005",
  },
  {
    id: 14,
    name: "Air Jordan 1 Mid SE",
    category: "Big Kids' Shoes",
    colors: "3 Colors",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/67b292d2-6e27-4927-b75b-8b343257f0ec/AIR+JORDAN+1+MID+SE+%28GS%29.png",
    href: "#",
  },
  {
    id: 15,
    name: "Jordan 1 Mid SE",
    category: "Baby/Toddler Shoes",
    colors: "1 Color",
    price: 65,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/50a53528-eaea-4d7d-b0e5-67ab686b1438/JORDAN+1+MID+SE+%28TD%29.png",
    href: "#",
  },
  {
    id: 16,
    name: "Air Jordan 1 Low",
    category: "Men's Shoes",
    colors: "6 Colors",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: "Best Seller",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ab3ec819-7808-4cd8-ba1c-b1e9386c8540/AIR+JORDAN+1+LOW.png",
    href: "#",
  },
  {
    id: 17,
    name: "Air Jordan 1 Low",
    category: "Men's Shoes",
    colors: "1 Color",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: "Just In",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/50ce45be-3926-4e9e-a26b-d8cb71a2a9a3/AIR+JORDAN+1+LOW.png",
    href: "#",
  },
  {
    id: 18,
    name: "Air Jordan 1 Mid",
    category: "Shoes",
    colors: "1 Color",
    price: 130,
    originalPrice: null,
    discount: null,
    badge: "Just In",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/64b4690c-36f4-4c7b-a584-321f10749a05/AIR+JORDAN+1+MID.png",
    href: "#",
  },
  {
    id: 19,
    name: "Air Jordan 1 Brooklyn",
    category: "Women's Boots",
    colors: "2 Colors",
    price: 170,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/edb25474-7af5-4e32-966d-320b731d5079/WMNS+AIR+JORDAN+1+BROOKLYN.png",
    href: "#",
  },
  {
    id: 20,
    name: "Air Jordan 1 Mid SE",
    category: "Men's Shoes",
    colors: "5 Colors",
    price: 104.97,
    originalPrice: 140,
    discount: "25% off",
    badge: "Best Seller",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/c48f86b3-7ebe-4932-8bd2-c6806d23d3af/AIR+JORDAN+1+MID+SE.png",
    href: "#",
  },
  {
    id: 21,
    name: "Air Jordan 1 Mid",
    category: "Big Kids' Shoes",
    colors: "7 Colors",
    price: 110,
    originalPrice: null,
    discount: null,
    badge: "Best Seller",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4c450e9a-dd83-474a-815a-9d64a19c3da5/AIR+JORDAN+1+MID+%28GS%29.png",
    href: "#",
  },
  {
    id: 22,
    name: "Air Jordan 1 Mid SE",
    category: "Big Kids' Shoes",
    colors: "1 Color",
    price: 120,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3d59029c-604e-4f35-88ad-00fa76f19e38/AIR+JORDAN+1+MID+SE+%28GS%29.png",
    href: "#",
  },
  {
    id: 23,
    name: "Jordan 1 Mid SE",
    category: "Little Kids' Shoes",
    colors: "2 Colors",
    price: 80,
    originalPrice: null,
    discount: null,
    badge: "Best Seller",
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8ba143a6-9e59-47d9-9bc6-ffe028d797f0/JORDAN+1+MID+SE+%28PS%29.png",
    href: "#",
  },
  {
    id: 24,
    name: "Jordan 1 Mid",
    category: "Baby/Toddler Shoes",
    colors: "1 Color",
    price: 60,
    originalPrice: null,
    discount: null,
    badge: null,
    image:
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e9c25d75-ff17-46e3-a507-e4c1a19aace0/JORDAN+1+MID+%28TD%29.png",
    href: "#",
  },
];

const relatedCategories = [
  "Baby Boy & Toddler Shoes",
  "Boys Best Sellers Shoes",
  "Girls Back to School Shoes",
  "Baby Girls Shoes",
  "Boys Running Shoes",
  "Boys Back to School Shoes",
  "Girls Softball Shoes",
  "Boys Shoes",
  "Boys Soccer Cleats & Shoes",
  "Girls Black Shoes",
];

export default function Jordan1ShoesPage() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <main className="flex-1 max-w-[1920px] mx-auto px-4 md:px-12 py-4">
        {/* Breadcrumb */}
        <nav className="text-sm mb-2">
          <ol className="flex items-center gap-1 text-gray-500">
            <li>
              <Link href="#" className="hover:text-black">
                Jordan
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="#" className="hover:text-black">
                Jordan 1
              </Link>
            </li>
            <li>/</li>
            <li className="text-black">Shoes</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Jordan 1 Shoes (73)</h1>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm hover:text-gray-600"
            >
              {showFilters ? "Hide Filters" : "Show Filters"}
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              type="button"
              className="flex items-center gap-1 text-sm hover:text-gray-600"
            >
              Sort By
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <Link key={product.id} href={product.href} className="group">
              {/* Product Image */}
              <div className="relative aspect-square bg-[#f5f5f5] mb-3 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    // Fallback for broken images
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/126ad26f-6605-4ec5-920e-38d9760b9dad/AIR+JORDAN+1+LOW+SE.png";
                  }}
                />
                {/* Favorite button */}
                <button
                  type="button"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Heart className="w-5 h-5" />
                </button>
              </div>

              {/* Product Info */}
              <div className="space-y-1">
                {product.badge && (
                  <span
                    className={`text-sm ${
                      product.badge === "Just In"
                        ? "text-[#9e3500]"
                        : "text-[#9e3500]"
                    }`}
                  >
                    {product.badge}
                  </span>
                )}
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
                <p className="text-gray-500 text-sm">{product.colors}</p>
                <div className="flex items-center gap-2 pt-1">
                  <span className="font-medium">
                    $
                    {typeof product.price === "number"
                      ? product.price.toFixed(2)
                      : product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-gray-500 line-through text-sm">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="text-[#9e3500] text-sm">
                        {product.discount}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Related Categories */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <h2 className="text-lg font-medium mb-4">Related Categories</h2>
          <div className="flex flex-wrap gap-2">
            {relatedCategories.map((category) => (
              <Link
                key={category}
                href="#"
                className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:border-black transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

