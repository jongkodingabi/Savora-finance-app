import FadeInSection from "@/Animations/FadeIn";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart3,
  PieChart,
  Shield,
  Smartphone,
  TrendingUp,
  Wallet,
} from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-20 bg-slate-800/30">
      <div className="container mx-auto px-4 lg:px-6">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Features
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Savora is equipped with various advanced features to help you
              manage your personal finances better.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Expense Tracking</CardTitle>
                <CardDescription className="text-slate-300">
                  Record and categorize every expense easily. See where your
                  money goes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Smart Budgeting</CardTitle>
                <CardDescription className="text-slate-300">
                  Create a monthly budget and get notifications when you
                  approach your spending limit.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Financial Analysis</CardTitle>
                <CardDescription className="text-slate-300">
                  Get deep insights into your spending patterns and financial
                  trends.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Simple & Practical</CardTitle>
                <CardDescription className="text-slate-300">
                  An interface that is simple and easy to use. Focus on what
                  matters - your finances.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-4">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Multi Platform</CardTitle>
                <CardDescription className="text-slate-300">
                  Access from anywhere - web, mobile, or tablet. Data syncs
                  automatically.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mb-4">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white">Categorization</CardTitle>
                <CardDescription className="text-slate-300">
                  Categorize your expenses for better analysis.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Features;
