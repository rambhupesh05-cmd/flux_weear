import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Login successful");
    }, 1500);
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left - Form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <Link to="/" className="mb-16">
            <motion.span
              className="text-2xl font-light tracking-[0.2em]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              FLUX
            </motion.span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-editorial text-muted-foreground mb-3">Welcome Back</p>
            <h1 className="text-display-md mb-8">Login</h1>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label className="text-editorial block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-editorial"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="text-editorial block mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-editorial"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-editorial-filled w-full mt-8"
            >
              <span>{isLoading ? "Signing In..." : "Sign In"}</span>
            </button>
          </motion.form>

          <motion.p
            className="mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Don't have an account?{" "}
            <Link to="/register" className="text-foreground hover:text-muted-foreground transition-colors">
              Create Account
            </Link>
          </motion.p>
        </div>

        {/* Right - Image */}
        <motion.div
          className="hidden lg:block flex-1 bg-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Login;
