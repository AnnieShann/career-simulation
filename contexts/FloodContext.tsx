import { createContext, useContext, useState, ReactNode } from "react";

export type FundingChoice = "school-waterfront" | "waterfront-drainage" | "school-grants" | null;

interface FloodState {
  fundingChoice: FundingChoice;
  setFundingChoice: (c: FundingChoice) => void;
  completedScreens: string[];
  completeScreen: (screen: string) => void;
  mathScore: number;
  setMathScore: (s: number) => void;
  readingScore: number;
  setReadingScore: (s: number) => void;
  respondedFirst: string | null;
  setRespondedFirst: (r: string) => void;
  reflectionAnswer: string | null;
  setReflectionAnswer: (r: string) => void;
}

const FloodContext = createContext<FloodState | null>(null);

export const useFlood = () => {
  const ctx = useContext(FloodContext);
  if (!ctx) throw new Error("useFlood must be used within FloodProvider");
  return ctx;
};

export const FloodProvider = ({ children }: { children: ReactNode }) => {
  const [fundingChoice, setFundingChoice] = useState<FundingChoice>(null);
  const [completedScreens, setCompletedScreens] = useState<string[]>([]);
  const [mathScore, setMathScore] = useState(0);
  const [readingScore, setReadingScore] = useState(0);
  const [respondedFirst, setRespondedFirst] = useState<string | null>(null);
  const [reflectionAnswer, setReflectionAnswer] = useState<string | null>(null);

  const completeScreen = (screen: string) => {
    setCompletedScreens((prev) => prev.includes(screen) ? prev : [...prev, screen]);
  };

  return (
    <FloodContext.Provider value={{
      fundingChoice, setFundingChoice,
      completedScreens, completeScreen,
      mathScore, setMathScore,
      readingScore, setReadingScore,
      respondedFirst, setRespondedFirst,
      reflectionAnswer, setReflectionAnswer,
    }}>
      {children}
    </FloodContext.Provider>
  );
};
