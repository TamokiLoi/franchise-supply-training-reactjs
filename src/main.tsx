import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.tsx";
import { setupApi } from "./api/axios.config.ts";
import { initAuthUseCase } from "./features/index.ts";

// Import global styles
import "./index.css";

// Initialize authentication state
initAuthUseCase(); // sync localStorage -> store when reload

// Setup API configurations
setupApi();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster richColors position="top-right" />
  </StrictMode>,
);
