import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowDown, TrendingUp, Clock, Target } from "lucide-react";
import heroVideo from "@/assets/hero-video.mp4";

const grades = ["9th", "10th", "11th", "12th"];

const Onboarding = () => {
  const navigate = useNavigate();
  const slide2Ref = useRef<HTMLDivElement>(null);
  const slide3Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);

  const [firstName, setFirstName] = useState("");
  const [zip, setZip] = useState("");
  const [grade, setGrade] = useState("");
  const [showSection3, setShowSection3] = useState(false);
  const [showSection4, setShowSection4] = useState(false);

  const handleScrollToSlide2 = () => {
    slide2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScrollToSlide3 = () => {
    slide3Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleContinue = () => {
    if (!firstName || !zip || !grade) return;
    setShowSection3(true);
    setTimeout(() => section3Ref.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleChangeTrajectory = () => {
    setShowSection4(true);
    setTimeout(() => section4Ref.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const handleBuildPassport = () => {
    navigate("/quest/avatar-select");
  };

  return (
    <div className="min-h-screen mesh-bg">
      {/* ── Section 1: Hero ── */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />

        {/* Spacer */}
        <div className="flex-1" />

        {/* Start button centered below the key icon */}
        <div className="relative z-10 flex justify-center pb-16">
          <motion.button
            onClick={handleScrollToSlide2}
            className="px-10 py-4 text-lg font-medium inline-flex items-center gap-3 bg-white text-foreground rounded-full hover:bg-white/90 transition-colors shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start <ArrowDown className="w-5 h-5" />
          </motion.button>
        </div>
      </section>

      {/* ── Slide 2: Avatar Introduction ── */}
      <section
        ref={slide2Ref}
        className="min-h-screen w-full flex items-center justify-center px-8 py-24"
      >
        <div className="flex flex-col items-center gap-8 relative z-10">
          <div className="video-circle shadow-[0_20px_60px_hsl(228_80%_70%/0.2)] border-4 border-white/60">
            <video
              src="/videos/assessment-avatar.mp4"
              muted
              playsInline
              loop
              autoPlay
              className="w-full h-full object-cover object-center"
            />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight">
            Welcome to FutureQuest.
          </h2>
          <p className="text-muted-foreground text-lg max-w-md text-center">
            This isn't a quiz. It's your edge in NYC.
          </p>
          <motion.button
            onClick={handleScrollToSlide3}
            className="btn-premium px-10 py-4 text-sm font-medium inline-flex items-center gap-2"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Continue <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      </section>

      {/* ── Slide 3: Student Info ── */}
      <section
        ref={slide3Ref}
        className="min-h-screen w-full flex items-center justify-center px-8 py-24"
      >
        <div className="max-w-lg w-full relative z-10">
          <div className="bento-card-strong p-10">
            <h2 className="text-3xl font-bold text-foreground mb-2">Let's get started</h2>
            <p className="text-muted-foreground mb-8">
              Tell us about you. This helps generate your NYC snapshot.
            </p>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">First name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Your first name"
                  className="soft-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">ZIP code</label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  placeholder="e.g. 10001"
                  maxLength={5}
                  className="soft-input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/70 mb-1.5">Grade</label>
                <select
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="soft-input appearance-none"
                >
                  <option value="">Select grade</option>
                  {grades.map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>

            <motion.button
              onClick={handleContinue}
              disabled={!firstName || !zip || !grade}
              className="w-full mt-8 btn-premium py-4 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Continue <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>

      {/* ── Section 3: NYC Reality Snapshot ── */}
      <AnimatePresence>
        {showSection3 && (
          <motion.section
            ref={section3Ref}
            className="min-h-screen w-full flex items-center justify-center px-8 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Left: Avatar */}
              <div className="flex flex-col items-center gap-6">
                <div className="video-circle shadow-[0_20px_60px_hsl(228_80%_70%/0.2)] border-4 border-white/60">
                  <video
                    src="/videos/assessment-avatar.mp4"
                    muted
                    playsInline
                    loop
                    autoPlay
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="text-muted-foreground text-sm text-center max-w-[260px]">
                  NYC is competitive. The good news is you can improve your readiness fast.
                </p>
              </div>

              {/* Right: Metrics */}
              <div className="bento-card-strong p-10 md:p-14">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                  NYC is competitive.
                </h2>
                <p className="text-muted-foreground mb-8 text-base">
                  Based on <span className="font-semibold text-foreground">{zip}</span> and grade{" "}
                  <span className="font-semibold text-foreground">{grade}</span>, here's a quick snapshot.
                </p>

                <div className="space-y-4 mb-6">
                  {[
                    { icon: TrendingUp, label: "NYC Entry Competition", value: "High", score: "78/100", color: "text-destructive" },
                    { icon: Clock, label: "Internship Access", value: "Limited", score: "22/100", color: "text-amber-500" },
                    { icon: Target, label: "Career Readiness", value: "Needs a plan", score: "34/100", color: "text-primary" },
                  ].map(({ icon: Icon, label, value, score, color }) => (
                    <div key={label} className="rounded-2xl p-5 flex items-center gap-4 bento-card">
                      <Icon className="w-7 h-7 text-muted-foreground/50 shrink-0" strokeWidth={1.5} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-muted-foreground">{label}</p>
                        <p className={`text-lg font-bold ${color}`}>{value}</p>
                      </div>
                      <span className="text-sm font-semibold text-muted-foreground/70">{score}</span>
                    </div>
                  ))}
                </div>

                <p className="text-muted-foreground/60 text-xs text-center mb-8">Prototype estimate.</p>

                <div className="flex justify-center">
                  <motion.button
                    onClick={handleChangeTrajectory}
                    className="btn-premium px-10 py-4 text-sm font-medium inline-flex items-center gap-2"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Change My Trajectory <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── Section 4: The Shift + CTA ── */}
      <AnimatePresence>
        {showSection4 && (
          <motion.section
            ref={section4Ref}
            className="min-h-screen w-full flex items-center justify-center px-8 py-24"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
              {/* Left: Avatar */}
              <div className="flex flex-col items-center gap-6">
                <div className="video-circle shadow-[0_20px_60px_hsl(228_80%_70%/0.2)] border-4 border-white/60">
                  <video
                    src="/videos/assessment-avatar.mp4"
                    muted
                    playsInline
                    loop
                    autoPlay
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <p className="text-muted-foreground text-sm text-center max-w-[260px]">
                  I'll guide you through a 2-step assessment and generate your Skill Passport, then unlock your personalized map.
                </p>
              </div>

              {/* Right: Text + CTA */}
              <div className="bento-card-strong p-10">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Clarity changes outcomes.
                </h2>
                <p className="text-muted-foreground text-base leading-relaxed mb-8">
                  We'll build your Skill Passport in two quick steps, then unlock opportunities
                  and support near you.
                </p>
                <motion.button
                  onClick={handleBuildPassport}
                  className="btn-premium px-10 py-4 text-base font-medium inline-flex items-center gap-2"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Build Skill Passport <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
