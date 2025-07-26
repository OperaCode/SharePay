import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { WagmiConfig } from "wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { wagmiConfig, chains } from "./utils/wagmiConfig.js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

// ✅ Add this line
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <ToastContainer position="top-right" />
            <App />
          </BrowserRouter>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  </StrictMode>
);
