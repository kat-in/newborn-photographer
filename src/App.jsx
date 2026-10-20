import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { useSEO } from "./seo";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Gallery from "./pages/Gallery";
import Contacts from "./pages/Contacts";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Reviews from "./pages/Reviews";


function App() {
  const location = useLocation();
  useSEO();

  useEffect(() => {
    const prevent = (e) => {
      if (e.target.tagName === "IMG") {
        e.preventDefault();
      }
    };
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
    };
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          const tall = el.offsetHeight > window.innerHeight * 1.5;
          if (entry.intersectionRatio >= 0.12 || tall) {
            el.classList.add("is-visible");
            obs.unobserve(el);
          }
        });
      },
      { threshold: [0, 0.12] }
    );
    targets.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [location.pathname]);

  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/gallery" element={<Gallery />}></Route>
        <Route path="/contacts" element={<Contacts />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/pricing" element={<Pricing />}></Route>
        <Route path="/reviews" element={<Reviews />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
    </>
  )
}

export default App
