
import { Link, useLocation } from "react-router-dom";
import { Bell, Plus, Search, User, Settings, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Ideas", path: "/ideas" },
  { name: "Discussions", path: "/discussions" },
  { name: "Jobs", path: "/jobs" },
  { name: "Resources", path: "/resources" },
  { name: "Events", path: "/events" },
  { name: "News", path: "/news" },
];

// Sample notifications data
const notifications = [
  {
    id: 1,
    title: "Your idea received a comment",
    message: "John Doe commented on your Smart Campus idea",
    time: "5 minutes ago",
    read: false,
  },
  {
    id: 2,
    title: "New event announced",
    message: "Startup Weekend is happening next month",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 3,
    title: "Mentor request approved",
    message: "Prof. Smith accepted your mentorship request",
    time: "1 day ago",
    read: true,
  },
  {
    id: 4,
    title: "Resource recommendation",
    message: "Check out this new startup guide in resources",
    time: "3 days ago",
    read: true,
  },
];

export const TopNav = () => {
  const location = useLocation();
  const [unreadCount, setUnreadCount] = useState(2);
  const [userNotifications, setUserNotifications] = useState(notifications);
  const { user, logout } = useAuth();

  const markAsRead = (id: number) => {
    setUserNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
    setUnreadCount(prev => Math.max(prev - 1, 0));
  };

  const markAllAsRead = () => {
    setUserNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
    setUnreadCount(0);
  };

  const displayName = user?.user_metadata?.full_name || user?.user_metadata?.username || user?.email || 'User';

  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-starthub-blue to-starthub-mint rounded-lg w-7 h-7 flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-poppins font-bold text-lg">StartHub</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 overflow-x-auto">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors hover:text-starthub-blue whitespace-nowrap ${
                  location.pathname === item.path ? "text-starthub-blue" : "text-gray-600"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center rounded-full bg-gray-100 px-3 py-1.5">
            <Search className="h-4 w-4 text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search ideas..."
              className="bg-transparent border-none outline-none text-sm w-40 lg:w-64"
            />
          </div>

          <Button 
            asChild 
            variant="ghost" 
            size="icon" 
            className="relative bg-starthub-blue/10 text-starthub-blue hover:bg-starthub-blue/20"
          >
            <Link to="/submit-idea">
              <Plus className="h-5 w-5" />
            </Link>
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 animate-bounce">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-starthub-coral opacity-75 animate-ping"></span>
                    <Badge className="relative bg-starthub-coral text-white rounded-full h-5 w-5 flex items-center justify-center p-0">
                      {unreadCount}
                    </Badge>
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0 mr-4">
              <div className="flex items-center justify-between px-4 py-2 border-b">
                <h3 className="font-medium">Notifications</h3>
                {unreadCount > 0 && (
                  <Button 
                    variant="ghost" 
                    className="text-xs h-auto p-1 hover:bg-transparent hover:text-starthub-blue"
                    onClick={markAllAsRead}
                  >
                    Mark all as read
                  </Button>
                )}
              </div>
              <div className="max-h-96 overflow-y-auto">
                {userNotifications.length > 0 ? (
                  userNotifications.map((notification) => (
                    <div 
                      key={notification.id}
                      className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${!notification.read ? 'bg-blue-50' : ''}`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex gap-3 items-start">
                        <div className={`rounded-full p-2 ${!notification.read ? 'bg-starthub-blue/20 text-starthub-blue' : 'bg-gray-100'}`}>
                          <Bell className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{notification.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                          <span className="text-xs text-gray-400 mt-2 block">{notification.time}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-gray-500">No notifications</div>
                )}
              </div>
              <div className="p-2 text-center border-t">
                <Button variant="ghost" size="sm" className="w-full text-starthub-blue">
                  View all notifications
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            asChild
            variant="ghost"
            size="icon"
            className="text-starthub-blue relative hidden sm:flex"
          >
            <Link to="/settings">
              <Settings className="h-5 w-5" />
            </Link>
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="px-4 py-2 border-b">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <DropdownMenuItem asChild>
                <Link to="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
