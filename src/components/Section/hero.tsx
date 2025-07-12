import { CheckCircle, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import FadeInSection from "@/Animations/FadeIn";
const HeroSection = () => {
  return (
    <section className="py-18 lg:py-25">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center max-w-4xl mx-auto">
          <FadeInSection>
            <Badge className="mb-6 bg-slate-800 text-emerald-400 border-emerald-400/20">
              ✨ Manage Your Finances Easily
            </Badge>
          </FadeInSection>

          <FadeInSection>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Manage Your Money
              <span className="block bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Easier & Smarter
              </span>
              Every day
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Savora helps you manage your personal finances simply and
              elegantly. Track expenses, set a budget, and achieve your
              financial goals.
            </p>
          </FadeInSection>

          <FadeInSection>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 px-8 py-3"
              >
                Start Managing Your Money Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </FadeInSection>

          <div className="flex items-center justify-center space-x-6 text-sm text-slate-400">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
              Free forever
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
              No credit card required
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-emerald-400 mr-2" />
              Quick Setup
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
