import { motion } from "framer-motion";
import { Shield, MapPin, Star, ArrowRight, CheckCircle2, Building2, User, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import avatarAlex from "@/assets/avatar-alex.png";

const matchTags = ["Incident Response", "Phishing Detection", "Team Coordination", "Critical Thinking"];

const RealOpportunities = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen mesh-bg text-foreground overflow-y-auto">
      <div className="relative z-10 px-8 py-6">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-2xl font-bold mr-auto tracking-tight">Career Quests</h1>
          <button onClick={() => navigate("/map")} className="px-5 py-2 rounded-full text-sm font-medium bg-white/50 text-muted-foreground border border-white/60 hover:bg-white/70">Simulation</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-[0_4px_16px_hsl(228_80%_70%/0.3)] flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5" /> Real Opportunities</button>
          <button className="px-5 py-2 rounded-full text-sm font-medium bg-white/50 text-muted-foreground border border-white/60 hover:bg-white/70">Support</button>
        </div>

        <motion.div className="rounded-2xl border border-emerald-400/20 bg-emerald-50/50 px-6 py-4 flex items-center gap-4 mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-emerald-600">Cybersecurity Opportunities Unlocked!</p>
            <p className="text-xs text-muted-foreground">Based on your simulation performance, you've unlocked real internship opportunities.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-12 gap-6">
          <motion.div className="col-span-8 bento-card-strong p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-[0_0_30px_hsl(228_80%_70%/0.2)]">
                <Shield className="w-8 h-8 text-white" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-xl font-bold text-foreground/90">Cybersecurity Intern</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-600 border border-emerald-200 uppercase">New</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> SecureNet Solutions</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Manhattan, NYC</span>
                </div>
              </div>
              <div className="px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                <span className="text-sm font-bold gradient-text">94% Match</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Join SecureNet's Security Operations Center as a summer intern. You'll work alongside senior analysts to monitor threats, respond to incidents, and help protect Fortune 500 clients.
            </p>
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-3">Skills Match</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {matchTags.map(t => (
                <span key={t} className="px-3 py-1.5 rounded-full text-xs bg-primary/8 border border-primary/15 text-primary font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> {t}
                </span>
              ))}
            </div>
            <div className="bento-card p-5 mb-6">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-4">Quick Apply</p>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <input type="text" placeholder="Full name" defaultValue="Alex Rivera" className="soft-input" />
                <input type="email" placeholder="Email" defaultValue="alex@school.edu" className="soft-input" />
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3.5 btn-premium font-semibold text-sm flex items-center justify-center gap-2">
                  Apply <ExternalLink className="w-4 h-4" />
                </button>
                <button onClick={() => navigate("/quest/internship-plan")} className="flex-1 py-3.5 rounded-2xl border border-primary/30 text-primary font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
                  View Internship Plan <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          <div className="col-span-4 flex flex-col gap-6">
            <motion.div className="bento-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-4">Assigned Mentor</p>
              <div className="flex items-center gap-4 mb-4">
                <img src={avatarAlex} alt="Mentor" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/60" />
                <div>
                  <h3 className="font-semibold text-foreground/80">Marcus Chen</h3>
                  <p className="text-xs text-muted-foreground">Sr. Security Analyst, SecureNet</p>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-400" strokeWidth={1.5} /><span className="text-sm text-foreground/60">4.9</span></div>
                <span className="text-xs text-muted-foreground">12 students mentored</span>
              </div>
              <button className="w-full py-3 rounded-2xl border border-primary/30 text-primary font-medium text-sm flex items-center justify-center gap-2 hover:bg-primary/5 transition-colors">
                <User className="w-4 h-4" /> Connect with Mentor
              </button>
            </motion.div>
            <motion.div className="bento-card p-6" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-4">Company</p>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center"><Building2 className="w-5 h-5 text-white" strokeWidth={1.5} /></div>
                <div><h4 className="text-sm font-semibold text-foreground/80">SecureNet Solutions</h4><p className="text-[11px] text-muted-foreground">Cybersecurity · NYC</p></div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">Leading cybersecurity firm protecting Fortune 500 companies. Committed to developing the next generation of security professionals.</p>
              <div className="flex flex-wrap gap-2">
                {["50-200 employees", "Founded 2018", "Series B"].map(t => (<span key={t} className="px-2.5 py-1 rounded-full text-[10px] bg-foreground/5 border border-foreground/8 text-muted-foreground">{t}</span>))}
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div className="mt-6 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
          <button onClick={() => navigate("/map", { state: { unlocked: true } })} className="px-6 py-3 rounded-2xl border border-foreground/10 text-muted-foreground text-sm font-medium hover:bg-white/50 transition-colors inline-flex items-center gap-2">← Back to Map</button>
        </motion.div>
      </div>
    </div>
  );
};

export default RealOpportunities;
