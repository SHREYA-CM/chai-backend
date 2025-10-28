import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./Layout.jsx";

// Lazy Loading Components
const Home = React.lazy(() => import("./Components/Home/Home.jsx"));
const About = React.lazy(() => import("./Components/About/About.jsx"));
const Contact = React.lazy(() => import("./Components/Contact/Contact.jsx"));
const User = React.lazy(() => import("./Components/User/User.jsx"));
const Github = React.lazy(() => import("./Components/Github/Github.jsx"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Suspense fallback={<div>Loading...</div>}><Home /></Suspense>} />
      <Route path="about" element={<Suspense fallback={<div>Loading...</div>}><About /></Suspense>} />
      <Route path="contact" element={<Suspense fallback={<div>Loading...</div>}><Contact /></Suspense>} />
      <Route path="user/:userid" element={<Suspense fallback={<div>Loading...</div>}><User /></Suspense>} />
      <Route path="github" element={<Suspense fallback={<div>Loading...</div>}><Github /></Suspense>} />
    </Route>
  )
);

// Render App
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
