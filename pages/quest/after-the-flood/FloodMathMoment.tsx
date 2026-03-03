import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calculator } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarCalvin from "@/assets/avatar-calvin.png";

const calvin = { name: "Calvin", role: "City Engineer", avatar: avatarCalvin, color: "#22D3EE" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

const options = [
  { id: "a", label: "$3.5 million", correct: true },
  { id: "b", label: "$350,000", correct: false },
  { id: "c", label: "$5 million", correct: false },
];

const FloodMathMoment = () => {
  const navigate = useNavigate();
  const { setMathScore, mathScore } = useFlood();
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Calculator className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Math Moment #2</span>
        <span className="text-xs text-white/30">Comparative Reasoning</span>
      </motion.div>

      {/* Main content - centered */}
      <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
        <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex gap-8 mb-5">
            <img src={calvin.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] shrink-0" />
            <div className="flex-1 flex flex-col justify-center">
              <span className="text-lg font-bold text-cyan-400">{calvin.name}</span>
              <p className="text-lg text-white/70 leading-relaxed mt-2">If the waterfront generates 35% of our tax revenue, and annual city revenue is $10 million…</p>
              <p className="text-lg text-white/70 leading-relaxed mt-1">How much revenue does that district represent?</p>
            </div>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <div className="rounded-lg px-3 py-2 bg-white/[0.02] border border-white/[0.05] flex items-center gap-2">
              <span className="text-xs text-white/40">Annual Revenue:</span>
              <span className="text-sm font-bold text-emerald-400">$10M</span>
            </div>
            <div className="rounded-lg px-3 py-2 bg-white/[0.02] border border-white/[0.05] flex items-center gap-2">
              <span className="text-xs text-white/40">Waterfront Share:</span>
              <span className="text-sm font-bold text-cyan-400">35%</span>
            </div>
            <span className="text-sm text-white/40">35% × $10,000,000 = ?</span>
          </div>
          <div className="space-y-3 mb-5">
            {options.map(opt => (
              <button key={opt.id} onClick={() => {
                if (!answer) {
                  setAnswer(opt.id);
                  if (opt.correct) setMathScore(mathScore + 1);
                }
              }}
                className={`w-full text-left rounded-xl p-5 border transition-all ${answer === opt.id
                  ? opt.correct ? "border-emerald-500/50 bg-emerald-500/10" : "border-red-500/50 bg-red-500/10"
                  : answer ? "opacity-50 border-white/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                <span className="text-base font-bold text-white/70">{opt.label}</span>
              </button>
            ))}
          </div>
          {answer && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex items-start gap-3 mb-4">
                <img src={calvin.avatar} alt="" className="w-10 h-10 rounded-lg object-cover border border-cyan-500/30" />
                <p className={`text-base ${options.find(o => o.id === answer)?.correct ? "text-emerald-400" : "text-red-400"}`}>
                  {options.find(o => o.id === answer)?.correct
                    ? "That's not small. Losing that would ripple outward."
                    : "Check that again — 35% of $10 million is $3.5 million."}
                </p>
              </div>
              <div className="flex justify-end">
                <button onClick={() => navigate("/quest/after-the-flood/allocation")}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold flex items-center gap-2">
                  Funding Decision <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default FloodMathMoment;
