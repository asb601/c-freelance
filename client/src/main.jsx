import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App"; // User Routes
 // Admin Routes
import "./index.css"; // Import TailwindCSS styles


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
   
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/*" element={<App />} />

        </Routes>
      </BrowserRouter>
    
  </React.StrictMode>
);
