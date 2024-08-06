import "@/index.css";
import React from "react";
import App from "@/App.tsx";
import { Toaster } from "sonner";

import ReactDOM from "react-dom/client";
import { queryClient } from "@/lib/react-query.ts";
import { QueryClientProvider } from "@tanstack/react-query";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>
);
