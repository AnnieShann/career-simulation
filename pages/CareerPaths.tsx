import { motion } from "framer-motion";
import { Palette, TrendingUp, Users, Database, ArrowRight } from "lucide-react";

const careers = [
  { icon: Palette, title: "UX Design", match: 92, desc: "Craft beautiful, user-centered digital experiences" },
  { icon: TrendingUp, title: "Marketing Strategy", match: 87, desc: "Drive growth through creative campaigns and data" },
  { icon: Users, title: "Community Leadership", match: 84, desc: "Build and nurture thriving communities" },
  { icon: Database, title: "Data & Systems", match: 78, desc: "Organize information to power smart decisions" },
];

const CareerPaths = () => {
  return (
    <div className="mobile-container luxury-bg noise-texture flex flex-col px-6 py-8 pb-24">
      <motion.h1
        className="text-2xl font-medium text-foreground mb-1 tracking-tight relative z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Recommended Paths
      </motion.h1>
      <motion.p
        className="text-sm text-[hsl(var(--body))] mb-6 relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        Career paths matched to your unique strengths
      </motion.p>

      <div className="grid grid-cols-2 gap-3 relative z-10">
        {careers.map((c, i) => (
          <motion.div
            key={c.title}
            className="glass-card rounded-3xl p-5 flex flex-col gap-3 relative overflow-hidden cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            whileHover={{ y: -2, boxShadow: "0 20px 50px hsla(231, 100%, 71%, 0.2)" }}
          >
            <span className="absolute top-3 right-3 text-[10px] font-medium px-2 py-0.5 rounded-full glass text-[hsl(var(--icon))]">
              {c.match}%
            </span>

            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#6C8CFF]/20 to-[#9C6BFF]/20 flex items-center justify-center">
              <c.icon className="w-5 h-5 text-[hsl(var(--icon))]" strokeWidth={1.5} />
            </div>

            <h3 className="font-medium text-foreground/90 text-sm">{c.title}</h3>
            <p className="text-xs text-[hsl(var(--body))] leading-relaxed">{c.desc}</p>

            <button className="mt-auto text-xs font-medium text-[hsl(var(--icon))] hover:text-foreground/80 text-left transition-colors flex items-center gap-1">
              Explore <ArrowRight className="w-3 h-3" strokeWidth={1.5} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerPaths;
