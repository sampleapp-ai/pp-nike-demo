
"use client";

import {useState, useEffect, useCallback, useMemo} from "react";
import Link from "next/link";
import Image from "next/image";
import {useSearchParams} from "next/navigation";
import {useCart} from "@/context/CartContext";
import {MessageSquare, HelpCircle, ShoppingBag, Check} from "lucide-react";
import {NIKE_LOGO_PATH, NIKE_LOGO_VIEWBOX} from "@/lib/constants";

type CheckoutStep = "delivery" | "payment" | "review";

export default function CheckoutPage() {
  const {items, getSubtotal} = useCart();
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("delivery");
  const [canceled, setCanceled] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">(
    "ship"
  );
  const [addressType, setAddressType] = useState<"home" | "apo">("home");
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "klarna" | "googlepay"
  >("paypal");
  const [hasPromoCode, setHasPromoCode] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
  });

  // Track completed sections
  const [deliveryCompleted, setDeliveryCompleted] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  const subtotal = getSubtotal();
  const shipping = 0;
  const tax = subtotal * 0.0938; // ~9.38% tax rate
  const total = subtotal + shipping + tax;

  // Default item for display if cart is empty (for demo purposes)
  const displayItems = useMemo(() => {
    return items.length > 0
      ? items
      : [
          {
            id: "1",
            name: "Air Jordan 1 Low SE",
            subtitle: "Men's Shoes",
            price: 130,
            size: "10",
            quantity: 1,
            color: "Black/Light Wild Mango/Oli...",
            image:
              "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/090d52af-db03-4e53-b40a-4f1e530dc64d/AIR+JORDAN+1+LOW+SE.png",
            arrivalDate: "Mon, Jan 12",
          },
        ];
  }, [items]);

  const displaySubtotal = items.length > 0 ? subtotal : 130;
  const displayTax = items.length > 0 ? tax : 0;
  const displayTotal = items.length > 0 ? total : 130;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]: value}));
  };

  const handleDeliveryContinue = () => {
    setDeliveryCompleted(true);
    setCurrentStep("payment");
  };

  const handlePaymentContinue = () => {
    setPaymentCompleted(true);
    setCurrentStep("review");
  };

  const handleEditDelivery = () => {
    setCurrentStep("delivery");
  };

  const handleEditPayment = () => {
    setCurrentStep("payment");
  };

  const getPaymentMethodLabel = () => {
    switch (paymentMethod) {
      case "card":
        return "Credit or Debit Card";
      case "paypal":
        return "PayPal";
      case "klarna":
        return "Klarna";
      case "googlepay":
        return "GooglePay";
    }
  };

  const getPaymentMethodLogo = () => {
    switch (paymentMethod) {
      case "paypal":
        return (
          <svg
            className="h-5"
            viewBox="0 0 124 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#253B80"
              d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
            />
            <path
              fill="#253B80"
              d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
            />
            <path
              fill="#253B80"
              d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z  "
            />
            <path
              fill="#179BD7"
              d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z"
            />
            <path
              fill="#179BD7"
              d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
            />
            <path
              fill="#179BD7"
              d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
            />
            <path
              fill="#253B80"
              d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
            />
            <path
              fill="#179BD7"
              d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z"
            />
            <path
              fill="#222D65"
              d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
            />
            <path
              fill="#253B80"
              d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z"
            />
          </svg>
        );
      case "klarna":
        return <span className="text-white text-sm font-medium">Klarna</span>;
      case "googlepay":
        return (
          <div className="text-xs font-medium px-2 py-1 border border-white rounded flex items-center gap-1">
            <span className="text-white">G</span>
            <span className="text-white">Pay</span>
          </div>
        );
      case "card":
        return (
          <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
            <rect
              x="0.5"
              y="0.5"
              width="31"
              height="19"
              rx="2.5"
              stroke="white"
            />
            <rect x="3" y="5" width="10" height="2" rx="1" fill="white" />
            <rect x="3" y="9" width="6" height="2" rx="1" fill="white" />
            <rect x="3" y="13" width="8" height="2" rx="1" fill="white" />
          </svg>
        );
      default:
        return null;
    }
  };

  // Check for canceled checkout
  useEffect(() => {
    if (searchParams.get("canceled") === "true") {
      setCanceled(true);
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Checkout Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex-shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="59"
              height="21"
              viewBox={NIKE_LOGO_VIEWBOX}
              fill="currentColor"
              aria-hidden="true"
              focusable="false"
              role="img"
              className="h-6"
            >
              <path d={NIKE_LOGO_PATH} />
            </svg>
          </Link>

          <div className="flex items-center gap-6">
            <span className="text-sm hidden sm:block">1-800-806-6453</span>
            <button
              type="button"
              className="flex items-center gap-1 text-sm hover:text-gray-600"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Live Chat</span>
            </button>
            <Link href="/" className="relative">
              <ShoppingBag className="w-6 h-6" />
              {displayItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {displayItems.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-[1200px] mx-auto px-4 py-8 w-full">
        <h1 className="text-2xl font-medium text-center mb-8">Checkout</h1>

        {/* Cancel Message */}
        {canceled && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Your checkout was canceled. You can continue shopping or try
              again.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
          {/* Left Column - Form */}
          <div className="space-y-6">
            {/* Delivery Options Section */}
            <section className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-medium">Delivery Options</h2>
                  {deliveryCompleted && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
                {deliveryCompleted && currentStep !== "delivery" && (
                  <button
                    type="button"
                    onClick={handleEditDelivery}
                    className="text-sm underline hover:text-gray-600"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === "delivery" ? (
                <>
                  {/* Ship / Pick Up Toggle */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("ship")}
                      className={`flex items-center justify-center gap-2 py-4 border rounded-lg transition-colors ${
                        deliveryMethod === "ship"
                          ? "border-black bg-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M1 3h15l3 8v6H1V3z" />
                        <path d="M16 11h4l3 4v2h-7v-6z" />
                        <circle cx="5.5" cy="18.5" r="2.5" />
                        <circle cx="18.5" cy="18.5" r="2.5" />
                      </svg>
                      Ship
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod("pickup")}
                      className={`flex items-center justify-center gap-2 py-4 border rounded-lg transition-colors ${
                        deliveryMethod === "pickup"
                          ? "border-black bg-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <svg
                        className="w-5 h-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                        <circle cx="12" cy="9" r="2.5" />
                      </svg>
                      Pick Up
                    </button>
                  </div>

                  {/* Home/Office - APO/FPO Toggle */}
                  <div className="flex gap-2 mb-6">
                    <button
                      type="button"
                      onClick={() => setAddressType("home")}
                      className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                        addressType === "home"
                          ? "border-black bg-white text-black"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      Home/Office
                    </button>
                    <button
                      type="button"
                      onClick={() => setAddressType("apo")}
                      className={`px-4 py-2 text-sm rounded-full border transition-colors ${
                        addressType === "apo"
                          ? "border-black bg-white text-black"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      APO/FPO
                    </button>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email*"
                      className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        placeholder="First Name*"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        placeholder="Last Name*"
                        className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <button
                      type="button"
                      className="text-sm underline hover:text-gray-600 -mb-2"
                    >
                      Enter address manually
                    </button>

                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Q Start typing address"
                        className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                      />
                    </div>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Phone Number*"
                      className="w-full max-w-[50%] px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:border-black transition-colors"
                    />

                    <div className="flex justify-end pt-4">
                      <button
                        type="button"
                        onClick={handleDeliveryContinue}
                        className="px-8 py-4 bg-gray-200 hover:bg-gray-300 text-black rounded-full font-medium transition-colors"
                      >
                        Save & Continue
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                /* Collapsed Delivery Info */
                <div className="text-sm text-gray-600 space-y-4">
                  <div>
                    <p className="font-medium text-black">Shipping Address</p>
                    <p>
                      {formData.firstName || "John"}{" "}
                      {formData.lastName || "Doe"}
                    </p>
                    <p>{formData.address || "3551 Middlefield Rd"}</p>
                    <p>Menlo Park CA 94025-3024</p>
                    <p>{formData.email || "example@gmail.com"}</p>
                    <p>{formData.phone || "(650) 661-9110"}</p>
                  </div>
                  <div>
                    <p className="font-medium text-black">Shipping Speed</p>
                    <p>Free Shipping</p>
                    <p>Arrives by Mon, Jan 12</p>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Section */}
            <section className="border-b border-gray-200 pb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <h2
                    className={`text-lg font-medium ${
                      !deliveryCompleted ? "text-gray-400" : ""
                    }`}
                  >
                    Payment
                  </h2>
                  {paymentCompleted && (
                    <Check className="w-5 h-5 text-green-600" />
                  )}
                </div>
                {paymentCompleted && currentStep !== "payment" && (
                  <button
                    type="button"
                    onClick={handleEditPayment}
                    className="text-sm underline hover:text-gray-600"
                  >
                    Edit
                  </button>
                )}
              </div>

              {currentStep === "payment" && deliveryCompleted ? (
                <div className="space-y-6">
                  {/* Billing Country/Region */}
                  <div>
                    <p className="text-sm flex items-center gap-1 mb-1">
                      Billing Country/Region
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </p>
                    <p className="flex items-center gap-2">
                      United States
                      <button
                        type="button"
                        className="text-sm underline hover:text-gray-600"
                      >
                        Edit
                      </button>
                    </p>
                  </div>

                  {/* Promo Code Checkbox */}
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasPromoCode}
                      onChange={(e) => setHasPromoCode(e.target.checked)}
                      className="w-5 h-5 border-2 border-gray-300 rounded accent-black"
                    />
                    <span className="text-sm flex items-center gap-1">
                      Do you have a gift card, product voucher, or promo code?
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                    </span>
                  </label>

                  {/* Payment Methods */}
                  <div>
                    <p className="font-medium mb-4">Select payment method</p>
                    <div className="space-y-3">
                      {/* Credit or Debit Card */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={() => setPaymentMethod("card")}
                          className="w-5 h-5 accent-black"
                        />
                        <svg
                          className="w-8 h-5"
                          viewBox="0 0 32 20"
                          fill="none"
                        >
                          <rect
                            x="0.5"
                            y="0.5"
                            width="31"
                            height="19"
                            rx="2.5"
                            stroke="#CCCCCC"
                          />
                          <rect
                            x="3"
                            y="5"
                            width="10"
                            height="2"
                            rx="1"
                            fill="#666666"
                          />
                          <rect
                            x="3"
                            y="9"
                            width="6"
                            height="2"
                            rx="1"
                            fill="#666666"
                          />
                          <rect
                            x="3"
                            y="13"
                            width="8"
                            height="2"
                            rx="1"
                            fill="#666666"
                          />
                        </svg>
                        <span>Credit or Debit Card</span>
                      </label>

                      {/* PayPal */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={paymentMethod === "paypal"}
                          onChange={() => setPaymentMethod("paypal")}
                          className="w-5 h-5 accent-black"
                        />
                        <svg
                          className="h-5"
                          viewBox="0 0 124 33"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill="#253B80"
                            d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
                          />
                          <path
                            fill="#253B80"
                            d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
                          />
                          <path
                            fill="#253B80"
                            d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z  "
                          />
                          <path
                            fill="#179BD7"
                            d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z"
                          />
                          <path
                            fill="#179BD7"
                            d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
                          />
                          <path
                            fill="#179BD7"
                            d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
                          />
                          <path
                            fill="#253B80"
                            d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
                          />
                          <path
                            fill="#179BD7"
                            d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z"
                          />
                          <path
                            fill="#222D65"
                            d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
                          />
                          <path
                            fill="#253B80"
                            d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z"
                          />
                        </svg>
                        <span>PayPal</span>
                      </label>

                      {/* Klarna */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="klarna"
                          checked={paymentMethod === "klarna"}
                          onChange={() => setPaymentMethod("klarna")}
                          className="w-5 h-5 accent-black"
                        />
                        <div className="bg-[#ffb3c7] text-black text-xs font-bold px-2 py-1 rounded">
                          Klarna
                        </div>
                        <span>Klarna</span>
                      </label>

                      {/* GooglePay */}
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="googlepay"
                          checked={paymentMethod === "googlepay"}
                          onChange={() => setPaymentMethod("googlepay")}
                          className="w-5 h-5 accent-black"
                        />
                        <div className="text-xs font-medium px-2 py-1 border border-gray-300 rounded flex items-center gap-1">
                          <span className="text-[#4285F4]">G</span>
                          <span>Pay</span>
                        </div>
                        <span>GooglePay</span>
                      </label>
                    </div>
                  </div>

                  {/* Payment Method Message */}
                  {paymentMethod === "paypal" && (
                    <p className="text-sm text-gray-600">
                      You will be redirected to the PayPal site after reviewing
                      your order.
                    </p>
                  )}
                  {paymentMethod === "klarna" && (
                    <p className="text-sm text-gray-600">
                      You will be redirected to Klarna after reviewing your
                      order.
                    </p>
                  )}
                  {paymentMethod === "googlepay" && (
                    <p className="text-sm text-gray-600">
                      You will be redirected to Google Pay after reviewing your
                      order.
                    </p>
                  )}

                  {/* Continue Button */}
                  <div className="flex justify-center pt-4">
                    <button
                      type="button"
                      onClick={handlePaymentContinue}
                      className="px-8 py-4 bg-black hover:bg-gray-800 text-white rounded-full font-medium transition-colors"
                    >
                      Continue to Order Review
                    </button>
                  </div>
                </div>
              ) : paymentCompleted ? (
                /* Collapsed Payment Info */
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-black">Payment Method</p>
                  <div className="flex items-center gap-2 mt-1">
                    {paymentMethod === "paypal" && (
                      <svg
                        className="h-5"
                        viewBox="0 0 124 33"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill="#253B80"
                          d="M46.211,6.749h-6.839c-0.468,0-0.866,0.34-0.939,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.564,0.658  h3.265c0.468,0,0.866-0.34,0.939-0.803l0.746-4.73c0.072-0.463,0.471-0.803,0.938-0.803h2.165c4.505,0,7.105-2.18,7.784-6.5  c0.306-1.89,0.013-3.375-0.872-4.415C50.224,7.353,48.5,6.749,46.211,6.749z M47,13.154c-0.374,2.454-2.249,2.454-4.062,2.454  h-1.032l0.724-4.583c0.043-0.277,0.283-0.481,0.563-0.481h0.473c1.235,0,2.4,0,3.002,0.704C47.027,11.668,47.137,12.292,47,13.154z"
                        />
                        <path
                          fill="#253B80"
                          d="M66.654,13.075h-3.275c-0.279,0-0.52,0.204-0.563,0.481l-0.145,0.916l-0.229-0.332  c-0.709-1.029-2.29-1.373-3.868-1.373c-3.619,0-6.71,2.741-7.312,6.586c-0.313,1.918,0.132,3.752,1.22,5.031  c0.998,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.562,0.66h2.95  c0.469,0,0.865-0.34,0.939-0.803l1.77-11.209C67.271,13.388,67.004,13.075,66.654,13.075z M62.089,19.449  c-0.316,1.871-1.801,3.127-3.695,3.127c-0.951,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.668-1.391-0.514-2.301  c0.295-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C62.034,17.721,62.232,18.543,62.089,19.449z"
                        />
                        <path
                          fill="#253B80"
                          d="M84.096,13.075h-3.291c-0.314,0-0.609,0.156-0.787,0.417l-4.539,6.686l-1.924-6.425  c-0.121-0.402-0.492-0.678-0.912-0.678h-3.234c-0.393,0-0.666,0.384-0.541,0.754l3.625,10.638l-3.408,4.811  c-0.268,0.379,0.002,0.9,0.465,0.9h3.287c0.312,0,0.604-0.152,0.781-0.408L84.564,13.97C84.826,13.592,84.557,13.075,84.096,13.075z  "
                        />
                        <path
                          fill="#179BD7"
                          d="M94.992,6.749h-6.84c-0.467,0-0.865,0.34-0.938,0.802l-2.766,17.537c-0.055,0.346,0.213,0.658,0.562,0.658  h3.51c0.326,0,0.605-0.238,0.656-0.562l0.785-4.971c0.072-0.463,0.471-0.803,0.938-0.803h2.164c4.506,0,7.105-2.18,7.785-6.5  c0.307-1.89,0.012-3.375-0.873-4.415C99.004,7.353,97.281,6.749,94.992,6.749z M95.781,13.154c-0.373,2.454-2.248,2.454-4.062,2.454  h-1.031l0.725-4.583c0.043-0.277,0.281-0.481,0.562-0.481h0.473c1.234,0,2.4,0,3.002,0.704  C95.809,11.668,95.918,12.292,95.781,13.154z"
                        />
                        <path
                          fill="#179BD7"
                          d="M115.434,13.075h-3.273c-0.281,0-0.52,0.204-0.562,0.481l-0.145,0.916l-0.23-0.332  c-0.709-1.029-2.289-1.373-3.867-1.373c-3.619,0-6.709,2.741-7.311,6.586c-0.312,1.918,0.131,3.752,1.219,5.031  c1,1.176,2.426,1.666,4.125,1.666c2.916,0,4.533-1.875,4.533-1.875l-0.146,0.91c-0.055,0.348,0.213,0.66,0.564,0.66h2.949  c0.467,0,0.865-0.34,0.938-0.803l1.771-11.209C116.053,13.388,115.785,13.075,115.434,13.075z M110.869,19.449  c-0.314,1.871-1.801,3.127-3.695,3.127c-0.949,0-1.711-0.305-2.199-0.883c-0.484-0.574-0.666-1.391-0.514-2.301  c0.297-1.855,1.805-3.152,3.67-3.152c0.93,0,1.686,0.309,2.184,0.892C110.816,17.721,111.014,18.543,110.869,19.449z"
                        />
                        <path
                          fill="#179BD7"
                          d="M119.295,7.23l-2.807,17.858c-0.055,0.346,0.213,0.658,0.562,0.658h2.822c0.469,0,0.867-0.34,0.939-0.803  l2.768-17.536c0.055-0.346-0.213-0.659-0.562-0.659h-3.16C119.578,6.749,119.338,6.953,119.295,7.23z"
                        />
                        <path
                          fill="#253B80"
                          d="M7.266,29.154l0.523-3.322l-1.165-0.027H1.061L4.927,1.292C4.939,1.218,4.978,1.149,5.035,1.1  c0.057-0.049,0.13-0.076,0.206-0.076h9.38c3.114,0,5.263,0.648,6.385,1.927c0.526,0.6,0.861,1.227,1.023,1.917  c0.17,0.724,0.173,1.589,0.007,2.644l-0.012,0.077v0.676l0.526,0.298c0.443,0.235,0.795,0.504,1.065,0.812  c0.45,0.513,0.741,1.165,0.864,1.938c0.127,0.795,0.085,1.741-0.123,2.812c-0.24,1.232-0.628,2.305-1.152,3.183  c-0.482,0.809-1.096,1.48-1.825,2c-0.696,0.494-1.523,0.869-2.458,1.109c-0.906,0.236-1.939,0.355-3.072,0.355h-0.73  c-0.522,0-1.029,0.188-1.427,0.525c-0.399,0.344-0.663,0.814-0.744,1.328l-0.055,0.299l-0.924,5.855l-0.042,0.215  c-0.011,0.068-0.03,0.102-0.058,0.125c-0.025,0.021-0.061,0.035-0.096,0.035H7.266z"
                        />
                        <path
                          fill="#179BD7"
                          d="M23.048,7.667L23.048,7.667L23.048,7.667c-0.028,0.179-0.06,0.362-0.096,0.55  c-1.237,6.351-5.469,8.545-10.874,8.545H9.326c-0.661,0-1.218,0.48-1.321,1.132l0,0l0,0L6.596,26.83l-0.399,2.533  c-0.067,0.428,0.263,0.814,0.695,0.814h4.881c0.578,0,1.069-0.42,1.16-0.99l0.048-0.248l0.919-5.832l0.059-0.32  c0.09-0.572,0.582-0.992,1.16-0.992h0.73c4.729,0,8.431-1.92,9.513-7.476c0.452-2.321,0.218-4.259-0.978-5.622  C24.022,8.286,23.573,7.945,23.048,7.667z"
                        />
                        <path
                          fill="#222D65"
                          d="M21.754,7.151c-0.189-0.055-0.384-0.105-0.584-0.15c-0.201-0.044-0.407-0.083-0.619-0.117  c-0.742-0.12-1.555-0.177-2.426-0.177h-7.352c-0.181,0-0.353,0.041-0.507,0.115C9.927,6.985,9.675,7.306,9.614,7.699L8.05,17.605  l-0.045,0.289c0.103-0.652,0.66-1.132,1.321-1.132h2.752c5.405,0,9.637-2.195,10.874-8.545c0.037-0.188,0.068-0.371,0.096-0.55  c-0.313-0.166-0.652-0.308-1.017-0.429C21.941,7.208,21.848,7.179,21.754,7.151z"
                        />
                        <path
                          fill="#253B80"
                          d="M9.614,7.699c0.061-0.393,0.313-0.714,0.652-0.876c0.155-0.074,0.326-0.115,0.507-0.115h7.352  c0.871,0,1.684,0.057,2.426,0.177c0.212,0.034,0.418,0.073,0.619,0.117c0.2,0.045,0.395,0.095,0.584,0.15  c0.094,0.028,0.187,0.057,0.278,0.086c0.365,0.121,0.704,0.264,1.017,0.429c0.368-2.347-0.003-3.945-1.272-5.392  C20.378,0.682,17.853,0,14.622,0h-9.38c-0.66,0-1.223,0.48-1.325,1.133L0.01,25.898c-0.077,0.49,0.301,0.932,0.795,0.932h5.791  l1.454-9.225L9.614,7.699z"
                        />
                      </svg>
                    )}
                    {paymentMethod === "klarna" && (
                      <div className="bg-[#ffb3c7] text-black text-xs font-bold px-2 py-1 rounded">
                        Klarna
                      </div>
                    )}
                    {paymentMethod === "card" && (
                      <svg className="w-8 h-5" viewBox="0 0 32 20" fill="none">
                        <rect
                          x="0.5"
                          y="0.5"
                          width="31"
                          height="19"
                          rx="2.5"
                          stroke="#CCCCCC"
                        />
                        <rect
                          x="3"
                          y="5"
                          width="10"
                          height="2"
                          rx="1"
                          fill="#666666"
                        />
                        <rect
                          x="3"
                          y="9"
                          width="6"
                          height="2"
                          rx="1"
                          fill="#666666"
                        />
                        <rect
                          x="3"
                          y="13"
                          width="8"
                          height="2"
                          rx="1"
                          fill="#666666"
                        />
                      </svg>
                    )}
                    {paymentMethod === "googlepay" && (
                      <div className="text-xs font-medium px-2 py-1 border border-gray-300 rounded flex items-center gap-1">
                        <span className="text-[#4285F4]">G</span>
                        <span>Pay</span>
                      </div>
                    )}
                    <span>{getPaymentMethodLabel()}</span>
                  </div>
                </div>
              ) : null}
            </section>

            {/* Order Review Section */}
            <section className="pb-6">
              <h2
                className={`text-lg font-medium mb-4 ${
                  !paymentCompleted ? "text-gray-400" : ""
                }`}
              >
                Order Review
              </h2>

              {currentStep === "review" && paymentCompleted && (
                <div className="space-y-6">
                  <p className="text-sm text-gray-600">
                    By clicking the "Continue to {getPaymentMethodLabel()}"
                    button, you confirm that you have read, understand, and
                    accept our{" "}
                    <Link href="#" className="underline">
                      Terms of Use
                    </Link>
                    ,{" "}
                    <Link href="#" className="underline">
                      Terms of Sale
                    </Link>
                    , and{" "}
                    <Link href="#" className="underline">
                      Return Policy
                    </Link>{" "}
                    and acknowledge that you have read Nike's{" "}
                    <Link href="#" className="underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (paymentMethod === "paypal") {
                          alert("PayPal checkout would be initiated here");
                        } else if (paymentMethod === "klarna") {
                          alert("Klarna checkout would be initiated here");
                        } else if (paymentMethod === "googlepay") {
                          alert("Google Pay checkout would be initiated here");
                        } else if (paymentMethod === "card") {
                          alert("Credit card checkout would be initiated here");
                        }
                      }}
                      className="px-8 py-4 rounded-full font-medium flex items-center gap-2 transition-colors bg-[#0070ba] hover:bg-[#003087] text-white"
                    >
                      Continue To
                      {getPaymentMethodLogo()}
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:border-l lg:pl-8 border-gray-200">
            <div className="lg:sticky lg:top-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-medium">In Your Bag</h2>
                <Link
                  href="/"
                  className="underline text-sm hover:text-gray-600"
                >
                  Edit
                </Link>
              </div>

              {/* Price Summary */}
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Subtotal
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </span>
                  <span>${displaySubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Estimated Tax
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                  </span>
                  <span>${displayTax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${displayTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-8 space-y-6">
                {displayItems.map((item) => (
                  <div key={`${item.id}-${item.size}`}>
                    <p className="text-sm font-medium mb-4">
                      Arrives by {item.arrivalDate}
                    </p>
                    <div className="flex gap-4">
                      <div className="relative w-20 h-20 flex-shrink-0 bg-gray-100 rounded">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="text-sm space-y-1">
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-gray-500">{item.subtitle}</p>
                        <p className="text-gray-500">{item.color}</p>
                        <p className="text-gray-500">
                          Qty: {item.quantity} | Size: {item.size}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-16">
        <div className="max-w-[1200px] mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" />
              </svg>
              <span>United States</span>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <span>© 2026 Nike, Inc. All Rights Reserved</span>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-gray-800"
              >
                Guides
                <svg
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <Link href="#" className="hover:text-gray-800">
                Terms of Sale
              </Link>
              <Link href="#" className="hover:text-gray-800">
                Terms of Use
              </Link>
              <Link href="#" className="hover:text-gray-800">
                Nike Privacy Policy
              </Link>
              <button
                type="button"
                className="flex items-center gap-1 hover:text-gray-800"
              >
                <span className="flex">
                  <span className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="w-3 h-3 rounded-full bg-red-500 -ml-1" />
                </span>
                Your Privacy Choices
              </button>
              <Link href="#" className="hover:text-gray-800">
                CA Supply Chains Act
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

