import HeroSection from "@/components/home/HeroSection";
import ProspectSection from "@/components/home/ProspectSection";
import VoiceAgentSection from "@/components/home/VoiceAgentSection";
import OmnipresenceSection from "@/components/home/OmnipresenceSection";
import RFPSection from "@/components/home/RFPSection";
import WordOfMouthSection from "@/components/home/WordOfMouthSection";
import ProofSection from "@/components/home/ProofSection";
import SpeedStatsSection from "@/components/home/SpeedStatsSection";
import FinalCTASection from "@/components/home/FinalCTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProspectSection />
      <VoiceAgentSection />
      <OmnipresenceSection />
      <RFPSection />
      <WordOfMouthSection />
      <ProofSection />
      <SpeedStatsSection />
      <FinalCTASection />
    </>
  );
}
