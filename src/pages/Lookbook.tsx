import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import SectionReveal from "@/components/SectionReveal";

const lookbookImages = [
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80",
    alt: "Editorial shot 1",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=80",
    alt: "Editorial shot 2",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80",
    alt: "Editorial shot 3",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    alt: "Editorial shot 4",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
    alt: "Editorial shot 5",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80",
    alt: "Editorial shot 6",
    span: "col-span-2 row-span-1",
  },
];

const Lookbook = () => {
  return (
    <PageTransition>
      <Navbar />
      
      <main className="pt-32 pb-24 px-6 md:px-12 min-h-screen">
        <div className="container mx-auto">
          {/* Header */}
          <SectionReveal className="text-center mb-16">
            <p className="text-editorial text-muted-foreground mb-3">Season 01</p>
            <h1 className="text-display-lg mb-6">Lookbook</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              A visual exploration of our latest collection. Shot in Tokyo, 
              styled for the future generation.
            </p>
          </SectionReveal>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {lookbookImages.map((image, index) => (
              <motion.div
                key={index}
                className={`relative overflow-hidden ${image.span} aspect-[3/4] md:aspect-auto`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <motion.img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.8 }}
                />
                <div className="absolute inset-0 bg-background/0 hover:bg-background/10 transition-colors duration-500" />
              </motion.div>
            ))}
          </div>

          {/* Credits */}
          <SectionReveal className="mt-24 text-center">
            <div className="max-w-2xl mx-auto">
              <p className="text-editorial text-muted-foreground mb-8">Credits</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
                <div>
                  <p className="text-muted-foreground mb-1">Photography</p>
                  <p>Studio Flux</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Styling</p>
                  <p>Yuki Tanaka</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Location</p>
                  <p>Tokyo, Japan</p>
                </div>
                <div>
                  <p className="text-muted-foreground mb-1">Season</p>
                  <p>AW 2024</p>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </main>

      <Footer />
    </PageTransition>
  );
};

export default Lookbook;
