import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    stylePreference: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast.success("Account created successfully");
    }, 1500);
  };

  const genderOptions = [
    { value: "", label: "Select Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "non-binary", label: "Non-Binary" },
    { value: "prefer-not", label: "Prefer Not to Say" },
  ];

  const styleOptions = [
    { value: "", label: "Select Style" },
    { value: "minimalist", label: "Minimalist" },
    { value: "streetwear", label: "Streetwear" },
    { value: "techwear", label: "Techwear" },
    { value: "avant-garde", label: "Avant-Garde" },
    { value: "classic", label: "Classic" },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen flex">
        {/* Left - Image */}
        <motion.div
          className="hidden lg:block flex-1 bg-secondary"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=80"
            alt="Fashion"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Right - Form */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
          <Link to="/" className="mb-12">
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
            <p className="text-editorial text-muted-foreground mb-3">Join The Movement</p>
            <h1 className="text-display-md mb-8">Create Account</h1>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-5 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div>
              <label className="text-editorial block mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="input-editorial"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label className="text-editorial block mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-editorial"
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-editorial block mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input-editorial"
                  placeholder="••••••••"
                  required
                />
              </div>
              <div>
                <label className="text-editorial block mb-2">Confirm</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input-editorial"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-editorial block mb-2">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="input-editorial"
                  placeholder="25"
                  min="13"
                  max="120"
                  required
                />
              </div>
              <div>
                <label className="text-editorial block mb-2">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="input-editorial bg-transparent cursor-pointer"
                  required
                >
                  {genderOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-background">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-editorial block mb-2">Style Preference</label>
              <select
                name="stylePreference"
                value={formData.stylePreference}
                onChange={handleChange}
                className="input-editorial bg-transparent cursor-pointer"
                required
              >
                {styleOptions.map(option => (
                  <option key={option.value} value={option.value} className="bg-background">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-editorial-filled w-full mt-8"
            >
              <span>{isLoading ? "Creating Account..." : "Create Account"}</span>
            </button>
          </motion.form>

          <motion.p
            className="mt-8 text-sm text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Already have an account?{" "}
            <Link to="/login" className="text-foreground hover:text-muted-foreground transition-colors">
              Sign In
            </Link>
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
};

export default Register;
