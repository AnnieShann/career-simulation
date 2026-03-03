import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CloudRain, Home, DollarSign, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarMayor from "@/assets/avatar-mayor.png";

const mayor = { name: "Mayor Thompson", role: "Mayor of Harbor Point", avatar: avatarMayor, color: "#3B82F6" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

const briefingLines = [
  { text: "Thank you for coming.", icon: CloudRain },
  { text: "I've lived here 40 years. I've never seen water like that.", icon: Home },
  { text: "We received a $5 million state climate resilience grant.", icon: DollarSign },
  { text: "But engineering estimates say full coastal protection would cost $12 million.", icon: AlertTriangle },
  { text: "We can't protect everything. You'll help us decide where we begin." },
];

const FloodOpening = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const advance = () => {
    if (step < briefingLines.length - 1) {
      setStep(step + 1);
    } else {
      navigate("/quest/after-the-flood/walking-town");
    }
  };

  const current = briefingLines[step];

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)" }} />

      {/* Title */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <CloudRain className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">After the Flood</span>
        <span className="text-xs text-white/30">Climate Resilience Simulation</span>
      </motion.div>

      {/* News clipping headline */}
      <motion.div className={`absolute top-20 left-4 z-20 ${holoPanel} rounded-xl px-4 py-3 max-w-[280px]`}
        initial={{ opacity: 0, rotate: -2 }} animate={{ opacity: 1, rotate: -1 }} transition={{ delay: 0.3 }}>
        <p className="text-[11px] text-white/20 uppercase tracking-widest mb-1">Harbor Point Gazette</p>
        <p className="text-sm font-bold text-red-400/80 leading-snug">Storm Leaves 300 Homes Damaged in Harbor Point</p>
      </motion.div>

      {/* Key numbers overlay */}
      <motion.div className="absolute top-20 right-4 z-20 flex flex-col gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        {[
          { label: "Homes Damaged", value: "300", color: "text-red-400" },
          { label: "Grant Available", value: "$5M", color: "text-emerald-400" },
          { label: "Full Protection", value: "$12M", color: "text-amber-400" },
          { label: "Budget Gap", value: "$7M", color: "text-red-400" },
        ].map((stat, i) => (
          <motion.div key={stat.label} className={`${holoPanel} rounded-xl px-4 py-2.5 w-[170px]`}
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.1 }}>
            <p className="text-[11px] text-white/30 uppercase tracking-widest">{stat.label}</p>
            <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Dialogue - centered */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pl-[310px] pr-[200px] pt-24">
        <AnimatePresence mode="wait">
          <motion.div key={step}
            className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel} flex gap-8`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/40 shadow-[0_0_40px_rgba(59,130,246,0.2)] shrink-0" />
            <div className="flex-1 flex flex-col justify-between py-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-blue-400">{mayor.name}</span>
                <span className="text-sm text-white/30">{mayor.role}</span>
              </div>
              <p className="text-xl text-white/70 leading-relaxed mb-3">{current.text}</p>
              {/* Progress dots */}
              <div className="flex gap-1.5 mb-4">
                {briefingLines.map((_, i) => (
                  <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i <= step ? "bg-blue-400" : "bg-white/15"}`} />
                ))}
              </div>
              <div className="flex justify-end">
                <button onClick={advance} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow">
                  {step < briefingLines.length - 1 ? "Continue" : "Walk the Town"} <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloodOpening;
