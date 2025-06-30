import HeaderNavigation from "@/components/Section/heder";
import HeroSection from "@/components/Section/hero";
import Features from "@/components/Section/features";
import Testimonials from "@/components/Section/testimonials";
import CTA from "@/components/Section/cta";
import Footer from "@/components/ui/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 rounded-full w-[700px] h-[200px] blur-3xl z-10"></div>
      {/* Header */}
      <HeaderNavigation />

      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <Features />
      {/* Testimonials */}
      <Testimonials />
      {/* CTA Section */}
      <CTA />
      {/* Footer */}
      <Footer />
    </div>
  );
}
