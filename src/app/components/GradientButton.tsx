import { motion } from "motion/react";
import { ReactNode } from "react";

interface GradientButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}

export function GradientButton({ 
  children, 
  onClick, 
  type = "button", 
  disabled = false, 
  className = "" 
}: GradientButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`relative px-6 py-3 rounded-[14px] bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden ${className}`}
    >
      <motion.div
        initial={{ scale: 0, opacity: 1 }}
        whileTap={{ scale: disabled ? 0 : 4, opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 bg-white/30 rounded-[14px] pointer-events-none"
      />
      {children}
    </motion.button>
  );
}
