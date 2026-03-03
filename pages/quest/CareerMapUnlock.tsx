import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Shield, Zap, Globe, ArrowRight, X, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const nodes = [
  { id: "cyber", label: "Cybersecurity Simulation", x: 35, y: 40, active: true, icon: Shield },
  { id: "data", label: "Data Science Lab", x: 65, y: 25, active: false, icon: Zap },
  { id: "design", label: "UX Design Sprint", x: 55, y: 65, active: false, icon: Globe },
  { id: "finance", label: "FinTech Challenge", x: 20, y: 20, active: false, icon: Zap },
  { id: "health", label: "Health Innovation", x: 78, y: 55, active: false, icon: Globe },
];

const connections = [
  [35, 40, 65, 25], [35, 40, 55, 65], [35, 40, 20, 20], [65, 25, 78, 55], [55, 65, 78, 55],
];

const CareerMapUnlock = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"simulation" | "real" | "support">("simulation");
  const [showPanel, setShowPanel] = useState(false);

  return (
    <div className="min-h-screen mesh-bg text-foreground overflow-hidden">
      <div className="flex items-center gap-3 px-8 pt-6 pb-4">
        <h1 className="text-2xl font-bold mr-auto tracking-tight">Career Quests</h1>
        {(["simulation", "real", "support"] as const).map((t) => (
          <button key={t} onClick={() => t !== "real" && setTab(t)} className={`px-5 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${tab === t ? "bg-gradient-to-r from-primary to-secondary text-white shadow-[0_4px_16px_hsl(228_80%_70%/0.3)]" : t === "real" ? "bg-white/30 text-muted-foreground/40 border border-white/40 cursor-not-allowed" : "bg-white/50 text-muted-foreground border border-white/60 hover:bg-white/70"}`}>
            {t === "simulation" && "Simulation"}
            {t === "real" && <><Lock className="w-3.5 h-3.5" /> Real Opportunities</>}
            {t === "support" && "Support"}
          </button>
        ))}
      </div>

      <div className="flex px-8 gap-6 h-[calc(100vh-80px)]">
        <div className="flex-1 bento-card relative overflow-hidden">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[10,20,30,40,50,60,70,80,90].map(v => (<line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="hsl(230 20% 90%)" strokeWidth="0.15" />))}
            {[10,20,30,40,50,60,70,80,90].map(h => (<line key={`h${h}`} x1="0" y1={h} x2="100" y2={h} stroke="hsl(230 20% 90%)" strokeWidth="0.15" />))}
            {connections.map(([x1,y1,x2,y2], i) => (<line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(228 80% 70%)" strokeWidth="0.2" strokeDasharray="1 1" opacity="0.3" />))}
          </svg>
          {nodes.map((node, i) => (
            <motion.button key={node.id} className="absolute z-10" style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%, -50%)" }} onClick={() => node.active && setShowPanel(true)} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2 + i * 0.1 }} whileHover={node.active ? { scale: 1.15 } : {}}>
              <div className="flex flex-col items-center gap-2">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${node.active ? "bg-gradient-to-br from-primary to-secondary shadow-[0_0_30px_hsl(228_80%_70%/0.4)]" : "bg-white/60 border border-white/70"}`}>
                  {node.active ? <node.icon className="w-6 h-6 text-white" strokeWidth={1.5} /> : <Lock className="w-4 h-4 text-muted-foreground/30" strokeWidth={1.5} />}
                </div>
                <span className={`text-xs font-medium max-w-[100px] text-center leading-tight ${node.active ? "text-foreground/80" : "text-muted-foreground/40"}`}>{node.label}</span>
              </div>
              {node.active && (<motion.div className="absolute inset-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-secondary" style={{ left: "50%", top: 0, transform: "translateX(-50%)" }} animate={{ scale: [1, 1.6], opacity: [0.3, 0] }} transition={{ duration: 2.5, repeat: Infinity }} />)}
            </motion.button>
          ))}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 z-10"><MapPin className="w-3.5 h-3.5 text-muted-foreground/40" strokeWidth={1.5} /><span className="text-[11px] text-muted-foreground/40 font-medium tracking-wide uppercase">Career Network</span></div>
        </div>

        <AnimatePresence>
          {showPanel && (
            <motion.div className="w-[380px] shrink-0 bento-card-strong p-6 flex flex-col" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}>
              <button onClick={() => setShowPanel(false)} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-foreground/5 flex items-center justify-center hover:bg-foreground/10"><X className="w-4 h-4 text-muted-foreground" /></button>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 shadow-[0_0_20px_hsl(228_80%_70%/0.3)]"><Shield className="w-6 h-6 text-white" strokeWidth={1.5} /></div>
              <h2 className="text-xl font-bold text-foreground mb-1">Cybersecurity Simulation</h2>
              <p className="text-sm text-muted-foreground mb-6">Respond to a live cyber threat in a team-based scenario.</p>
              <div className="flex flex-wrap gap-2 mb-6">{["15-20 min", "Team-based", "Math/ELA"].map(tag => (<span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/8 border border-primary/15 text-foreground/60">{tag}</span>))}</div>
              <div className="flex flex-wrap gap-2 mb-8">{["Critical Thinking", "Communication", "Data Analysis", "Decision Making"].map(s => (<span key={s} className="px-3 py-1 rounded-full text-xs bg-primary/8 border border-primary/15 text-primary">{s}</span>))}</div>
              <div className="mt-auto"><button onClick={() => navigate("/quest/simulation-select")} className="w-full py-3.5 btn-premium font-semibold text-sm flex items-center justify-center gap-2">Enter Simulation <ArrowRight className="w-4 h-4" /></button></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CareerMapUnlock;
