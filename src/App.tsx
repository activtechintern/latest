
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { PrivateRoute } from "@/components/auth/PrivateRoute";
import { MainLayout } from "@/components/layout/MainLayout";

import Landing from "./pages/Landing";
import Index from "./pages/Index";
import Ideas from "./pages/Ideas";
import IdeaDetail from "./pages/IdeaDetail";
import SubmitIdea from "./pages/SubmitIdea";
import Resources from "./pages/Resources";
import News from "./pages/News";
import Events from "./pages/Events";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Discussions from "./pages/Discussions";
import NotFound from "./pages/NotFound";
import Books from "./pages/resources/Books";
import Courses from "./pages/resources/Courses";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={<Auth />} />
            <Route path="/landing" element={<Landing />} />
            
            {/* Protected routes */}
            <Route element={<PrivateRoute><MainLayout /></PrivateRoute>}>
              <Route path="/" element={<Index />} />
              <Route path="/ideas" element={<Ideas />} />
              <Route path="/ideas/:id" element={<IdeaDetail />} />
              <Route path="/submit-idea" element={<SubmitIdea />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/books" element={<Books />} />
              <Route path="/resources/courses" element={<Courses />} />
              <Route path="/news" element={<News />} />
              <Route path="/events" element={<Events />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/discussions" element={<Discussions />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Route>
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
