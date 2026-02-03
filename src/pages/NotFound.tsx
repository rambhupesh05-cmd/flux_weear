import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import PageTransition from "@/components/PageTransition";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-background">
        <Link to="/" className="absolute top-6 left-6">
          <motion.span
            className="text-2xl font-light tracking-[0.2em] text-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            FLUX
          </motion.span>
        </Link>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-editorial text-muted-foreground mb-4">Error 404</p>
          <h1 className="text-display-xl mb-6">Page Not Found</h1>
          <p className="text-muted-foreground mb-10 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="btn-editorial inline-block">
            <span>Return Home</span>
          </Link>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
