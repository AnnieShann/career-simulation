import { motion } from "framer-motion";

const NovaAvatar = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-10 h-10",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const innerSize = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} rounded-full relative flex items-center justify-center`}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9C6BFF] via-[#6C7CFF] to-[#BDE0FE] opacity-40 blur-xl" />
      {/* Main circle */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9C6BFF] via-[#7B8CFF] to-[#BDE0FE] shadow-lg" />
      {/* Inner glow */}
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/20 to-transparent" />
      {/* Core symbol */}
      <div className={`${innerSize[size]} relative z-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center`}>
        <div className="w-1/2 h-1/2 rounded-full bg-white/60" />
      </div>
    </motion.div>
  );
};

export default NovaAvatar;
