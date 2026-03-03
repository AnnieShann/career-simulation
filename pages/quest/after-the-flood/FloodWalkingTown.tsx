import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

import floodBg from "@/assets/flood-town-bg.jpg";
import rosaBg from "@/assets/rosa-restaurant-bg.jpg";
import aishaBg from "@/assets/aisha-school-bg.png";
import bennettBg from "@/assets/bennett-home-bg.jpg";
import avatarRosa from "@/assets/avatar-rosa.png";
import avatarJavier from "@/assets/avatar-javier.png";
import avatarAisha from "@/assets/avatar-aisha.png";

const rosa = { name: "Rosa", role: "Restaurant Owner", avatar: avatarRosa, color: "#F59E0B" };
const bennett = { name: "Mr. Bennett", role: "Retired Teacher", avatar: avatarJavier, color: "#6366F1" };
const aisha = { name: "Aisha", role: "High School Senior", avatar: avatarAisha, color: "#EC4899" };

const encounters = [
  { character: rosa, lines: ["My family's restaurant flooded twice this year.", "We can rebuild again… but I don't know if we can survive another season.", "If the waterfront floods again, that's it for us."] },
  { character: bennett, lines: ["The elementary school took on three feet of water.", "My granddaughter goes there.", "If that building floods again, families will leave this town."] },
  { character: aisha, lines: ["I want to study environmental engineering.", "But if this town keeps flooding, there won't be much left to come back to."] },
];

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

const FloodWalkingTown = () => {
  const navigate = useNavigate();
  const [encounterIdx, setEncounterIdx] = useState(0);
  const [lineIdx, setLineIdx] = useState(0);

  const current = encounters[encounterIdx];
  const line = current.lines[lineIdx];

  const advance = () => {
    if (lineIdx < current.lines.length - 1) {
      setLineIdx(lineIdx + 1);
    } else if (encounterIdx < encounters.length - 1) {
      setEncounterIdx(encounterIdx + 1);
      setLineIdx(0);
    } else {
      navigate("/quest/after-the-flood/risk-map");
    }
  };

  const isLast = encounterIdx === encounters.length - 1 && lineIdx === current.lines.length - 1;

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <AnimatePresence mode="wait">
        <motion.img key={encounterIdx} src={encounterIdx === 0 ? rosaBg : encounterIdx === 1 ? bennettBg : aishaBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" style={{ zIndex: 0 }} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} />
      </AnimatePresence>
      <div className="absolute inset-0" style={{ zIndex: 1, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Heart className="w-5 h-5 text-rose-400" strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Walking the Town</span>
        <span className="text-xs text-white/30">Meet the People of Harbor Point</span>
      </motion.div>

      {/* Character portraits - side panel */}
      <motion.div className={`absolute top-16 left-4 z-10 ${holoPanel} rounded-2xl p-4 w-[180px]`}
        initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <p className="text-[11px] text-white/30 uppercase tracking-widest mb-2 font-semibold">Encounters</p>
        {encounters.map((enc, i) => (
          <div key={enc.character.name} className={`flex items-center gap-2 p-2 rounded-xl mb-1 transition-all ${i === encounterIdx ? "bg-white/[0.06] border border-white/10" : "opacity-40"}`}>
            <img src={enc.character.avatar} alt="" className="w-8 h-8 rounded-lg object-cover border" style={{ borderColor: i === encounterIdx ? enc.character.color + "60" : "transparent" }} />
            <div>
              <p className="text-sm font-bold" style={{ color: i === encounterIdx ? enc.character.color : "rgba(255,255,255,0.4)" }}>{enc.character.name}</p>
              <p className="text-xs text-white/25">{enc.character.role}</p>
            </div>
            {i < encounterIdx && <div className="w-2 h-2 rounded-full bg-emerald-400 ml-auto" />}
          </div>
        ))}
      </motion.div>

      {/* Dialogue - centered */}
      <div className="absolute inset-0 z-20 flex items-center justify-center pl-[210px] pr-8">
        <AnimatePresence mode="wait">
          <motion.div key={`${encounterIdx}-${lineIdx}`}
            className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel} flex gap-8`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
            <img src={current.character.avatar} alt="" className="w-60 h-60 rounded-2xl object-cover object-top border-2 shrink-0" style={{ borderColor: current.character.color + "60", boxShadow: `0 0 30px ${current.character.color}30` }} />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold" style={{ color: current.character.color }}>{current.character.name}</span>
                  <span className="text-sm text-white/30">{current.character.role}</span>
                </div>
                <p className="text-lg text-white/70 leading-relaxed">{line}</p>
              </div>
              <div className="flex items-center justify-between mt-5">
              <div className="flex gap-1.5">
                {current.lines.map((_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full transition-colors" style={{ background: i <= lineIdx ? current.character.color : "rgba(255,255,255,0.15)" }} />
                ))}
              </div>
              <button onClick={advance} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-shadow">
                {isLast ? "View Flood Risk Map" : "Continue"} <ArrowRight className="w-4 h-4" />
              </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FloodWalkingTown;
