export interface DemoConfig {
  showButtons: boolean;
  buttonLayout: "horizontal" | "vertical";
  buttonColor: "white" | "whitewithoutline" | "midnightblack" | "pazeblue";
  buttonShape: "default" | "rectangle" | "pill";
  buttonLabel?: "checkout" | "checkout with" | "Donate with";
  disableMaxHeight: boolean;
  showTagline: boolean;
  showMessage: boolean;
  messageColor: "black" | "white";
  messagePosition: "top" | "bottom";
  deviceView: "desktop" | "mobile";
}

export interface ConfigContextType {
  config: DemoConfig;
  setConfig: (config: DemoConfig | ((prev: DemoConfig) => DemoConfig)) => void;
}
