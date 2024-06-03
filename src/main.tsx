// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Background from "./pages/Background";
import Certification from "./pages/Certification";
import Portfolio from "./pages/Portfolio";
import Blog from "./pages/Blog";
import Gallery from "./pages/Gallery";
import PortfolioItem from "./pages/PortfolioItem";
import BlogItem from "./pages/BlogItem";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Dashboard />} />
          <Route path="background" element={<Background />} />
          <Route path="certification" element={<Certification />} />
          <Route path="portfolio" element={<Portfolio />}>
            <Route path="open" element={<Portfolio />}>
              <Route path=":id" element={<PortfolioItem />} />
            </Route>
            <Route path="close" element={<Portfolio />}>
              <Route path=":id" element={<PortfolioItem />} />
            </Route>
          </Route>
          <Route path="blog" element={<Blog />}>
            <Route path=":id" element={<BlogItem />} />
          </Route>
          <Route path="gallery" element={<Gallery />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
