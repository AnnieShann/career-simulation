import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import rosaBg from "@/assets/rosa-restaurant-bg.jpg";
import avatarMayor from "@/assets/avatar-mayor.png";
import avatarRosa from "@/assets/avatar-rosa.png";
import avatarJavier from "@/assets/avatar-javier.png";
import avatarAisha from "@/assets/avatar-aisha.png";

const mayor = { name: "Mayor Thompson", role: "Mayor", avatar: avatarMayor, color: "#3B82F6" };
const rosa = { name: "Rosa", role: "Restaurant Owner", avatar: avatarRosa, color: "#F59E0B" };
const bennett = { name: "Mr. Bennett", role: "Retired Teacher", avatar: avatarJavier, color: "#6366F1" };
const aisha = { name: "Aisha", role: "High School Senior", avatar: avatarAisha, color: "#EC4899" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

type Phase = "intro" | "choose" | "response";

const voiceLines = [
  { speaker: rosa, text: "They should protect homes first!" },
  { speaker: bennett, text: "Businesses pay taxes!" },
  { speaker: aisha, text: "The school is non-negotiable!" },
];

const responseOptions = [
  { id: "rosa", label: "Speak to Rosa", desc: "Address economic concerns", character: rosa },
  { id: "bennett", label: "Speak to Mr. Bennett", desc: "Address the school and families", character: bennett },
];

const emotionalResponses: Record<string, { speaker: typeof rosa; text: string }> = {
  rosa: { speaker: rosa, text: "If businesses close, jobs disappear. That affects everyone." },
  bennett: { speaker: bennett, text: "The school is the heart of this town." },
};

const FloodCommunityMeeting = () => {
  const navigate = useNavigate();
  const { setRespondedFirst } = useFlood();
  const [phase, setPhase] = useState<Phase>("intro");
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={selected === "rosa" || phase === "intro" ? rosaBg : floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35 transition-all duration-500" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Users className="w-5 h-5 text-amber-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Community Meeting</span>
        <span className="text-xs text-white/30">Town Gymnasium</span>
      </motion.div>

      {/* Intro - overlapping voices */}
      {phase === "intro" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-2xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-sm text-white/30 uppercase tracking-widest mb-4 font-semibold">Voices overlap in the gymnasium:</p>
            {voiceLines.map((v, i) => (
              <motion.div key={i} className="flex items-center gap-3 mb-3"
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.4 }}>
                <img src={v.speaker.avatar} alt="" className="w-12 h-12 rounded-lg object-cover object-top" />
                <p className="text-base text-white/70 italic">{v.text}</p>
              </motion.div>
            ))}
            <div className="flex justify-end mt-5">
              <button onClick={() => setPhase("choose")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
                Choose Who to Respond To <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Choose who to respond to */}
      {phase === "choose" && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-2xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare className="w-5 h-5 text-amber-400" />
              <span className="text-base font-bold text-white/80">Who do you respond to first?</span>
            </div>
            <p className="text-sm text-white/40 mb-5">Your first response signals your priorities.</p>
            <div className="space-y-3">
              {responseOptions.map(opt => (
                <button key={opt.id} onClick={() => { setSelected(opt.id); setRespondedFirst(opt.id); }}
                  className={`w-full text-left rounded-xl p-5 border transition-all flex items-center gap-4 ${selected === opt.id ? "border-amber-500/50 bg-amber-500/10" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                  <img src={opt.character.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <span className="text-base font-bold text-white/70">{opt.label}</span>
                    <p className="text-sm text-white/35">{opt.desc}</p>
                  </div>
                </button>
              ))}
            </div>
            {selected && (
              <div className="flex justify-end mt-5">
                <button onClick={() => setPhase("response")} className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold flex items-center gap-2">
                  Respond <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* Emotional Response */}
      {phase === "response" && selected && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel}`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex gap-8">
              <img src={emotionalResponses[selected].speaker.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 shrink-0" style={{ borderColor: emotionalResponses[selected].speaker.color + "60", boxShadow: `0 0 30px ${emotionalResponses[selected].speaker.color}30` }} />
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-lg font-bold" style={{ color: emotionalResponses[selected].speaker.color }}>{emotionalResponses[selected].speaker.name}</span>
                <p className="text-lg text-white/70 leading-relaxed mt-2">{emotionalResponses[selected].text}</p>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button onClick={() => navigate("/quest/after-the-flood/resilience-report")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
                View Resilience Report <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default FloodCommunityMeeting;
