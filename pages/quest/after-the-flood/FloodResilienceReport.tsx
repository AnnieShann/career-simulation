import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, FileText, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarCalvin from "@/assets/avatar-calvin.png";
import avatarMayor from "@/assets/avatar-mayor.png";

const calvin = { name: "Calvin", role: "City Engineer", avatar: avatarCalvin, color: "#22D3EE" };
const mayor = { name: "Mayor Thompson", role: "Mayor", avatar: avatarMayor, color: "#3B82F6" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

type Phase = "report" | "question";

const reportBullets = [
  "Flood modeling indicates a 40% probability of another 100-year storm event within the next 15 years.",
  "Protecting the school reduces displacement risk for 600 students.",
  "Protecting the waterfront safeguards 120 jobs and 35% of annual municipal tax revenue.",
];

const inferenceOptions = [
  { id: "a", label: "Student displacement", correct: false },
  { id: "b", label: "Loss of tax base", correct: true },
  { id: "c", label: "Storm probability", correct: false },
];

const FloodResilienceReport = () => {
  const navigate = useNavigate();
  const { setReadingScore, readingScore } = useFlood();
  const [phase, setPhase] = useState<Phase>("report");
  const [answer, setAnswer] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-30" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <FileText className="w-5 h-5 text-emerald-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Resilience Report</span>
        <span className="text-xs text-white/30">Reading Moment</span>
      </motion.div>

      {/* Report phase */}
      {phase === "report" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <div className="max-w-3xl w-full space-y-5">
            <motion.div className={`rounded-2xl p-7 ${holoPanel}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="text-base font-bold text-white/70">Resilience Report Summary</span>
              </div>
              <div className="space-y-3">
                {reportBullets.map((bullet, i) => (
                  <motion.div key={i} className="rounded-xl p-4 border border-white/[0.06] bg-white/[0.02]"
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.15 }}>
                    <p className="text-base text-white/60 leading-relaxed">{bullet}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className={`rounded-2xl p-8 ${holoPanel}`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <div className="flex gap-8">
                <img src={calvin.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] shrink-0" />
                <div className="flex-1">
                  <span className="text-base font-bold text-cyan-400">{calvin.name}</span>
                  <p className="text-base text-white/60 leading-relaxed mt-2">Here's the resilience report summary. Study it carefully — the Mayor will have a question.</p>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button onClick={() => setPhase("question")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
                  Mayor's Question <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Reading comprehension question */}
      {phase === "question" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8 mb-5">
              <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] shrink-0" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-lg font-bold text-blue-400">{mayor.name}</span>
                <p className="text-xl text-white/70 leading-relaxed mt-2 italic">Based on that… what's at greatest long-term risk if we do nothing?</p>
              </div>
            </div>
            <div className="space-y-3 mb-5">
              {inferenceOptions.map(opt => (
                <button key={opt.id} onClick={() => {
                  if (!answer) {
                    setAnswer(opt.id);
                    if (opt.correct) setReadingScore(readingScore + 1);
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
                  <img src={mayor.avatar} alt="" className="w-10 h-10 rounded-lg object-cover border border-blue-500/30" />
                  <p className={`text-base ${inferenceOptions.find(o => o.id === answer)?.correct ? "text-emerald-400" : "text-red-400"}`}>
                    {inferenceOptions.find(o => o.id === answer)?.correct
                      ? "Yes. If revenue drops, we can't fund future protections."
                      : "Think again — the report highlights which loss creates a cascading financial crisis."}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => navigate("/quest/after-the-flood/math-moment")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
                    Continue <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FloodResilienceReport;
