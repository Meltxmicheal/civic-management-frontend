import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function CitizenLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    // Simulate login
    navigate("/citizen/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/role-selection")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Role Selection</span>
        </button>

        <GlassCard className="p-8">
          <motion.div
            animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-2">
                Citizen Login
              </h1>
              <p className="text-gray-600">Welcome back to Smart Civic Governance</p>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 rounded-[12px] text-red-600 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email input */}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  ) : (
                    <Eye className="w-5 h-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {/* Navigate to forgot password */}}
                  className="text-sm text-purple-600 hover:text-purple-700 transition-colors duration-300"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Login button */}
              <GradientButton type="submit" className="w-full">
                Login
              </GradientButton>
            </form>

            {/* Signup link */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/citizen/signup")}
                className="text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-300"
              >
                Sign Up
              </button>
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
