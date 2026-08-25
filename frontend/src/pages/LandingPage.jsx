import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import WhyLearnBridge from "../components/WhyLearnBridge";
import HowItWorks from "../components/HowItWorks";
import Ecosystem from "../components/Ecosystem";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <Hero />
        <WhyLearnBridge />
        <HowItWorks />
        <Ecosystem />
        <CTA />
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;