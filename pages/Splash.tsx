import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroVideo from "@/assets/hero-video.mp4";

const Splash = () => {
  const navigate = useNavigate();
  const [starting, setStarting] = useState(false);

  const handleStart = () => {
    setStarting(true);
    setTimeout(() => navigate("/"), 600);
  };

  return (
    <div className="mobile-container luxury-bg noise-texture relative overflow-hidden flex flex-col items-center justify-center px-6">
      <motion.div
        className="flex flex-col items-center gap-8 relative z-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: starting ? 0 : 1, y: starting ? -20 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Hero video */}
        <div className="w-full rounded-3xl overflow-hidden shadow-lg">
          <video
            src={heroVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full block"
          />
        </div>

        {/* Text overlay */}
        <div className="text-center">
          <h1 className="text-4xl font-semibold text-foreground tracking-tight mb-2">
            FutureQuest
          </h1>
          <p className="text-[hsl(var(--body))] text-sm font-light tracking-wide">
            Discover Your Direction
          </p>
        </div>

        {/* CTA */}
        <motion.button
          onClick={handleStart}
          className="w-full max-w-[280px] py-4 bg-foreground text-background rounded-full text-base font-medium tracking-wide"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Start My Journey
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Splash;
