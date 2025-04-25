import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LandingNav } from '@/components/layout/LandingNav';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Lightbulb, ArrowRight, Calendar, Users, Sparkles } from 'lucide-react';
import FAQ from "@/components/home/FAQ";

const Landing = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login successful!",
          description: "Redirecting to dashboard...",
        });
        navigate('/');
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (regPassword !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords match",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      const success = await register(email, regPassword, { full_name: name });
      if (success) {
        toast({
          title: "Registration successful!",
          description: "You can now sign in with your credentials.",
        });
        setRegPassword('');
        setConfirmPassword('');
        const loginTab = document.querySelector('[data-tab="login"]') as HTMLButtonElement;
        if (loginTab) loginTab.click();
      }
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSignUp = () => {
    const authCard = document.getElementById('auth-card');
    if (authCard) {
      authCard.scrollIntoView({ behavior: 'smooth' });
      const registerTab = document.querySelector('[data-tab="register"]') as HTMLButtonElement;
      if (registerTab) registerTab.click();
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <LandingNav />
      
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 px-4 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-starthub-mint/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-starthub-blue/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }}></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center px-3 py-1.5 bg-white/80 rounded-full shadow-sm mb-2">
                <span className="bg-starthub-coral/20 text-starthub-coral p-1 rounded-full mr-2">
                  <Sparkles className="h-4 w-4" />
                </span>
                <span className="text-xs font-medium">SGGS Students Only</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-starthub-blue via-starthub-mint to-starthub-coral bg-clip-text text-transparent leading-tight">
                Turn Ideas Into Reality
                <br />
                <span className="text-3xl md:text-4xl lg:text-5xl">Launch Your Startup Journey</span>
              </h1>
              
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Connect with fellow SGGS students, share innovative concepts, and build the next generation 
                of startups right from your campus. StartHub is your platform for ideation, collaboration, 
                and launching your entrepreneurial dreams.
              </p>
            </div>

            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <Card id="auth-card" className="shadow-xl border-gray-100 bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden relative">
                <span className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-starthub-blue to-starthub-mint"></span>
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome to StartHub</CardTitle>
                  <CardDescription>
                    Join the SGGS startup community
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login" data-tab="login">Login</TabsTrigger>
                      <TabsTrigger value="register" data-tab="register">Register</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.id@sggs.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-starthub-blue to-starthub-mint hover:opacity-90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Signing in..." : "Sign In"}
                        </Button>
                      </form>
                    </TabsContent>
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="reg-name">Full Name</Label>
                          <Input
                            id="reg-name"
                            type="text"
                            placeholder="Your full name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-email">SGGS Email</Label>
                          <Input
                            id="reg-email"
                            type="email"
                            placeholder="your.id@sggs.ac.in"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reg-password">Password</Label>
                          <Input
                            id="reg-password"
                            type="password"
                            placeholder="Create a password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm Password</Label>
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-white"
                            required
                          />
                        </div>
                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-starthub-blue to-starthub-mint hover:opacity-90"
                          disabled={isLoading}
                        >
                          {isLoading ? "Registering..." : "Register"}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col items-center text-center border-t pt-4">
                  <p className="text-sm text-gray-600">
                    For demo, use: riteshyevatkar@gmail.com / 123456789
                    <br />
                    or register with your SGGS email
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="why-starthub" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why StartHub?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Our platform is designed to help college students transform innovative ideas into successful startups through collaboration and campus-wide support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="bg-starthub-blue/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Lightbulb className="text-starthub-blue h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Launch Your Idea</h3>
              <p className="text-gray-600">Share your innovative concepts with the entire campus community and get valuable feedback.</p>
            </div>

            <div className="bg-mint-50 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="bg-starthub-mint/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Users className="text-starthub-mint h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Build Your Dream Team</h3>
              <p className="text-gray-600">Connect with talented peers who share your passion and complement your skills.</p>
            </div>

            <div className="bg-coral-50 rounded-2xl p-6 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
              <div className="bg-starthub-coral/20 p-3 rounded-full w-14 h-14 flex items-center justify-center mb-4">
                <Calendar className="text-starthub-coral h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Get Campus-Wide Support</h3>
              <p className="text-gray-600">Access resources, mentorship, and funding opportunities to bring your ideas to life.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">StartHub provides all the tools and resources you need to go from idea to launch.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Idea Showcase</h3>
                <span className="badge-hot px-2 py-1 rounded-full text-xs">HOT</span>
              </div>
              <p className="text-gray-600 text-sm">Share your innovative startup ideas and get valuable feedback from peers.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Team Building</h3>
                <span className="badge-new px-2 py-1 rounded-full text-xs">NEW</span>
              </div>
              <p className="text-gray-600 text-sm">Find the perfect partners with complementary skills for your venture.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Resource Library</h3>
              </div>
              <p className="text-gray-600 text-sm">Access guides, templates, and learning resources to develop your startup.</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold">Campus Events</h3>
                <span className="badge-trending px-2 py-1 rounded-full text-xs">TRENDING</span>
              </div>
              <p className="text-gray-600 text-sm">Join hackathons, pitch competitions, and networking events.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-starthub-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-starthub-mint/10 rounded-full blur-2xl"></div>
        
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Launch Your Startup Journey?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
              Join StartHub today and become part of the next generation of entrepreneurs reshaping the future.
            </p>
            <Button 
              className="bg-gradient-to-r from-starthub-blue to-starthub-mint hover:opacity-90 text-white px-8 py-6 rounded-xl shadow-lg"
              onClick={scrollToSignUp}
            >
              Start Now
              <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <FAQ />
      
      <footer className="bg-starthub-blue text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
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
                <li><a href="/" className="text-blue-100 hover:text-white">Home</a></li>
                <li><a href="/ideas" className="text-blue-100 hover:text-white">Ideas</a></li>
                <li><a href="/events" className="text-blue-100 hover:text-white">Events</a></li>
                <li><a href="/resources" className="text-blue-100 hover:text-white">Resources</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-blue-100 hover:text-white">Contact Us</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">About</a></li>
                <li><a href="#" className="text-blue-100 hover:text-white">FAQ</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-400 mt-8 pt-6 text-center text-blue-100">
            <p>© {new Date().getFullYear()} StartHub@2025. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
