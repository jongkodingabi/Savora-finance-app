import FadeInSection from "@/Animations/FadeIn";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Take Control of Your Finances?
            </h2>
            <p className="text-xl text-slate-300 mb-8">
              Join with users who have already experienced the ease of managing
              finances with Savora
            </p>
          </FadeInSection>

          <FadeInSection>
            {" "}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                className="max-w-sm bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
              />
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white border-0 px-8"
              >
                Start Free
              </Button>
            </div>
          </FadeInSection>

          <FadeInSection>
            <p className="text-sm text-slate-400">
              Free forever • Simple & Elegant • No credit card required
            </p>
          </FadeInSection>
        </div>
      </div>
    </section>
  );
};

export default CTA;
