"use client";

import { useState } from "react";
import { ConfigProvider } from "./config-context";
import PazeButtonWidget from "./paze-button-widget";
import type { DemoConfig } from "./types";

/**
 * Example component showing how to use the Paze Button Widget
 *
 * This is a standalone example that demonstrates:
 * 1. Setting up the ConfigProvider
 * 2. Configuring button appearance and behavior
 * 3. Passing transaction amount
 */
export default function PazeButtonExample() {
  const [config, setConfig] = useState<DemoConfig>({
    showButtons: true,
    buttonLayout: "vertical",
    buttonColor: "pazeblue", // Options: "pazeblue", "white", "whitewithoutline", "midnightblack"
    buttonShape: "default", // Options: "default", "rectangle", "pill"
    buttonLabel: undefined, // Options: undefined, "checkout", "checkout with", "Donate with"
    disableMaxHeight: false,
    showTagline: false,
    showMessage: false,
    messageColor: "black",
    messagePosition: "bottom",
    deviceView: "desktop"
  });

  return (
    <ConfigProvider value={{ config, setConfig }}>
      <div className="max-w-md mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        {/* Product Info */}
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-medium">Total: $99.99</p>
        </div>

        {/* Paze Button */}
        <PazeButtonWidget
          transactionAmount="99.99"
          className="w-full"
        />

        {/* Configuration Panel (Optional - for demo purposes) */}
        <div className="mt-8 p-4 border rounded-lg space-y-4">
          <h2 className="font-semibold">Button Configuration</h2>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <select
              value={config.buttonColor}
              onChange={(e) => setConfig({
                ...config,
                buttonColor: e.target.value as DemoConfig["buttonColor"]
              })}
              className="w-full p-2 border rounded"
            >
              <option value="pazeblue">Paze Blue</option>
              <option value="white">White</option>
              <option value="whitewithoutline">White with Outline</option>
              <option value="midnightblack">Midnight Black</option>
            </select>
          </div>

          {/* Shape Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Shape</label>
            <select
              value={config.buttonShape}
              onChange={(e) => setConfig({
                ...config,
                buttonShape: e.target.value as DemoConfig["buttonShape"]
              })}
              className="w-full p-2 border rounded"
            >
              <option value="default">Default</option>
              <option value="rectangle">Rectangle</option>
              <option value="pill">Pill</option>
            </select>
          </div>

          {/* Label Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Label</label>
            <select
              value={config.buttonLabel || ""}
              onChange={(e) => setConfig({
                ...config,
                buttonLabel: e.target.value ? e.target.value as DemoConfig["buttonLabel"] : undefined
              })}
              className="w-full p-2 border rounded"
            >
              <option value="">None</option>
              <option value="checkout">Checkout</option>
              <option value="checkout with">Checkout with</option>
              <option value="Donate with">Donate with</option>
            </select>
          </div>

          {/* Disable Max Height */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="disableMaxHeight"
              checked={config.disableMaxHeight}
              onChange={(e) => setConfig({
                ...config,
                disableMaxHeight: e.target.checked
              })}
              className="mr-2"
            />
            <label htmlFor="disableMaxHeight" className="text-sm">
              Disable Max Height
            </label>
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
}
