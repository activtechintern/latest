
import { TrendingIdeas } from "@/components/home/TrendingIdeas";
import { LatestDiscussions } from "@/components/home/LatestDiscussions";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { LatestNews } from "@/components/home/LatestNews";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <section className="relative mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 -z-10"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-starthub-mint/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-starthub-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        
        <div className="relative py-16 md:py-24 px-4 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-starthub-blue to-starthub-mint bg-clip-text text-transparent">
                Turn Ideas Into Reality
              </h1>
              <p className="text-xl text-gray-600 max-w-xl leading-relaxed">
                Connect with fellow students, share innovative concepts, and build the next generation of startups right from your campus.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Button asChild className="bg-gradient-to-r from-starthub-blue to-starthub-mint hover:opacity-90 text-white px-6 py-6 animate-float">
                  <Link to="/submit-idea">
                    <Sparkles className="mr-2" />
                    Submit Your Idea
                  </Link>
                </Button>
                <Button asChild variant="outline" className="border-starthub-blue text-starthub-blue">
                  <Link to="/ideas">
                    Explore Ideas
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="relative bg-white p-6 rounded-xl shadow-lg md:ml-10 animate-float">
                <div className="absolute -top-3 -left-3 bg-starthub-mint w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">1</div>
                <h3 className="text-xl font-bold mb-2">Share Your Vision</h3>
                <p className="text-gray-600">Submit your innovative startup ideas to the community</p>
              </div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg mt-4 md:ml-20 animate-float" style={{ animationDelay: "0.5s" }}>
                <div className="absolute -top-3 -left-3 bg-starthub-blue w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">2</div>
                <h3 className="text-xl font-bold mb-2">Build Your Team</h3>
                <p className="text-gray-600">Connect with talented peers who share your passion</p>
              </div>
              <div className="relative bg-white p-6 rounded-xl shadow-lg mt-4 md:ml-30 animate-float" style={{ animationDelay: "1s" }}>
                <div className="absolute -top-3 -left-3 bg-starthub-coral w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-xl">3</div>
                <h3 className="text-xl font-bold mb-2">Launch Your Startup</h3>
                <p className="text-gray-600">Access resources and support to bring your idea to life</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrendingIdeas />
      <LatestNews />
      <LatestDiscussions />
      <UpcomingEvents />
    </>
  );
};

export default Index;
