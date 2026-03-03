import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, CheckCircle2, Vote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSilentBreach } from "@/contexts/SilentBreachContext";
import SilentBreachRoomLayout, { holoPanel } from "@/components/SilentBreachRoomLayout";

import avatarAlex from "@/assets/avatar-alex.png";
import avatarJordan from "@/assets/avatar-jordan.png";
import avatarPriya from "@/assets/avatar-priya.png";
import avatarSam from "@/assets/avatar-sam.png";

const voteOptions = [
  { id: "a", label: "Full Forensic Scan" },
  { id: "b", label: "Partial System Lockdown" },
  { id: "c", label: "Continue Monitoring IP Cluster" },
];

const findings = [
  { name: "Jordan", role: "Cyber Forensics Analyst", avatar: avatarJordan, color: "#34D399", emoji: "🟢", finding: "IP address matches AegisFox cluster at ~80% confidence. Attribution is strong but not fully confirmed.", vote: "Full Forensic Scan" },
  { name: "Priya", role: "Network Security Engineer", avatar: avatarPriya, color: "#FBBF24", emoji: "🟡", finding: "Data spike at 10:20 AM is the highest-risk timestamp. Pattern is consistent with automated exfiltration.", vote: "Full Forensic Scan" },
  { name: "Sam", role: "Compliance & Risk Officer", avatar: avatarSam, color: "#A78BFA", emoji: "🟣", finding: "Incident log has documentation gaps. Any action taken without logging risks losing legal evidence.", vote: "Segment Server & Monitor" },
];

type Phase = "findings" | "vote" | "result";

