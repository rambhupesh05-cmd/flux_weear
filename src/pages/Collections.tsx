import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const Collections = () => {
  const collections = [
    {
      id: "void",
      name: "Void Collection",
      description: "Minimalist pieces for the modern wardrobe",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
      products: products.filter(p => p.category === "Hoodies"),
    },
    {
      id: "eclipse",
      name: "Eclipse Collection",
      description: "Technical outerwear for urban exploration",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80",
      products: products.filter(p => p.category === "Jackets"),
    },
    {
      id: "static",
      name: "Static Collection",
      description: "Essential tees with graphic statements",
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80",
      products: products.filter(p => p.category === "Tees"),
    },
  ];

  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="container mx-auto">
          {/* Header */}
          <SectionReveal className="mb-20">
            <p className="text-editorial text-muted-foreground mb-3">Explore</p>
            <h1 className="text-display-lg">Collections</h1>
          </SectionReveal>

          {/* Collections */}
          <div className="space-y-32">
            {collections.map((collection, index) => (
              <section key={collection.id}>
                <SectionReveal className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center mb-12">
                  <div className={index % 2 === 1 ? "md:order-2" : ""}>
                    <motion.div
                      className="aspect-[4/5] bg-secondary overflow-hidden"
                      whileHover={{ scale: 0.98 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.img
                        src={collection.image}
                        alt={collection.name}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.8 }}
                      />
                    </motion.div>
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <p className="text-editorial text-muted-foreground mb-4">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h2 className="text-display-md mb-6">{collection.name}</h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {collection.description}
                    </p>
                    <Link to={`/shop?collection=${collection.id}`} className="btn-editorial inline-block">
                      <span>Shop Collection</span>
                    </Link>
                  </div>
                </SectionReveal>

                {/* Collection products preview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
                  {collection.products.slice(0, 4).map((product, productIndex) => (
                    <ProductCard
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      category={product.category}
                      index={productIndex}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Collections;
