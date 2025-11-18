import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from "context/AuthContext";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>
);
