import FadeInSection from "@/Animations/FadeIn";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

import { Star } from "lucide-react";

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 lg:px-6">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Makes Management Convenient
            </h2>
            <p className="text-xl text-slate-300">
              See what they are saying about Savora
            </p>
          </div>
        </FadeInSection>

        <FadeInSection>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-slate-300 text-base">
                  &quot;Savora truly changed the way I manage my finances. Now I
                  can save more!&quot;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center">
                    <span className="text-slate-900 font-semibold">A</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Andi Pratama</p>
                    <p className="text-sm text-slate-400">Private Employee</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-slate-300 text-base">
                  &quot;The interface is simple but powerful. I can track all my
                  expenses easily.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">S</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Sari Dewi</p>
                    <p className="text-sm text-slate-400">Freelancer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <CardDescription className="text-slate-300 text-base">
                  &quot;The budgeting feature is very helpful. Now I never
                  overspend again.&quot;
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold">R</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Rudi Hermawan</p>
                    <p className="text-sm text-slate-400">Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Testimonials;
