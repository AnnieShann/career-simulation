import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BottomNav from "./components/BottomNav";
import Onboarding from "./pages/Onboarding";
import NotFound from "./pages/NotFound";
import AvatarSelect from "./pages/quest/AvatarSelect";




import RealOpportunities from "./pages/quest/RealOpportunities";
import InternshipPlan from "./pages/quest/InternshipPlan";

// Silent Breach flow
import { SilentBreachProvider } from "./contexts/SilentBreachContext";

// After the Flood flow
import { FloodProvider } from "./contexts/FloodContext";
import FloodOpening from "./pages/quest/after-the-flood/FloodOpening";
import FloodWalkingTown from "./pages/quest/after-the-flood/FloodWalkingTown";
import FloodRiskMap from "./pages/quest/after-the-flood/FloodRiskMap";
import FloodCommunityMeeting from "./pages/quest/after-the-flood/FloodCommunityMeeting";
import FloodResilienceReport from "./pages/quest/after-the-flood/FloodResilienceReport";
import FloodMathMoment from "./pages/quest/after-the-flood/FloodMathMoment";
import FloodAllocation from "./pages/quest/after-the-flood/FloodAllocation";
import FloodCombinedReasoning from "./pages/quest/after-the-flood/FloodCombinedReasoning";
import FloodConsequence from "./pages/quest/after-the-flood/FloodConsequence";
import FloodReflection from "./pages/quest/after-the-flood/FloodReflection";
import SilentBreachPartyAssembly from "./pages/quest/silent-breach/SilentBreachPartyAssembly";
import SilentBreachOpening from "./pages/quest/silent-breach/SilentBreachOpening";
import SilentBreachHub from "./pages/quest/silent-breach/SilentBreachHub";
import SilentBreachAlerts from "./pages/quest/silent-breach/SilentBreachAlerts";
import SilentBreachDecision from "./pages/quest/silent-breach/SilentBreachDecision";
import SilentBreachEmail from "./pages/quest/silent-breach/SilentBreachEmail";
import SilentBreachTeamVote from "./pages/quest/silent-breach/SilentBreachTeamVote";
import SilentBreachAssessment from "./pages/quest/silent-breach/SilentBreachAssessment";
import SilentBreachOutcome from "./pages/quest/silent-breach/SilentBreachOutcome";
import SilentBreachOpportunity from "./pages/quest/silent-breach/SilentBreachOpportunity";
import SilentBreachInternship from "./pages/quest/silent-breach/SilentBreachInternship";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SilentBreachProvider>
        <FloodProvider>
          <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/quest/avatar-select" element={<AvatarSelect />} />
            
            
            
            
            <Route path="/quest/real-opportunities" element={<RealOpportunities />} />
            <Route path="/quest/internship-plan" element={<InternshipPlan />} />
            {/* Silent Breach routes */}
            <Route path="/quest/silent-breach/party" element={<SilentBreachPartyAssembly />} />
            <Route path="/quest/silent-breach/opening" element={<SilentBreachOpening />} />
            <Route path="/quest/silent-breach/hub" element={<SilentBreachHub />} />
            <Route path="/quest/silent-breach/alerts" element={<SilentBreachAlerts />} />
            <Route path="/quest/silent-breach/decision" element={<SilentBreachDecision />} />
            <Route path="/quest/silent-breach/email" element={<SilentBreachEmail />} />
            <Route path="/quest/silent-breach/team-vote" element={<SilentBreachTeamVote />} />
            <Route path="/quest/silent-breach/assessment" element={<SilentBreachAssessment />} />
            <Route path="/quest/silent-breach/outcome" element={<SilentBreachOutcome />} />
            <Route path="/quest/silent-breach/opportunities" element={<SilentBreachOpportunity />} />
            <Route path="/quest/silent-breach/internship-plan" element={<SilentBreachInternship />} />
            {/* After the Flood routes */}
            <Route path="/quest/after-the-flood/opening" element={<FloodOpening />} />
            <Route path="/quest/after-the-flood/walking-town" element={<FloodWalkingTown />} />
            <Route path="/quest/after-the-flood/risk-map" element={<FloodRiskMap />} />
            <Route path="/quest/after-the-flood/community-meeting" element={<FloodCommunityMeeting />} />
            <Route path="/quest/after-the-flood/resilience-report" element={<FloodResilienceReport />} />
            <Route path="/quest/after-the-flood/math-moment" element={<FloodMathMoment />} />
            <Route path="/quest/after-the-flood/allocation" element={<FloodAllocation />} />
            <Route path="/quest/after-the-flood/combined-reasoning" element={<FloodCombinedReasoning />} />
            <Route path="/quest/after-the-flood/consequence" element={<FloodConsequence />} />
            <Route path="/quest/after-the-flood/reflection" element={<FloodReflection />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <BottomNav />
        </FloodProvider>
        </SilentBreachProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
