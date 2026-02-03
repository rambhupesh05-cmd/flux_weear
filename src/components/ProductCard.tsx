import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  index?: number;
}

const ProductCard = ({ id, name, price, image, category, index = 0 }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1] 
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${id}`} className="block">
        <div className="product-card aspect-[3/4] bg-secondary overflow-hidden">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.05 : 1,
              filter: isHovered ? "brightness(0.85)" : "brightness(1)",
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          
          {/* Quick add overlay */}
          <motion.div
            className="absolute inset-0 flex items-end justify-center pb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            <button className="btn-editorial-filled text-xs px-6 py-3">
              <span>Quick Add</span>
            </button>
          </motion.div>
        </div>
      </Link>

      {/* Wishlist button */}
      <motion.button
        className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm"
        onClick={(e) => {
          e.preventDefault();
          setIsWishlisted(!isWishlisted);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Heart
          className={`w-4 h-4 transition-colors ${
            isWishlisted ? "fill-foreground text-foreground" : "text-foreground"
          }`}
        />
      </motion.button>

      {/* Product info */}
      <div className="mt-4 space-y-1">
        <p className="text-editorial text-muted-foreground">{category}</p>
        <h3 className="text-sm font-medium">{name}</h3>
        <p className="text-sm text-muted-foreground">${price.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
