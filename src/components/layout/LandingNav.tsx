
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export const LandingNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToAuthWithTab = (tabId: string) => {
    const authCard = document.getElementById('auth-card');
    if (authCard) {
      authCard.scrollIntoView({ behavior: 'smooth' });
      
      // Set a small timeout to ensure the element is in view before clicking
      setTimeout(() => {
        // Switch to the selected tab
        const tab = document.querySelector(`[data-tab="${tabId}"]`) as HTMLButtonElement;
        if (tab) {
          console.log(`Clicking on tab: ${tabId}`);
          tab.click();
        } else {
          console.error(`Tab with data-tab="${tabId}" not found`);
        }
      }, 100);
    } else {
      console.error("Auth card element not found");
    }
    
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center">
              <div className="bg-gradient-to-r from-starthub-blue to-starthub-mint rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="ml-2 font-poppins font-bold text-xl">StartHub</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection("features")} 
              className="text-gray-600 hover:text-starthub-blue"
            >
              Features
            </button>
            <button 
              onClick={() => scrollToSection("why-starthub")} 
              className="text-gray-600 hover:text-starthub-blue"
            >
              Why StartHub
            </button>
            <Button 
              onClick={() => scrollToAuthWithTab("login")} 
              variant="ghost"
            >
              Sign In
            </Button>
            <Button 
              onClick={() => scrollToAuthWithTab("register")} 
              className="bg-starthub-blue hover:bg-starthub-blue/90"
            >
              Register
            </Button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white">
            <button
              onClick={() => scrollToSection("features")}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-starthub-blue hover:bg-gray-50"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("why-starthub")}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-starthub-blue hover:bg-gray-50"
            >
              Why StartHub
            </button>
            <button
              onClick={() => scrollToAuthWithTab("login")}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-600 hover:text-starthub-blue hover:bg-gray-50"
            >
              Sign In
            </button>
            <button
              onClick={() => scrollToAuthWithTab("register")}
              className="block w-full text-left px-4 py-2 text-base font-medium bg-starthub-blue text-white hover:bg-starthub-blue/90"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
