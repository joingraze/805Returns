import { useCallback, useState } from "react";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { PainPoints } from "./components/PainPoints";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { Guarantee } from "./components/Guarantee";
import { FAQ } from "./components/FAQ";
import { WaitlistForm } from "./components/WaitlistForm";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { track } from "./lib/analytics";

export default function App() {
  // The plan a visitor says they'd pick. Defaults to the highlighted tier.
  const [selectedPlan, setSelectedPlan] = useState("unlimited_monthly");

  const scrollToWaitlist = useCallback(() => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);

  // From a pricing card: record the willingness-to-pay signal, then convert.
  const choosePlan = useCallback(
    (planId: string) => {
      setSelectedPlan(planId);
      track("plan_click", { plan: planId });
      scrollToWaitlist();
    },
    [scrollToWaitlist],
  );

  const openWaitlist = useCallback(() => {
    track("cta_click");
    scrollToWaitlist();
  }, [scrollToWaitlist]);

  return (
    <>
      <Nav onCta={openWaitlist} />
      <main>
        <Hero onPrimary={openWaitlist} />
        <PainPoints />
        <HowItWorks />
        <Pricing onChoose={choosePlan} />
        <Guarantee />
        <WaitlistForm selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} />
        <FinalCta onCta={openWaitlist} />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
