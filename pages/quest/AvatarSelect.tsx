import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Radio, MessageSquare, Search, Users, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

import avatarAlex from "@/assets/avatar-alex.png";
import avatarAlyssa from "@/assets/avatar-alyssa.png";
import avatarJavier from "@/assets/avatar-javier.png";
import avatarMia from "@/assets/avatar-mia.png";
import avatarOlivia from "@/assets/avatar-olivia.png";
import avatarSophie from "@/assets/avatar-sophie.png";

const roles = [
  { id: "soc", title: "SOC Analyst", icon: Shield, color: "from-primary to-secondary", avatar: avatarAlex, name: "Alex Chen" },
  { id: "coord", title: "Incident Coordinator", icon: Radio, color: "from-secondary to-accent", avatar: avatarAlyssa, name: "Alyssa Williams" },
  { id: "comms", title: "Communications Lead", icon: MessageSquare, color: "from-accent to-blush", avatar: avatarJavier, name: "Javier Martinez" },
  { id: "threat", title: "Threat Analyst", icon: Search, color: "from-emerald-400 to-emerald-500", avatar: avatarMia, name: "Mia Johnson" },
];

const teamMembers = [
  { id: "tm1", name: "Olivia Park", title: "Security Engineer", photo: avatarOlivia },
  { id: "tm2", name: "Sophie Laurent", title: "Risk Analyst", photo: avatarSophie },
  { id: "tm3", name: "Marcus Reid", title: "Network Ops", photo: avatarOlivia },
];

const AvatarSelect = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("soc");

  return (
    <div className="min-h-screen mesh-bg text-foreground overflow-hidden">
      <div className="relative z-10 px-8 py-6">
        <motion.h1 className="text-3xl font-bold mb-1 tracking-tight" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
          Choose Your Role
        </motion.h1>
        <p className="text-muted-foreground text-sm mb-6">Select your character and role for the Cybersecurity simulation</p>

        <div className="grid grid-cols-12 gap-6">
          {/* Left: Role-Avatar Cards */}
          <div className="col-span-7">
            <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-3">Choose Your Operator</p>
            <div className="grid grid-cols-2 gap-4">
              {roles.map((role) => {
                const isSel = selectedRole === role.id;
                return (
                  <motion.button
                    key={role.id}
                    onClick={() => setSelectedRole(role.id)}
                    className={`relative rounded-2xl overflow-hidden text-left transition-all ${
                      isSel
                        ? "ring-2 ring-primary shadow-[0_0_30px_hsl(228_80%_70%/0.3)]"
                        : "ring-1 ring-white/50 hover:ring-primary/30"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <div className="aspect-[4/5] relative overflow-hidden bg-muted/30">
                      <img src={role.avatar} alt={role.name} className="w-full h-full object-cover object-top" />
                      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/20 to-transparent" />
                      {isSel && (
                        <motion.div className="absolute top-3 right-3" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                          <CheckCircle2 className="w-6 h-6 text-primary drop-shadow-sm" />
                        </motion.div>
                      )}
                    </div>
                    <div className="px-3 pb-3 pt-2 relative bg-white/50 backdrop-blur-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-6 h-6 rounded-md bg-gradient-to-br ${role.color} flex items-center justify-center shrink-0`}>
                          <role.icon className="w-3 h-3 text-white" strokeWidth={2} />
                        </div>
                        <span className="text-xs font-bold text-foreground/80 leading-tight">{role.title}</span>
                      </div>
                      <p className="text-[10px] text-muted-foreground pl-8">{role.name}</p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Right: Mission Brief + Team + CTA */}
          <div className="col-span-5 flex flex-col gap-5">
            <div className="bento-card p-5">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-secondary" strokeWidth={1.5} />
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Mission Brief</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                A phishing attack has been detected targeting employees with access to client financial data.
                Your team must identify the scope, contain the breach, and communicate with affected stakeholders — all within 20 minutes.
              </p>
              <p className="text-xs text-muted-foreground/50 italic">Your choices will be reflected in your Skill Passport.</p>
            </div>

            <div className="bento-card p-5">
              <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium mb-3">Your Team</p>
              <div className="flex flex-col gap-2">
                {teamMembers.map((tm) => (
                  <div key={tm.id} className="flex items-center gap-3 px-3 py-2 rounded-xl bg-white/40 border border-white/50">
                    <img src={tm.photo} alt={tm.name} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <p className="text-xs font-medium text-foreground/70">{tm.name}</p>
                      <p className="text-[10px] text-muted-foreground">{tm.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <motion.button
              onClick={() => navigate("/quest/silent-breach/party")}
              className="w-full py-4 btn-premium font-semibold flex items-center justify-center gap-2 text-sm"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              Start Simulation <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelect;
