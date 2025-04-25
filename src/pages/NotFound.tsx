
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Coffee, Lightbulb, BookOpen } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-starthub-dark to-starthub-blue/90 p-6 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Twinkling stars */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(2px 2px at 20px 30px, #eee, rgba(0,0,0,0)), radial-gradient(2px 2px at 40px 70px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)), radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)), radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0))', backgroundSize: '200px 200px' }}>
        </div>
        
        {/* Floating icons */}
        <div className="absolute top-1/4 left-1/4 animate-float">
          <Coffee className="text-starthub-coral h-8 w-8" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float delay-150">
          <Lightbulb className="text-starthub-mint h-8 w-8" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 animate-float delay-300">
          <BookOpen className="text-white/70 h-8 w-8" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Pitch deck slide */}
        <div className="mb-8 bg-white/10 backdrop-blur-sm rounded-lg p-8 transform hover:scale-105 transition-transform duration-300">
          <div className="text-9xl font-bold bg-gradient-to-r from-starthub-mint to-starthub-coral bg-clip-text text-transparent mb-4">
            404
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">
            This page didn't get funded.
            <br />
            We pitched it... but the VCs said no.
          </h1>
          
          {/* Animated VC rejection scene */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex -space-x-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="w-12 h-12 bg-gray-800 rounded-full border-2 border-gray-700 flex items-center justify-center animate-pulse-slow"
                >
                  <div className="w-6 h-2 bg-red-500 rounded"></div>
                </div>
              ))}
            </div>
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
              <span className="text-white font-bold">REJECT</span>
            </div>
          </div>
        </div>

        <p className="text-lg md:text-xl text-white/90 mb-8">
          🚀 But hey — don't give up on your dreams!
          <br />
          Head back home and find something amazing.
        </p>

        <Link to="/">
          <Button className="bg-starthub-mint hover:bg-starthub-mint/90 text-white transform hover:scale-110 transition-all duration-300 animate-float">
            🔙 Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
