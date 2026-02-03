import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ThreeDIntro from "./components/ThreeDIntro";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Lookbook from "./pages/Lookbook";
import Collections from "./pages/Collections";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component to handle intro screen
const AppContent = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [hasEnteredBefore, setHasEnteredBefore] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if user has entered before in this session
    const entered = sessionStorage.getItem("flux-entered");
    if (entered) {
      setShowIntro(false);
      setHasEnteredBefore(true);
    }
  }, []);

  const handleEnterComplete = () => {
    sessionStorage.setItem("flux-entered", "true");
    setShowIntro(false);
    setHasEnteredBefore(true);
  };

  // Only show intro on homepage for first visit
  const shouldShowIntro = showIntro && location.pathname === "/" && !hasEnteredBefore;

  return (
    <AnimatePresence mode="wait">
      {shouldShowIntro ? (
        <ThreeDIntro key="intro" onComplete={handleEnterComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
