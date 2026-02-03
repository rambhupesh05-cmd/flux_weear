import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Shop", href: "/shop" },
    { name: "Collections", href: "/collections" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "About", href: "/about" },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, y: 40 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.1 + i * 0.1,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    }),
  };

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-6 bg-background/80 backdrop-blur-md"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Left - Menu button */}
        <button
          onClick={() => setIsMenuOpen(true)}
          className="flex items-center gap-2 text-editorial hover:text-muted-foreground transition-colors"
        >
          <Menu className="w-5 h-5" />
          <span className="hidden md:inline">Menu</span>
        </button>

        {/* Center - Logo */}
        <Link to="/" className="absolute left-1/2 -translate-x-1/2">
          <motion.span
            className="text-2xl font-light tracking-[0.2em]"
            whileHover={{ letterSpacing: "0.3em" }}
            transition={{ duration: 0.3 }}
          >
            FLUX
          </motion.span>
        </Link>

        {/* Right - Icons */}
        <div className="flex items-center gap-6">
          <Link to="/login" className="hidden md:block">
            <User className="w-5 h-5 hover:text-muted-foreground transition-colors" />
          </Link>
          <Link to="/wishlist" className="relative">
            <Heart className="w-5 h-5 hover:text-muted-foreground transition-colors" />
          </Link>
          <Link to="/cart" className="relative">
            <ShoppingBag className="w-5 h-5 hover:text-muted-foreground transition-colors" />
            <span className="absolute -top-2 -right-2 w-4 h-4 bg-foreground text-background text-[10px] flex items-center justify-center">
              0
            </span>
          </Link>
        </div>
      </motion.nav>

      {/* Full-screen menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-background flex flex-col"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            {/* Menu header */}
            <div className="flex items-center justify-between px-6 md:px-12 py-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 text-editorial hover:text-muted-foreground transition-colors"
              >
                <X className="w-5 h-5" />
                <span>Close</span>
              </button>

              <span className="text-2xl font-light tracking-[0.2em]">FLUX</span>

              <div className="w-20" />
            </div>

            {/* Menu links */}
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  custom={i}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-display-md hover:text-muted-foreground transition-colors ${
                      location.pathname === link.href ? "text-muted-foreground" : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Menu footer */}
            <motion.div
              className="px-6 md:px-12 py-8 flex items-center justify-between border-t border-border"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex gap-8">
                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-editorial hover:text-muted-foreground transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-editorial hover:text-muted-foreground transition-colors"
                >
                  Register
                </Link>
              </div>
              <div className="text-editorial text-muted-foreground">
                © 2024 Flux
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
