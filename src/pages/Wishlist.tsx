import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";
import { products } from "@/data/products";
import { toast } from "sonner";

const Wishlist = () => {
  // Demo wishlist items
  const [wishlistIds, setWishlistIds] = useState<string[]>(["2", "4", "6"]);

  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  const removeFromWishlist = (id: string) => {
    setWishlistIds(ids => ids.filter(i => i !== id));
    toast.success("Removed from wishlist");
  };

  const addToCart = (id: string) => {
    toast.success("Added to cart");
  };

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="container mx-auto">
          <SectionReveal className="mb-12">
            <p className="text-editorial text-muted-foreground mb-3">Your</p>
            <h1 className="text-display-lg">Wishlist</h1>
          </SectionReveal>

          {wishlistProducts.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted-foreground mb-8">Your wishlist is empty</p>
              <Link to="/shop" className="btn-editorial inline-block">
                <span>Explore Products</span>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
              layout
            >
              <AnimatePresence mode="popLayout">
                {wishlistProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="group relative"
                  >
                    <Link to={`/product/${product.id}`} className="block">
                      <div className="product-card aspect-[3/4] bg-secondary overflow-hidden">
                        <motion.img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                    </Link>

                    {/* Remove button */}
                    <motion.button
                      className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm hover:bg-foreground hover:text-background transition-colors"
                      onClick={() => removeFromWishlist(product.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X className="w-4 h-4" />
                    </motion.button>

                    {/* Product info */}
                    <div className="mt-4 space-y-1">
                      <p className="text-editorial text-muted-foreground">{product.category}</p>
                      <h3 className="text-sm font-medium">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </div>

                    {/* Add to cart button */}
                    <motion.button
                      onClick={() => addToCart(product.id)}
                      className="mt-4 w-full flex items-center justify-center gap-2 py-3 border border-border hover:border-foreground hover:bg-foreground hover:text-background transition-colors text-editorial"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Wishlist;
