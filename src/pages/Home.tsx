import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SectionReveal from "@/components/SectionReveal";
import PageTransition from "@/components/PageTransition";
import { products } from "@/data/products";

const Home = () => {
  const featuredProducts = products.slice(0, 4);
  const trendingProducts = products.slice(4, 8);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const heroParallax = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 0.95]);
  
  const secondParallax = useTransform(scrollY, [0, 400], [0, 100]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <PageTransition>
      <Navbar />
      
      {/* Hero Section with Parallax */}
      <section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated gradient background */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black"
          style={{ y: heroParallax }}
        />
        
        {/* Animated background mesh */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                               linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px"
            }}
          />
        </div>
        
        <motion.div 
          className="relative z-10 text-center px-6"
          style={{ opacity: heroOpacity, scale: heroScale }}
        >
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p
              className="text-editorial text-gray-400 mb-6"
              variants={fadeInUp}
            >
              New Collection 2024
            </motion.p>
            
            <motion.h1
              className="text-display-xl mb-8 text-white"
              variants={fadeInUp}
            >
              Wear The
              <br />
              <motion.span 
                className="italic"
                variants={fadeInUp}
              >
                Future
              </motion.span>
            </motion.h1>
            
            <motion.p
              className="text-body-lg text-gray-400 max-w-md mx-auto mb-10"
              variants={fadeInUp}
            >
              Premium streetwear designed for the next generation of fashion pioneers.
            </motion.p>
            
            <motion.div variants={fadeInUp}>
              <Link to="/shop" className="btn-editorial inline-block group">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Collection
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="text-editorial text-gray-500 uppercase tracking-widest text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll
          </motion.div>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Marquee Section */}
      <section className="py-8 bg-white text-black overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {["PREMIUM QUALITY", "LIMITED EDITION", "WORLDWIDE SHIPPING", "EXCLUSIVE DROPS", "PREMIUM QUALITY", "LIMITED EDITION", "WORLDWIDE SHIPPING", "EXCLUSIVE DROPS"].map((text, i) => (
            <span key={i} className="text-4xl md:text-6xl font-light tracking-tighter mx-8">
              {text}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Featured Drops */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="container mx-auto">
          <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-editorial text-gray-500 mb-3">Latest</p>
              <h2 className="text-display-md text-white">Featured Drops</h2>
            </div>
            <Link to="/shop" className="link-editorial text-editorial flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </SectionReveal>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {featuredProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Editorial Section with Parallax */}
      <section className="py-24 md:py-32 bg-zinc-900 overflow-hidden">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <SectionReveal>
              <div className="aspect-[4/5] bg-zinc-800 overflow-hidden relative">
                <motion.img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80"
                  alt="Editorial"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </SectionReveal>

            <SectionReveal delay={0.2}>
              <p className="text-editorial text-gray-500 mb-6">The Vision</p>
              <h2 className="text-display-md mb-8 text-white">
                Redefining
                <br />
                <span className="italic text-gray-400">Streetwear</span>
              </h2>
              <p className="text-body-lg text-gray-400 mb-10 leading-relaxed">
                Flux represents the evolution of street culture. Each piece is a statement, 
                designed for those who refuse to blend in. Premium materials meet cutting-edge 
                design in every collection.
              </p>
              <Link to="/lookbook" className="btn-editorial inline-block group">
                <span className="flex items-center gap-2">
                  Our Story
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.span>
                </span>
              </Link>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Large Image Section */}
      <section className="relative py-32 md:py-48 overflow-hidden">
        <motion.div
          style={{ y: secondParallax }}
          className="absolute inset-0"
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=80"
            alt="Campaign"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-editorial text-white/80 mb-6">Season 01</p>
            <h2 className="text-display-lg mb-8 text-white">
              Define Your
              <br />
              <span className="italic">Identity</span>
            </h2>
            <p className="text-body-lg text-white/70 max-w-lg mx-auto mb-10">
              Every piece tells a story. What's yours?
            </p>
            <Link to="/lookbook" className="btn-editorial-filled inline-block">
              <span className="flex items-center gap-2">
                View Lookbook
                <ArrowDown className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trending Collection */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="container mx-auto">
          <SectionReveal className="text-center mb-16">
            <p className="text-editorial text-gray-500 mb-3">Trending Now</p>
            <h2 className="text-display-md text-white">Most Wanted</h2>
          </SectionReveal>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {trendingProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
                index={index}
              />
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 md:py-32 bg-zinc-900">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Premium Quality", desc: "Every piece crafted with meticulous attention to detail" },
              { title: "Sustainable", desc: "Ethically sourced materials and responsible production" },
              { title: "Limited Edition", desc: "Exclusive drops that won't last forever" }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-6 border border-white/20 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-light text-white">{i + 1}</span>
                </div>
                <h3 className="text-xl mb-3 text-white">{item.title}</h3>
                <p className="text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-black">
        <div className="container mx-auto max-w-2xl text-center">
          <SectionReveal>
            <p className="text-editorial text-gray-500 mb-6">Stay Updated</p>
            <h2 className="text-display-md mb-8 text-white">Join The Movement</h2>
            <p className="text-gray-400 mb-10">
              Be the first to know about new drops, exclusive releases, and members-only access.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-editorial flex-1 text-center sm:text-left bg-transparent border-b border-white/20 text-white placeholder:text-gray-600"
              />
              <button type="submit" className="btn-editorial-filled">
                <span>Subscribe</span>
              </button>
            </form>
          </SectionReveal>
        </div>
      </section>

      <Footer />
    </PageTransition>
  );
};

export default Home;

