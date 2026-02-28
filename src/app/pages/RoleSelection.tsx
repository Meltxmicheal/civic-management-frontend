import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { User, Shield, UserCog, Menu, X, HelpCircle, Mail } from "lucide-react";

export default function RoleSelection() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [typingIndex, setTypingIndex] = useState(0);
  const subtitle = "AI Powered Community-Based District Civic Management System";

  useState(() => {
    const interval = setInterval(() => {
      setTypingIndex((prev) => {
        if (prev < subtitle.length) return prev + 1;
        return prev;
      });
    }, 50);
    return () => clearInterval(interval);
  });

  const roles = [
    {
      id: "authority",
      title: "Authority Login",
      icon: Shield,
      gradient: "from-purple-500 to-indigo-600",
      path: "/authority/login",
      position: "top",
    },
    {
      id: "citizen",
      title: "Citizen Login",
      icon: User,
      gradient: "from-pink-500 to-purple-600",
      path: "/citizen/login",
      position: "bottom-left",
    },
    {
      id: "admin",
      title: "Admin Login",
      icon: UserCog,
      gradient: "from-indigo-500 to-purple-600",
      path: "/admin/login",
      position: "bottom-right",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with hamburger menu */}
      <div className="absolute top-6 left-6 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-3 bg-white/60 backdrop-blur-[20px] rounded-[14px] shadow-lg border border-white/50"
        >
          {menuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
        </motion.button>
      </div>

      {/* Sliding sidebar menu */}
      <motion.div
        initial={{ x: -300 }}
        animate={{ x: menuOpen ? 0 : -300 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 h-full w-72 bg-white/70 backdrop-blur-[20px] shadow-2xl z-40 border-r border-white/50"
      >
        <div className="p-8 pt-24">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-6">
            Menu
          </h3>
          <div className="space-y-4">
            <button className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Help & Support</span>
            </button>
            <button className="flex items-center gap-3 w-full p-3 rounded-[12px] hover:bg-white/60 transition-all duration-300">
              <Mail className="w-5 h-5 text-purple-600" />
              <span className="text-gray-700">Contact Us</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl w-full"
        >
          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
          >
            SMART CIVIC GOVERNANCE
          </motion.h1>

          {/* Typing subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-600 mb-16 h-8"
          >
            {subtitle.substring(0, typingIndex)}
            <span className="animate-pulse">|</span>
          </motion.p>

          {/* Role cards */}
          <div className="relative w-full max-w-4xl mx-auto h-[500px]">
            {roles.map((role, index) => {
              const Icon = role.icon;
              let positionClass = "";
              
              if (role.position === "top") {
                positionClass = "top-0 left-1/2 -translate-x-1/2";
              } else if (role.position === "bottom-left") {
                positionClass = "bottom-0 left-0";
              } else if (role.position === "bottom-right") {
                positionClass = "bottom-0 right-0";
              }

              return (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, scale: 0.8, y: 50 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.15, duration: 0.5 }}
                  className={`absolute ${positionClass} w-80`}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -8 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate(role.path)}
                    className="group w-full bg-white/60 backdrop-blur-[20px] rounded-[20px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 hover:shadow-[0_16px_48px_rgba(0,0,0,0.12)] transition-all duration-300 relative overflow-hidden"
                  >
                    {/* Gradient glow on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-[20px]`} />
                    
                    {/* Icon */}
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-[16px] bg-gradient-to-br ${role.gradient} flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h2 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${role.gradient} bg-clip-text text-transparent`}>
                      {role.title}
                    </h2>

                    {/* Button */}
                    <div className={`px-6 py-3 rounded-[14px] bg-gradient-to-r ${role.gradient} text-white font-semibold shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                      Login / Sign Up
                    </div>

                    {/* Ripple effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 1 }}
                      whileTap={{ scale: 4, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className={`absolute inset-0 bg-gradient-to-br ${role.gradient} rounded-[20px] pointer-events-none`}
                    />
                  </motion.button>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="text-center py-6 text-gray-600"
      >
        © 2026 Smart Civic Governance
      </motion.footer>
    </div>
  );
}
