import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App"; // User Routes
 // Admin Routes
import "./index.css"; // Import TailwindCSS styles
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* User Routes */}
          <Route path="/*" element={<App />} />

        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
