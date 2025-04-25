
import { Link, useLocation } from "react-router-dom";
import { Home, Lightbulb, MessageSquare, BookOpen, Calendar, Newspaper, Award, User, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Ideas", icon: Lightbulb, path: "/ideas" },
    { name: "Discussions", icon: MessageSquare, path: "/discussions" },
    { name: "Jobs", icon: Briefcase, path: "/jobs" },
    { name: "Resources", icon: BookOpen, path: "/resources" },
    { name: "Events", icon: Calendar, path: "/events" },
    { name: "News", icon: Newspaper, path: "/news" },
    { name: "Leaderboard", icon: Award, path: "/leaderboard" },
    { name: "Profile", icon: User, path: "/profile" },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 p-4">
      <div className="mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-starthub-blue to-starthub-mint rounded-lg w-8 h-8 flex items-center justify-center text-white font-bold">
            S
          </div>
          <span className="font-poppins font-bold text-xl">StartHub</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-starthub-blue text-white font-medium"
                  : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <item.icon size={20} />
              <span>{item.name}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse-slow"></div>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-4 border-t border-gray-200">
        <Link
          to="/submit-idea"
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-starthub-blue to-starthub-mint text-white rounded-full py-3 px-4 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02]"
        >
          <span>Submit Idea</span>
          <Lightbulb size={18} />
        </Link>
      </div>
    </aside>
  );
};
