import { motion } from "motion/react";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  delay?: number;
}

export function GlassCard({ children, className = "", hover = false, delay = 0 }: GlassCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={hover ? { scale: 1.02, y: -4 } : {}}
      className={`bg-white/60 backdrop-blur-[20px] rounded-[18px] shadow-[0_8px_32px_rgba(0,0,0,0.08)] border border-white/50 transition-all duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}
