import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { CapabilitiesSection } from "./components/CapabilitiesSection";
import { PricingSection } from "./components/PricingSection";
import { UseCasesSection } from "./components/UseCasesSection";
import { APISection } from "./components/APISection";
import { CTASection } from "./components/CTASection";
import { Footer } from "./components/Footer";
import { ChatInterface } from "./components/ChatInterface";
import { useState } from "react";

export default function App() {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <ChatInterface onBack={() => setShowChat(false)} />;
  }

  return (
    <div className="dark min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection onNavigateToChat={() => setShowChat(true)} />
        <CapabilitiesSection />
        <PricingSection />
        <UseCasesSection />
        <APISection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}