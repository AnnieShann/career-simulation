import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Map, DollarSign, AlertTriangle, Calculator } from "lucide-react";
import avatarMayor from "@/assets/avatar-mayor.png";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarCalvin from "@/assets/avatar-calvin.png";

const calvin = { name: "Calvin", role: "City Engineer", avatar: avatarCalvin, color: "#22D3EE" };

const zones = [
  { id: "waterfront", name: "Waterfront Business District", risk: "High", cost: "$4M", color: "#EF4444", desc: "Critical economic zone — restaurants, shops, marina. Generates 35% of annual tax revenue." },
  { id: "residential", name: "Residential Neighborhood", risk: "Medium-High", cost: "$6M", color: "#F59E0B", desc: "300 homes damaged. Aging drainage infrastructure. Families at risk of displacement." },
  { id: "school", name: "Elementary School Area", risk: "High", cost: "$3M", color: "#8B5CF6", desc: "600 students affected. Gym collapsed. Classes held in temporary church space." },
];

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

type Phase = "map" | "costs" | "math1" | "math1-result";

const mayor = { name: "Mayor Thompson", role: "Mayor", avatar: avatarMayor, color: "#3B82F6" };

const math1Options = [
  { id: "a", label: "We'd be $2 million short.", correct: true },
  { id: "b", label: "We'd have enough.", correct: false },
  { id: "c", label: "We'd be $1 million short.", correct: false },
];

const FloodRiskMap = () => {
  const navigate = useNavigate();
  const { setMathScore, mathScore } = useFlood();
  const [phase, setPhase] = useState<Phase>("map");
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [mathAnswer, setMathAnswer] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Map className="w-5 h-5 text-cyan-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Flood Risk Map & Costs</span>
        <span className="text-xs text-white/30">Engineer Assessment</span>
      </motion.div>

      {/* Map Phase - Zone cards + dialogue centered */}
      {phase === "map" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-8 gap-5">
          <div className="flex gap-4 max-w-4xl w-full">
            {zones.map((zone, i) => (
              <motion.button key={zone.id} onClick={() => setSelectedZone(zone.id)}
                className={`${holoPanel} rounded-2xl p-5 flex-1 text-left transition-all ${selectedZone === zone.id ? "ring-2" : ""}`}
                style={{ borderColor: selectedZone === zone.id ? zone.color + "60" : undefined, boxShadow: selectedZone === zone.id ? `0 0 30px ${zone.color}20` : undefined }}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: zone.color, boxShadow: `0 0 8px ${zone.color}` }} />
                  <span className="text-sm font-bold text-white/80">{zone.name}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: zone.color + "20", color: zone.color }}>Risk: {zone.risk}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-white/[0.06] text-white/50">Protection: {zone.cost}</span>
                </div>
                <p className="text-sm text-white/40 leading-relaxed">{zone.desc}</p>
              </motion.button>
            ))}
          </div>

          {/* Budget + Calvin dialogue */}
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel} flex gap-8`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={calvin.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] shrink-0" />
            <div className="flex-1">
              <span className="text-base font-bold text-cyan-400">{calvin.name}</span>
              <span className="text-sm text-white/30 ml-2">{calvin.role}</span>
              <p className="text-base text-white/60 leading-relaxed mt-2">To fully elevate or protect each zone — explore them, then let's talk numbers.</p>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="text-lg font-bold text-emerald-400">$5M</span>
                  <span className="text-xs text-white/30">Budget</span>
                </div>
                <span className="text-xs text-white/30">Total needed: $13M</span>
              </div>
            </div>
            <button onClick={() => setPhase("costs")} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-2 shrink-0">
              See Cost Breakdown <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Costs Phase */}
      {phase === "costs" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8 mb-5">
              <img src={calvin.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.2)] shrink-0" />
              <div>
                <span className="text-base font-bold text-cyan-400">{calvin.name}</span>
                <p className="text-base text-white/60 leading-relaxed mt-2">Waterfront barrier: $4 million. Neighborhood drainage overhaul: $6 million. School floodwall: $3 million.</p>
                <p className="text-base text-white/40 leading-relaxed mt-2 italic">You only have $5 million.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {zones.map(z => (
                <div key={z.id} className="rounded-xl p-4 border border-white/[0.06] bg-white/[0.02]">
                  <div className="w-3 h-3 rounded-full mb-2" style={{ background: z.color }} />
                  <p className="text-sm font-bold text-white/60">{z.name.split(" ")[0]}</p>
                  <p className="text-2xl font-bold" style={{ color: z.color }}>{z.cost}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <button onClick={() => setPhase("math1")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-2">
                <Calculator className="w-4 h-4" /> Math Moment <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Math Moment #1 */}
      {phase === "math1" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8 mb-5">
              <img src={mayor.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.2)] shrink-0" />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-lg font-bold text-blue-400">{mayor.name}</span>
                <p className="text-xl text-white/70 leading-relaxed mt-2">If we protected the school and the waterfront, how much funding would we still need?</p>
              </div>
            </div>
            <div className="space-y-3 mb-5">
              {math1Options.map(opt => (
                <button key={opt.id} onClick={() => {
                  if (!mathAnswer) {
                    setMathAnswer(opt.id);
                    if (opt.correct) setMathScore(mathScore + 1);
                  }
                }}
                  className={`w-full text-left rounded-xl p-5 border transition-all ${mathAnswer === opt.id
                    ? opt.correct ? "border-emerald-500/50 bg-emerald-500/10" : "border-red-500/50 bg-red-500/10"
                    : mathAnswer ? "opacity-50 border-white/[0.04]" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                  <span className="text-base font-bold text-white/70">{opt.label}</span>
                </button>
              ))}
            </div>
            {mathAnswer && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-start gap-3 mb-4">
                  <img src={calvin.avatar} alt="" className="w-10 h-10 rounded-lg object-cover border border-cyan-500/30" />
                  <p className={`text-base ${math1Options.find(o => o.id === mathAnswer)?.correct ? "text-emerald-400" : "text-red-400"}`}>
                    {math1Options.find(o => o.id === mathAnswer)?.correct
                      ? "Right. We'd still need outside funding."
                      : "Check that again — the combined cost exceeds the grant."}
                  </p>
                </div>
                <div className="flex justify-end">
                  <button onClick={() => navigate("/quest/after-the-flood/community-meeting")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-semibold flex items-center gap-2">
                    Community Meeting <ArrowRight className="w-4 h-4" />
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

export default FloodRiskMap;
