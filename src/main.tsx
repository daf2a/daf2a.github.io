// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Dashboard /> },
      { path: "/background", element: <Background /> },
      { path: "/certification", element: <Certification /> },
      {
        path: "/portfolio",
        element: <Portfolio />,
        children: [
          { path: "/open/:id", element: <PortfolioItem /> },
          { path: "/close/:id", element: <PortfolioItem /> },
        ],
      },
      {
        path: "/blog",
        element: <Blog />,
        children: [{ path: "/:id", element: <BlogItem /> }],
      },
      { path: "/gallery", element: <Gallery /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
