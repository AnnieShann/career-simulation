import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, DollarSign, GraduationCap, Building2, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood, FundingChoice } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarMayor from "@/assets/avatar-mayor.png";

const mayor = { name: "Mayor Thompson", role: "Mayor", avatar: avatarMayor, color: "#3B82F6" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

const allocationOptions: { id: FundingChoice; label: string; breakdown: string; icon: typeof GraduationCap; color: string; pros: string; cons: string }[] = [
  { id: "school-waterfront", label: "School + Waterfront", breakdown: "Fully Protect the School ($3M) + Partial Waterfront Reinforcement ($2M)", icon: GraduationCap, color: "#8B5CF6", pros: "Protects children immediately", cons: "Businesses still vulnerable" },
  { id: "waterfront-drainage", label: "Waterfront + Drainage", breakdown: "Fully Protect Waterfront ($4M) + Small Neighborhood Drainage Upgrade ($1M)", icon: Building2, color: "#F59E0B", pros: "Protects jobs and tax base", cons: "School remains high risk" },
  { id: "school-grants", label: "School + Grants", breakdown: "Protect School ($3M) + Emergency Household Flood Grants ($2M)", icon: Home, color: "#EC4899", pros: "Helps families directly", cons: "No major structural solution" },
];

const FloodAllocation = () => {
  const navigate = useNavigate();
  const { setFundingChoice } = useFlood();
  const [selected, setSelected] = useState<FundingChoice>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <DollarSign className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Final Funding Allocation</span>
        <span className="text-xs text-white/30">Budget: $5M</span>
      </motion.div>

      {/* Centered content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 gap-5">
        {/* Mayor intro */}
        <motion.div className={`${holoPanel} rounded-2xl p-8 max-w-4xl w-full flex items-center gap-8`}
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.2)] shrink-0" />
          <div>
            <span className="text-lg font-bold text-blue-400 block mb-1">{mayor.name}</span>
            <p className="text-lg text-white/60">It's time. Where does the $5 million go? There's no wrong answer — only tradeoffs.</p>
          </div>
        </motion.div>

        {/* Options */}
        <div className="flex gap-4 max-w-4xl w-full">
          {allocationOptions.map((opt, i) => (
            <motion.button key={opt.id} onClick={() => { setSelected(opt.id); setFundingChoice(opt.id); }}
              className={`${holoPanel} rounded-2xl p-5 flex-1 text-left transition-all ${selected === opt.id ? "ring-2" : ""}`}
              style={{ borderColor: selected === opt.id ? opt.color + "60" : undefined, boxShadow: selected === opt.id ? `0 0 30px ${opt.color}20` : undefined }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: opt.color + "15" }}>
                  <opt.icon className="w-5 h-5" style={{ color: opt.color }} strokeWidth={1.5} />
                </div>
                <span className="text-base font-bold text-white/80">{opt.label}</span>
              </div>
              <p className="text-sm text-white/40 mb-4 leading-relaxed">{opt.breakdown}</p>
              <p className="text-sm text-emerald-400/70 mb-1">+ {opt.pros}</p>
              <p className="text-sm text-red-400/70">− {opt.cons}</p>
            </motion.button>
          ))}
        </div>

        {selected && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <button onClick={() => navigate("/quest/after-the-flood/combined-reasoning")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow">
              Confirm Allocation <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FloodAllocation;
