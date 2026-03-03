import { ReactNode } from "react";
import { motion } from "framer-motion";
import SilentBreachGuide from "@/components/SilentBreachGuide";
import SilentBreachPartySidebar from "@/components/SilentBreachPartySidebar";
import emailAnalysisBg from "@/assets/email-analysis-bg.png";

const holoPanel =
  "backdrop-blur-md bg-white/[0.03] border border-white/[0.08] shadow-[0_0_30px_rgba(108,140,255,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]";

interface RoomLayoutProps {
  guideStep: string;
  guideCompleted: string[];
  guideAction?: string;
  guideHint?: string;
  partyStatus?: string;
  headerIcon: ReactNode;
  headerTitle: string;
  headerSubtitle: string;
  headerExtra?: ReactNode;
  leftPanel?: ReactNode;
  rightPanel?: ReactNode;
  children: ReactNode;
  bgSrc?: string;
  bgOpacity?: number;
}

/**
 * Collision-free layout for Silent Breach room screens.
 * 
 * CSS Grid: 3 rows × 3 columns
 *   Row 1: Header bar (full width, fixed height)
 *   Row 2: [Left Panel (fixed 220px)] [Main Content (flex)] [Right Panel + Party (fixed 200px)]
 *   Row 3: (empty — guide tooltips are fixed-positioned in their own z-layer)
 * 
 * Safe zones:
 *   - 8px gap between all grid cells
 *   - Right column: header + progress stepper + threat intel + party (stacked, no overlap)
 *   - Continue buttons: always inside main content flow with 32px bottom padding
 */
const SilentBreachRoomLayout = ({
  guideStep,
  guideCompleted,
  guideAction,
  guideHint,
  partyStatus,
  headerIcon,
  headerTitle,
  headerSubtitle,
  headerExtra,
  leftPanel,
  rightPanel,
  children,
  bgSrc,
  bgOpacity = 50,
}: RoomLayoutProps) => {
  const colCount = (leftPanel ? 1 : 0) + 1 + 1; // left? + center + right always present
  const colTemplate = leftPanel
    ? "220px 1fr 200px"
    : "1fr 200px";

  return (
    <div className="h-screen w-screen overflow-hidden relative" style={{ background: "hsl(230,25%,4%)" }}>
      {/* Fixed guide overlays — own z-layer, pinned to top safe zone */}
      <SilentBreachGuide
        currentStep={guideStep}
        completedSteps={guideCompleted}
        nextAction={guideAction}
        hint={guideHint}
      />

      {/* Background */}
      <img
        src={bgSrc || emailAnalysisBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
        style={{ zIndex: 0, opacity: bgOpacity / 100 }}
      />
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.5) 100%)" }}
      />

      {/* Grid layout — starts below the 48px fixed guide bar + 12px gap = 60px */}
      <div
        className="absolute left-0 right-0 bottom-0 z-10"
        style={{
          top: "60px",
          display: "grid",
          gridTemplateColumns: colTemplate,
          gridTemplateRows: "auto 1fr",
          gap: "8px",
          padding: "0 8px 8px 8px",
        }}
      >
        {/* Row 1: Header — spans all columns */}
        <motion.div
          className={`flex items-center justify-between px-5 py-2 ${holoPanel} border-t-0 border-x-0 rounded-none`}
          style={{ gridColumn: "1 / -1" }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3">
            {headerIcon}
            <span className="text-xs font-bold text-white/80">{headerTitle}</span>
            <span className="text-[10px] text-white/30">{headerSubtitle}</span>
          </div>
          {headerExtra}
        </motion.div>

        {/* Row 2, Col 1: Left panel (optional, fixed width) */}
        {leftPanel && (
          <div className="overflow-y-auto flex flex-col gap-2 min-h-0">
            {leftPanel}
          </div>
        )}

        {/* Row 2, Center: Main content — scrollable, with 32px bottom safe zone for Continue */}
        <div className="overflow-y-auto flex items-center justify-center min-h-0 pb-8">
          {children}
        </div>

        {/* Row 2, Right: Right panel + Party sidebar — stacked vertically, fixed width */}
        <div className="overflow-y-auto flex flex-col gap-2 min-h-0">
          {rightPanel}
          <SilentBreachPartySidebar status={partyStatus} />
        </div>
      </div>
    </div>
  );
};

export { holoPanel };
export default SilentBreachRoomLayout;
