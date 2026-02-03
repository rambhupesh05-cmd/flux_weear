import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";
import { products } from "@/data/products";
import { toast } from "sonner";

interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

const Cart = () => {
  // Demo cart items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { productId: "1", size: "M", quantity: 1 },
    { productId: "3", size: "L", quantity: 2 },
  ]);

  const getProduct = (id: string) => products.find(p => p.id === id);

  const updateQuantity = (index: number, delta: number) => {
    setCartItems(items => {
      const newItems = [...items];
      newItems[index].quantity = Math.max(1, newItems[index].quantity + delta);
      return newItems;
    });
  };

  const removeItem = (index: number) => {
    setCartItems(items => items.filter((_, i) => i !== index));
    toast.success("Item removed from cart");
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const product = getProduct(item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="container mx-auto max-w-4xl">
          <SectionReveal className="mb-12">
            <p className="text-editorial text-muted-foreground mb-3">Your</p>
            <h1 className="text-display-lg">Cart</h1>
          </SectionReveal>

          {cartItems.length === 0 ? (
            <motion.div
              className="text-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-muted-foreground mb-8">Your cart is empty</p>
              <Link to="/shop" className="btn-editorial inline-block">
                <span>Continue Shopping</span>
              </Link>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item, index) => {
                    const product = getProduct(item.productId);
                    if (!product) return null;

                    return (
                      <motion.div
                        key={`${item.productId}-${item.size}`}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.4 }}
                        className="flex gap-6 py-6 border-b border-border"
                      >
                        {/* Image */}
                        <Link to={`/product/${product.id}`} className="w-24 h-32 bg-secondary shrink-0 overflow-hidden">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </Link>

                        {/* Info */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <Link to={`/product/${product.id}`}>
                              <h3 className="font-medium mb-1 hover:text-muted-foreground transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          </div>

                          <div className="flex items-center justify-between">
                            {/* Quantity */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(index, -1)}
                                className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="w-8 text-center text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(index, 1)}
                                className="w-8 h-8 border border-border flex items-center justify-center hover:border-foreground transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Price */}
                            <p className="text-sm">
                              ${(product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Remove */}
                        <button
                          onClick={() => removeItem(index)}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Order summary */}
              <motion.div
                className="bg-secondary p-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-editorial mb-8">Order Summary</h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Free shipping on orders over $200
                    </p>
                  )}
                </div>

                <div className="flex justify-between py-4 border-t border-border mb-8">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${total.toFixed(2)}</span>
                </div>

                <Link to="/checkout" className="btn-editorial-filled w-full flex items-center justify-center gap-2">
                  <span>Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Cart;
