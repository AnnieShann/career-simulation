import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, MapPin, Building2, CheckCircle2, Star, ArrowLeft, ExternalLink, MessageCircle, Bookmark, Award, TrendingUp, UserCheck, BadgeCheck, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const tasks = [
  "Monitor SOC alerts and flag suspicious activity",
  "Review suspicious email headers and log signals",
  "Support incident response triage procedures",
  "Document evidence and maintain chain of custody",
  "Prepare risk summaries for senior analysts",
  "Participate in daily SOC standup meetings",
];

const milestones = [
  { week: "Week 1", title: "Onboarding & Orientation", items: ["Set up SOC dashboard and tools access", "Complete IR protocol training", "Shadow senior IR analyst sessions", "Review Operation Silent Breach case study"] },
  { week: "Week 2", title: "Alert Monitoring & Triage", items: ["Monitor live alert feeds independently", "Classify and escalate suspicious activity", "Practice packet analysis on sample data", "Participate in daily threat briefings"] },
  { week: "Week 3", title: "Incident Response Support", items: ["Assist with active incident triage", "Draft initial incident response reports", "Run simulated phishing exercises", "Document containment procedures"] },
  { week: "Week 4", title: "Reporting & Evaluation", items: ["Prepare executive risk summary report", "Present findings to mentor and team", "Complete final self-assessment", "Receive mentor evaluation and IR badge"] },
];

const skills = ["Incident Response", "Threat Triage", "Evidence Documentation", "Risk Assessment", "Data Interpretation", "SOC Operations"];

const rewards = [
  { icon: TrendingUp, label: "Readiness Level", value: "+1 Level Up" },
  { icon: BadgeCheck, label: "Verified Experience", value: "Added to Profile" },
  { icon: UserCheck, label: "Mentor Feedback", value: "Personalized Review" },
  { icon: Star, label: "Match Score", value: "Boosted for IR Roles" },
];

