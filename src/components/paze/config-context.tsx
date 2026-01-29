"use client";

import { createContext, useContext, ReactNode } from "react";
import type { ConfigContextType } from "./types";

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({
  value,
  children,
}: {
  value: ConfigContextType;
  children: ReactNode;
}) {
  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within ConfigProvider");
  }
  return context;
}
