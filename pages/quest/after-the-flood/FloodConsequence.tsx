import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useFlood, FundingChoice } from "@/contexts/FloodContext";

import floodBg from "@/assets/flood-town-bg.jpg";
import avatarRosa from "@/assets/avatar-rosa.png";
import avatarJavier from "@/assets/avatar-javier.png";
import avatarAisha from "@/assets/avatar-aisha.png";
import avatarCalvin from "@/assets/avatar-calvin.png";

const rosa = { name: "Rosa", role: "Restaurant Owner", avatar: avatarRosa, color: "#F59E0B" };
const bennett = { name: "Mr. Bennett", role: "Retired Teacher", avatar: avatarJavier, color: "#6366F1" };
const aisha = { name: "Aisha", role: "High School Senior", avatar: avatarAisha, color: "#EC4899" };
const calvin = { name: "Calvin", role: "City Engineer", avatar: avatarCalvin, color: "#22D3EE" };

const holoPanel = "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(59,130,246,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

type Reaction = { speaker: typeof rosa; text: string };

const consequences: Record<NonNullable<FundingChoice>, { title: string; desc: string; tone: string; color: string; reactions: Reaction[] }> = {
  "school-waterfront": {
    title: "School Protected + Partial Waterfront",
    desc: "The school floodwall is built. 600 students return to a safe building. The waterfront gets partial reinforcement — some businesses are protected, but the marina remains vulnerable.",
    tone: "Hopeful but incomplete",
    color: "#8B5CF6",
    reactions: [
      { speaker: bennett, text: "You kept our children safe." },
      { speaker: rosa, text: "I understand the choice… but my business is still exposed. What happens next storm?" },
      { speaker: calvin, text: "Structurally sound decision. The school wall will last 50 years. The partial waterfront work buys time, not certainty." },
    ],
  },
  "waterfront-drainage": {
    title: "Waterfront Protected + Small Drainage",
    desc: "The full waterfront barrier goes up. 120 jobs secured. $3.5M in annual revenue protected. The neighborhood gets a modest drainage upgrade — better than nothing, but not transformative.",
    tone: "Economically strong, socially difficult",
    color: "#F59E0B",
    reactions: [
      { speaker: rosa, text: "You saved our businesses." },
      { speaker: aisha, text: "So the school just… stays broken? We're still in a church basement." },
      { speaker: calvin, text: "Economically, this was the rational choice. The revenue preservation alone justifies it. But the school situation weighs heavy." },
    ],
  },
  "school-grants": {
    title: "School Protected + Household Grants",
    desc: "The school floodwall is complete. 600 students are safe. Emergency grants help families repair flood damage. But the waterfront — the town's economic engine — is completely unprotected.",
    tone: "Compassionate but risky",
    color: "#EC4899",
    reactions: [
      { speaker: bennett, text: "The grant won't cover everything, but it means I don't lose my home. Thank you." },
      { speaker: aisha, text: "The school is safe! And families are getting help. This feels right." },
      { speaker: calvin, text: "The human impact is addressed. But without waterfront protection, we risk losing $3.5M annually. Future risk remains." },
    ],
  },
};

const FloodConsequence = () => {
  const navigate = useNavigate();
  const { fundingChoice } = useFlood();
  const [reactionIdx, setReactionIdx] = useState(0);
  const [showReactions, setShowReactions] = useState(false);

  const choice = fundingChoice || "school-waterfront";
  const data = consequences[choice];

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(215,30%,6%)" }}>
      <img src={floodBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-35" style={{ zIndex: 0 }} />
      <div className="absolute inset-0" style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)" }} />

      {/* Header */}
      <motion.div className={`absolute top-4 left-1/2 -translate-x-1/2 z-30 ${holoPanel} rounded-2xl px-6 py-2.5 flex items-center gap-3`}
        initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <Eye className="w-5 h-5" style={{ color: data.color }} strokeWidth={1.5} />
        <span className="text-sm font-bold text-white/80">Consequence</span>
        <span className="text-xs text-white/30">{data.tone}</span>
      </motion.div>

      {/* Outcome summary - centered */}
      {!showReactions && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <motion.div className={`max-w-2xl w-full ${holoPanel} rounded-2xl p-8`}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="w-4 h-4 rounded-full mb-4" style={{ background: data.color, boxShadow: `0 0 12px ${data.color}` }} />
            <h2 className="text-2xl font-bold text-white/80 mb-3">{data.title}</h2>
            <p className="text-base text-white/50 leading-relaxed mb-6">{data.desc}</p>
            <button onClick={() => setShowReactions(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
              See Character Reactions <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Character reactions - centered */}
      {showReactions && (
        <div className="absolute inset-0 z-20 flex items-center justify-center px-8">
          <AnimatePresence mode="wait">
            <motion.div key={reactionIdx}
              className={`max-w-4xl w-full rounded-2xl p-8 ${holoPanel} flex gap-8`}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <img src={data.reactions[reactionIdx].speaker.avatar} alt=""
                className="w-60 h-60 rounded-2xl object-cover object-top border-2 shrink-0"
                style={{ borderColor: data.reactions[reactionIdx].speaker.color + "60", boxShadow: `0 0 30px ${data.reactions[reactionIdx].speaker.color}30` }} />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-lg font-bold" style={{ color: data.reactions[reactionIdx].speaker.color }}>
                    {data.reactions[reactionIdx].speaker.name}
                  </span>
                  <span className="text-sm text-white/30 ml-2">{data.reactions[reactionIdx].speaker.role}</span>
                  <p className="text-lg text-white/70 leading-relaxed mt-2">{data.reactions[reactionIdx].text}</p>
                </div>
                <div className="flex items-center justify-between mt-5">
                  <div className="flex gap-1.5">
                    {data.reactions.map((_, i) => (
                      <div key={i} className={`w-2.5 h-2.5 rounded-full ${i <= reactionIdx ? "bg-blue-400" : "bg-white/15"}`} />
                    ))}
                  </div>
                  <button onClick={() => reactionIdx < data.reactions.length - 1 ? setReactionIdx(reactionIdx + 1) : navigate("/quest/after-the-flood/reflection")}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold flex items-center gap-2">
                    {reactionIdx < data.reactions.length - 1 ? "Next" : "Reflection"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default FloodConsequence;