const SilentBreachInternship = () => {
  const navigate = useNavigate();
  const [openWeek, setOpenWeek] = useState<number | null>(0);
  const [tasksOpen, setTasksOpen] = useState(false);

  return (
    <div className="h-screen mesh-bg text-foreground flex flex-col overflow-hidden">
      <div className="relative z-10 px-5 pt-3 pb-2 flex flex-col flex-1 min-h-0 overflow-y-auto">
        <div className="flex items-center gap-3 mb-1.5 shrink-0">
          <h1 className="text-base font-bold mr-auto tracking-tight">Career Quests</h1>
          <button onClick={() => navigate("/map")} className="px-3 py-1 rounded-full text-[10px] font-medium bg-white/50 text-muted-foreground border border-white/60 hover:bg-white/70">Simulation</button>
          <button className="px-3 py-1 rounded-full text-[10px] font-medium bg-gradient-to-r from-primary to-secondary text-white shadow-[0_4px_16px_hsl(228_80%_70%/0.3)] flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Real Opportunities</button>
          <button className="px-3 py-1 rounded-full text-[10px] font-medium bg-white/50 text-muted-foreground border border-white/60 hover:bg-white/70">Support</button>
        </div>

        <div className="flex gap-3 mb-1.5 shrink-0 items-center">
          <motion.div className="w-[150px] shrink-0 flex flex-col items-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-[3px] border-white/60 shadow-[0_0_30px_hsl(228_80%_70%/0.2)] mb-1">
              <video src="/videos/assessment-avatar.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
            </div>
            <p className="text-[7px] text-muted-foreground/60 uppercase tracking-wider font-medium">Mentor</p>
            <h4 className="text-[11px] font-semibold text-foreground/80 leading-tight">Marcus Rivera</h4>
            <p className="text-[9px] text-muted-foreground leading-tight">Sr. IR Analyst</p>
            <div className="flex items-center gap-0.5 mt-0.5"><Star className="w-2.5 h-2.5 text-amber-400" /><span className="text-[8px] text-foreground/60 font-medium">4.9</span></div>
          </motion.div>

          <motion.div className="flex-1 bento-card-strong p-3 flex items-start gap-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.03 }}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6C8CFF] to-[#9C6BFF] flex items-center justify-center shrink-0 shadow-[0_0_16px_rgba(108,140,255,0.2)]">
              <Shield className="w-4 h-4 text-white" strokeWidth={1.5} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[13px] font-bold text-foreground/90 mb-0.5">IR Internship Plan — Silent Breach Track</h2>
              <div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-0.5">
                <span className="flex items-center gap-0.5"><Building2 className="w-3 h-3" /> SecureNet Solutions</span>
                <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" /> Manhattan, NYC</span>
                <span className="px-1.5 py-0.5 rounded-full text-[8px] font-bold gradient-text bg-primary/10 border border-primary/20">94% Match</span>
              </div>
              <p className="text-[10px] text-muted-foreground leading-relaxed">4-week incident response placement matching your Operation Silent Breach performance. Monitor, triage, document, and report alongside senior IR analysts.</p>
            </div>
          </motion.div>

          <motion.div className="w-[100px] shrink-0 bento-card-gradient p-2.5 flex flex-col items-center justify-center text-center" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#6C8CFF] to-[#9C6BFF] flex items-center justify-center mb-1 shadow-[0_0_20px_rgba(108,140,255,0.3)]">
              <Award className="w-4.5 h-4.5 text-white" strokeWidth={1.5} />
            </div>
            <p className="text-[7px] text-muted-foreground/60 uppercase tracking-wider font-medium">Badge Earned</p>
            <h3 className="text-[10px] font-bold gradient-text">IR Specialist</h3>
            <p className="text-[8px] text-muted-foreground">Silent Breach</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3 flex flex-col gap-1.5">
            <motion.div className="bento-card p-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
              <button onClick={() => setTasksOpen(!tasksOpen)} className="w-full flex items-center justify-between text-left">
                <p className="text-[8px] text-muted-foreground/60 uppercase tracking-wider font-medium">What You'll Do</p>
                <motion.div animate={{ rotate: tasksOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3 h-3 text-muted-foreground" />
                </motion.div>
              </button>
              {!tasksOpen && (
                <p className="text-[9px] text-muted-foreground mt-1 leading-relaxed">Monitor alerts, review logs, support IR triage…</p>
              )}
              <AnimatePresence>
                {tasksOpen && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="space-y-1 mt-1.5">
                      {tasks.map((t, i) => (
                        <div key={i} className="flex items-start gap-1">
                          <div className="w-3.5 h-3.5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[7px] font-bold gradient-text">{i + 1}</span>
                          </div>
                          <p className="text-[9px] text-foreground/75 leading-snug">{t}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div className="bento-card p-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <p className="text-[8px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-1.5">Skills You'll Build</p>
              <div className="flex flex-wrap gap-1">
                {skills.map(s => (
                  <span key={s} className="px-1.5 py-0.5 rounded-lg text-[8px] font-medium bg-primary/8 border border-primary/15 text-primary flex items-center gap-0.5">
                    <CheckCircle2 className="w-2 h-2" /> {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div className="col-span-6 bento-card-strong p-2.5" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <p className="text-[8px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-1 shrink-0">Internship Milestones</p>
            <div className="space-y-1">
              {milestones.map((m, mi) => {
                const isOpen = openWeek === mi;
                return (
                  <div key={mi} className={`rounded-xl border transition-colors ${isOpen ? "border-primary/20 bg-primary/[0.03]" : "border-white/50 bg-white/30"}`}>
                    <button onClick={() => setOpenWeek(isOpen ? null : mi)} className="w-full flex items-center gap-2 p-1.5 text-left">
                      <span className="px-1.5 py-0.5 rounded-full text-[7px] font-bold bg-gradient-to-r from-[#6C8CFF] to-[#9C6BFF] text-white shrink-0">{m.week}</span>
                      <span className="text-[10px] font-semibold text-foreground/80 flex-1">{m.title}</span>
                      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-3 h-3 text-muted-foreground" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                          <div className="px-2.5 pb-1.5 pt-0 space-y-0.5">
                            {m.items.map((item, ii) => (
                              <label key={ii} className="flex items-start gap-1.5 cursor-pointer group">
                                <div className="w-3 h-3 rounded border border-primary/30 bg-white/60 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-primary/50 transition-colors">
                                  {mi === 0 && ii < 2 && <CheckCircle2 className="w-2 h-2 text-primary" />}
                                </div>
                                <span className={`text-[9px] leading-snug ${mi === 0 && ii < 2 ? "text-muted-foreground line-through" : "text-foreground/70"}`}>{item}</span>
                              </label>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div className="col-span-3 bento-card p-2.5 self-start" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
            <p className="text-[8px] text-muted-foreground/60 uppercase tracking-wider font-medium mb-1.5">Progress Impact</p>
            <div className="space-y-2">
              {rewards.map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary/15 to-secondary/15 flex items-center justify-center shrink-0"><Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} /></div>
                  <div>
                    <p className="text-[8px] text-muted-foreground leading-tight">{label}</p>
                    <p className="text-[10px] font-semibold text-foreground/80 leading-tight">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div className="flex items-center justify-center gap-2.5 mt-1.5 shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <button onClick={() => navigate("/quest/silent-breach/opportunities")} className="px-3 py-1 rounded-2xl border border-foreground/10 text-muted-foreground text-[10px] font-medium hover:bg-white/50 transition-colors inline-flex items-center gap-1">
            <ArrowLeft className="w-3 h-3" /> Back
          </button>
          <button className="px-4 py-1.5 btn-premium font-semibold text-[10px] inline-flex items-center gap-1">
            Apply Now <ExternalLink className="w-3 h-3" />
          </button>
          <button className="px-3 py-1 rounded-2xl border border-primary/30 text-primary text-[10px] font-medium hover:bg-primary/5 transition-colors inline-flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> Message Mentor
          </button>
          <button className="px-3 py-1 rounded-2xl border border-foreground/10 text-muted-foreground text-[10px] font-medium hover:bg-white/50 transition-colors inline-flex items-center gap-1">
            <Bookmark className="w-3 h-3" /> Save
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default SilentBreachInternship;