const SilentBreachTeamVote = () => {
  const navigate = useNavigate();
  const { decision2, setTeamVoteResult, completeRoom } = useSilentBreach();
  const [phase, setPhase] = useState<Phase>("findings");
  const [playerVote, setPlayerVote] = useState<string | null>(null);

  const getVoteTally = () => {
    const tally: Record<string, number> = {};
    findings.forEach((f) => { tally[f.vote] = (tally[f.vote] || 0) + 1; });
    if (playerVote) {
      const label = voteOptions.find((o) => o.id === playerVote)?.label || "";
      tally[label] = (tally[label] || 0) + 1;
    }
    return tally;
  };

  const getWinner = () => {
    const tally = getVoteTally();
    let maxCount = 0;
    let winner = "";
    Object.entries(tally).forEach(([label, count]) => {
      if (count > maxCount) { maxCount = count; winner = label; }
    });
    return winner;
  };

  const handleConfirmVote = () => {
    setTeamVoteResult(getWinner());
    setPhase("result");
  };

  const handleContinue = () => {
    completeRoom("teamvote");
    navigate("/quest/silent-breach/assessment");
  };

  return (
    <SilentBreachRoomLayout
      guideStep="email"
      guideCompleted={["briefing", "alerts", "decision", "email"]}
      guideAction={phase === "findings" ? "Review your team's findings" : phase === "vote" ? "Cast your vote" : "Vote locked — continue to assessment"}
      headerIcon={<Users className="w-4 h-4 text-[#A78BFA]" strokeWidth={1.5} />}
      headerTitle="Team Vote"
      headerSubtitle="Party Reconvenes"
      partyStatus="Team assembled for final vote."
      bgOpacity={30}
    >
      {/* Findings Phase */}
      {phase === "findings" && (
        <div className="max-w-4xl w-full space-y-4">
          <motion.div className={`${holoPanel} rounded-2xl p-5 flex items-center gap-5`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <img src={avatarAlex} alt="Alex" className="w-14 h-14 rounded-xl object-cover object-top border-2 border-[#6C8CFF]/30 shrink-0" />
            <p className="text-sm text-white/60 leading-relaxed flex-1">Before we lock in a decision, hear what your team found. They each investigated a different piece of this.</p>
          </motion.div>

          <motion.div className={`${holoPanel} rounded-2xl p-4 border-[#6C8CFF]/20`} style={{ boxShadow: "0 0 30px rgba(108,140,255,0.1)" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-[#6C8CFF]">🔵 You (Team Lead)</span>
              <span className="text-[9px] text-white/30">Your initial call</span>
            </div>
            <p className="text-sm text-white/50 ml-5">{decision2 || "No decision recorded"}</p>
          </motion.div>

          {findings.map((f, i) => (
            <motion.div key={f.name} className={`${holoPanel} rounded-2xl p-4`} style={{ borderColor: f.color + "15" }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }}>
              <div className="flex items-start gap-4">
                <img src={f.avatar} alt="" className="w-12 h-12 rounded-xl object-cover border-2 shrink-0" style={{ borderColor: f.color + "50" }} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-bold" style={{ color: f.color }}>{f.emoji} {f.name}</span>
                    <span className="text-[10px] text-white/25">{f.role}</span>
                  </div>
                  <p className="text-xs text-white/50 leading-relaxed">{f.finding}</p>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div className={`${holoPanel} rounded-2xl p-5 flex items-center gap-5`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <img src={avatarAlex} alt="Alex" className="w-14 h-14 rounded-xl object-cover object-top border-2 border-[#6C8CFF]/30 shrink-0" />
            <p className="text-sm text-white/60 leading-relaxed flex-1">You've each seen something the others haven't. Now come to a consensus.</p>
            <button onClick={() => setPhase("vote")} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#6C8CFF] text-white text-sm font-semibold flex items-center gap-2 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-shadow shrink-0">
              Open Vote <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}

      {/* Vote Phase */}
      {phase === "vote" && (
        <motion.div className={`max-w-3xl w-full ${holoPanel} rounded-2xl p-6`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="flex items-center gap-2 mb-5">
            <Vote className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-sm font-bold text-white/80">Vote Panel</span>
          </div>
          <div className="space-y-2 mb-5">
            {findings.map((f, i) => (
              <motion.div key={f.name} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.2 }}>
                <img src={f.avatar} alt="" className="w-8 h-8 rounded-lg object-cover border" style={{ borderColor: f.color + "40" }} />
                <span className="text-xs font-bold" style={{ color: f.color }}>{f.emoji} {f.name}</span>
                <span className="text-[10px] text-white/30">votes:</span>
                <span className="text-xs text-white/60 font-semibold ml-auto">{f.vote}</span>
              </motion.div>
            ))}
          </div>
          <div className="border-t border-white/[0.06] pt-4 mb-4">
            <p className="text-xs text-white/40 mb-3">Your vote (confirm or change):</p>
            <div className="space-y-2">
              {voteOptions.map((opt) => (
                <button key={opt.id} onClick={() => setPlayerVote(opt.id)}
                  className={`w-full text-left rounded-xl p-3 border transition-all ${playerVote === opt.id ? "border-[#6C8CFF]/50 bg-[#6C8CFF]/10" : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"}`}>
                  <span className="text-sm font-bold text-white/70">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>
          {playerVote && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="rounded-xl p-3 bg-white/[0.02] border border-white/[0.06] mb-4">
                <p className="text-[10px] text-white/30 uppercase tracking-wider font-semibold mb-2">Vote Tally</p>
                {Object.entries(getVoteTally()).map(([label, count]) => (
                  <div key={label} className="flex items-center justify-between py-1">
                    <span className="text-xs text-white/50">{label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-[#6C8CFF] to-[#A78BFA]" style={{ width: `${(count / 4) * 100}%` }} />
                      </div>
                      <span className="text-xs font-bold text-white/60">{count}</span>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-emerald-400/70 mt-2">Winner: <span className="font-bold">{getWinner()}</span></p>
              </div>
              <button onClick={handleConfirmVote} className="w-full py-3 rounded-xl bg-gradient-to-r from-[#A78BFA] to-[#6C8CFF] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(167,139,250,0.3)] transition-shadow">
                Lock Vote <CheckCircle2 className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Result Phase */}
      {phase === "result" && (
        <motion.div className={`max-w-3xl w-full rounded-2xl p-8 ${holoPanel} flex gap-8`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <img src={avatarAlex} alt="Alex" className="w-48 h-48 rounded-2xl object-cover object-top border-2 border-[#6C8CFF]/40 shadow-[0_0_30px_rgba(108,140,255,0.3)] shrink-0" />
          <div className="flex-1 flex flex-col justify-between py-4">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xl font-bold text-[#6C8CFF]">Alex</span>
                <span className="text-sm text-white/30">Supervisor</span>
              </div>
              <p className="text-lg text-white/70 leading-relaxed">Decision recorded. Before we close this case, we need you to analyze the data directly.</p>
            </div>
            <button onClick={handleContinue} className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6C8CFF] to-[#22D3EE] text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(108,140,255,0.3)] transition-shadow">
              Continue to Assessment <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </SilentBreachRoomLayout>
  );
};

export default SilentBreachTeamVote;
