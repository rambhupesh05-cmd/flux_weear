import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerLinks = {
    shop: [
      { name: "All Products", href: "/shop" },
      { name: "Hoodies", href: "/shop?category=hoodies" },
      { name: "Oversized Tees", href: "/shop?category=tees" },
      { name: "Jackets", href: "/shop?category=jackets" },
      { name: "Accessories", href: "/shop?category=accessories" },
    ],
    brand: [
      { name: "About", href: "/about" },
      { name: "Lookbook", href: "/lookbook" },
      { name: "Collections", href: "/collections" },
      { name: "Contact", href: "/contact" },
    ],
    help: [
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "FAQ", href: "/faq" },
      { name: "Size Guide", href: "/size-guide" },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-3xl font-light tracking-[0.2em] mb-6">FLUX</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Premium streetwear for the next generation. Wear the future.
            </p>
          </motion.div>

          {/* Shop links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-editorial mb-6">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Brand links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-editorial mb-6">Brand</h4>
            <ul className="space-y-3">
              {footerLinks.brand.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-editorial mb-6">Help</h4>
            <ul className="space-y-3">
              {footerLinks.help.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom */}
        <motion.div
          className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-muted-foreground text-xs">
            © 2024 Flux. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs"
            >
              Twitter
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors text-xs"
            >
              TikTok
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
