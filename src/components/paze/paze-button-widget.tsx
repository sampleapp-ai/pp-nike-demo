"use client";

import {useEffect, useRef, useCallback} from "react";
import {useConfig} from "./config-context";

// Extend the global Window interface for the Digital Wallet SDK
declare global {
  interface Window {
    DIGITAL_WALLET_SDK?: {
      initialize: (config: {
        client: {id: string; name: string; profileId: string};
      }) => Promise<void>;
      canCheckout: (options: {emailAddress: string | null}) => Promise<boolean>;
      checkout: (options: {
        acceptedPaymentCardNetworks: string[];
        sessionId: string;
        actionCode: string;
        intent: string;
        transactionValue: {
          transactionAmount: string;
          transactionCurrencyCode: string;
        };
        shippingPreference: string;
      }) => Promise<unknown>;
      complete: (options: {
        transactionOptions: {
          billingPreference: string;
          merchantCategoryCode: string;
          payloadTypeIndicator: string;
        };
        transactionId: string;
        emailAddress: string | null;
        sessionId: string;
        transactionType: string;
        transactionValue: {
          transactionAmount: string;
          transactionCurrencyCode: string;
        };
      }) => Promise<unknown>;
    };
  }
}

// Declare the custom element for TypeScript
declare module "react" {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      "paze-button": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          color?: string;
          disablemaxheight?: string;
          label?: string;
          shape?: string;
        },
        HTMLElement
      >;
    }
  }
}

// SDK script URL
const SDK_SCRIPT_URL =
  "https://checkout.wallet.cat.earlywarning.io/web/resources/js/digitalwallet-sdk.js";

// Client configuration
const CLIENT_CONFIG = {
  id: "H4O4VO6ADQV441QLJK8J21BWiGC0JoeS1vxOWdBDD0zdWqXKY",
  name: "Presidio",
  profileId: "default"
};

// Track SDK loading state globally to avoid multiple loads
let sdkLoadPromise: Promise<void> | null = null;
let sdkInitialized = false;

function loadSDK(): Promise<void> {
  if (sdkLoadPromise) {
    return sdkLoadPromise;
  }

  sdkLoadPromise = new Promise((resolve, reject) => {
    // Check if script already exists
    const existingScript = document.querySelector(
      `script[src="${SDK_SCRIPT_URL}"]`
    );
    if (existingScript) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = SDK_SCRIPT_URL;
    script.type = "text/javascript";
    script.onload = () => resolve();
    script.onerror = () =>
      reject(new Error("Failed to load Digital Wallet SDK"));
    document.head.appendChild(script);
  });

  return sdkLoadPromise;
}

async function initializeSDK(): Promise<void> {
  if (sdkInitialized) {
    return;
  }

  await loadSDK();

  const sdk = window.DIGITAL_WALLET_SDK;
  if (!sdk) {
    throw new Error("Digital Wallet SDK not available");
  }

  await sdk.initialize({
    client: CLIENT_CONFIG
  });

  sdkInitialized = true;
  console.log("Paze SDK initialized");
}

interface PazeButtonWidgetProps {
  transactionAmount?: string;
  className?: string;
}

export default function PazeButtonWidget({
  transactionAmount = "50.21",
  className = ""
}: PazeButtonWidgetProps) {
  const {config} = useConfig();
  const buttonRef = useRef<HTMLElement>(null);
  const handlerAttached = useRef(false);

  // Map config values to paze-button attribute values
  // According to the Paze SDK guide, the color attribute values are:
  // 'white', 'whitewithoutline', 'midnightBlack', 'pazeblue'
  const mapColorToAttribute = (color: string): string => {
    const colorMap: Record<string, string> = {
      pazeblue: "pazeblue",
      white: "white",
      whitewithoutline: "whitewithoutline",
      midnightblack: "midnightBlack"
    };
    return colorMap[color] || "pazeblue";
  };

  // Map config label values to paze-button label attribute values
  // According to the Paze SDK guide, the label attribute values are:
  // 'checkout', 'checkout with', 'Donate with'
  const mapLabelToAttribute = (
    label: string | undefined
  ): string | undefined => {
    if (!label) return undefined;
    const labelMap: Record<string, string> = {
      checkout: "checkout",
      "checkout with": "checkout with",
      "Donate with": "Donate with"
    };
    return labelMap[label];
  };

  const handleCheckout = useCallback(async () => {
    try {
      const sdk = window.DIGITAL_WALLET_SDK;
      if (!sdk) {
        console.error("SDK not available");
        return;
      }

      const guid =
        Date.now().toString(36) + Math.random().toString(36).substring(2);

      const transactionValue = {
        transactionAmount,
        transactionCurrencyCode: "USD"
      };

      const checkoutResponse = await sdk.checkout({
        acceptedPaymentCardNetworks: [],
        sessionId: guid,
        actionCode: "START_FLOW",
        intent: "EXPRESS_CHECKOUT",
        transactionValue,
        shippingPreference: "NONE"
      });

      console.log("Checkout Response:", checkoutResponse);

      const completeResponse = await sdk.complete({
        transactionOptions: {
          billingPreference: "ALL",
          merchantCategoryCode: "US",
          payloadTypeIndicator: "PAYMENT"
        },
        transactionId: "",
        emailAddress: null,
        sessionId: guid,
        transactionType: "PURCHASE",
        transactionValue
      });

      console.log("Complete Response:", completeResponse);
    } catch (error) {
      console.error("Checkout error:", error);
    }
  }, [transactionAmount]);

  useEffect(() => {
    let mounted = true;
    // Reset handler attached flag when effect runs (button may have been recreated due to key change)
    handlerAttached.current = false;

    // Copy ref to variable for cleanup
    const button = buttonRef.current;

    const setup = async () => {
      try {
        await initializeSDK();

        if (!mounted) return;

        // Attach click handler to the button
        if (button && !handlerAttached.current) {
          button.addEventListener("click", handleCheckout);
          handlerAttached.current = true;
        }
      } catch (error) {
        console.error("Failed to initialize Paze SDK:", error);
      }
    };

    setup();

    return () => {
      mounted = false;
      if (button && handlerAttached.current) {
        button.removeEventListener("click", handleCheckout);
        handlerAttached.current = false;
      }
    };
  }, [
    handleCheckout,
    config.buttonColor,
    config.buttonLabel,
    config.buttonShape,
    config.disableMaxHeight
  ]);

  const colorAttr = mapColorToAttribute(config.buttonColor);
  const labelAttr = mapLabelToAttribute(config.buttonLabel);
  const shapeAttr = config.buttonShape || "default";
  const disableMaxHeightAttr = config.disableMaxHeight ? "" : undefined;

  // Create a unique key to force re-render when config changes
  const buttonKey = `${colorAttr}-${labelAttr || "none"}-${shapeAttr}-${disableMaxHeightAttr || "false"}`;

  return (
    <div className={className}>
      <paze-button
        key={buttonKey}
        ref={buttonRef}
        color={colorAttr}
        label={labelAttr}
        shape={shapeAttr}
        disablemaxheight={disableMaxHeightAttr}
      />
    </div>
  );
}
