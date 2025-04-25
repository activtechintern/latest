
import { ReactNode } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TopNav } from "./TopNav";
import { Outlet, useLocation, Link } from "react-router-dom";

interface MainLayoutProps {
  children?: ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  const location = useLocation();
  
  // Don't render TopNav or footer on the landing page
  const isLandingPage = location.pathname === "/landing";

  return (
    <div className="min-h-screen bg-starthub-light flex flex-col w-full">
      <TooltipProvider>
        {!isLandingPage && <TopNav />}
        <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full animate-fade-in">
          {children || <Outlet />}
        </main>
        {!isLandingPage && (
          <footer className="bg-starthub-blue text-white py-8 mt-10">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h3 className="font-bold text-xl mb-4">StartHub</h3>
                  <p className="text-blue-100">
                    Your campus platform for ideation, collaboration, and launching the next big startup.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                  <ul className="space-y-2">
                    <li><Link to="/" className="text-blue-100 hover:text-white">Home</Link></li>
                    <li><Link to="/ideas" className="text-blue-100 hover:text-white">Ideas</Link></li>
                    <li><Link to="/events" className="text-blue-100 hover:text-white">Events</Link></li>
                    <li><Link to="/resources" className="text-blue-100 hover:text-white">Resources</Link></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Connect</h3>
                  <ul className="space-y-2">
                    <li><Link to="/contact" className="text-blue-100 hover:text-white">Contact Us</Link></li>
                    <li><Link to="/about" className="text-blue-100 hover:text-white">About</Link></li>
                    <li><Link to="/landing#faq" className="text-blue-100 hover:text-white">FAQ</Link></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-blue-400 mt-6 pt-6 text-center text-blue-100">
                <p>© {new Date().getFullYear()} StartHub. All rights reserved.</p>
              </div>
            </div>
          </footer>
        )}
      </TooltipProvider>
    </div>
  );
};
