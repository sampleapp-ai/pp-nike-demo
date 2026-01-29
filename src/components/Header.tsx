
"use client";

import {useState} from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from "lucide-react";
import {NIKE_LOGO_PATH, NIKE_LOGO_VIEWBOX} from "@/lib/constants";
import {useCart} from "@/context/CartContext";
import {useUser} from "@auth0/nextjs-auth0/client";

const JordanLogo = () => (
  <svg height="24" width="24" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.023 12.002c-.468.014-.91.109-1.326.276a3.614 3.614 0 00-1.139.763c-.328.33-.587.716-.772 1.143a3.56 3.56 0 00-.282 1.379c0 .49.094.952.282 1.382.185.426.444.811.772 1.141.328.332.718.59 1.139.761.422.173.864.265 1.329.276a3.658 3.658 0 001.334-.276c.422-.171.813-.43 1.141-.761.327-.33.587-.715.77-1.141a3.519 3.519 0 00.283-1.382c0-.487-.095-.95-.282-1.379a3.582 3.582 0 00-.772-1.143 3.612 3.612 0 00-1.141-.763 3.644 3.644 0 00-1.336-.276zm0-12c-6.617 0-12 5.383-12 12s5.383 12 12 12c6.618 0 12-5.383 12-12s-5.382-12-12-12zm0 22.4c-5.75 0-10.4-4.65-10.4-10.4 0-5.749 4.65-10.4 10.4-10.4 5.749 0 10.4 4.651 10.4 10.4 0 5.75-4.651 10.4-10.4 10.4z" />
  </svg>
);

const ConverseLogo = () => (
  <svg height="16" width="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
  </svg>
);

const NikeLogo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="59"
    height="21"
    viewBox={NIKE_LOGO_VIEWBOX}
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    role="img"
    className="flex-shrink-0"
  >
    <path d={NIKE_LOGO_PATH} />
  </svg>
);

export default function Header() {
  const [promoIndex, setPromoIndex] = useState(0);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const {items} = useCart();
  const {user, isLoading} = useUser();
  const cartItemCount = items.reduce((total, item) => total + item.quantity, 0);

  const promos = [
    {text: "Send a Gift Card", link: "#"},
    {text: "Free Shipping on Orders $50+", link: "#"},
    {text: "New Arrivals", link: "#"},
  ];

  const navItems = [
    "Men",
    "Women",
    "Kids",
    "Jordan",
    "NikeSKIMS",
    "Sport",
    "Sale",
  ];

  const nextPromo = () => {
    setPromoIndex((prev) => (prev + 1) % promos.length);
  };

  const prevPromo = () => {
    setPromoIndex((prev) => (prev - 1 + promos.length) % promos.length);
  };

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* Top utility bar */}
      <div className="bg-[#f5f5f5] text-xs">
        <div className="max-w-[1920px] mx-auto px-12 flex justify-between items-center h-9">
          <div className="flex items-center gap-4">
            <a href="#" className="hover:opacity-70">
              <JordanLogo />
            </a>
            <a href="#" className="hover:opacity-70">
              <ConverseLogo />
            </a>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-medium">
            <a href="#" className="hover:text-gray-500 transition-colors">
              Find a Store
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-500 transition-colors">
              Help
            </a>
            <span className="text-gray-300">|</span>
            <a href="#" className="hover:text-gray-500 transition-colors">
              Join Us
            </a>
            <span className="text-gray-300">|</span>
            {isLoading ? (
              <span className="text-gray-400">Loading...</span>
            ) : user ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 hover:text-gray-500 transition-colors"
                >
                  {user.picture ? (
                    <img
                      src={user.picture}
                      alt={user.name || "User"}
                      className="w-5 h-5 rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span>{user.name || user.email}</span>
                </button>
                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[160px] z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                      <p className="text-gray-500 text-xs truncate">{user.email}</p>
                    </div>
                    <a
                      href="/auth/logout"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/auth/login"
                className="hover:text-gray-500 transition-colors font-medium"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="border-b border-gray-100">
        <div className="max-w-[1920px] mx-auto px-12 flex items-center justify-between h-[60px]">
          <a href="#" className="flex-shrink-0">
            <NikeLogo />
          </a>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-base font-medium hover:opacity-70 transition-opacity py-2 border-b-2 border-transparent hover:border-black"
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-2 bg-[#f5f5f5] rounded-full pl-4 pr-4 py-2 hover:bg-gray-200 transition-colors"
            >
              <Search className="w-5 h-5" />
              <span className="text-sm text-gray-500 hidden sm:inline">
                Search
              </span>
            </button>
            <button
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart className="w-6 h-6" />
            </button>
            <Link
              href="/cart"
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingBag className="w-6 h-6" />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Promo banner */}
      <div className="bg-[#f5f5f5] py-3 relative">
        <div className="max-w-[1920px] mx-auto px-12 flex items-center justify-center">
          <button
            type="button"
            onClick={prevPromo}
            className="absolute left-12 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <a
            href={promos[promoIndex].link}
            className="text-sm font-medium hover:underline"
          >
            {promos[promoIndex].text}
          </a>
          <button
            type="button"
            onClick={nextPromo}
            className="absolute right-12 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

