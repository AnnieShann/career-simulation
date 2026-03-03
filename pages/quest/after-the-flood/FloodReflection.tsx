import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, ArrowRight, Award, Target, TrendingUp, Star, Zap, CloudRain, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import avatarMayor from "@/assets/avatar-mayor.png";

const mayor = { name: "Mayor Thompson", avatar: avatarMayor, color: "#3B82F6" };

const skills = [
  "Proportional Reasoning",
  "Percent Calculation",
  "Cost Comparison",
  "Reading for Inference",
  "Weighing Quantitative vs Human Impact",
  "Ethical Decision-Making",
];

const badges = [
  { title: "🌊 Climate Resilience Planner", desc: "Led Harbor Point through crisis allocation", icon: CloudRain, color: "from-blue-500 to-cyan-500" },
];

const reflectionOptions = [
  "Economic stability",
  "Protecting children",
  "Community fairness",
  "Long-term sustainability",
];

const metrics = [
  { label: "Proportional Reasoning", score: 88, color: "from-blue-500 to-cyan-500" },
  { label: "Reading Comprehension", score: 85, color: "from-purple-500 to-pink-500" },
  { label: "Cost-Benefit Analysis", score: 90, color: "from-amber-400 to-orange-500" },
  { label: "Ethical Reasoning", score: 82, color: "from-emerald-400 to-teal-500" },
];

const FloodReflection = () => {
  const navigate = useNavigate();
  const { fundingChoice, setReflectionAnswer } = useFlood();
  const [phase, setPhase] = useState<"mayor" | "reflection" | "results">("mayor");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="min-h-screen mesh-bg text-foreground overflow-y-auto">
      <div className="relative z-10 max-w-5xl mx-auto px-8 py-10">

        {/* Mayor closing */}
        {phase === "mayor" && (
          <motion.div className="max-w-4xl mx-auto flex items-center gap-8 bento-card p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/30 shadow-lg shrink-0" />
            <div>
              <p className="text-lg font-bold text-blue-500 mb-3">{mayor.name}</p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-2">
                There was no perfect answer.
              </p>
              <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                Resilience planning is choosing where to be brave first.
              </p>
              <button onClick={() => setPhase("reflection")} className="px-6 py-3 btn-premium text-sm font-semibold inline-flex items-center gap-2">
                Reflect <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* Reflection prompt */}
        {phase === "reflection" && (
          <motion.div className="max-w-lg mx-auto" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-center mb-6">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" strokeWidth={1.5} />
              <h2 className="text-xl font-bold mb-2">What mattered most in your decision?</h2>
              <p className="text-xs text-muted-foreground">There's no wrong answer — this is about understanding yourself.</p>
            </div>
            <div className="space-y-2 mb-6">
              {reflectionOptions.map(opt => (
                <button key={opt} onClick={() => { setSelected(opt); setReflectionAnswer(opt); }}
                  className={`w-full text-left rounded-xl p-4 border transition-all ${selected === opt ? "border-primary/50 bg-primary/8" : "border-foreground/10 bg-white/50 hover:bg-white/80"}`}>
                  <span className="text-sm text-foreground/70 font-medium">{opt}</span>
                </button>
              ))}
            </div>
            {selected && (
              <div className="text-center">
                <button onClick={() => setPhase("results")} className="px-6 py-2 btn-premium text-sm font-semibold inline-flex items-center gap-2">
                  See Results <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Results */}
        {phase === "results" && (
          <>
            {/* Success Banner */}
            <motion.div className="text-center mb-10" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
              <motion.div
                className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mx-auto mb-5 shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}>
                <Trophy className="w-10 h-10 text-white" strokeWidth={1.5} />
              </motion.div>
              <h1 className="text-4xl font-bold mb-2 tracking-tight">After the Flood — Complete!</h1>
              <p className="text-sm text-muted-foreground">
                Allocation: <span className="font-bold text-primary capitalize">{fundingChoice?.replace(/-/g, " ") || "—"}</span>
              </p>
            </motion.div>

            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-7">
                {/* XP */}
                <motion.div className="bento-card-gradient p-6 mb-6 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
                  <p className="text-3xl font-bold gradient-text mb-1">+400 XP</p>
                  <p className="text-xs text-muted-foreground">Experience earned from After the Flood</p>
                </motion.div>

                {/* Metrics */}
                <div className="bento-card p-6 mb-6">
                  <div className="flex items-center gap-2 mb-5">
                    <Target className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Performance Metrics</p>
                  </div>
                  <div className="space-y-4">
                    {metrics.map((m, i) => (
                      <motion.div key={m.label} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-foreground/60 font-medium">{m.label}</span>
                          <span className="text-sm font-bold text-foreground/80">{m.score}/100</span>
                        </div>
                        <div className="h-2 rounded-full bg-foreground/5 overflow-hidden">
                          <motion.div className={`h-full rounded-full bg-gradient-to-r ${m.color}`} initial={{ width: "0%" }} animate={{ width: `${m.score}%` }} transition={{ duration: 1, delay: 0.5 + i * 0.15 }} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Feedback */}
                <div className="bento-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Zap className="w-4 h-4 text-amber-500" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">AI Feedback</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {fundingChoice === "school-waterfront"
                      ? "You balanced compassion with pragmatism — protecting the most vulnerable while partially guarding the economic engine. This shows values-driven leadership with awareness of tradeoffs."
                      : fundingChoice === "waterfront-drainage"
                      ? "You prioritized long-term economic stability. Protecting $3.5M in annual revenue was the analytically strongest move, though it came at a human cost. Strong quantitative reasoning."
                      : "You chose the most compassionate path — protecting children and families first. While the waterfront risk remains, your decision reflects deep empathy and ethical reasoning."}
                  </p>
                </div>
              </div>

              <div className="col-span-5 flex flex-col gap-6">
                {/* Skills */}
                <div className="bento-card p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Skills Practiced</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((s, i) => (
                      <motion.span key={s} className="px-3 py-1.5 rounded-full text-xs bg-primary/8 border border-primary/15 text-primary font-medium"
                        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + i * 0.08 }}>
                        + {s}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Badges */}
                <div className="bento-card p-6">
                  <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-4">Badges Earned</p>
                  <div className="space-y-3">
                    {badges.map((b, i) => (
                      <motion.div key={b.title} className="flex items-center gap-3 p-3 rounded-xl bg-white/40 border border-white/50"
                        initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 + i * 0.12 }}>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${b.color} flex items-center justify-center shrink-0`}>
                          <b.icon className="w-5 h-5 text-white" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground/80">{b.title}</p>
                          <p className="text-[11px] text-muted-foreground">{b.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Readiness */}
                <div className="bento-card-gradient p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp className="w-4 h-4 text-primary" strokeWidth={1.5} />
                    <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Readiness Level</p>
                  </div>
                  <div className="flex items-end gap-2 mb-2">
                    <span className="text-3xl font-bold gradient-text">Level 3</span>
                    <span className="text-sm text-muted-foreground mb-1">→ Resilience Specialist</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Climate resilience opportunities unlocked!</p>
                </div>
              </div>
            </div>

            <motion.div className="mt-8 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
              <button onClick={() => navigate("/quest/simulation-select")} className="px-10 py-4 btn-premium font-semibold text-sm inline-flex items-center gap-2">
                Back to Simulations <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default FloodReflection;
