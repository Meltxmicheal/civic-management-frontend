import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Lock, ArrowLeft, Shield } from "lucide-react";
import { GlassCard } from "../../components/GlassCard";
import { GradientButton } from "../../components/GradientButton";

export default function AuthorityLogin() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/authority/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <button
          onClick={() => navigate("/role-selection")}
          className="flex items-center gap-2 text-gray-600 hover:text-purple-600 mb-6 transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Role Selection</span>
        </button>

        <GlassCard className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-[16px] bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-indigo-600 bg-clip-text text-transparent mb-2">
              Authority Login
            </h1>
            <p className="text-gray-600">Access Central Control Panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="w-full pl-12 pr-4 py-3 bg-white/50 border border-gray-200 rounded-[14px] focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
              />
            </div>

            <GradientButton type="submit" className="w-full">
              Login
            </GradientButton>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-[14px] text-center">
            <p className="text-blue-700 text-sm">
              🔒 No signup option available. Contact system administrator for credentials.
            </p>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
