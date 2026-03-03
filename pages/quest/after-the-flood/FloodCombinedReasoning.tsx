import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Brain, DollarSign, GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarCalvin from "@/assets/avatar-calvin.png";
import avatarMayor from "@/assets/avatar-mayor.png";

const calvin = { name: "Calvin", role: "City Engineer", avatar: avatarCalvin, color: "#22D3EE" };
const mayor = { name: "Mayor Thompson", role: "Mayor", avatar: avatarMayor, color: "#3B82F6" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

type Phase = "projection" | "question" | "result";

const options = [
  { id: "a", label: "School relocation ($1.2M one-time)", correct: false },
  { id: "b", label: "Waterfront revenue loss ($3.5M annually)", correct: true },
  { id: "c", label: "Storm probability increase", correct: false },
];

const FloodCombinedReasoning = () => {
  const navigate = useNavigate();
  const { setMathScore, mathScore } = useFlood();
  const [phase, setPhase] = useState<Phase>("projection");
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Brain className="w-5 h-5 text-purple-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Combined Reasoning</span>
        <span className="text-xs text-white/30">Math + Reading</span>
      </motion.div>

      {/* Centered content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 gap-5">
        {/* Projection data panels */}
        <motion.div className="flex gap-4 max-w-3xl w-full"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <div className={`${holoPanel} rounded-2xl p-5 flex-1`}>
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-5 h-5 text-amber-400" />
              <span className="text-sm text-white/50 font-bold">Waterfront Projection</span>
            </div>
            <p className="text-3xl font-bold text-amber-400 mb-1">$3.5M</p>
            <p className="text-sm text-white/35">Annual revenue lost if unprotected</p>
            <p className="text-xs text-white/25 mt-1">Over 5 years: $17.5M in lost revenue</p>
          </div>
          <div className={`${holoPanel} rounded-2xl p-5 flex-1`}>
            <div className="flex items-center gap-2 mb-2">
              <GraduationCap className="w-5 h-5 text-purple-400" />
              <span className="text-sm text-white/50 font-bold">School Projection</span>
            </div>
            <p className="text-3xl font-bold text-purple-400 mb-1">$1.2M</p>
            <p className="text-sm text-white/35">One-time relocation cost</p>
            <p className="text-xs text-white/25 mt-1">600 students impacted, plus social costs</p>
          </div>
        </motion.div>

        {/* Projection dialogue */}
        {phase === "projection" && (
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8">
              <img src={calvin.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] shrink-0" />
              <div className="flex-1">
                <span className="text-base font-bold text-cyan-400">{calvin.name}</span>
                <p className="text-base text-white/60 leading-relaxed mt-2">If another storm hits and the waterfront is unprotected, estimated revenue loss = $3.5M annually. If the school floods again, relocation cost = $1.2M and temporary learning loss impacts 600 students.</p>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => setPhase("question")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-2">
                Mayor's Final Question <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Final question */}
        {(phase === "question" || phase === "result") && (
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8 mb-5">
              <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] shrink-0" />
              <div>
                <span className="text-base font-bold text-blue-400">{mayor.name}</span>
                <p className="text-lg text-white/70 leading-relaxed mt-2">Given these projections, which outcome has the greatest long-term financial impact?</p>
              </div>
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
                <p className={`text-base mb-4 ${options.find(o => o.id === answer)?.correct ? "text-emerald-400" : "text-red-400"}`}>
                  {options.find(o => o.id === answer)?.correct
                    ? "Correct. $3.5M annually far exceeds the one-time $1.2M school relocation. Over just 2 years, unprotected waterfront losses would exceed $7M. This is why long-term thinking matters."
                    : "Not quite. The waterfront loss is $3.5M per year — recurring. The school relocation is $1.2M one-time. Annual losses compound and far exceed one-time costs."}
                </p>
                <div className="flex justify-end">
                  <button onClick={() => navigate("/quest/after-the-flood/consequence")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-2">
                    See Consequences <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FloodCombinedReasoning;
