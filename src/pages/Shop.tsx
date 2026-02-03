import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";
import { products, categories } from "@/data/products";

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category.toLowerCase() === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    return 0;
  });

  const sortOptions = [
    { name: "Newest", value: "newest" },
    { name: "Price: Low to High", value: "price-low" },
    { name: "Price: High to Low", value: "price-high" },
  ];

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="container mx-auto">
          {/* Header */}
          <SectionReveal className="mb-16">
            <p className="text-editorial text-muted-foreground mb-3">Collection</p>
            <h1 className="text-display-lg">Shop All</h1>
          </SectionReveal>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12 border-b border-border pb-6">
            {/* Category filter */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center gap-2 text-editorial"
              >
                Category: {categories.find(c => c.value === selectedCategory)?.name}
                <motion.div
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    className="absolute top-full left-0 mt-2 bg-card border border-border min-w-[200px] z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {categories.map((category) => (
                      <button
                        key={category.value}
                        onClick={() => {
                          setSelectedCategory(category.value);
                          setIsCategoryOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-secondary transition-colors ${
                          selectedCategory === category.value ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sort filter */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-editorial"
              >
                Sort: {sortOptions.find(s => s.value === sortBy)?.name}
                <motion.div
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    className="absolute top-full right-0 mt-2 bg-card border border-border min-w-[200px] z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`block w-full text-left px-4 py-3 text-sm hover:bg-secondary transition-colors ${
                          sortBy === option.value ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Products count */}
          <p className="text-muted-foreground text-sm mb-8">
            {sortedProducts.length} product{sortedProducts.length !== 1 ? "s" : ""}
          </p>

          {/* Product grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8"
            layout
          >
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <ProductCard
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    image={product.image}
                    category={product.category}
                    index={index}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Shop;
